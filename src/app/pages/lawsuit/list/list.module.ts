import { NavigationComponent } from '../../../shared/header-navigation/navigation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LawsuitService } from "../lawsuit.service";
import { PaginationTableModule } from '../../component/pagination-table/pagination-table.module';
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { CardActionsModule } from "../../component/card-actions/card-actions.module";

const routes: Routes = [
    {
        path: '',
        data: {
            urls: [{ title: 'หน้าหลัก', url: '/' }, { title: 'ค้นหาบันทึกรับคำกล่าวโทษ' }],
            codePage: 'XCS60-04-01-00-00',
            pageType: 'list',
            nextPage: { title: 'จัดการข้อมูลบันทึกรับคำกล่าวโทษ', url: '/lawsuit/manage' }
        },
        component: ListComponent
    }
]

@NgModule({
    imports: [
      FormsModule,
      CommonModule,
      HttpModule,
      HttpClientModule,
      RouterModule.forChild(routes),
      CardActionsModule,
      PaginationTableModule
    ],
    providers: [NavigationComponent, LawsuitService],
    declarations: [ListComponent]
})
export class ListModule { }
