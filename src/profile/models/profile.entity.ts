import {Column, Entity, PrimaryGeneratedColumn, Timestamp} from "typeorm";
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
    @Column({type: 'timestamp', default: Timestamp})
    date: Date;

    @Field()
    @Column({type: 'timestamp', default: Timestamp})
    last_modified: Date;
}