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
    
    ArrestgetByKeyword(Textsearch: any) {
        const params = Textsearch === '' ? { 'Textsearch': '' } : Textsearch;
        const url = `${appConfig.api7788}/ArrestgetByKeyword`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestgetByCon(ArrestCode: string) {
        const params = { ArrestCode };
        const url = `${appConfig.api7788}/ArrestgetByCon`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestgetByConAdv(form: any) {
        const params = form;
        const url = `${appConfig.api7788}/ArrestgetByConAdv`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestinsAll(Arrest: any) {
        const params = Arrest;
        const url = `${appConfig.api7788}/ArrestinsAll`;
        return this.httpClient.post<any>(url, params).toPromise();
    }

    ArrestupdByCon(Arrest: Arrest) {
        const params = Arrest;
        const url = `${appConfig.api7788}/ArrestupdByCon`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestupdDelete(ArrestCode: string){
        const params = { ArrestCode };
        const url = `${appConfig.api7788}/ArrestupdDelete`;
        return this.http.post(url, params).map(x => x.json());
    }
}