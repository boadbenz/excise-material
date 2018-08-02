import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuspectComponent } from './suspect.component';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';

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
          nextPage: { title: 'งานแจ้งความ', url: '/' }
      },
      component: SuspectComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    ReactiveFormsModule,
    CardActionsModule
  ],
  declarations: [SuspectComponent],
  exports: [SuspectComponent]
})
export class SuspectModule { }
