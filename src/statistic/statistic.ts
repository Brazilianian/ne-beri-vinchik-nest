import {StatisticCity} from "./city/city.statistic";

export class Statistic {
    date: Date;

    total: number;
    male: number;
    female: number;

    cities: Array<string> = [];
    ages: Array<number> = [];

    statisticCities: Array<StatisticCity> = [];

    constructor() {
        this.date = new Date();
    }
}
