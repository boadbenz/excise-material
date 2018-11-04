import { Injectable } from "@angular/core";
import { appConfig } from "app/app.config";
import { HttpService } from "app/core/http.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ArrestNoticeService {

    constructor(private http: HttpService,
        private httpClient: HttpClient
    ) { }

    private httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json'
            })
    };
    
    ArrestNoticegetByKeyword(Textsearch: any) {
        const params = Textsearch === '' ? { 'Textsearch': '' } : Textsearch;
        const url = `${appConfig.api7788}/ArrestNoticegetByKeyword`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestNoticegetByConAdv(form: any) {
        const params = form;
        const url = `${appConfig.api7788}/ArrestNoticegetByConAdv`;
        return this.http.post(url, params).map(x => x.json());
    }

    async ArrestNoticeupdByCon(ArrestCode: string, NoticeCode: string) {
        const params = { NoticeCode, ArrestCode };
        const url = `${appConfig.api7788}/ArrestNoticeupdByCon`;
        return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }

    async ArrestNoticeupdDelete(NoticeCode: string) {
        const params = { NoticeCode };
        const url = `${appConfig.api7788}/ArrestNoticeupdDelete`;
        return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }
}