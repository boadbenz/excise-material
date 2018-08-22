import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { ModalOffenseModule } from '../../component/modal-offense/modal-offense.module';
import { LawbreakerComponent } from './lawbreaker.component';
import { ArrestsService } from '../../arrests/arrests.service';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NoticeService } from '../notice.service';
import { MyDatePickerTHModule } from 'mydatepicker-th';

const routes: Routes = [
    {
        path: '',
        data: {
            // title: 'จัดการข้อมูล',
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหาใบแจ้งความ', url: '/notice/list' },
                { title: 'จัดการข้อมูลใบแจ้งความนำจับ', url: '/notice/manage/C/NEW' },
                { title: 'จัดการข้อมูลผู้ต้องหา' }
            ],
            nextPage: { title: 'งานจับกุม', url: '/' }
        },
        component: LawbreakerComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        NgbModule.forRoot(),
        CardActionsModule,
        ModalOffenseModule,
        MyDatePickerTHModule
    ],
    declarations: [LawbreakerComponent],
    providers: [
        ArrestsService,
        NoticeService
    ]
})
export class LawbreakerModule { }
