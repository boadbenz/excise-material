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
