import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { LawsuitService } from "./../lawsuit.service";
import { PaginationTableModule } from "../../component/pagination-table/pagination-table.module";
import { DetailComponent } from "./detail.component";
import { CardActionsModule } from "../../component/card-actions/card-actions.module";
import { PrintDocModalModule } from "../print-doc-modal/print-doc-modal.module";
import { StepWizardModule } from "../../component/step-wizard/step-wizard.module";

const routes: Routes = [
  {
    path: "",
    data: {
      urls: [
        { title: "หน้าหลัก", url: "/" },
        { title: "ค้นหาบันทึกรับคำกล่าวโทษ", url: "/lawsuit/list" },
        { title: "จัดการข้อมูลบันทึกรับคำกล่าวโทษ" },
        { title: "จัดการข้อมูลรายละเอียดบันทึกรับคำกล่าวโทษ" }
      ],
      pageType: "manage",
      codePage: "XCS60-04-03-00-00"
    },
    component: DetailComponent
  }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CardActionsModule,
    RouterModule.forChild(routes),
    PaginationTableModule,
    PrintDocModalModule,
    StepWizardModule
  ],
  providers: [LawsuitService],
  declarations: [DetailComponent]
})
export class DetailModule { }
