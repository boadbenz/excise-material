import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Arrest } from './arrest';
import { ArrestStaff } from './arrest-staff';
import { ArrestLawbreaker } from './arrest-lawbreaker';
import { ArrestProduct } from './arrest-product';
import { ArrestIndictment } from './arrest-indictment';
import { ProductModel } from '../../models/product.model';
import { Message } from '../../config/message';
import { Observable } from 'rxjs/Observable';

// const options = { year: 'numeric', month: 'short', day: 'numeric' };

@Injectable()
export class ArrestsService {

    constructor(private http: HttpClient) { }

    // tslint:disable-next-line:member-ordering
    private httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json'
            })
    };

    private responseList(params: string, url: string) {
        return this.http.post<any>(url, params, this.httpOptions)
            .map(res => {
                if (res.IsSuccess === false) {
                    alert(res.ResponseData.Msg);
                    return Observable.of([]);
                }

                if (!res.ResponseData.length) {
                    alert(Message.noRecord);
                    return Observable.of([]);
                }
                return res.ResponseData;
            })
    }

    private response(params: string, url: string) {
        return this.http.post<any>(url, params, this.httpOptions)
            .map(res => {
                if (res.IsSuccess === false) {
                    alert(res.ResponseData.Msg);
                    return Observable.of({});
                }

                if (!res.ResponseData.length) {
                    alert(Message.noRecord);
                    return Observable.of({});
                }
                return res.ResponseData;
            })
    }

    private async responsePromis(params: string, url: string) {
        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            if (res.IsSuccess === false) {
                alert(res.ResponseData.Msg);
                return [];
            }

            if (!res.ResponseData.length) {
                alert(Message.noRecord);
                return [];
            }

            return res.ResponseData;
        } catch (error) {
            alert(error.message);
        }
    }

    getByKeyword(Textsearch: string): Observable<Arrest[]> {
        const params = Textsearch === '' ? { 'Textsearch': '' } : Textsearch;
        const url = `${appConfig.api7788}/ArrestgetByKeyword`;
        return this.responseList(JSON.stringify(params), url);
    }

    getByConAdv(form: any): Observable<Arrest[]> {
        const params = form;
        const url = `${appConfig.api7788}/ArrestgetByConAdv`;
        return this.responseList(JSON.stringify(params), url);
    }

    getByCon(ArrestCode: string): Observable<Arrest> {
        const params = { ArrestCode };
        const url = `${appConfig.api7788}/ArrestgetByCon`;
        return this.response(JSON.stringify(params), url);
    }

    updDelete(ArrestCode: string): Observable<any> {
        const params = { ArrestCode };
        const url = `${appConfig.api7788}/ArrestupdDelete`;
        return this.response(JSON.stringify(params), url);
    }

    staffupdDelete(StaffID: string): Observable<any> {
        const params = { StaffID };
        const url = `${appConfig.api7788}/ArrestStaffupdDelete`;
        return this.response(JSON.stringify(params), url);
    }

    lawbreakerupdDelete(LawbreakerID: string): Observable<any> {
        const params = { LawbreakerID };
        const url = `${appConfig.api7788}/ArrestLawbreakerupdDelete`;
        return this.response(JSON.stringify(params), url);
    }

    productupdDelete(ProductID: string): Observable<any> {
        const params = { ProductID };
        const url = `${appConfig.api7788}/ArrestProductupdDelete`;
        return this.response(JSON.stringify(params), url);
    }

    indicmentupdDelete(IndicmentID: string): Observable<any> {
        const params = { IndicmentID };
        const url = `${appConfig.api7788}/ArrestIndicmentupdDelete`;
        return this.response(JSON.stringify(params), url);
    }

    insAll(Arrest: Arrest): Observable<any> {
        const params = Arrest;
        const url = `${appConfig.api7788}/ArrestinsAll`;
        return this.response(JSON.stringify(params), url);
    }

    staffinsAll(Staff: ArrestStaff): Observable<any> {
        const params = Arrest;
        const url = `${appConfig.api7788}/ArrestStaffinsAll`;
        return this.response(JSON.stringify(params), url);
    }

    lawbreakerinsAll(lawbreaker: ArrestLawbreaker): Observable<any> {
        const params = lawbreaker;
        const url = `${appConfig.api7788}/ArrestLawbreakerinsAll`;
        return this.response(JSON.stringify(params), url);
    }

    productinsAll(product: ArrestProduct): Observable<any> {
        const params = product;
        const url = `${appConfig.api7788}/ArrestProductinsAll`;
        return this.response(JSON.stringify(params), url);
    }

    indicmentinsAll(indicment: ArrestIndictment): Observable<any> {
        const params = indicment;
        const url = `${appConfig.api7788}/ArrestIndicmentinsAll`;
        return this.response(JSON.stringify(params), url);
    }

    updByCon(Arrest: Arrest): Observable<any> {
        const params = Arrest;
        const url = `${appConfig.api7788}/ArrestupdByCon`;
        return this.response(JSON.stringify(params), url);
    }

    //-- Mas --//

    masSubdistrictgetAll(): Promise<any[]> {
        const url = `${appConfig.api7788}/ArrestgetMasSubdistricgetAll`;
        return this.responsePromis('{}', url);
        
    }

    masDistrictgetAll(): Promise<any[]> {
        const url = `${appConfig.api7788}/ArrestgetMasDistricgetAll`;
        return this.responsePromis('{}', url);
    }

    masProvincegetAll(): Promise<any[]> {
        const url = `${appConfig.api7788}/ArrestgetMasProvincegetAll`;
        return this.responsePromis('{}', url);
    }

    masProductgetAll(): Observable<any[]> {
        const url = `${appConfig.api7788}/ArrestgetMasProductgetAll`;
        return this.responseList('{}', url);
    }

}
