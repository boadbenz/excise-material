import { Injectable, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Notice } from './notice';

const options = { year: 'numeric', month: 'short', day: 'numeric' };

@Injectable()
export class NoticeService {

    constructor(private http: HttpClient) { }

    // tslint:disable-next-line:member-ordering
    private httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json'
            })
    };

    getByKeyword(Textsearch: any) {
        const params = Textsearch;
        const url = `${appConfig.apiUrl}/NoticegetbyKeyword`;
        return this.http.post<Notice[]>(url, params, this.httpOptions);
    }

    getByConAdv(form: any) {
        const params = JSON.stringify(form);
        const url = `${appConfig.apiUrl}/NoticegetByConAdv`;
        return this.http.post<Notice[]>(url, params, this.httpOptions);
    }

}
