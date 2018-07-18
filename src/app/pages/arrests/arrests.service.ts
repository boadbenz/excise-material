import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Arrest } from './arrest';
import { ArrestStaff } from './arrest-staff';
import { ArrestLawbreaker } from './arrest-lawbreaker';
import { ArrestProduct } from './arrest-product';
import { ArrestIndictment } from './arrest-indictment';
// import { ProductModel } from '../../models/product.model';
import { Message } from '../../config/message';
// import { Observable } from 'rxjs/Observable';

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

    private async responsePromisModify(params: string, url: string) {
        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            if (res.IsSuccess === false) {
                alert(Message.saveFail);
                return false;
            }
            alert(Message.saveFail)
            return res.IsSuccess
        } catch (error) {
            alert(Message.saveFail)
            return false;
        }

    }

    private async resposePromisGet(params: string, url: string) {
        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            if (res.IsSuccess === false) {
                alert(Message.noRecord);
                return [];
            }
            if (!res.ResponseData.length) {
                alert(Message.noRecord)
                return []
            }
            return res.ResponseData
        } catch (error) {
            alert(Message.noRecord)
            return []
        }
    }

    async getByKeywordOnInit(): Promise<any[]> {
        const params = { 'Textsearch': '' };
        const url = `${appConfig.api7788}/ArrestgetByKeyword`;
        const res = await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
        if (res.IsSuccess) {
            return res.ResponseData
        }
    }

    getByKeyword(Textsearch: string): Promise<Arrest[]> {
        const params = Textsearch === '' ? { 'Textsearch': '' } : Textsearch;
        const url = `${appConfig.api7788}/ArrestgetByKeyword`;
        return this.resposePromisGet(JSON.stringify(params), url)
    }

    getByConAdv(form: any): Promise<Arrest[]> {
        const params = form;
        const url = `${appConfig.api7788}/ArrestgetByConAdv`;
        return this.resposePromisGet(JSON.stringify(params), url)
    }

    async getByCon(ArrestCode: string): Promise<Arrest> {
        const params = { ArrestCode };
        const url = `${appConfig.api7788}/ArrestgetByCon`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (res.IsSuccess === false) {
            alert(Message.noRecord);
            return new Arrest();
        }
        if (!res.ResponseData) {
            alert(Message.noRecord)
            return new Arrest()
        }
        return res.ResponseData
    }

    async updDelete(ArrestCode: string): Promise<any> {
        const params = { ArrestCode };
        const url = `${appConfig.api7788}/ArrestupdDelete`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (res.IsSuccess === false) {
            alert(Message.saveFail);
            return false;
        }
        alert(Message.delComplete)
        return res.IsSuccess
    }

    async staffupdDelete(StaffID: string): Promise<any> {
        const params = { StaffID };
        const url = `${appConfig.api7788}/ArrestStaffupdDelete`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (res.IsSuccess === false) {
            alert(Message.delStaffFail);
            return false;
        }
        alert(Message.delStaffComplete)
        return res.IsSuccess
    }

    async lawbreakerupdDelete(LawbreakerID: string): Promise<any> {
        const params = { LawbreakerID };
        const url = `${appConfig.api7788}/ArrestLawbreakerupdDelete`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (res.IsSuccess === false) {
            alert(Message.delLawbreakerFail);
            return false;
        }
        alert(Message.delLawbreakerComplete)
        return res.IsSuccess
    }

    async productupdDelete(ProductID: string): Promise<any> {
        const params = { ProductID };
        const url = `${appConfig.api7788}/ArrestProductupdDelete`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (res.IsSuccess === false) {
            alert(Message.delProductFail);
            return false;
        }
        alert(Message.delProductComplete)
        return res.IsSuccess
    }

    async indicmentupdDelete(IndicmentID: string): Promise<any> {
        const params = { IndicmentID };
        const url = `${appConfig.api7788}/ArrestIndicmentupdDelete`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (res.IsSuccess === false) {
            alert(Message.delIndicmentFail);
            return false;
        }
        alert(Message.delIndicmentComplete)
        return res.IsSuccess
    }

    insAll(Arrest: Arrest): Promise<any> {
        const params = Arrest;
        const url = `${appConfig.api7788}/ArrestinsAll`;
        return this.responsePromisModify(JSON.stringify(params), url)
    }

    async staffinsAll(ArrestStaff: ArrestStaff): Promise<any> {
        const params = ArrestStaff;
        const url = `${appConfig.api7788}/ArrestStaffinsAll`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (res.IsSuccess === false) {
            alert(Message.saveStaffFail);
            return false;
        }
        return res.IsSuccess
    }

    async lawbreakerinsAll(lawbreaker: ArrestLawbreaker): Promise<any> {
        const params = lawbreaker;
        const url = `${appConfig.api7788}/ArrestLawbreakerinsAll`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (res.IsSuccess === false) {
            alert(Message.saveLawbreakerFail);
            return false;
        }
        return res.IsSuccess
    }

    async productinsAll(product: ArrestProduct): Promise<any> {
        const params = product;
        const url = `${appConfig.api7788}/ArrestProductinsAll`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (res.IsSuccess === false) {
            alert(Message.saveProductFail);
            return false;
        }
        return res.IsSuccess
    }

    async indicmentinsAll(indicment: ArrestIndictment): Promise<any> {
        const params = indicment;
        const url = `${appConfig.api7788}/ArrestIndicmentinsAll`;
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (res.IsSuccess === false) {
            alert(Message.saveIndicmentFail);
            return false;
        }
        return res.IsSuccess
    }

    updByCon(Arrest: Arrest): Promise<any> {
        const params = Arrest;
        const url = `${appConfig.api7788}/ArrestupdByCon`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }

    //-- Arrest Notice --//
    noticegetByConAdv(form: any): Promise<any[]> {
        const url = `${appConfig.api7788}/ArrestNoticegetByConAdv`;
        return this.resposePromisGet(JSON.stringify(form), url);
    }
    
    noticegetByKeyword(Textsearch: any): Promise<any[]> {
        const url = `${appConfig.api7788}/ArrestNoticegetByKeyword`;
        return this.resposePromisGet(Textsearch, url);
    }
    //-- Arrest Notice --//

    //-- Mas --//
    masLawbreakergetByConAdv(Textsearch: any): Promise<any[]> {
        const url = `${appConfig.api7788}/ArrestMasLawbreakergetByKeyword`;
        return this.resposePromisGet(Textsearch, url);
    }

    masLawbreakergetByKeyword(Textsearch: any): Promise<any[]> {
        const url = `${appConfig.api7788}/ArrestMasLawbreakergetByKeyword`;
        return this.resposePromisGet(Textsearch, url);
    }

    masLawGroupSectiongetByKeyword(Textsearch: any): Promise<any[]> {
        const url = `${appConfig.api7788}/ArrestMasLawGroupSectiongetByKeyword`;
        return this.resposePromisGet(Textsearch, url);
    }

    masOfficegetAll(): Promise<any[]> {
        const url = `${appConfig.api7788}/ArrestgetMasOfficegetAll`;
        return this.resposePromisGet('{}', url);
    }

    masStaffgetAll(): Promise<any[]> {
        const url = `${appConfig.api7788}/ArrestgetMasStaffgetAll`;
        return this.resposePromisGet('{}', url);
    }

    masSubdistrictgetAll(): Promise<any[]> {
        const url = `${appConfig.api7788}/ArrestgetMasSubdistricgetAll`;
        return this.resposePromisGet('{}', url);
    }

    masDistrictgetAll(): Promise<any[]> {
        const url = `${appConfig.api7788}/ArrestgetMasDistricgetAll`;
        return this.resposePromisGet('{}', url);
    }

    masProvincegetAll(): Promise<any[]> {
        const url = `${appConfig.api7788}/ArrestgetMasProvincegetAll`;
        return this.resposePromisGet('{}', url);
    }

    masProductgetAll(): Promise<any[]> {
        const url = `${appConfig.api7788}/ArrestgetMasProductgetAll`;
        return this.resposePromisGet('{}', url);
    }
    //-- Mas --//

}
