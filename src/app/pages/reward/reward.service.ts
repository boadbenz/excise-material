import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reward } from './reward';

const HOSTNAME = '';

@Injectable()
export class RewardService {

    constructor(private httpClient: HttpClient) { }

    getArrestRequestgetByKeyword(text: string) {
        return this.httpClient.post(`${HOSTNAME}/ArrestRequestgetByKeyword`, text)
    }

    getMasStaffRequestgetByKeyword(text: string) {
        return this.httpClient.post(`${HOSTNAME}/MasStaffRequestgetByKeyword`, text)
    }

    getMasDepartmentRequestgetByKeyword(text: string) {
        return this.httpClient.post(`${HOSTNAME}/MasDepartmentRequestgetByKeyword`, text)
    }

    getArrestRequestgetByConAdv(reward: Reward) {
        return this.httpClient.post(`${HOSTNAME}/MasDepartmentRequestgetByKeyword`, reward)
    }

    getArrestRequestgetByCon(arrestCode: string) {
        return this.httpClient.post(`${HOSTNAME}/ArrestRequestgetByCon`, arrestCode)
    }

    getRequestbribegetByKeyword(textSearch: string) {
        return this.httpClient.post(`${HOSTNAME}/RequestbribegetByKeyword`, textSearch)
    }

    getRequestbribegetByCon(requestBribeCode: string) {
        return this.httpClient.post(`${HOSTNAME}/RequestbribegetByCon`, requestBribeCode)
    }
}
