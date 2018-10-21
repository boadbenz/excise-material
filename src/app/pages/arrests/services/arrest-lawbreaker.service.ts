import { Injectable } from "@angular/core";
import { HttpService } from "app/core/http.service";
import { ArrestLawbreaker } from "../models/arrest-lawbreaker";
import { appConfig } from "app/app.config";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable() 
export class ArrestLawbreakerService {

    constructor(
        private http: HttpService,
        private httpClient: HttpClient
    ) { }

    private httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json'
            })
    };

    ArrestLawbreakerinsAll(ArrestLawbreaker: ArrestLawbreaker){
        const params = ArrestLawbreaker;
        const url = `${appConfig.api7788}/ArrestLawbreakerinsAll`;
        return this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
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