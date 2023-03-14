import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {StatisticCityEntity} from "./city/city.statistic.entity";
import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity('statistic')
export class StatisticEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({type: 'date', default: new Date()})
    date: Date;

    @Field()
    @Column()
    total: number;

    @Field()
    @Column()
    male: number;

    @Field()
    @Column()
    female: number;

    @Field(() => [String])
    @Column("text", {array: true})
    cities: String[];

    @Field(() => [Number])
    @Column("int", {array: true})
    ages: Number[];

    @Field(() => [StatisticCityEntity])
    @OneToMany(() => StatisticCityEntity, (city) => city.statistic, { cascade: true })
    statisticCities: StatisticCityEntity[];
}