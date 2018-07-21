import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Investigate } from './investigate';
import { InvestigateDetail } from './investigate-detail';

@Injectable()
export class InvestigateService {

    constructor(private http: HttpClient) { }

    // tslint:disable-next-line:member-ordering
    private httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json'
            })
    };

    getByKeyword(Textsearch: string) {
        const params = Textsearch;
        const url = `${appConfig.apiUrl}/InvestigategetByKeyword`;
        return this.http.post<Investigate[]>(url, params, this.httpOptions);
    }

    getByCon(InvestigateCode: string) {
        const params = { InvestigateCode };
        const url = `${appConfig.apiUrl}/InvestigategetByCon`;
        return this.http.post<Investigate>(url, params, this.httpOptions);
    }

    getByConAdv(form: any) {

        const params = JSON.stringify(form);
        const url = `${appConfig.apiUrl}/InvestigategetByConAdv`;
        return this.http.post<Investigate[]>(url, params, this.httpOptions);
    }

    detailGetByCon(InvestigateCode: string) {
        const params = { InvestigateCode };
        const url = `${appConfig.apiUrl}/InvestigateDetailgetByCon`;
        return this.http.post<InvestigateDetail[]>(url, params, this.httpOptions);
    }

    updByCon(investigate: Investigate) {
        const params = investigate;
        const url = `${appConfig.apiUrl}/InvestigateupdByCon`;
        return this.http.post<any>(url, params, this.httpOptions);
    }

    updDelete(InvestigateCode: string) {
        const params = { InvestigateCode };
        const url = `${appConfig.apiUrl}/InvestigateupdDelete`;
        return this.http.post<any>(url, params, this.httpOptions);
    }

    insAll(investigate: Investigate) {
        const params = investigate;
        const url = `${appConfig.apiUrl}/InvestigateinsAll`;
        return this.http.post<any>(url, params, this.httpOptions);
    }
}
