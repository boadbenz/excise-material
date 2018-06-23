import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { RouterModule, Routes } from '@angular/router';
import { LawbreakerModalModule } from '../../arrests/lawbreaker-modal/lawbreaker-modal.module';
import { OffenseModalModule } from '../../arrests/offense-modal/offense-modal.module';

const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'จัดการข้อมูล',
      urls: [
        { title: 'หน้าหลัก', url: '/' },
        { title: 'ค้นหางานการสืบสวน', url: '/investigation/list' },
        { title: 'จัดการงานสืบสวน', url: '/investigation/c/new' },
        { title: 'จัดการข้อมูลรายละเอียดรายงานการสืบสวน' }
      ],
      nextPage: { title: '', url: '' }
    },
    component: DetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardActionsModule,
    LawbreakerModalModule,
    OffenseModalModule
  ],
  declarations: [DetailComponent]
})
export class DetailModule { }
