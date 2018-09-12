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
import { PrintDocModalModule } from '../printdoc-modal/printdoc-modal.module';
import { IsActivePipe } from '../../../shared/pipe/IsActivePipe';

const routes: Routes = [
    {
        path: '',
        data: {
            // title: 'จัดการข้อมูล',
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหางานตรวจรับและพิสูจน์ของกลาง', url: '/prove/list' },  
                { title: 'จัดการข้อมูลงานตรวจรับและพิสูจน์ของกลาง' }
            ],
            nextPage: { title: 'งานตรวจรับและพิสูจน์ของกลาง', url: '/prove/manage' }
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
        MatAutocompleteModule,
        PrintDocModalModule
    ],
    providers: [ProveService,
        ArrestService,
        LawsuitService,
        MasterService
    ],
    declarations: [ManageComponent,IsActivePipe],
    exports: [MatAutocompleteModule]
})
export class ManageModule { }
