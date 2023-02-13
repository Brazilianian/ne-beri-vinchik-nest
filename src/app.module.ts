import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as process from "process";
import {ProfileModule} from "./profile/profile.module";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(<string>process.env.POSTGRES_PORT),
            username: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            autoLoadEntities: true,
            synchronize: true
        }),
        ProfileModule
    ],
})
export class AppModule {
}
