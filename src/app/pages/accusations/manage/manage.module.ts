import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ManageComponent } from './manage.component';

const routes: Routes = [
    {
        path: '',
        data: {
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหาบันทึกรับคำกล่าวโทษ', url: '/accusations/list' },
                { title: 'จัดการข้อมูลบันทึกรับคำกล่าวโทษ' },
                { title: 'จัดการข้อมูลรายละเอียดบันทึกรับคำกล่าวโทษ' }
            ],
            pageType: 'manage',
            codePage: 'XCS60-04-03-00-00',
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
        ManageComponent
    ]
})
export class ManageModule { }