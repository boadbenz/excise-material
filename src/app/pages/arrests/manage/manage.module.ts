import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { Routes, RouterModule } from '@angular/router';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { SuspectModalModule } from '../../component/suspect-modal/suspect-modal.module';

const routes: Routes = [
  {
      path: '',
      data: {
          // title: 'จัดการข้อมูล',
          urls: [
              { title: 'หน้าหลัก', url: '/' },
              { title: 'ค้นหางานจับกุม', url: '/arrest/list' },
              { title: 'จัดการข้อมูลบันทึกจับกุม' }
          ],
          nextPage: { title: 'รับคำกล่าวโทษ', url: '/' }
      },
      component: ManageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardActionsModule,
    SuspectModalModule
  ],
  declarations: [
    ManageComponent
  ]
})
export class ManageModule { }
