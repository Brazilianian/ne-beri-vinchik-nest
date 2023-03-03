import {Injectable} from "@nestjs/common";
import {ProfileEntity} from "../profile/models/profile.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class StatisticGrabber {
    constructor(
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>,
    ) {
    }

    async getTotalCount(city?: string, age?:number): Promise<number> {
        let query = this.profileRepository.createQueryBuilder();
        if (city) {
            query.andWhere("city_were_found = :city", {city: `${city}`})
        }
        if (age) {
            query.andWhere("age = :age", {age: `${age}`})
        }
        return await query.getCount();
    }

    async getTotalMaleCount(city?: string, age?:number): Promise<number> {
        let query = this.profileRepository.createQueryBuilder();
        query.andWhere("gender = 'MALE'")
        if (city) {
            query.andWhere("city_were_found = :city", {city: `${city}`})
        }
        if (age) {
            query.andWhere("age = :age", {age: `${age}`})
        }
        return await query.getCount();
    }

    async getTotalFemaleCount(city?: string, age?:number): Promise<number> {
        let query = this.profileRepository.createQueryBuilder();
        query.andWhere("gender = 'FEMALE'")
        if (city) {
            query.andWhere("city_were_found = :city", {city: `${city}`})
        }
        if (age) {
            query.andWhere("age = :age", {age: `${age}`})
        }
        return await query.getCount();
    }

    async getCities(): Promise<Array<string>> {
        const query = this.profileRepository.createQueryBuilder('profiles');
        query.select('city_were_found').distinct()

        return await query.execute()
    }

    async getAges(): Promise<Array<number>> {
        const query = this.profileRepository.createQueryBuilder('profiles');
        query.select('age').distinct()
        query.orderBy('age', 'ASC')

        return await query.execute()
    }
}
