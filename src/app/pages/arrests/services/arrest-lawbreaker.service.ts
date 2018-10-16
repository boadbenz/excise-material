import { Injectable } from "@angular/core";
import { HttpService } from "app/core/http.service";
import { ArrestLawbreaker } from "../models/arrest-lawbreaker";
import { appConfig } from "app/app.config";

@Injectable() 
export class ArrestLawbreakerService {

    constructor(private http: HttpService) { }

    ArrestLawbreakerinsAll(ArrestLawbreaker: ArrestLawbreaker){
        const params = ArrestLawbreaker;
        const url = `${appConfig.api7788}/ArrestLawbreakerinsAll`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestLawbreakerupdByCon(ArrestLawbreaker: ArrestLawbreaker){
        const params = ArrestLawbreaker;
        const url = `${appConfig.api7788}/ArrestLawbreakerupdByCon`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestLawbreakerupdDelete(LawbreakerID: string) {
        const params = { LawbreakerID };
        const url = `${appConfig.api7788}/ArrestLawbreakerupdDelete`;
        return this.http.post(url, params).map(x => x.json());
    }
}