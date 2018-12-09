import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { MyDatePickerModule } from 'mydatepicker';
const routes: Routes = [
    {
        path: '',
        data: {
            // title: 'ค้นหาข้อมูล',
            urls: [{ title: 'หน้าหลัก', url: '/' }, { title: 'การจัดการสิทธิเข้าถึงข้อมูลระบบผู้กระทำผิด' }],
            pageType: 'list',
            // nextPage: { title: 'แจ้งความ', url: '/fine/manage' },
            codePage: 'XCS60-06-01-000'
        },
        component: ListComponent
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
      MyDatePickerModule
    ],
    declarations: [ListComponent],
    providers: []
})
export class ListModule { }