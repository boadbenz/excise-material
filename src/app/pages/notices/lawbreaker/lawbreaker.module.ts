import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { ModalOffenseModule } from '../../component/modal-offense/modal-offense.module';
import { LawbreakerComponent } from './lawbreaker.component';

const routes: Routes = [
    {
        path: '',
        data: {
            // title: 'จัดการข้อมูล',
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหาใบแจ้งความ', url: '/notice/list' },
                { title: 'จัดการข้อมูลใบแจ้งความนำจับ', url: '/notice/manage/C/NEW' },
                { title: 'จัดการข้อมูลผู้ต้องหา' }
            ],
            nextPage: { title: 'งานจับกุม', url: '/' }
        },
        component: LawbreakerComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CardActionsModule,
        ModalOffenseModule
    ],
    declarations: [LawbreakerComponent]
})
export class LawbreakerModule { }
