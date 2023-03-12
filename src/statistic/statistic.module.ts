import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {StatisticService} from "./statistic.service";
import {StatisticGrabber} from "./statistic.grabber";
import {StatisticController} from "./statistic.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProfileEntity} from "../profile/models/profile.entity";
import {StatisticMapper} from "./statistic.mapper";
import {StatisticEntity} from "./statistic.entity";
import {StatisticAgeEntity} from "./age/age.statistic.entity";
import {StatisticCityEntity} from "./city/city.statistic.entity";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forFeature([ProfileEntity, StatisticEntity, StatisticCityEntity, StatisticAgeEntity]),
    ],
    controllers: [StatisticController],
    providers: [StatisticService, StatisticGrabber, StatisticMapper]

})

export class StatisticModule {
}