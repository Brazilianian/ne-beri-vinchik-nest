import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {StatisticService} from "./statistic.service";
import {StatisticGrabber} from "./statistic.grabber";
import {StatisticController} from "./statistic.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProfileEntity} from "../profile/models/profile.entity";
import {StatisticMapper} from "./statistic.mapper";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forFeature([ProfileEntity]),

    ],
    controllers: [StatisticController],
    providers: [StatisticService, StatisticGrabber, StatisticMapper]

})

export class StatisticModule {
}