import {Timestamp} from "typeorm";

export interface ProfileModel {
    id?: number;
    name?: string;
    description?:string;
    age?: number;
    city?: string;
    cityWereFound?: string;
    gender?: string;
    tgLink?: string;
    instLink?: string;
    date?: Timestamp;
    last_modified?: Timestamp;
}