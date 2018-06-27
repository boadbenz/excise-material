import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { InvestigateList } from './investigate-list';

@Injectable()
export class InvestigateService {

    constructor(private http: HttpClient) { }

    // private httpOptions = {
    //     headers: new HttpHeaders(
    //         {
    //             'Content-Type': 'application/json'
    //         })
    // };

    getByKeyword(Textsearch: string) {
        const params = { Textsearch };
        const url = `${appConfig.apiUrl}/InvestigategetByKeyword`;
        this.http.post<InvestigateList>(url, params);
    }

}
