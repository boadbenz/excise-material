import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
      path: '',
      data: {
          urls: [{ title: 'หน้าหลัก', url: '/' }, { title: 'ค้นหาคำร้องขอรับเงินสินบนรางวัล' }],
          pageType: 'list',
          nextPage: { title: 'จัดการข้อมูลคำร้องขอรับเงินสินบนรางวัล', url: '/reward/manage' }
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


