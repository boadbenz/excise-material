import { Injectable, HostListener } from '@angular/core';
import { NoticeList } from './notice-list';

@Injectable()
export class NoticeService {

    private noticeList = new Array<NoticeList>();

    constructor() { }

    get getList() {
        this.noticeList = [
            {
                noticeCode: 'LS90806026000002',
                noticeDate: new Date,
                department: 'สสท.ระนอง สาขาเมืองกระบุรี',
                staff: 'นาย ธวัชชัย บิงขนุทด',
                lawbreaker: 'น.ส.แพรทิพย์ โครตแสนลี'
            }, {
                noticeCode: 'LS90806026000003',
                noticeDate: new Date,
                department: 'สสท.ระนอง สาขาเมืองกระบุรี',
                staff: 'นาย ธวัชชัย บิงขนุทด',
                lawbreaker: 'น.ส.แพรทิพย์ โครตแสนลี'
            }, {
                noticeCode: 'LS90806026000004',
                noticeDate: new Date,
                department: 'สสท.ระนอง สาขาเมืองกระบุรี',
                staff: 'นาย ธวัชชัย บิงขนุทด',
                lawbreaker: 'น.ส.แพรทิพย์ โครตแสนลี'
            }, {
                noticeCode: 'LS90806026000005',
                noticeDate: new Date,
                department: 'สสท.ระนอง สาขาเมืองกระบุรี',
                staff: 'นาย ธวัชชัย บิงขนุทด',
                lawbreaker: 'น.ส.แพรทิพย์ โครตแสนลี'
            }, {
                noticeCode: 'LS90806026000006',
                noticeDate: new Date,
                department: 'สสท.ระนอง สาขาเมืองกระบุรี',
                staff: 'นาย ธวัชชัย บิงขนุทด',
                lawbreaker: 'น.ส.แพรทิพย์ โครตแสนลี'
            }
        ];
        return this.noticeList;
    }

}
