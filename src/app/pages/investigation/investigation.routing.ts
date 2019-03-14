import { Routes } from "@angular/router";
// Components
import * as fromComponents from './components';

export const routes: Routes = [
    { 
        path: 'list',
        data: {
          urls: [{ title: 'หน้าหลัก', url: '/' }, { title: 'ค้นหาข้อมูลสืบสวน' }],
          codePage: 'ILG60-01-01-00-00',
          nextPage: { title: 'รายงานสืบสวน', url: '/suppression/investigation/manage' }
        },
        component: fromComponents.ListComponent
    },
    { 
        path: 'manage/:mode/:code',
        data: {
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหางานการสืบสวน', url: '/suppression/investigation/list' },
                { title: 'จัดการงานสืบสวน' }
            ],
            codePage: 'ILG60-01-02-00-00'
        },
        component: fromComponents.ManageComponent
    },
    {
        path: 'detail-manage/:mode',
        data: {
          urls: [
            { title: 'หน้าหลัก', url: '/' },
            { title: 'ค้นหางานการสืบสวน', url: '/suppression/investigation/list' },
            { title: 'จัดการงานสืบสวน', url: '/suppression/investigation/manage/C/NEW' },
            { title: 'จัดการข้อมูลรายละเอียดรายงานการสืบสวน' }
          ],
          codePage: 'ILG60-01-03-00-00'
        },
        component: fromComponents.DetailManageComponent
    }, 
    {
        path: 'lawbreaker/:mode/:code',
        data: {
          urls: [
            { title: 'หน้าหลัก', url: '/' },
            { title: 'ค้นหางานการสืบสวน', url: '/suppression/investigation/list' },
            { title: 'จัดการงานสืบสวน', url: '/suppression/investigation/manage/C/NEW' },
            { title: 'จัดการข้อมูลรายละเอียดรายงานการสืบสวน' },
            { title: 'จัดการข้อมูลผู้ต้องหา' }
          ],
          codePage: 'ILG60-99-02-02-00'
        },
        component: fromComponents.LawbreakerComponent
    },
    {
        path: 'suspect/:mode/:code',
        data: {
          urls: [
            { title: 'หน้าหลัก', url: '/' },
            { title: 'ค้นหางานการสืบสวน', url: '/suppression/investigation/list' },
            { title: 'จัดการงานสืบสวน', url: '/suppression/investigation/manage/C/NEW' },
            { title: 'จัดการข้อมูลรายละเอียดรายงานการสืบสวน' },
            { title: 'จัดการข้อมูลผู้ต้องสงสัย' }
          ],
          codePage: 'ILG60-99-01-02-00'
        },
        component: fromComponents.SuspectComponent
    }
]