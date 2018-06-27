import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { Routes, RouterModule } from '@angular/router';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { InvestigateService } from '../investigate.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes),
    CardActionsModule
  ],
  declarations: [ManageComponent],
  providers: [InvestigateService]
})
export class ManageModule { }
