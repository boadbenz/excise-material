import { NavigationComponent } from '../../../shared/header-navigation/navigation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReductionService } from '../reduction.service';
import { HttpClientModule } from '@angular/common/http';
import { PreloaderService } from '../../../shared/preloader/preloader.component';

const routes: Routes = [
    {
        path: '',
        data: {
            urls: [{ title: 'หน้าหลัก', url: '/' }, { title: 'ค้นหารายการปรับเพิ่ม-ปรับลด' }],
            codePage: 'ILG60-09-01-00-00',
            pageType: 'list',
            nextPage: { title: 'จัดการข้อมูลรายการปรับเพิ่ม-ปรับลด', url: '/reduction/manage' }
        },
        component: ListComponent
    }
]

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    providers: [NavigationComponent, ReductionService, PreloaderService],
    declarations: [ListComponent]
})
export class ListModule { }
