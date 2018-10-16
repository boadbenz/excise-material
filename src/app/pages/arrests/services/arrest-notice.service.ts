import { Injectable } from "@angular/core";
import { appConfig } from "app/app.config";
import { HttpService } from "app/core/http.service";

@Injectable()
export class ArrestNoticeService {

    constructor(private http: HttpService) { }

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

    ArrestNoticeupdByCon(ArrestCode: string, NoticeCode: string) {
        const params = { NoticeCode, ArrestCode };
        const url = `${appConfig.api7788}/ArrestNoticeupdByCon`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestNoticeupdDelete(NoticeCode: string) {
        const params = { NoticeCode };
        const url = `${appConfig.api7788}/ArrestNoticeupdDelete`;
        return this.http.post(url, params).map(x => x.json());
    }
}