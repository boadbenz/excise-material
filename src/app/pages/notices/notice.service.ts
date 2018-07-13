import { Injectable, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Notice } from './notice';
import { NoticeProduct } from './notice-product';
import { Observable } from 'rxjs/Observable';
import { Http, } from '@angular/http';

const options = { year: 'numeric', month: 'short', day: 'numeric' };

@Injectable()
export class NoticeService {

    constructor(
        private http: HttpClient,
        private _http: Http
    ) { }

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

<<<<<<< HEAD
    getByConAdv(form: any) {
=======
    productgetByKeyword(Textsearch: string) {
        if (Textsearch === '') {
            return Observable.of([]);
        }

        const params = { Textsearch };
        const url = `${appConfig.api8082}/NoticeProductgetByKeyword`;
        return this.http.post<any>(url, params, this.httpOptions)
            .map(res => {
                if (res.IsSuccess === false) {
                    return Observable.of([]);
                }
                return res.ResponseData;
            })
    }

    async getByConAdv(form: any): Promise<Notice[]> {
>>>>>>> origin/FL_J
        const params = JSON.stringify(form);
        const url = `${appConfig.apiUrl}/NoticegetByConAdv`;
        return this.http.post<Notice[]>(url, params, this.httpOptions);
    }

}
