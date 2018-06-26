import { Injectable } from '@angular/core';
import { ArrestList } from './list/arrest-list';

const options = { year: 'numeric', month: 'short', day: 'numeric' };

@Injectable()
export class ArrestsService {

    private arrestList = new Array<ArrestList>();
    constructor() { }

    get getList() {
        this.arrestList = [
            {
                noticeCode: 'LS90806026000002',
                arrestCode: 'TN90806026000002',
                arrestDate: (new Date).toLocaleDateString('th-TH', options),
                accused: 'นายธวัชชัย บิงขุนทด',
                department: 'สสท.ระนอง สาขาเมืองกระบุรี',
                location: 'สสท.ระนอง สาขาเมืองกระบุรี'
            }, {
                noticeCode: 'LS90806026000002',
                arrestCode: 'TN90806026000002',
                arrestDate: (new Date).toLocaleDateString('th-TH', options),
                accused: 'นายธวัชชัย บิงขุนทด',
                department: 'สสท.ระนอง สาขาเมืองกระบุรี',
                location: 'สสท.ระนอง สาขาเมืองกระบุรี'
            }, {
                noticeCode: 'LS90806026000002',
                arrestCode: 'TN90806026000002',
                arrestDate: (new Date).toLocaleDateString('th-TH', options),
                accused: 'นายธวัชชัย บิงขุนทด',
                department: 'สสท.ระนอง สาขาเมืองกระบุรี',
                location: 'สสท.ระนอง สาขาเมืองกระบุรี'
            }, {
                noticeCode: 'LS90806026000002',
                arrestCode: 'TN90806026000002',
                arrestDate: (new Date).toLocaleDateString('th-TH', options),
                accused: 'นายธวัชชัย บิงขุนทด',
                department: 'สสท.ระนอง สาขาเมืองกระบุรี',
                location: 'สสท.ระนอง สาขาเมืองกระบุรี'
            }, {
                noticeCode: 'LS90806026000002',
                arrestCode: 'TN90806026000002',
                arrestDate: (new Date).toLocaleDateString('th-TH', options),
                accused: 'นายธวัชชัย บิงขุนทด',
                department: 'สสท.ระนอง สาขาเมืองกระบุรี',
                location: 'สสท.ระนอง สาขาเมืองกระบุรี'
            }
        ]
        return this.arrestList;
    }

}
