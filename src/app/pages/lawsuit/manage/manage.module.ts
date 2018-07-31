import { LawsuitService } from "../lawsuit.service";
import { CardActionsModule } from "../../component/card-actions/card-actions.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ManageComponent } from "./manage.component";
import { NavigationComponent } from "../../../shared/header-navigation/navigation.component";

const routes: Routes = [
  {
    path: "",
    data: {
      urls: [
        { title: "หน้าหลัก", url: "" },
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
    FormsModule,
    CommonModule,
    CardActionsModule,
    RouterModule.forChild(routes)
  ],
  providers: [NavigationComponent, LawsuitService],
  declarations: [ManageComponent]
})
export class ManageModule {}
