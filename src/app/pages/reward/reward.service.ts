import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reward } from './reward';
import { environment } from '../../../environments/environment';
import {TextSearch} from './reward-search';
import {RewardArrest} from './reward-arrest';

const HOSTNAME = environment.hostXCS60;

@Injectable()
export class RewardService {

    constructor(private httpClient: HttpClient) { }

    getArrestRequestgetByKeyword(textSearch: string) {
        return this.httpClient.post(`${HOSTNAME}/ArrestRequestgetByKeyword`, textSearch)
    }

    getMasStaffRequestgetByKeyword(text: string) {
        const textSearch = new TextSearch();
        textSearch.Textsearch = text;
        return this.httpClient.post<any[]>(`${HOSTNAME}/MasStaffRequestgetByKeyword`, textSearch)
    }

    getMasDepartmentRequestgetByKeyword(text: string) {
        const textSearch = new TextSearch();
        textSearch.Textsearch = text;
        return this.httpClient.post<any[]>(`${HOSTNAME}/MasDepartmentRequestgetByKeyword`, textSearch)
    }

    getArrestRequestgetByConAdv(reward: Reward) {
        return this.httpClient.post<any[]>(`${HOSTNAME}/ArrestRequestgetByConAdv`, reward)
    }

    getArrestRequestgetByCon(arrestCode: string) {
        const params = {
            ArrestCode: arrestCode
        };
        return this.httpClient.post<RewardArrest>(`${HOSTNAME}/ArrestRequestgetByCon`, params)
    }

    getRequestbribegetByKeyword(text: string) {
        const textSearch = new TextSearch();
        textSearch.Textsearch = text;
        return this.httpClient.post(`${HOSTNAME}/RequestbribegetByKeyword`, textSearch)
    }

    getRequestbribegetByCon(requestBribeCode: string) {
        return this.httpClient.post(`${HOSTNAME}/RequestbribegetByCon`, requestBribeCode)
    }
}
