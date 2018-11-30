import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailManageComponent } from './detail-manage.component';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { InvestigateService } from '../investigate.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OffenseModalModule } from '../../arrests/offense-modal/offense-modal.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalLawbreakerModule } from '../../component/modal-lawbreaker/modal-lawbreaker.module';

const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'จัดการข้อมูล',
      urls: [
        { title: 'หน้าหลัก', url: '/' },
        { title: 'ค้นหางานการสืบสวน', url: '/investigation/list' },
        { title: 'จัดการงานสืบสวน', url: '/investigation/manage/C/NEW' },
        { title: 'จัดการข้อมูลรายละเอียดรายงานการสืบสวน' }
      ],
      nextPage: { title: '', url: '' }
    },
    component: DetailManageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forChild(routes),
    CardActionsModule,
    ModalLawbreakerModule,
    OffenseModalModule
  ],
  declarations: [DetailManageComponent],
  providers: [InvestigateService]
})
export class DetailManageModule { }
