import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';

const routes: Routes = [
    {
        path: '',
        data: {
            // title: 'จัดการข้อมูล',
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหารายการนำส่งเงินรายได้', url: '/income/list' },
                { title: 'จัดการข้อมูลนำส่งเงินรายได้' }
            ],
            nextPage: { title: 'จัดการข้อมูลนำส่งเงินรายได้', url: '/income/manage' }
        },
        component: ManageComponent
    }
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes),
        CardActionsModule,
    ],
    declarations: [
        ManageComponent
    ]
})
export class ManageModule { }
