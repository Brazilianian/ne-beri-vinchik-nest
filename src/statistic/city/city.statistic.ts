import {Cities} from "../../city/cities";
import {StatisticAge} from "../age/age.statistic";


export class StatisticCity {
    city: Cities;
    total: number;
    male: number;
    female: number;
    statisticAges: Array<StatisticAge> = [];
}