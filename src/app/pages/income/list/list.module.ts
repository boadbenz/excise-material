import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { IncomeService } from '../income.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PaginationTableModule } from '../../component/pagination-table/pagination-table.module';

const routes: Routes = [
    {
        path: '',
        data: {
            // title: 'ค้นหาข้อมูล',
            urls: [{ title: 'หน้าหลัก', url: '/' }, { title: 'ค้นหารายการนำส่งเงินรายได้' }],
            nextPage: { title: 'จัดการข้อมูลนำส่งเงินรายได้', url: '/income/manage' }
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
    providers: [IncomeService]
  })
  export class ListModule { }
