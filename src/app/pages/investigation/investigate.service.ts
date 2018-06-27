import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { InvestigateList } from './investigate-list';

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
        return this.http.post<InvestigateList[]>(url, params, this.httpOptions);
    }

    getByInvestigateCode(Textsearch: string) {
        const params = { Textsearch };
        const url = `${appConfig.apiUrl}/InvestigategetByKeyword`;
        return this.http.post<InvestigateList>(url, params, this.httpOptions);
    }

}
