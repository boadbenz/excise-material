import { NoticeProduct } from './notice-product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Notice } from './notice';
import { Http, } from '@angular/http';
import { NoticeDocument } from './notice-document';
import { Suspect } from './suspect/suspect.interface';
import { NoticeSuspect } from './notice-suspect';

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
        if (res.IsSuccess == 'False') {
            return false;
        }
        return true;
    }

    private async resposePromisGet(params: string, url: string) {
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        
        if (res.IsSuccess == 'False' || !res.ResponseData.length) {
            return [];
        }
        return res.ResponseData
    }

    async getByKeywordOnInt(): Promise<Notice[]> {
        const params = { 'Textsearch': '' };
        const url = `${appConfig.api7788}/NoticeListgetByKeyword`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (res.IsSuccess === 'False') {
            return new Array<Notice>();
        }

        return res[0];
    }

    async getByKeyword(Textsearch: any): Promise<Notice[]> {
        // debugger
        const params = Textsearch.Textsearch == null ? { 'Textsearch': '' } : Textsearch;
        const url = `${appConfig.api7788}/NoticeListgetByKeyword`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (res.IsSuccess === 'False') {
            return new Array<Notice>();
        }

        return res;
    }

    async getByConAdv(form: any): Promise<Notice[]> {
        const url = `${appConfig.api7788}/NoticeListgetByConAdv`;
        // return this.resposePromisGet(JSON.stringify(form), url)
        const res = await this.http.post<any>(url, JSON.stringify(form), this.httpOptions).toPromise();
        if (res.IsSuccess === 'False') {
            return new Array<Notice>();
        }

        return res;
    }

    async getByCon(NoticeCode: string): Promise<Notice> {
        const params = { NoticeCode };
        const url = `${appConfig.api7788}/NoticegetByCon`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        
        if (!res) {
            return new Notice();
        }
        return res[0]; 
    }

    // async getLawbreakerByCon(LawbreakerID: string): Promise<Lawbreaker> {
    //     const params = { LawbreakerID };
    //     const url = `${appConfig.api7788}/ArrestLawbreakergetByCon`;
    //     const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
    //     const IsSuccess = new Boolean(res.IsSuccess);
    //     if (!IsSuccess || !res.ResponseData) {
    //         return new Lawbreaker();
    //     }
    //     return res.ResponseData;
    // }

    async noticeSuspectgetByCon(SuspectID: string): Promise<Suspect> {
        const params = { SuspectID };
        const url = `${appConfig.api7788}/NoticeMasSuspectgetByCon`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();

        if (res.IsSuccess == 'False') {
            return new Suspect();
        }
        return res[0];
    }

    insAll(Notice: Notice): Promise<any> {
        const params = Notice;
        const url = `${appConfig.api7788}/NoticeinsAll`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }
    insProductAll(NoticeProduct: NoticeProduct): Promise<any> {
        const params = NoticeProduct;
        const url = `${appConfig.api7788}/NoticeProductinsAll`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }

    // updLawbreaker(lawbreaker: Lawbreaker): Promise<boolean> {
    //     const params = lawbreaker;
    //     const url = `${appConfig.api7788}/ArrestLawbreakerupdByCon`;
    //     return this.responsePromisModify(JSON.stringify(params), url);
    // }

    insSuspect(suspect: NoticeSuspect): Promise<boolean> {
        const params = suspect;
        const url = `${appConfig.api7788}/NoticeSuspectinsAll`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }
    updSuspect(suspect: Suspect): Promise<boolean> {
        const params = suspect;
        const url = `${appConfig.api7788}/SuspectupdByCon`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }

    updByCon(Notice: Notice): Promise<any> {
        const params = Notice;
        const url = `${appConfig.api7788}/NoticeupdByCon`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }

    async updDelete(NoticeCode: string): Promise<any> {
        const params = { NoticeCode };
        const url = `${appConfig.api7788}/NoticeupdDelete`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }

    updProduct(NoticeProduct: NoticeProduct): Promise<any> {
        const params = NoticeProduct;
        const url = `${appConfig.api7788}/NoticeProductupdByCon`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }
    async productupdDelete(ProductID: string): Promise<any> {
        const params = { ProductID };
        const url = `${appConfig.api7788}/NoticeProductupdDelete`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }

    async staffupdDelete(StaffID: string): Promise<any> {
        const params = { StaffID };
        const url = `${appConfig.api7788}/NoticeStaffupdDelete`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }

    async informerupdDelete(InformerID: string): Promise<any> {
        const params = { InformerID };
        const url = `${appConfig.api7788}/NoticeInformerupdDelete`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }

    async localeupdDelete(LocaleID: string): Promise<any> {
        const params = { LocaleID };
        const url = `${appConfig.api7788}/NoticeLocaleupdDelete`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }

    async suspectupdDelete(SuspectID: string): Promise<any> {
        const params = { SuspectID };
        const url = `${appConfig.api7788}/NoticeSuspectupdDelete`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }

    async noticeMasSuspectinsAll(from: any): Promise<any> {
        const params = from;
        const url = `${appConfig.api7788}/NoticeMasSuspectinsAll`;

        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        // if (res) {
        //     return false;
        // }
        return res;
        // return this.responsePromisModify(JSON.stringify(params), url);
    }

    async noticeMasSuspectupdByCon(from: any): Promise<boolean> {
        const params = from;
        const url = `${appConfig.api7788}/NoticeMasSuspectupdByCon`
        return this.responsePromisModify(JSON.stringify(params), url);
    }

    // async documentRequestgetByCon(ReferenceCode: string): Promise<NoticeDocument[]> {
    //     const params = { ReferenceCode };
    //     const url = `${appConfig.api8883}/DocumentRequestgetByCon`;
    //     const res = await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
    //     if (!res.length) {
    //         return new Array<NoticeDocument>()
    //     }
    //     return res;
    // }

    // async documentRequestinsAll(document: NoticeDocument): Promise<any> {
    //     const params = document;
    //     const url = `${appConfig.api8883}/DocumentRequestinsAll`;
    //     return await this.responsePromisModify(JSON.stringify(params), url);
    // }

    async noticeDocumentinsAll(document: NoticeDocument): Promise<any> {
        const params = document;
        const url = `${appConfig.api8882}/NoticeDocumentinsAll`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }

    async noticeDocumentupd(document: NoticeDocument): Promise<any> {
        const params = document;
        const url = `${appConfig.api8882}/NoticeDocumentupd`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }

    async noticeDocumentupdDelete(DocumentID: string): Promise<any> {
        const params = { DocumentID };
        const url = `${appConfig.api8882}/NoticeDocumentupdDelete`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }

    public print(noticeCode: any){
        const params = { 'NoticeCode': noticeCode };
        const url = `${appConfig.apiReport}/NoticegetByCon.aspx`;
        return this.http.post(url, params, {...this.httpOptions, responseType: 'blob'}).map(res=>res);
    }

    
}
