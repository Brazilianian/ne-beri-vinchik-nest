import {Statistic} from "./statistic";
import {Injectable} from "@nestjs/common";
import {StatisticGrabber} from "./statistic.grabber";
import {Cities} from "../city/cities";
import {StatisticCity} from "./city/city.statistic";
import {StatisticAge} from "./age/age.statistic";
import {StatisticMapper} from "./statistic.mapper";
import * as fs from "fs";
import {Cron} from "@nestjs/schedule";

@Injectable()
export class StatisticService {
    constructor(
        private readonly statisticGrabber: StatisticGrabber,
        private readonly statisticMapper: StatisticMapper
    ) {
    }

    @Cron('0 0 0 * * *')
    statisticScheduler() {
        this.generateDailyStatistic()
            .then(statistic => {
                let json = JSON.stringify(statistic);
                fs.writeFile(`./statistics/${statistic.date.toDateString()}.json`, json,{encoding: 'utf-8'}, (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('Statistic has been written')
                    }
                });
            })
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

    getStatistics(): Array<Statistic> {
        let statistics: Statistic[] = []
        let files = fs.readdirSync('./statistics/')
        for (let i = 0; i < files.length; i++) {
            let file: string = files[i];
            let json = fs.readFileSync(`./statistics/${file}`, {encoding: 'utf-8'})
            let statistic: Statistic = JSON.parse(json)
            statistics.push(statistic)
        }
        return statistics
    }
}


