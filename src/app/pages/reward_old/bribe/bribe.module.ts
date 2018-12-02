import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BribeComponent } from './bribe.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';

const routes: Routes = [
  {
    path: '',
    data: {
      urls: [
        { title: 'หน้าหลัก', url:'/'},
        { title: 'ค้นหาคำร้องขอรับเงินสินบนรางวัล', url:'/reward/list'},
        { title: 'จัดการข้อมูลคำร้องขอรับเงินสินบนรางวัล', url:'/reward/manage'},
        { title: 'จัดการข้อมูลคำร้องขอรับเงินสินบน'}
      ],
      pageType: 'manage'
      // nextPage: { title: '...', url: '#' }
    },
    component: BribeComponent
  }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CardActionsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BribeComponent
  ]
})
export class BribeModule { }
