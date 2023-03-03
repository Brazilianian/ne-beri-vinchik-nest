import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as process from "process";
import {ProfileModule} from "./profile/profile.module";
import {FilterModule} from "./filter/filter.module";
import {StatisticModule} from "./statistic/statistic.module";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        ScheduleModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(<string>process.env.POSTGRES_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            synchronize: true
        }),
        ProfileModule,
        FilterModule,
        StatisticModule,
    ],
})
export class AppModule {
}
