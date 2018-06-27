import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { Routes, RouterModule } from '@angular/router';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { InvestigateService } from '../investigate.service';

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
    RouterModule.forChild(routes),
    CardActionsModule
  ],
  declarations: [ListComponent],
  providers: [InvestigateService]
})
export class ListModule { }
