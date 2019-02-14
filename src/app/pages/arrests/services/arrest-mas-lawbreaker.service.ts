import { Injectable } from "@angular/core";
import { HttpService } from "app/core/http.service";
import { appConfig } from "app/app.config";
import { ArrestLawbreaker } from "../models/arrest-lawbreaker";

@Injectable()
export class ArrestMasLawbreakerService {

    constructor(private http: HttpService) { }

    ArrestMasLawbreakergetByKeyword(Textsearch: any) {
        const params = Textsearch === '' ? { 'Textsearch': '' } : Textsearch;
        const url = `${appConfig.api7788}/ArrestMasLawbreakergetByKeyword`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestMasLawbreakergetByConAdv(form: any) {
        const params = form;
        const url = `${appConfig.api7788}/ArrestMasLawbreakergetByConAdv`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestMasLawbreakergetByCon(LawbreakerID: string) {
        const params = { LawbreakerID };
        const url = `${appConfig.api7788}/ArrestMasLawbreakergetByCon`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestMasLawbreakerinsAll(Lawbreaker: ArrestLawbreaker) {
        const params = Lawbreaker;
        const url = `${appConfig.api7788}/ArrestMasLawbreakerinsAll`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestMasLawbreakerupdByCon(Lawbreaker: ArrestLawbreaker) {
        const params = Lawbreaker;
        const url = `${appConfig.api7788}/ArrestMasLawbreakerupdByCon`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestLawsuitResultCountgetByLawbreakerID(LawbreakerID: string) {
        const params = { LawbreakerID };
        const url = `${appConfig.api7788}/ArrestLawsuitResultCountgetByLawbreakerID`;
        return this.http.post(url, params).map(x => x.json()[0].ResultCount);
    }
}