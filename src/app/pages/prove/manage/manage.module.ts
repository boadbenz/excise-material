import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { EvidenceModalModule } from '../evidence-modal/evidence-modal.module';
//import { PrintDocModalModule } from '../printdoc-modal/printdoc-modal.module';

const routes: Routes = [
    {
        path: '',
        data: {
            // title: 'จัดการข้อมูล',
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหางานตรวจรับและพิสูจน์ของกลาง', url: '/proof/list' },
                { title: 'จัดการข้อมูลงานตรวจรับและพิสูจน์ของกลาง' }
            ],
            nextPage: { title: 'งานตรวจรับและพิสูจน์ของกลาง', url: '/proof/manage' }
        },
        component: ManageComponent
    }
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes),
        CardActionsModule,
        EvidenceModalModule,
        //PrintDocModalModule
    ],
    declarations: [
        ManageComponent
    ]
})
export class ManageModule { }
