import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from '../../../shared/header-navigation/navigation.component';
import { SuspectModalComponent } from '../../component/suspect-modal/suspect-modal.component';

const routes: Routes = [
    {
        path: '',
        data: {
            // title: 'จัดการข้อมูล',
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหาใบแจ้งความนำจับ', url: '/notice/list' },
                { title: 'จัดการข้อมูลใบแจ้งความนำจับ' }
            ],
            pageType: 'manage',
            nextPage: { title: 'งานจับกุม', url: '/arrest/manage' }
        },
        component: ManageComponent
    }
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ManageComponent,
        SuspectModalComponent
    ]
})
export class ManageModule { }
