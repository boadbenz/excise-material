import { LawsuitService } from "../lawsuit.service";
import { CardActionsModule } from "../../component/card-actions/card-actions.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ManageComponent, DialogJudgment } from "./manage.component";
import { NavigationComponent } from "../../../shared/header-navigation/navigation.component";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { NgbDatepickerI18n, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SuspectModalModule } from "../../component/suspect-modal/suspect-modal.module";
import { ModalLawbreakerModule } from "../../component/modal-lawbreaker/modal-lawbreaker.module";
import { PrintLawsuitModalModule } from '../print-doc-modal/print-doc-modal.module';
import { DatepickerI18nService } from "../../../services/datepicker-i18n.service";
import { MatDialogModule } from '@angular/material/dialog';
import { ArrestsService } from "../../arrests/arrests.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProveService } from "../../prove/prove.service";
import { BrowserModule } from "@angular/platform-browser";
import { DetailModule } from "../detail/detail.module";
import { MyDatePickerTHModule } from "mydatepicker-th";
import { MyDatePickerModule } from "mydatepicker";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
const routes: Routes = [
  {
    path: "",
    data: {
      urls: [
        { title: "หน้าหลัก", url: "/" },
        { title: "ค้นหาบันทึกรับคำกล่าวโทษ", url: "/lawsuit/list" },
        { title: "จัดการข้อมูลบันทึกรับคำกล่าวโทษ" }
      ],
      pageType: "manage",
      codePage: "XCS60-04-02-00-00",
      nextPage: {
        title: "จัดการข้อมูลรายละเอียดบันทึกรับคำกล่าวโทษ",
        url: "/lawsuit/detail/"
      }
    },
    component: ManageComponent
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
    MatDialogModule,
    MyDatePickerTHModule,
    MyDatePickerModule,
    MatAutocompleteModule
    // DetailModule,
  ],
  entryComponents: [DialogJudgment],
  declarations: [
    ManageComponent,
    DialogJudgment
  ], providers: [
    { provide: NgbDatepickerI18n, useClass: DatepickerI18nService },
    LawsuitService,
    ArrestsService,
    ProveService
  ]
})
export class ManageModule { }
