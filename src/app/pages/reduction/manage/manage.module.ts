import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ManageComponent } from './manage.component';
import { ReductionService } from '../reduction.service';
import { HttpClientModule } from '@angular/common/http';
import { PrintDocModalModule } from '../print-doc-modal/print-doc-modal.module';

const routes: Routes = [
  {
    path: '',
    data: {
      urls: [
        { title: "หน้าหลัก", url: '' },
        { title: "ค้นหารายการปรับเพิ่ม-ปรับลด", url: '/reduction/list' },
        { title: "จัดการข้อมูลรายการปรับเพิ่ม-ปรับลด" }
      ],
      pageType: 'manage',
      codePage: 'ILG60-09-02-00-00',
      nextPage: { title: 'จัดการข้อมูลรายละเอียดการปรับเพิ่ม-ปรับลด', url: '/reduction/manage-detail/:code' }
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
    PrintDocModalModule,
    RouterModule.forChild(routes)
  ],
  providers:[ReductionService],
  declarations: [ManageComponent]
})
export class ManageModule { }
