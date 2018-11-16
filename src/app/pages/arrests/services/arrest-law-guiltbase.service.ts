import { Injectable } from "@angular/core";
import { HttpService } from "app/core/http.service";
import { appConfig } from "app/app.config";

@Injectable() 
export class ArrestLawGuiltbaseService {

    constructor(private http: HttpService) { }

    ArrestLawGuiltbasegetByKeyword(Textsearch: any) {
        const params = Textsearch === '' ? { 'Textsearch': '' } : Textsearch;
        const url = `${appConfig.api7788}/ArrestLawGuiltbasegetByKeyword`;
        return this.http.post(url, params).map(x => x.json());
    }

}