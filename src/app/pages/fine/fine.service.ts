import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ICompareDetail, CompareStation } from './fine-model';
import { Compare } from './compare';
import { CompareDetail } from './compareDetail';
import { appConfig } from '../../app.config';
import { Arrest } from '../model/arrest';
import { Lawsuit } from '../model/lawsuit-model';
import { GuiltBase } from '../model/guiltBase-model';
import { ICompareIns, ICompareMistreat, IRateMistreat } from './condition-model';

@Injectable()
export class FineService {

    constructor(private http: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json'
            })
    };


    getByKeyword(Textsearch: string) {
        const params = Textsearch;
        const url = `${appConfig.api8881}/ComparegetByKeyword`;
        return this.http.post<Compare[]>(url, params, this.httpOptions);
    }

    // getByCon(form: any) {
    //     const params = JSON.stringify(form);
    //     const url = `${appConfig.api8881}/ComparegetByCon`;
    //     return this.http.post<Compare[]>(url, params, this.httpOptions);
    // }
    async getByCon(CompareID: string): Promise<any> {
        const params = { CompareID };
        const url = `${appConfig.api8881}/ComparegetByCon`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res;
        } catch (error) {
            await alert(error);
        }
    }


    async getByConAdv(form: any): Promise<any> {
        const params = JSON.stringify(form);
        const url = `${appConfig.api8881}/ComparegetByConAdv`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res as any;
        } catch (error) {
            await alert(error);
        }
    }


    async getByArrestCon(ArrestCode: string): Promise<Arrest> {
        const params = { ArrestCode };
        const url = `${appConfig.api7788}/ArrestgetByCon`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res.ResponseData as Arrest;
        } catch (error) {
            await alert(error);
        }
    }

    async getByDoc(ReferenceCode: string): Promise<Arrest> {
        const params = { ReferenceCode };
        const url = `${appConfig.api8881}/CompareDocumentgetByCon`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res.ResponseData as Arrest;
        } catch (error) {
            await alert(error);
        }
    }

    async LawsuitegetByCon(LawsuitID: string): Promise<Lawsuit> {
        const params = { LawsuitID };
        const url = `${appConfig.api8083}/LawsuitgetByCon`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res.ResponseData as Lawsuit;
        } catch (error) {
            await alert(error);
        }
    }

    async MistreatgetByCon(Misterat: ICompareMistreat): Promise<any> {
        const params = JSON.stringify(Misterat);
        const url = `${appConfig.api8881}/CompareCountMistreatgetByCon`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res;
        } catch (error) {
            await alert(error);
        }
    }

    async RateMistreatgetByCon(Misterat: IRateMistreat): Promise<any> {
        const params = JSON.stringify(Misterat);
        const url = `${appConfig.api8881}/CompareCountRateMistreatgetByCon`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res;
        } catch (error) {
            await alert(error);
        }
    }


    async DivisionRategetByCon(): Promise<any> {
        const params = {};
        const url = `${appConfig.api8881}/CompareMasDivisionRategetByCon`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res;
        } catch (error) {
            await alert(error);
        }
    }

    async insAll(Compare: ICompareIns): Promise<any> {
        const params = Compare;
        const url = `${appConfig.api8881}/CompareinsAll`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res;
        } catch (error) {
            await alert(error);
        }
    }

    async CompareupdByCon(oCompare: Compare): Promise<any> {
        const params = JSON.stringify(oCompare);
        const url = `${appConfig.api8881}/CompareupdByCon`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res;
        } catch (error) {
            await alert(error);
        }
    }

    async insDetailAll(Compare: CompareDetail): Promise<any> {
        debugger
        const params = JSON.stringify(Compare);
        const url = `${appConfig.api8881}/CompareDetailinsAll`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res;
        } catch (error) {
            await alert(error);
        }
    }

    async updDetailAll(Compare: CompareDetail): Promise<any> {
        const params = JSON.stringify(Compare);
        const url = `${appConfig.api8881}/CompareDetailupdByCon`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res;
        } catch (error) {
            await alert(error);
        }
    }

    async getStation(): Promise<any> {
        debugger
        const params = {};
        const url = `${appConfig.api8881}/CompareMasOfficegetByKeyword`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res;
        } catch (error) {
            await alert(error);
        }
    }

    async getStaff(Textsearch: string): Promise<any> {
        const params = { Textsearch };
        const url = `${appConfig.api8881}/CompareMasStaffgetByKeyword`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res;
        } catch (error) {
            await alert(error);
        }
    }

    masOfficegetAll(): Promise<any[]> {
        const url = `${appConfig.api7788}/ArrestgetMasOfficegetAll`;
        return this.resposePromisGetList('{}', url);
    }

    private async resposePromisGetList(params: string, url: string) {
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (res.IsSuccess === false) {
            return [];
        }
        if (!res.ResponseData.length) {
            return []
        }
        return res.ResponseData
    }

}