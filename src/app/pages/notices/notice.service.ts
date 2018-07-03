import { Injectable, HostListener } from '@angular/core';
import { NoticeList } from './list/notice-list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Notice } from './notice';

const options = { year: 'numeric', month: 'short', day: 'numeric' };

@Injectable()
export class NoticeService {

    private noticeList = new Array<NoticeList>();

    constructor(private http: HttpClient) { }

    // tslint:disable-next-line:member-ordering
    private httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json'
            })
    };

    get getList() {
        this.noticeList = [
            {
                noticeCode: 'LS90806026000002',
                noticeDate: (new Date).toLocaleDateString('th-TH', options),
                department: 'สสท.ระนอง สาขาเมืองกระบุรี',
                staff: 'นาย ธวัชชัย บิงขนุทด',
                lawbreaker: 'น.ส.แพรทิพย์ โครตแสนลี'
            }, {
                noticeCode: 'LS90806026000003',
                noticeDate: (new Date).toLocaleDateString('th-TH', options),
                department: 'สสท.ระนอง สาขาเมืองกระบุรี',
                staff: 'นาย ธวัชชัย บิงขนุทด',
                lawbreaker: 'น.ส.แพรทิพย์ โครตแสนลี'
            }, {
                noticeCode: 'LS90806026000004',
                noticeDate: (new Date).toLocaleDateString('th-TH', options),
                department: 'สสท.ระนอง สาขาเมืองกระบุรี',
                staff: 'นาย ธวัชชัย บิงขนุทด',
                lawbreaker: 'น.ส.แพรทิพย์ โครตแสนลี'
            }, {
                noticeCode: 'LS90806026000005',
                noticeDate: (new Date).toLocaleDateString('th-TH', options),
                department: 'สสท.ระนอง สาขาเมืองกระบุรี',
                staff: 'นาย ธวัชชัย บิงขนุทด',
                lawbreaker: 'น.ส.แพรทิพย์ โครตแสนลี'
            }, {
                noticeCode: 'LS90806026000006',
                noticeDate: (new Date).toLocaleDateString('th-TH', options),
                department: 'สสท.ระนอง สาขาเมืองกระบุรี',
                staff: 'นาย ธวัชชัย บิงขนุทด',
                lawbreaker: 'น.ส.แพรทิพย์ โครตแสนลี'
            }
        ];
        return this.noticeList;
    }

    getByKeyword(Textsearch: any) {
        const params = Textsearch;
        const url = `${appConfig.apiUrl}/NoticegetbyKeyword`;
        return this.http.post<Notice[]>(url, params, this.httpOptions);
    }

    getByConAdv(form: any) {
        const params = JSON.stringify(form);
        const url = `${appConfig.apiUrl}/NoticegetByConAdv`;
        return this.http.post<Notice[]>(url, params, this.httpOptions);
    }

}
