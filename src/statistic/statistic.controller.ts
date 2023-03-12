import {Controller, Get} from "@nestjs/common";
import {StatisticService} from "./statistic.service";
import {Observable} from "rxjs";

@Controller()
export class StatisticController {
    constructor(
        private readonly statisticService: StatisticService
    ) {
    }

    @Get('/statistic')
    getStatistic(): Observable<any> {
        return this.statisticService.getStatistics();
    }

    // @Post("/statistic")
    // updateStatistic(): void {
    //     this.statisticService.statisticScheduler();
    // }
}