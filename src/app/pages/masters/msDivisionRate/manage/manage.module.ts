import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardActionsModule } from '../../../component/card-actions/card-actions.module';
import { MasterService } from '../../masters.service';
// import { IncomeService } from '../../income/income.service';
// import { ProveService } from '../../prove/prove.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { PrintDocModalModule } from '../../printdoc-modal/printdoc-modal.module';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { PaginationTableModule } from '../../../component/pagination-table/pagination-table.module';
import { IsActivePipeModule } from '../../../../shared/pipe/IsActivePipe.module';
// import { EvidenceOutService } from '../../evidenceOut/evidenceOut.service';
//import { IsActivePipe } from '../../../shared/pipe/IsActivePipe';

const routes: Routes = [
    {
        path: '',
        data: {
            // title: 'จัดการข้อมูล',
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'การจัดการสัดส่วนการแบ่งเงิน' },
                
            ],
            nextPage: { title: '', url: '' },
            codePage: 'ILG60-99-16-01-00'
        },
        component: ManageComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forChild(routes),
        CardActionsModule,
        // PrintDocModalModule,
        MyDatePickerTHModule,
        MatAutocompleteModule,
        PaginationTableModule,
        IsActivePipeModule
    ],
    declarations: [ManageComponent],
    providers: [MasterService],
    exports: [MatAutocompleteModule]
})
export class ManageModule { }
