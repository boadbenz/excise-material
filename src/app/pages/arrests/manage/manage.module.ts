import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { Routes, RouterModule } from '@angular/router';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { FormsModule } from '@angular/forms';
import { LawbreakerModalModule } from '../lawbreaker-modal/lawbreaker-modal.module';
import { AllegationModalModule } from '../allegation-modal/allegation-modal.module';
import { NoticeListModalModule } from '../../notices/notice-list-modal/notice-list-modal.module';
import { StepWizardModule } from '../../component/step-wizard/step-wizard.module';

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
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    LawbreakerModalModule,
    CardActionsModule,
    AllegationModalModule,
    NoticeListModalModule,
    StepWizardModule
  ],
  declarations: [
    ManageComponent
  ]
})
export class ManageModule { }
