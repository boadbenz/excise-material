import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    data: {
      urls: [
        { title: 'หน้าหลัก', url:'/'},
        { title: 'ค้นหางานเปรียบแทียบและชำระค่าปรับ', url:'/fine/list'},
        { title: 'จัดการข้อมูลงานเปรียบแทียบและชำระค่าปรับ'}
      ],
      pageType: 'manage'
    },
    component: ManageComponent
  }
];



@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ManageComponent
  ]
})
export class ManageModule { }
