import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { ProveService } from '../prove.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ArrestService } from '../../model/arrest.service';
import { LawsuitService } from '../../model/lawsuit.service';
import { MasterService }  from '../../model/master.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
        HttpModule,
        HttpClientModule,
        CardActionsModule,
        MatAutocompleteModule
        //PrintDocModalModule
    ],
    providers: [ProveService,
        ArrestService,
        LawsuitService,
        MasterService
    ],
    declarations: [ManageComponent],
    exports: [MatAutocompleteModule]
})
export class ManageModule { }
