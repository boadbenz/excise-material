import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { Routes, RouterModule } from '@angular/router';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';

const routes: Routes = [
  {
      path: '',
      data: {
          // title: 'จัดการข้อมูล',
          urls: [
              { title: 'หน้าหลัก', url: '/' },
              { title: 'ค้นหางานการสืบสวน', url: '/investigation/list' },
              { title: 'จัดการงานสืบสวน' }
          ],
          nextPage: { title: '', url: '' }
      },
      component: ManageComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardActionsModule
  ],
  declarations: [ManageComponent]
})
export class ManageModule { }
