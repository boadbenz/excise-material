import { Injectable, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Notice } from './notice';

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

    async getByCon(NoticeCode: string): Promise<Notice> {
        const params = { NoticeCode };
        const url = `${appConfig.api8082}/NoticegetByCon`;
        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            if (res.IsSuccess === false) {
                alert(res.ResponseData.Msg);
                return new Notice();
            }
            return res.ResponseData as Notice
        } catch (error) {
            alert(error.message);
        }
    }

    async insAll(Notice: Notice): Promise<any> {
        const params = Notice;
        const url = `${appConfig.api8082}/NoticeinsAll`;
        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            if (res.IsSuccess === false) {
                alert(res.ResponseData.Msg);
                return false;
            }
            return res.IsSuccess
        } catch (error) {
            alert(error.message);
        }
    }

    async updByCon(Notice: Notice): Promise<any> {
        const params = Notice;
        const url = `${appConfig.api8082}/NoticeupdByCon`;
        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            if (res.IsSuccess === false) {
                alert(res.ResponseData.Msg);
                return false;
            }
            return res.IsSuccess
        } catch (error) {
            alert(error.message);
        }
    }

    async updDelete(NoticeCode: string): Promise<any> {
        const params = { NoticeCode };
        const url = `${appConfig.api8082}/NoticeupdDelete`;
        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            if (res.IsSuccess === false) {
                alert(res.ResponseData.Msg);
                return false;
            }
            return res.IsSuccess
        } catch (error) {
            alert(error.message);
        }
    }

    async productupdDelete(ProductID: string): Promise<any> {
        const params = { ProductID };
        const url = `${appConfig.api8082}/NoticeProductupdDelete`;
        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            if (res.IsSuccess === false) {
                alert(res.ResponseData.Msg);
                return false;
            }
            return res.IsSuccess
        } catch (error) {
            alert(error.message);
        }
    }

    async staffupdDelete(StaffID: string): Promise<any> {
        const params = { StaffID };
        const url = `${appConfig.api8082}/NoticeStaffupdDelete`;
        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            if (res.IsSuccess === false) {
                alert(res.ResponseData.Msg);
                return false;
            }
            return res.IsSuccess
        } catch (error) {
            alert(error.message);
        }
    }

    async informerupdDelete(InformerID: string): Promise<any> {
        const params = { InformerID };
        const url = `${appConfig.api8082}/NoticeInformerupdDelete`;
        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            if (res.IsSuccess === false) {
                alert(res.ResponseData.Msg);
                return false;
            }
            return res.IsSuccess
        } catch (error) {
            alert(error.message);
        }
    }

    async localeupdDelete(LocaleID: string): Promise<any> {
        const params = { LocaleID };
        const url = `${appConfig.api8082}/NoticeLocaleupdDelete`;
        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            if (res.IsSuccess === false) {
                alert(res.ResponseData.Msg);
                return false;
            }
            return res.IsSuccess
        } catch (error) {
            alert(error.message);
        }
    }

    async suspectupdDelete(SuspectID: string): Promise<any> {
        const params = { SuspectID };
        const url = `${appConfig.api8082}/NoticeSuspectupdDelete`;
        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            if (res.IsSuccess === false) {
                alert(res.ResponseData.Msg);
                return false;
            }
            return res.IsSuccess
        } catch (error) {
            alert(error.message);
        }
    }

}
