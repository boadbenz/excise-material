import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { FineService } from '../fine.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { PaginationTableModule } from '../../component/pagination-table/pagination-table.module';

const routes: Routes = [
    {
        path: '',
        data: {
            // title: 'ค้นหาข้อมูล',
            urls: [{ title: 'หน้าหลัก', url: '/' }, { title: 'ค้นหางานเปรียบเทียบและชำระค่าปรับ' }],
            pageType: 'list',
            nextPage: { title: 'แจ้งความ', url: '/fine/manage' }
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
    providers: [FineService,PreloaderService]
})
export class ListModule { }
