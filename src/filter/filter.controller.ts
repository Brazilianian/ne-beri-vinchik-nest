import {Controller, Get} from "@nestjs/common";
import {FilterService} from "./filter.service";

@Controller()
export class FilterController {
    constructor(private readonly filterService: FilterService) {
    }

    @Get("/cities")
    getCities(): Map<string, string> {
        return this.filterService.getCities();
    }

    @Get("/genders")
    getGenders(): Map<string, string> {
        return this.filterService.getGenders();
    }
}