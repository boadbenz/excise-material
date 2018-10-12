import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllegationComponent } from './allegation.component';
import { StepWizardModule } from 'app/pages/component/step-wizard/step-wizard.module';
import { Routes, RouterModule } from '@angular/router';
import { AllegationModalModule } from '../allegation-modal/allegation-modal.module';

const routes: Routes = [
  {
      path: '',
      data: {
          // title: 'จัดการข้อมูล',
          urls: [
              { title: 'หน้าหลัก', url: '/' },
              { title: 'ค้นหางานจับกุม', url: '/arrest/list' },
              { title: 'จัดการข้อมูลงานจับกุม', url: '/arrest/manage' },
              { title: 'จัดการข้อมูลข้อกล่าวหา'}
          ],
          codePage: 'ILG60-03-03-00-00',
          nextPage: { title: 'รับคำกล่าวโทษ', url: '/accusations/manage' }
      },
      component: AllegationComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StepWizardModule,
    AllegationModalModule
  ],
  declarations: [AllegationComponent]
})
export class AllegationModule { }
