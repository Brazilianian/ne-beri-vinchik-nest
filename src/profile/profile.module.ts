import {Module} from "@nestjs/common";
import {ProfileService} from "./profile.service";
import {ProfileController} from "./profile.controller";
import {TypeOrmModule} from "@nestjs/typeorm";

import { ProfileEntity } from "./models/profile.entity";
import {ConfigModule} from "@nestjs/config";
import {ProfileResolver} from "./profile.resolver";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forFeature([ProfileEntity])
    ],
    controllers: [ProfileController],
    providers: [ProfileService, ProfileResolver]
})

export class ProfileModule {}