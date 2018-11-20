import { Injectable } from "@angular/core";
import { appConfig } from "app/app.config";
import { Arrest } from "../models/arrest";
import { HttpService } from "app/core/http.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ArrestService {

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

    ArrestReportgetByCon(ArrestCode: string) {
        const params = { ArrestCode };
        const url = `${appConfig.apiReport}/ArrestgetByCon.aspx`;
        return this.http.post(url, params).map(x => x);
    }

    ArrestgetByKeyword(Textsearch: any) {
        const params = Textsearch === '' ? { 'Textsearch': '' } : Textsearch;
        const url = `${appConfig.api7788}/ArrestgetByKeyword`;
        return this.http.post(url, params).map(x => x.json());
    }

    async ArrestgetByCon(ArrestCode: string) {
        const params = { ArrestCode };
        const url = `${appConfig.api7788}/ArrestgetByCon`;
        return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }

    ArrestgetByConAdv(form: any) {
        const params = form;
        const url = `${appConfig.api7788}/ArrestgetByConAdv`;
        return this.http.post(url, params).map(x => x.json());
    }

    async ArrestinsAll(Arrest: any) {
        const params = Arrest;
        const url = `${appConfig.api7788}/ArrestinsAll`;
        return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }

    async ArrestupdByCon(Arrest: any) {
        const params = Arrest;
        const url = `${appConfig.api7788}/ArrestupdByCon`;
        return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }

    async ArrestupdDelete(ArrestCode: string) {
        const params = { ArrestCode };
        const url = `${appConfig.api7788}/ArrestupdDelete`;
        return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }
}