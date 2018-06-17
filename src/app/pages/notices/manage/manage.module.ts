import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'จัดการข้อมูล',
            urls: [{ title: 'หน้าหลัก', url: '/' }, { title: '1.5 แจ้งความนำจับ' }]
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
    declarations: [ManageComponent]
})
export class ManageModule { }
