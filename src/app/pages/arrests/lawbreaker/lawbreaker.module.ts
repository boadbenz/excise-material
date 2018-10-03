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
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { MainMasterService } from '../../../services/main-master.service';

const routes: Routes = [
    {
        path: '',
        data: {
            // title: 'จัดการข้อมูล',
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหางานจับกุม', url: '/arrest/list' },
                { title: 'จัดการข้อมูลงานจับกุม', url: '/arrest/manage/C/NEW' },
                { title: 'จัดการข้อมูลผู้ต้องหา' }
            ],
            codePage: 'ILG60-03-02-03-00',
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
        MainMasterService,
        
    ]
})
export class LawbreakerModule { }
