import {Injectable} from "@nestjs/common";
import {Genders} from "../gender/genders";
import {Cities} from "../city/cities";

@Injectable()
export class FilterService {
    getGenders() {
        let genders = new Map();
        for (let key in Genders) {
            genders.set(key, genders[key]);
        }
        return genders;
    }

    getCities() {
        let cities = new Map();
        for (let key in Cities) {
            cities.set(key, cities[key]);
        }
        return cities;
    }
}