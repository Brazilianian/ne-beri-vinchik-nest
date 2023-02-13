import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ProfileEntity} from "./models/profile.entity";
import {Repository} from "typeorm";
import {from, Observable} from "rxjs";
import {ProfileModel} from "./models/profile.model";
import {Filter} from "../filter/filter";

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>,
    ) {
    }

    findAll(filter: Filter): Observable<ProfileModel[]> {
        let query = (this.profileRepository.createQueryBuilder("profiles")
            .take(filter.limit)
            .skip(filter.limit * filter.pageNumber));


        if (filter.name && filter.name !== "") {
            query.andWhere("LOWER(name) like :name", {name: `%${filter.name.toLowerCase()}%`})
        }
        if (filter.description && filter.description !== "") {
            query.andWhere("LOWER(description) like :description", {description: `%${filter.description.toLowerCase()}%`})
        }
        if (filter.ageMin && filter.ageMin !== 0) {
            query.andWhere("age >= :ageMin", {ageMin: `${filter.ageMin}`})
        }
        if (filter.ageMax && filter.ageMax !== 0) {
            query.andWhere("age <= :ageMax", {
                ageMax: `${filter.ageMax < filter.ageMin
                    ? filter.ageMin
                    : filter.ageMax}`
            })
        }
        if (filter.city && filter.city !== "") {
            query.andWhere("city_were_found = :city", {city: `${filter.city}`})
        }
        if (filter.gender && filter.gender !== "") {
            query.andWhere("gender = :gender", {gender: `${filter.gender}`})
        }

        return from(query.getMany());
    }

    findById(id: number): Observable<ProfileModel> {
        return from(this.profileRepository.createQueryBuilder("profiles")
            .andWhere("id = :id", {id: `${id}`})
            .getOne())
    }
}
