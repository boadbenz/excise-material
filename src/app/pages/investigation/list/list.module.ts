import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { Routes, RouterModule } from '@angular/router';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { InvestigateService } from '../investigate.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PaginationTableModule } from '../../component/pagination-table/pagination-table.module';
import { FormsModule } from '@angular/forms';
import { MyDatePickerTHModule } from 'mydatepicker-th';

const routes: Routes = [
  {
      path: '',
      data: {
          // title: 'ค้นหาข้อมูล',
          urls: [{ title: 'หน้าหลัก', url: '/' }, { title: 'ค้นหาข้อมูลสืบสวน' }],
          nextPage: { title: 'รายงานสืบสวน', url: '/investigation/manage' }
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
    CardActionsModule,
    PaginationTableModule,
    MyDatePickerTHModule
  ],
  declarations: [ListComponent],
  providers: [InvestigateService]
})
export class ListModule { }
