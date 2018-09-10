import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { NoticeService } from '../notice.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgbModule, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { SuspectModalModule } from '../../component/suspect-modal/suspect-modal.module';
import { PrintDocModalModule } from '../print-doc-modal/print-doc-modal.module';
import { ArrestsService } from '../../arrests/arrests.service';
import { ModalLawbreakerModule } from '../../component/modal-lawbreaker/modal-lawbreaker.module';
import { DatepickerI18nService } from '../../../services/datepicker-i18n.service';
import { ProveService } from '../../prove/prove.service';
import { MyDatePickerTHModule } from 'mydatepicker-th';

const routes: Routes = [
    {
        path: '',
        data: {
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหาใบแจ้งความนำจับ', url: '/notice/list' },
                { title: 'จัดการข้อมูลใบแจ้งความนำจับ' }
            ],
            codePage: 'XCS60-02-02-00' 
        },
        component: ManageComponent
    }
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpModule,
        NgbModule.forRoot(),
        RouterModule.forChild(routes),
        CardActionsModule,
        SuspectModalModule,
        ModalLawbreakerModule,
        PrintDocModalModule,
        MyDatePickerTHModule
    ],
    declarations: [
        ManageComponent
    ], providers: [
        { provide: NgbDatepickerI18n, useClass: DatepickerI18nService },
        NoticeService,
        ArrestsService,
        ProveService
    ]
})
export class ManageModule { }
