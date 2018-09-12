import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Injectable } from '@angular/core';

@Injectable()
export class ReductionService {
    private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) { }

    async getReductionList(data): Promise<any> {
        const param = data ? data : {};
        const url = `${appConfig.api8085}/AdjustComparegetByConAdv`;
        return await this.http.post<any>(url, JSON.stringify(param), this.httpOptions).toPromise();
    }

    async getReductionBySearch(Textsearch): Promise<any> {
        const params = Textsearch.Textsearch == null ? { 'Textsearch': '' } : Textsearch;
        const url = `${appConfig.api8085}/AdjustComparegetByKeyword`;
        return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
    }

    async LawsuiltgetByCon(data): Promise<any> {
        const params = data ? { LawsuitID: data } : {};
        const url = `${appConfig.api8083}/LawsuitgetByCon`;
        return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
    }
    // ding Data)
    // 2.1) http://{hostname}/XCS60/AdjustCompareFindNoticegetC
    // on(String “ArrestCode”)

    async ArrestgetByCon(data): Promise<any> {
        const params = data ? { ArrestCode: data } : {};
        const url = `${appConfig.api7788}/ArrestgetByCon`;
        return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
    }

    async AdjustComparegetByCon(data): Promise<any> {
        const params = data ? { CompareID: data } : {};
        const url = `${appConfig.api8085}/AdjustComparegetByCon`;
        return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
    }

    async AdjustCompareMasLawgetByConAdv(data): Promise<any> {
        const params = data ? { GuiltBaseID: data } : {};
        const url = `${appConfig.api8085}/AdjustCompareMasLawgetByConAdv`;
        return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
    }

    async AdjustCompareDocumentgetByCon(data): Promise<any> {
        const params = data ? { ReferenceCode: data } : {};
        const url = `${appConfig.api8085}/AdjustCompareDocumentgetByCon`;
        return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
    }

    //AdjustCompareDocumentgetByCon
}
