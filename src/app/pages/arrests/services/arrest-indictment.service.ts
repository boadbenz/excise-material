import { Injectable } from "@angular/core";
import { HttpService } from "app/core/http.service";
import { appConfig } from "app/app.config";
import { ArrestIndictment } from "../models/arrest-indictment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ArrestIndictmentService {

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

    private async resposePromisGetList(params: string, url: string) {
        const res = await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
        if (!res.length || res.IsSuccess == 'False') {
            return [];
        }
        return res
    }

    ArrestIndictmentgetByArrestCode(ArrestCode: string) {
        const params = { ArrestCode };
        const url = `${appConfig.api7788}/ArrestIndictmentgetByArrestCode`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestIndictmentgetByCon(IndictmentID: string) {
        const params = { IndictmentID };
        const url = `${appConfig.api7788}/ArrestIndictmentgetByCon`;
        return this.resposePromisGetList(JSON.stringify(params), url);
    }

    async ArrestIndictmentinsAll(Indictment: ArrestIndictment) {
        const params = Indictment;
        const url = `${appConfig.api7788}/ArrestIndictmentinsAll`;
        return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }

    async ArrestIndictmentupdByCon(Indictment: ArrestIndictment) {
        const params = Indictment;
        const url = `${appConfig.api7788}/ArrestIndictmentupdByCon`;
        return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }

    async ArrestIndictmentupdDelete(IndictmentID: string) {
        const params = { IndictmentID };
        const url = `${appConfig.api7788}/ArrestIndictmentupdByCon`;
        return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }
}