import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LawbreakerComponent } from './lawbreaker.component';
import { Routes, RouterModule } from '@angular/router';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { OffenseModalModule } from '../offense-modal/offense-modal.module';

const routes: Routes = [
  {
      path: '',
      data: {
          // title: 'จัดการข้อมูล',
          urls: [
              { title: 'หน้าหลัก', url: '/' },
              { title: 'ค้นหางานจับกุม', url: '/arrest/list' },
              { title: 'จัดการข้อมูลบันทึกจับกุม', url:'/arrest/manage/c/new' },
              { title: 'จัดการข้อมูลผู้ต้องหา'}
          ],
          nextPage: { title: 'รับคำกล่าวโทษ', url: '/' }
      },
      component: LawbreakerComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardActionsModule,
    OffenseModalModule
  ],
  declarations: [LawbreakerComponent]
})
export class LawbreakerModule { }
