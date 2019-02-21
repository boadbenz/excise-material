import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { FineService } from '../fine.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ArrestService } from '../../model/arrest.service';
import { LawsuitService } from '../../model/lawsuit.service';
import { MasterService }  from '../../model/master.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PrintDocModalModule } from '../printdoc-modal/printdoc-modal.module';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { MyDatePickerModule } from 'mydatepicker';

const routes: Routes = [
  {
    path: '',
    data: {
      urls: [
        { title: 'หน้าหลัก', url: '/' },
        { title: 'ค้นหางานเปรียบแทียบและชำระค่าปรับ', url: '/fine/list' },
        { title: 'จัดการข้อมูลงานเปรียบแทียบและชำระค่าปรับ' }
      ],
      codePage: "ILG60-06-02-00-00",
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
      PrintDocModalModule,
      MyDatePickerTHModule,
      MyDatePickerModule
  ],
  providers: [FineService,
      ArrestService,
      LawsuitService,
      MasterService
  ],
  declarations: [ManageComponent],
  exports: [MatAutocompleteModule]
})
export class ManageModule { }
