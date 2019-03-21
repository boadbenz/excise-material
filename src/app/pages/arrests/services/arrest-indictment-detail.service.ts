import { Injectable } from "@angular/core";
import { appConfig } from "app/app.config";
import { HttpService } from "app/core/http.service";
import { ArrestIndictmentDetail } from "../models/arrest-indictment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable() 
export class ArrestIndictmentDetailService {

    constructor(
        private http: HttpService,
        private httpClient :HttpClient
        ) { }

    private httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json'
            })
    };

    ArrestIndicmentDetailgetByIndictmentID(IndictmentID: string){
        const params = { IndictmentID };
        const url = `${appConfig.api7788}/ArrestIndicmentDetailgetByIndictmentID`;
        return this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }

    ArrestIndicmentDetailgetByCon(IndictmentDetailID: string) {
        const params = { IndictmentDetailID };
        const url = `${appConfig.api7788}/ArrestIndicmentDetailgetByCon`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestIndicmentDetailinsAll(IndictmentDetail: any) {
        const params = IndictmentDetail;
        const url = `${appConfig.api7788}/ArrestIndicmentDetailinsAll`;
        return this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }

    ArrestIndicmentDetailupdByCon(IndictmentDetail: any) {
        const params = IndictmentDetail;
        const url = `${appConfig.api7788}/ArrestIndicmentDetailupdByCon`;
        return this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }

    ArrestIndicmentDetailupdDelete(IndictmentDetailID: string) {
        const params = { IndictmentDetailID };
        const url = `${appConfig.api7788}/ArrestIndicmentDetailupdDelete`;
        return this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }
}