import {Controller, Get, Post} from "@nestjs/common";
import {StatisticService} from "./statistic.service";
import {Statistic} from "./statistic";

@Controller()
export class StatisticController {
    constructor(
        private readonly statisticService :StatisticService
    ) {
    }

    @Get('/statistic')
    getStatistic(): Array<Statistic> {
        return this.statisticService.getStatistics();
    }
}