import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {FilterController} from "./filter.controller";
import {FilterService} from "./filter.service";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
    ],
    controllers: [FilterController],
    providers: [FilterService]
})

export class FilterModule {
}