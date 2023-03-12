import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {StatisticAgeEntity} from "../age/age.statistic.entity";
import {StatisticEntity} from "../statistic.entity";
import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity('statistic_city')
export class StatisticCityEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({
        default: "NONE"
    })
    city: string;

    @Field()
    @Column()
    total: number;

    @Field()
    @Column()
    male: number;

    @Field()
    @Column()
    female: number;

    @Field(() => [StatisticAgeEntity])
    @OneToMany(() => StatisticAgeEntity, (statisticAge) => statisticAge.statisticCity, {cascade: true})
    statisticAges: StatisticAgeEntity[];

    @Field(() => StatisticEntity)
    @ManyToOne(() => StatisticEntity, (statistic) => statistic.statisticCities)
    statistic: StatisticEntity;
}