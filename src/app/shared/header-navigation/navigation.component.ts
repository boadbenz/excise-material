import { NavigationService } from "./navigation.service";
import { Component } from "@angular/core";
import { RANGE_VALUE_ACCESSOR } from "@angular/forms/src/directives/range_value_accessor";

@Component({
  selector: "ma-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"]
})
export class NavigationComponent {
  printButton: any;
  editButton: any;
  deleteButton: any;
  cancelButton: any;
  saveButton: any;
  proofButton: any;
  searchBar: any;

  testData = [
    {
      name: "บันทึกรับคำกล่าวโทษ ส.ส.1/55",
      type: "แบบฟอร์ม"
    },
    {
      name: "บันทึกรับคำกล่าวโทษ ส.ส.1/55",
      type: "เอกสารแนบภายใน"
    },
    {
      name: "บันทึกคำให้การของผู้กล่าวโทษ ส.ส.2/54",
      type: "แบบฟอร์ม"
    },
    {
      name: "บันทึกคำให้การของผู้กล่าวโทษ ส.ส.2/54",
      type: "เอกสารแนบภายใน"
    },
    {
      name: "คำรองขอให้เปรียบเทียบคดี คด.1 ของนายธวัชชัย บิงขุนทด",
      type: "แบบฟอร์ม"
    },
    {
      name: "คำรองขอให้เปรียบเทียบคดี คด.1 ของนายธวัชชัย บิงขุนทด",
      type: "เอกสารแนบภายใน"
    },
    {
      name: "คำรองขอให้เปรียบเทียบคดี คด.1 ของนายสุชาติ ปัญโญใหญ่",
      type: "แบบฟอร์ม"
    },
    {
      name: "คำรองขอให้เปรียบเทียบคดี คด.1 ของนายสุชาติ ปัญโญใหญ่",
      type: "เอกสารแนบภายใน"
    }
  ];

  constructor(private navService: NavigationService) {
    this.printButton = this.navService.showPrintButton;
    this.editButton = this.navService.showEditButton;
    this.deleteButton = this.navService.showDeleteButton;
    this.cancelButton = this.navService.showCancelButton;
    this.saveButton = this.navService.showSaveButton;
    this.searchBar = this.navService.showSearchBar;
    this.proofButton = this.navService.showProofButton;
  }

  clickAdvSearch() {
    this.navService.setAdvSearch();
  }

  clickEdit() {
    this.navService.setEditField(false);
  }

  clickCancel() {
    this.navService.setEditField(true);
  }

  clickSave() {
    this.navService.setEditField(false);
  }
}
