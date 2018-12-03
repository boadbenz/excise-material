import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { Routes, RouterModule } from '@angular/router';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { InvestigateService } from '../investigate.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PaginationTableModule } from '../../component/pagination-table/pagination-table.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'ค้นหาข้อมูล',
      urls: [{ title: 'หน้าหลัก', url: '/' }, { title: 'ค้นหาข้อมูลสืบสวน' }],
      codePage: 'XCS60-01-01-00',
      nextPage: { title: 'รายงานสืบสวน', url: '/investigation/manage' }
    },
    component: ListComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes),
    CardActionsModule,
    PaginationTableModule
  ],
  declarations: [ListComponent],
  providers: [InvestigateService]
})
export class ListModule { }