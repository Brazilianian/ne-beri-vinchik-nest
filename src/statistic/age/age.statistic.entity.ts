import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {StatisticCityEntity} from "../city/city.statistic.entity";
import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity('statistic_age')
export class StatisticAgeEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    age: number;

    @Field()
    @Column()
    total: number;

    @Field()
    @Column()
    male: number;

    @Field()
    @Column()
    female: number;

    @Field(() => StatisticCityEntity)
    @ManyToOne(() => StatisticCityEntity, (statisticCity) => statisticCity.statisticAges)
    statisticCity: StatisticCityEntity;
}