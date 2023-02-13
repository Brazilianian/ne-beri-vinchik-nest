import {Controller, Get} from "@nestjs/common";
import {FilterService} from "./filter.service";

@Controller()
export class FilterController {
    constructor(private readonly filterService: FilterService) {
    }

    @Get("/cities")
    getCities(){
        return this.filterService.getCities()
    }

    @Get("/genders")
    getGenders() {
        return this.filterService.getGenders();
    }
}