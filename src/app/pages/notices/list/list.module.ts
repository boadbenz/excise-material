import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    data: {
        // title: 'ค้นหาข้อมูล',
        urls: [{ title: 'หน้าหลัก', url: '/' }, { title: 'ค้นหาใบแจ้งความนำจับ' }]
    },
    component: ListComponent
}
]

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListComponent]
})
export class ListModule { }
