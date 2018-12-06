import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuspectComponent } from './suspect.component';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArrestsService } from '../../arrests/arrests.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NoticeService } from '../notice.service';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { MainMasterService } from '../../../services/main-master.service';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

const routes: Routes = [
  {
      path: '',
      data: {
          // title: 'จัดการข้อมูล',
          urls: [
              { title: 'หน้าหลัก', url: '/' },
              { title: 'ค้นหาใบแจ้งความ', url: '/notice/list' },
              { title: 'จัดการข้อมูลใบแจ้งความนำจับ', url: '/notice/manage/C/NEW' },
              { title: 'จัดการข้อมูลผู้ต้องสงสัย' }
          ],
          codePage: 'XCS60-99-01-02-00',  
          nextPage: { title: 'งานแจ้งความ', url: '/' }
      },
      component: SuspectComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    CardActionsModule,
    MyDatePickerTHModule,
    SweetAlert2Module.forRoot()
  ],
  declarations: [SuspectComponent],
  exports: [SuspectComponent],
  providers: [ArrestsService, NoticeService, MainMasterService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SuspectModule { }
