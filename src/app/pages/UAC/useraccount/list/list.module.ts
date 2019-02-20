import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { MyDatePickerModule } from 'mydatepicker';
import { PaginationTableModule } from '../../../component/pagination-table/pagination-table.module';
import { CardActionsModule } from '../../../component/card-actions/card-actions.module';
import { UserListService } from './list.service';

const routes: Routes = [
    {
        path: '',
        data: {
            // title: 'ค้นหาข้อมูล',
            urls: [{ title: 'หน้าหลัก', url: '/userlist' }, { title: 'ค้นหาเจ้าพนักงานเพื่อจัดการสิทธิเข้าถึงข้อมูล' }],
            pageType: 'list',
            // nextPage: { title: '', url: '/list/manage' },
            codePage: 'ILG60-24-01-01-03'
        },
        component: UserListComponent
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
      PaginationTableModule,
      CardActionsModule
    ],
    declarations: [UserListComponent],
    providers: [UserListService]
})
export class ListModule { }