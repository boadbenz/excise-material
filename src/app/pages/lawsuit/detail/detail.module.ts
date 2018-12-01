import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LawsuitService } from "../lawsuit.service";
import { PaginationTableModule } from "../../component/pagination-table/pagination-table.module";
import { DetailComponent } from "./detail.component";
import { CardActionsModule } from "../../component/card-actions/card-actions.module";
import { PrintLawsuitModalModule } from "../print-doc-modal/print-doc-modal.module";
import { StepWizardModule } from "../../component/step-wizard/step-wizard.module";
import { HttpClientModule } from "../../../../../node_modules/@angular/common/http";
import { HttpModule } from "@angular/http";
import { NgbDatepickerI18n, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SuspectModalModule } from "../../component/suspect-modal/suspect-modal.module";
import { ModalLawbreakerModule } from "../../component/modal-lawbreaker/modal-lawbreaker.module";
import { ManageComponent } from "../manage/manage.component";
import { DatepickerI18nService } from "../../../services/datepicker-i18n.service";
import { ArrestsService } from "../../arrests/arrests.service";
import { ProveService } from "../../prove/prove.service";
import { ManageModule } from "app/pages/lawsuit/manage/manage.module";

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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forChild(routes),
    CardActionsModule,
    SuspectModalModule,
    ModalLawbreakerModule,
    PrintLawsuitModalModule,
    PaginationTableModule,
    StepWizardModule,
    ManageModule
  ],
  exports: [DetailComponent],
  declarations: [
    DetailComponent
  ], providers: [
    { provide: NgbDatepickerI18n, useClass: DatepickerI18nService },
    LawsuitService,
    ArrestsService,
    ProveService
  ]
})
export class DetailModule { }
