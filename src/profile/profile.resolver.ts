import {Query, Resolver} from "@nestjs/graphql";
import {ProfileService} from "./profile.service";

@Resolver()
export class ProfileResolver {

    @Query(() => String)
    test(): string {
        return "Hello"
    }
}