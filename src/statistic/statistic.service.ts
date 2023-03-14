import {Statistic} from "./statistic";
import {Injectable} from "@nestjs/common";
import {StatisticGrabber} from "./statistic.grabber";
import {Cities} from "../city/cities";
import {StatisticCity} from "./city/city.statistic";
import {StatisticAge} from "./age/age.statistic";
import {StatisticMapper} from "./statistic.mapper";
import {Cron} from "@nestjs/schedule";
import {StatisticEntity} from "./statistic.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {from, Observable} from "rxjs";

@Injectable()
export class StatisticService {
    constructor(
        private readonly statisticGrabber: StatisticGrabber,
        private readonly statisticMapper: StatisticMapper,
        @InjectRepository(StatisticEntity)
        private readonly statisticRepository: Repository<StatisticEntity>,
    ) {
    }

    static isSearching: boolean = false;

    @Cron("0 0 */12 * * *")
    statisticScheduler() {
        if (!StatisticService.isSearching) {
            StatisticService.isSearching = true;
            this.todayStatisticWasWritten()
                .then(wasWritten => {
                    if (!wasWritten) {
                        this.generateDailyStatistic()
                            .then(statistic => {
                                let statisticEntity: StatisticEntity = this.statisticMapper.fromModelToEntity(statistic);
                                this.statisticRepository.save(statisticEntity)
                                    .then(() => {
                                        console.log("Statistic was written")
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                                StatisticService.isSearching = false
                            })
                    }
                })
                .catch(err => {
                    console.log(err)
                })

        }
    }

    async todayStatisticWasWritten(): Promise<Boolean> {
        let query = this.statisticRepository.createQueryBuilder('statistic');
        return await query
            .select()
            .where('date = CURRENT_DATE')
            .getExists()
    }

    async generateDailyStatistic(): Promise<Statistic> {
        let statistic: Statistic = new Statistic();

        const [total, male, female, cities, ages] = await Promise.all([
            this.statisticGrabber.getTotalCount(),
            this.statisticGrabber.getTotalMaleCount(),
            this.statisticGrabber.getTotalFemaleCount(),
            this.statisticGrabber.getCities(),
            this.statisticGrabber.getAges()
        ])

        statistic.total = total;
        statistic.male = male;
        statistic.female = female;

        cities.forEach(city => {
            statistic.cities.push(city['city_were_found'])
        })

        ages.forEach(age => {
            statistic.ages.push(age['age'])
        })

        for (let i = 0; i < statistic.cities.length; i++) {
            let statisticCity: StatisticCity = new StatisticCity();
            let city = statistic.cities[i];

            statisticCity.city = Cities[city];

            const [total, male, female] = await Promise.all([
                this.statisticGrabber.getTotalCount(city),
                this.statisticGrabber.getTotalMaleCount(city),
                this.statisticGrabber.getTotalFemaleCount(city),
            ])

            statisticCity.total = total;
            statisticCity.male = male;
            statisticCity.female = female;

            for (let j = 0; j < statistic.ages.length; j++) {

                let age = statistic.ages[j]
                let statisticAge: StatisticAge = new StatisticAge();
                statisticAge.age = age;

                const [total, male, female] = await Promise.all([
                    this.statisticGrabber.getTotalCount(city, age),
                    this.statisticGrabber.getTotalMaleCount(city, age),
                    this.statisticGrabber.getTotalFemaleCount(city, age),
                ])

                statisticAge.total = total;
                statisticAge.male = male;
                statisticAge.female = female;

                statisticCity.statisticAges.push(statisticAge);
            }

            statistic.statisticCities.push(statisticCity);
        }

        return statistic;
    }

    getStatistics(): Observable<any> {
        let query = this.statisticRepository.createQueryBuilder('statistic');
        query
            .select()
            .leftJoinAndSelect('statistic.statisticCities', 'statistic_city')
            .leftJoinAndSelect('statistic_city.statisticAges', 'statistic_age')
            .orderBy('statistic.date', 'ASC')
        return from(query.getMany());
    }
}


