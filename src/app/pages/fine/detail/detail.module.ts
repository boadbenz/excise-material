import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    data: {
      urls: [
        { title: 'หน้าหลัก', url:'/'},
        { title: 'ค้นหางานเปรียบแทียบและชำระค่าปรับ', url:'/fine/list'},
        { title: 'จัดการข้อมูลงานเปรียบแทียบและชำระค่าปรับ', url:'/fine/detail'},
        { title: 'รายละเอียดฐานความผิดเดิม'}
      ],
      pageType: 'manage'
    },
    component: DetailComponent
  }
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
      DetailComponent
    ]
})
export class DetailModule { }
