import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity('profiles')
export class ProfileEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({
        default: "",
        nullable: true
    })
    name: string;

    @Field()
    @Column({
        default: "",
        nullable: true
    })
    description: string;

    @Field()
    @Column({default: 0})
    age: number;

    @Field()
    @Column({
        default: "NONE"
    })
    city: string;

    @Field()
    @Column({name: 'city_were_found', default: "NONE"})
    cityWereFound: string;

    @Field()
    @Column({
        default: "NONE",
    })
    gender: string;

    @Field()
    @Column({name: 'tg_link', default: ""})
    tgLink: string;

    @Field()
    @Column({name: 'inst_link', default: ""})
    instLink: string;

    @Field()
    @Column({type: 'date', default: new Date()})
    date: Date;

    @Field()
    @Column({type: 'date', default: new Date()})
    last_modified: Date;
}