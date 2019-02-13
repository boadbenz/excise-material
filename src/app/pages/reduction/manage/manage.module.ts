import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ManageComponent } from './manage.component';
import { ReductionApiService } from '../reduction.api.service';
import { ReductionModelListComponent } from './reduction-model-list/reduction-model-list.component';
import { PrintReductionModalModule } from '../print-doc-modal/print-doc-modal.module' 

const routes: Routes = [
  {
    path: '',
    data: {
      urls: [
        { title: 'หน้าหลัก', url: '' },
        { title: 'ค้นหารายการปรับเพิ่ม-ปรับลด', url: '/reduction/list' },
        { title: 'จัดการข้อมูลรายการปรับเพิ่ม-ปรับลด' }
      ],
      pageType: 'manage',
      codePage: 'ILG60-09-02-00-00',
      nextPage: { title: 'จัดการข้อมูลรายละเอียดการปรับเพิ่ม-ปรับลด', url: '/reduction/manage-det, ReductionModelListComponentail/:code' }
    },
    component: ManageComponent
  }

];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CardActionsModule,
    NgbModule.forRoot(),
    RouterModule.forChild(routes),
    PrintReductionModalModule
  ],
  declarations: [ManageComponent, ReductionModelListComponent],
  exports: [ ],
  providers: [ReductionApiService]
})
export class ManageModule { }
