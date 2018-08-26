import { Injectable, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Notice } from './notice';
import { NoticeProduct } from './notice-product';
import { Observable } from 'rxjs/Observable';
import { Http, } from '@angular/http';
import { Message } from '../../config/message';
import { NoticeDocument } from './notice-document';
import { Lawbreaker } from './lawbreaker/lawbreaker.interface';
import { Suspect } from './suspect/suspect.interface';

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

    private async responsePromisModify(params: string, url: string) {
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (res.IsSuccess === false) {
            return false;
        }
        return res.IsSuccess
    }

    private async resposePromisGet(params: string, url: string) {
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (res.IsSuccess === false) {
            return [];
        }
        if (!res.ResponseData.length) {
            return []
        }
        return res.ResponseData
    }

    async getByKeywordOnInt(): Promise<Notice[]> {
        const params = { 'Textsearch': '' };
        const url = `${appConfig.api8082}/NoticegetByKeyword`;
        return this.resposePromisGet(JSON.stringify(params), url);
    }

    getByKeyword(Textsearch: any): Promise<Notice[]> {
        const params = Textsearch === '' ? { 'Textsearch': '' } : Textsearch;
        const url = `${appConfig.api8082}/NoticegetByKeyword`;
        return this.resposePromisGet(JSON.stringify(params), url)
    }

    getByConAdv(form: any): Promise<Notice[]> {
        const url = `${appConfig.api8082}/NoticegetByConAdv`;
        return this.resposePromisGet(JSON.stringify(form), url)
    }

    async getByCon(NoticeCode: string): Promise<Notice> {
        const params = { NoticeCode };
        const url = `${appConfig.api8082}/NoticegetByCon`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (res.IsSuccess === false) {
            return new Notice();
        }
        if (!res.ResponseData) {
            return new Notice()
        }
        return res.ResponseData 
    }

    async getLawbreakerByCon(LawbreakerID: string): Promise<Lawbreaker> {
        const params = { LawbreakerID };
        const url = `${appConfig.api7788}/ArrestLawbreakergetByCon`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (res.IsSuccess === false || !res.ResponseData) {
            return new Lawbreaker();
        }
        return res.ResponseData;
    }

    async getSuspectByCon(SuspectID: string): Promise<Suspect> {
        const params = { SuspectID };
        const url = `${appConfig.api8082}/NoticeSuspectgetByCon`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (res.IsSuccess === false || !res.ResponseData) {
            return new Suspect();
        }
        return res.ResponseData;
    }

    insAll(Notice: Notice): Promise<any> {
        const params = Notice;
        const url = `${appConfig.api8082}/NoticeinsAll`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }

    updLawbreaker(lawbreaker: Lawbreaker): Promise<boolean> {
        const params = lawbreaker;
        const url = `${appConfig.api7788}/ArrestLawbreakerupdByCon`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }

    updSuspect(suspect: Suspect): Promise<boolean> {
        const params = suspect;
        const url = `${appConfig.api8082}/SuspectupdByCon`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }

    updByCon(Notice: Notice): Promise<any> {
        const params = Notice;
        const url = `${appConfig.api8082}/NoticeupdByCon`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }

    async updDelete(NoticeCode: string): Promise<any> {
        const params = { NoticeCode };
        const url = `${appConfig.api8082}/NoticeupdDelete`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (!res.IsSuccess) {
            return false;
        }
        return res.IsSuccess
    }

    async productupdDelete(ProductID: string): Promise<any> {
        const params = { ProductID };
        const url = `${appConfig.api8082}/NoticeproductupdDelete`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (!res.IsSuccess) {
            return false;
        }
        return res.IsSuccess
    }

    async staffupdDelete(StaffID: string): Promise<any> {
        const params = { StaffID };
        const url = `${appConfig.api8082}/NoticeStaffupdDelete`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (!res.IsSuccess) {
            return false;
        }
        return res.IsSuccess
    }

    async informerupdDelete(InformerID: string): Promise<any> {
        const params = { InformerID };
        const url = `${appConfig.api8082}/NoticeInformerupdDelete`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (!res.IsSuccess) {
            return false;
        }
        return res.IsSuccess
    }

    async localeupdDelete(LocaleID: string): Promise<any> {
        const params = { LocaleID };
        const url = `${appConfig.api8082}/NoticeLocaleupdDelete`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (!res.IsSuccess) {
            return false;
        }
        return res.IsSuccess
    }

    async suspectupdDelete(SuspectID: string): Promise<any> {
        const params = { SuspectID };
        const url = `${appConfig.api8082}/NoticeSuspectupdDelete`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        debugger
        if (!res.IsSuccess) {
            return false;
        }
        return res.IsSuccess
    }

    async getDocument(ReferenceCode: string): Promise<NoticeDocument[]> {
        const params = { ReferenceCode };
        const url = `${appConfig.api8883}/DocumentRequestgetByCon`;
        const res = await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
        if (!res.length) {
            return new Array<NoticeDocument>()
        }
        return res;
    }

    async insDocument(document: NoticeDocument): Promise<any> {
        const params = document;
        const url = `${appConfig.api8883}/DocumentRequestinsAll`;
        return await this.responsePromisModify(JSON.stringify(params), url);
    }

    async updDocument(document: NoticeDocument): Promise<any> {
        const params = document;
        const url = `${appConfig.api8882}/DocumentupdByCon`;
        const res = await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
        if (!res.IsSuccess) {
            return false;
        }
        return true;
    }

    async documentUpDelete(DocumentID: string): Promise<any> {
        const params = { DocumentID };
        const url = `${appConfig.api8882}/DocumentupdDelete`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (!res.IsSuccess) {
            return false;
        }
        return true;
    }
}
