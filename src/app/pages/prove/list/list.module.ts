import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { ProveService } from '../prove.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PaginationTableModule } from '../../component/pagination-table/pagination-table.module';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { ContributorPipe } from '../../../shared/pipe/ContributorPipe';
import { MyDatePickerTHModule } from 'mydatepicker-th';

const routes: Routes = [
    {
        path: '',
        data: {
            // title: 'ค้นหาข้อมูล',
            urls: [{ title: 'หน้าหลัก', url: '/' }, { title: 'ค้นหางานตรวจรับและพิสูจน์ของกลาง Lastupdate 16/08/2561' }],
            nextPage: { title: 'งานตรวจรับและพิสูจน์ของกลาง', url: '/prove/manage' }
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
        PaginationTableModule,
        MyDatePickerTHModule
    ],
    declarations: [ListComponent,ContributorPipe],
    providers: [ProveService,PreloaderService]
})
export class ListModule { }
