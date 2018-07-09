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

    async getByKeyword(Textsearch: any): Promise<Notice[]> {
        const params = Textsearch;
        const url = `${appConfig.api8082}/NoticegetByKeyword`;
        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            if (res.IsSuccess === false) {
                alert(res.ResponseData.Msg);
                return [];
            }
            return res.ResponseData as Notice[];
        } catch (error) {
            alert(error.message);
        }
    }

    async getByConAdv(form: any): Promise<Notice[]> {
        const params = JSON.stringify(form);
        const url = `${appConfig.api8082}/NoticegetByConAdv`;
        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            if (res.IsSuccess === false) {
                alert(res.ResponseData.Msg);
                return [];
            }
            return res.ResponseData as Notice[];
        } catch (error) {
            alert(error.message);
        }
    }

}
