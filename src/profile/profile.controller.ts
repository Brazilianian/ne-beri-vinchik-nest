import {Controller, Get, Param, Req} from '@nestjs/common';
import {ProfileService} from './profile.service';
import {Observable} from "rxjs";
import {ProfileModule} from "./profile.module";
import {Request} from "express";

@Controller()
export class ProfileController {
    constructor(private readonly profilesService: ProfileService) {
    }

    @Get("/profiles")
    getProfiles(@Req() request: Request): Observable<ProfileModule[]> {
        return this.profilesService.findAll(request.query);
    }

    @Get("/profiles/:id")
    getProfileById(@Param('id') id: number): ProfileModule {
        return this.profilesService.findById(id);
    }

    @Get("/test")
    test(): string {
        return "test"
    }
}
