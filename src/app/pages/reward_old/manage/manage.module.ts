import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
    {
        path: '',
        data: {
            urls: [
                { title: 'หน้าหลัก', url: '/'},
                { title: 'ค้นหาคำร้องขอรับเงินสินบนรางวัล', url: '/reward/list'},
                { title: 'จัดการข้อมูลคำร้องขอรับเงินสินบนรางวัล'}
            ],
            pageType: 'manage'
            // nextPage: { title: '...', url: '#' }
        },
        component: ManageComponent
    }
];



@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        CardActionsModule,
        HttpClientModule,
        NgbModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ManageComponent
    ]
})
export class ManageModule { }
