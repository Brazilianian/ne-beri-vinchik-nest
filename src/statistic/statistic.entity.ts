import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp} from "typeorm";
import {StatisticCityEntity} from "./city/city.statistic.entity";

@Entity('statistic')
export class StatisticEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'timestamp', default: Timestamp})
    date: Timestamp;

    @Column()
    total: number;

    @Column()
    male: number;

    @Column()
    female: number;

    @Column()
    cities: Array<string>

    @Column()
    ages: Array<number>

    @OneToMany(() => StatisticCityEntity, (city) => city.statistic, { cascade: true })
    statisticCities: StatisticCityEntity[];
}