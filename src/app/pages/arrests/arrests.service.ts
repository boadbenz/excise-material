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

    getByKeyword(Textsearch: string): Array<Arrest> {
        const params = Textsearch;
        const url = `${appConfig.api7788}/ArrestgetByKeyword`;
        let result = new Array<Arrest>();

        this.http.post<any>(url, params, this.httpOptions).subscribe(r => {
            result = r.ResponseData
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });

        return result;
    }

    getByConAdv(form: any): Array<Arrest> {
        const params = JSON.stringify(form);
        const url = `${appConfig.api7788}/ArrestgetByConAdv`;
        let result = new Array<Arrest>();

        this.http.post<any>(url, params, this.httpOptions).subscribe(r => {
            result = r.ResponseData
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });

        return result;
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
