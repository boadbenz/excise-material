import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { Xcs6004030000Component } from "./xcs60-04-03-00-00.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "จัดการข้อมูลรายละเอียดบันทึกรับคำกล่าวโทษ",
      urls: [
        { title: "หน้าหลัก", url: '/' },
        { title: 'ค้นหาบันทึกรับคำกล่าวโทษ' , url: 'ILG60-04-01-00' },
        { title: "จัดการข้อมูลบันทึกรับคำกล่าวโทษ", url: 'ILG60-04-02-00' },
        { title: "จัดการข้อมูลรายละเอียดบันทึกรับคำกล่าวโทษ" }
      ],
      code: "XCS60-04-03-00-00"
    },
    component: Xcs6004030000Component
  }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [Xcs6004030000Component]
})
export class Xcs6004030000Module {}
