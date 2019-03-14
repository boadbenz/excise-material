import { Routes } from '@angular/router';
import { CanDeactiveGuard } from 'app/guard/can-deactive.guard';

// Components
import * as fromComponents from './components';

export const ROUTES: Routes = [
    {

        path: 'list',
        data: {
            urls: [{ title: 'หน้าหลัก', url: '/' }, { title: 'ค้นหางานจับกุม' }],
            codePage: 'ILG60-03-01-00-00'
        },
        component: fromComponents.ListComponent
    },
    {
        path: 'manage/:mode/:code',
        data: {
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหางานจับกุม', url: '/arrest/list' },
                { title: 'จัดการข้อมูลบันทึกจับกุม' }
            ],
            codePage: 'ILG60-03-02-00-00',
            nextPage: { title: 'รับคำกล่าวโทษ', url: '/accusations/manage' }
        },
        component: fromComponents.ManageComponent
    },
    {
        path: 'lawbreaker/:mode/:code',
        data: {
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหางานจับกุม', url: '/arrest/list' },
                { title: 'จัดการข้อมูลงานจับกุม', url: '/arrest/manage/C/NEW' },
                { title: 'จัดการข้อมูลผู้ต้องหา' }
            ],
            codePage: 'ILG60-99-02-02-00',
            nextPage: { title: 'งานจับกุม', url: '/' }
        },
        component: fromComponents.LawbreakerComponent
    },
    {
        path: 'allegation/:mode',
        data: {
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหางานจับกุม', url: '/arrest/list' },
                { title: 'จัดการข้อมูลงานจับกุม', url: '/arrest/manage/C/NEW' },
                { title: 'จัดการข้อมูลข้อกล่าวหา' }
            ],
            codePage: 'ILG60-03-03-00-00',
            nextPage: { title: 'รับคำกล่าวโทษ', url: '/accusations/manage' }
        },
        component: fromComponents.AllegationComponent
    }, 


]
