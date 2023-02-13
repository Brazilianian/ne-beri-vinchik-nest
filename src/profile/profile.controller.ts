import {Body, Controller, Get, Param} from '@nestjs/common';
import { ProfileService } from './profile.service';
import {Observable} from "rxjs";
import {ProfileModule} from "./profile.module";
import {Filter} from "../filter/filter";

@Controller()
export class ProfileController {
  constructor(private readonly profilesService: ProfileService) {}

  @Get("/profiles")
  getProfiles(@Body() filter: Filter): Observable<ProfileModule[]> {
    return this.profilesService.findAll(filter);
  }

  @Get("/profiles/:id")
  getProfileById(@Param('id') id: number): ProfileModule {
    return this.profilesService.findById(id);
  }
}
