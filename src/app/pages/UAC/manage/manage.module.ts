import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './manage.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { MyDatePickerModule } from 'mydatepicker';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';

// ./card-actions.component
const routes: Routes = [
    {
        path: '',
        data: {
            // title: 'ค้นหาข้อมูล',
            urls: [{ title: 'หน้าหลัก', url: '/' },{ title: 'การจัดการสิทธิเข้าถึงข้อมูลระบบผู้กระทำผิด', url: '/uac/list' }, { title: 'ตั้งค่า' }],
            pageType: 'list',
            // nextPage: { title: 'แจ้งความ', url: '/fine/manage' },
            codePage: 'XCS60-06-01-001'
        },
        component: ManageComponent
    }
]

@NgModule({
    imports: [
      CommonModule,
      HttpModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forChild(routes),
      MyDatePickerTHModule,
      MyDatePickerModule,
      CardActionsModule
    ],
    declarations: [ManageComponent],
    providers: []
})
export class ManageModule { }