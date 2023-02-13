import {Injectable} from "@nestjs/common";
import {Genders} from "../gender/genders";
import {Cities} from "../city/cities";

@Injectable()
export class FilterService {
    getGenders() {
        return Object.keys(Genders)
            .map(key => ({ key: key, name: Genders[key] }))
    }

    getCities() {
        return Object.keys(Cities)
            .map(key => ({ key: key, name: Cities[key] }))
    }
}