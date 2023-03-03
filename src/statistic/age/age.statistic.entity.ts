import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {StatisticEntity} from "../statistic.entity";
import {StatisticCityEntity} from "../city/city.statistic.entity";

@Entity('statistic_age')
export class StatisticAgeEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    age: number;

    @Column()
    total: number;

    @Column()
    male: number;

    @Column()
    female: number;

    @ManyToOne(() => StatisticCityEntity, (statisticCity) => statisticCity.statisticAges)
    statisticCity: StatisticCityEntity;
}