import {Statistic} from "./statistic";
import {StatisticEntity} from "./statistic.entity";
import {StatisticCityEntity} from "./city/city.statistic.entity";
import {StatisticAgeEntity} from "./age/age.statistic.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
export class StatisticMapper {
    fromModelToEntity(statistic: Statistic) {
        let statisticEntity: StatisticEntity = new StatisticEntity()

        statisticEntity.date = statistic.date

        statisticEntity.total = statistic.total;
        statisticEntity.male = statistic.male;
        statisticEntity.female = statistic.female;

        statisticEntity.cities = statistic.cities;
        statisticEntity.ages = statistic.ages;

        statisticEntity.statisticCities = [];

        for (let i = 0; i < statistic.statisticCities.length; i++) {
            let statisticCity = statistic.statisticCities[i];

            let statisticCityEntity: StatisticCityEntity = new StatisticCityEntity();
            statisticCityEntity.city = statisticCity.city;
            statisticCityEntity.total = statisticCity.total;
            statisticCityEntity.male = statisticCity.male;
            statisticCityEntity.female = statisticCity.female;
            statisticCityEntity.statisticAges = []

            for (let j = 0; j <statisticCity.statisticAges.length; j++) {
                let statisticAge = statisticCity.statisticAges[j];

                let statisticAgeEntity: StatisticAgeEntity = new StatisticAgeEntity();
                statisticAgeEntity.age = statisticAge.age;
                statisticAgeEntity.total = statisticAge.total;
                statisticAgeEntity.male = statisticAge.male;
                statisticAgeEntity.female = statisticAge.female;

                statisticCityEntity.statisticAges.push(statisticAgeEntity);
                statisticAgeEntity.statisticCity = statisticCityEntity;
            }

            statisticEntity.statisticCities.push(statisticCityEntity);
            statisticCityEntity.statistic = statisticEntity;
        }

        return statisticEntity;
    }
}