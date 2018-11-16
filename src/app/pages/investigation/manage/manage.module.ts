import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { Routes, RouterModule } from '@angular/router';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { InvestigateService } from '../investigate.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrintdocModalModule } from '../printdoc-modal/printdoc-modal.module';

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
          codePage: 'XCS60-01-02-00',
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
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forChild(routes),
    CardActionsModule,
    PrintdocModalModule
  ],
  declarations: [ManageComponent],
  providers: [InvestigateService]
})
export class ManageModule { }
