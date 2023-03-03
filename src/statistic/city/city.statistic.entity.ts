import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {StatisticAgeEntity} from "../age/age.statistic.entity";
import {StatisticEntity} from "../statistic.entity";

@Entity('statistic_city')
export class StatisticCityEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: "NONE"
    })
    city: string;

    @Column()
    total: number;

    @Column()
    male: number;

    @Column()
    female: number;

    @OneToMany(() => StatisticAgeEntity, (statisticAge) => statisticAge.statisticCity)
    statisticAges: StatisticAgeEntity[];

    @ManyToOne(() => StatisticEntity, (statistic) => statistic.statisticCities)
    statistic: StatisticEntity;
}