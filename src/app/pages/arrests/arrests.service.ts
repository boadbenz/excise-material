import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Arrest } from './arrest';

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

    async getByKeyword(Textsearch: string): Promise<Arrest[]> {
        const params = Textsearch;
        const url = `${appConfig.api7788}/ArrestgetByKeyword`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res.ResponseData as Arrest[];
        } catch (error) {
            await alert(error);
        }
    }

    async getByConAdv(form: any): Promise<Arrest[]> {
        const params = JSON.stringify(form);
        const url = `${appConfig.api7788}/ArrestgetByConAdv`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res.ResponseData as Arrest[];
        } catch (error) {
            await alert(error);
        }
    }

    async getByCon(ArrestCode: string): Promise<Arrest> {
        const params = { ArrestCode };
        const url = `${appConfig.api7788}/ArrestgetByCon`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res.ResponseData as Arrest;
        } catch (error) {
            await alert(error);
        }
    }

    async updDelete(ArrestCode: string): Promise<any> {
        const params = { ArrestCode };
        const url = `${appConfig.api7788}/ArrestupdDelete`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res.ResponseData;
        } catch (error) {
            await alert(error);
        }
    }

    async staffupdDelete(StaffID: string): Promise<any> {
        const params = { StaffID };
        const url = `${appConfig.api7788}/ArrestStaffupdDelete`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res.ResponseData;
        } catch (error) {
            await alert(error);
        }
    }

    async lawbreakerupdDelete(LawbreakerID: string): Promise<any> {
        const params = { LawbreakerID };
        const url = `${appConfig.api7788}/ArrestLawbreakerupdDelete`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res.ResponseData;
        } catch (error) {
            await alert(error);
        }
    }

    async productupdDelete(ProductID: string): Promise<any> {
        const params = { ProductID };
        const url = `${appConfig.api7788}/ArrestProductupdDelete`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res.ResponseData;
        } catch (error) {
            await alert(error);
        }
    }

    async indicmentupdDelete(IndicmentID: string): Promise<any> {
        const params = { IndicmentID };
        const url = `${appConfig.api7788}/ArrestIndicmentupdDelete`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res.ResponseData;
        } catch (error) {
            await alert(error);
        }
    }

    async updByCon(Arrest: Arrest): Promise<any> {
        const params = Arrest;
        const url = `${appConfig.api7788}/ArrestupdByCon`;

        try {
            const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
            return res.ResponseData;
        } catch (error) {
            await alert(error);
        }
    }

    // get getList() {
    //     this.arrestList = [
    //         {
    //             noticeCode: 'LS90806026000002',
    //             arrestCode: 'TN90806026000002',
    //             occurrenceDate: (new Date).toLocaleDateString('th-TH', options),
    //             fullName: 'นายธวัชชัย บิงขุนทด',
    //             departmentName: 'สสท.ระนอง สาขาเมืองกระบุรี',
    //             location: 'สสท.ระนอง สาขาเมืองกระบุรี'
    //         }, {
    //             noticeCode: 'LS90806026000002',
    //             arrestCode: 'TN90806026000002',
    //             occurrenceDate: (new Date).toLocaleDateString('th-TH', options),
    //             fullName: 'นายธวัชชัย บิงขุนทด',
    //             departmentName: 'สสท.ระนอง สาขาเมืองกระบุรี',
    //             location: 'สสท.ระนอง สาขาเมืองกระบุรี'
    //         }, {
    //             noticeCode: 'LS90806026000002',
    //             arrestCode: 'TN90806026000002',
    //             occurrenceDate: (new Date).toLocaleDateString('th-TH', options),
    //             fullName: 'นายธวัชชัย บิงขุนทด',
    //             departmentName: 'สสท.ระนอง สาขาเมืองกระบุรี',
    //             location: 'สสท.ระนอง สาขาเมืองกระบุรี'
    //         }, {
    //             noticeCode: 'LS90806026000002',
    //             arrestCode: 'TN90806026000002',
    //             occurrenceDate: (new Date).toLocaleDateString('th-TH', options),
    //             fullName: 'นายธวัชชัย บิงขุนทด',
    //             departmentName: 'สสท.ระนอง สาขาเมืองกระบุรี',
    //             location: 'สสท.ระนอง สาขาเมืองกระบุรี'
    //         }, {
    //             noticeCode: 'LS90806026000002',
    //             arrestCode: 'TN90806026000002',
    //             occurrenceDate: (new Date).toLocaleDateString('th-TH', options),
    //             fullName: 'นายธวัชชัย บิงขุนทด',
    //             departmentName: 'สสท.ระนอง สาขาเมืองกระบุรี',
    //             location: 'สสท.ระนอง สาขาเมืองกระบุรี'
    //         }
    //     ]

    //     return this.arrestList;
    // }

}
