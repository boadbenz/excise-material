import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
<<<<<<< HEAD
import { LawbreakerModalModule } from '../../arrests/lawbreaker-modal/lawbreaker-modal.module';
=======
import { NoticeService } from '../notice.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SuspectModalModule } from '../../component/suspect-modal/suspect-modal.module';
import { PrintDocModalModule } from '../print-doc-modal/print-doc-modal.module';
import { ArrestsService } from '../../arrests/arrests.service';
<<<<<<< HEAD
>>>>>>> FL_J
=======
import { ModalLawbreakerModule } from '../../component/modal-lawbreaker/modal-lawbreaker.module';
>>>>>>> FL_J

const routes: Routes = [
    {
        path: '',
        data: {
            // title: 'จัดการข้อมูล',
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหาใบแจ้งความนำจับ', url: '/notice/list' },
                { title: 'จัดการข้อมูลใบแจ้งความนำจับ' }
            ],
            nextPage: { title: 'งานจับกุม', url: '/arrest/manage' }
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
        RouterModule.forChild(routes),
        CardActionsModule,
        SuspectModalModule,
        ModalLawbreakerModule,
        PrintDocModalModule
    ],
    declarations: [
        ManageComponent
<<<<<<< HEAD
    ]
=======
    ], providers: [NoticeService, ArrestsService]
>>>>>>> FL_J
})
export class ManageModule { }
