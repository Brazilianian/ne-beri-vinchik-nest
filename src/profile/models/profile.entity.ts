import {Column, Entity, PrimaryGeneratedColumn, Timestamp} from "typeorm";

@Entity('profiles')
export class ProfileEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({default: ""})
    name: string;

    @Column({default: ""})
    description:string;

    @Column({default: 0})
    age: number;

    @Column({
       default: "NONE"
    })
    city: string;

    @Column({name: 'city_were_found', default: "NONE"})
    cityWereFound: string;

    @Column({
        default: "NONE",
    })
    gender: string;

    @Column({name: 'tg_link', default: ""})
    tgLink: string;

    @Column({name: 'inst_link', default: ""})
    instLink: string;

    @Column({type: 'timestamp', default: Timestamp})
    date: Timestamp;
}