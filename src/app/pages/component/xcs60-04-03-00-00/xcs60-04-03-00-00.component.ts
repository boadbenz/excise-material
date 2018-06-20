import { Xcs6004030000Service } from "./xcs60-04-03-00-00.service";
import { NavigationService } from "./../../../shared/header-navigation/navigation.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-xcs60-04-03-00-00",
  templateUrl: "./xcs60-04-03-00-00.component.html",
  styleUrls: ["./xcs60-04-03-00-00.component.css"]
})
export class Xcs6004030000Component implements OnInit {
  testData = [
    {
      itemName: "สุรา/สุราแช่/ชนิดเบียร์/Hoegaarden/Witbier/330 มล.",
      number: 12,
      unit: "หน่วย",
      netAmount: 3960,
      unitNet: "มิลลิลิตร"
    },
    {
      itemName: "สุรา/สุรากลั่น/ชนิดอื่นๆ/Black Label/Blended Wrisky/1000 มล.",
      number: 12,
      unit: "หน่วย",
      netAmount: 12000,
      unitNet: "มิลลิลิตร"
    }
  ];

  condemnTableData = [
    {
      fullName: "นายธวัชชัย บิงขุนทด",
      type: "เปรียบเทียบคดี",
      caseEnd: "กรมสรรพสามิต",
      descExhibit: this.testData
    },
    {
      fullName: "นายสุชาติ ปัญโญใหญ่",
      type: "ส่งฟ้องศาล",
      caseEnd: "ศาล",
      descExhibit: this.testData
    }
  ];

  allegationData: any;
  condemnData: any;
  showField: any;
  allegationYear: any;
  allegationNumber: any;
  showPopUp: boolean = false;
  fileItem = [{
    fileName: "",
    filePath: "",
  }];
  fullName: any;

  constructor(
    private navService: NavigationService,
    private xcs600403: Xcs6004030000Service
  ) {
    this.navService.showFieldEdit.subscribe(status => {
      this.showField = status;
      if (!this.showField) {
        this.navService.setPrintButton(false);
        this.navService.setSearchBar(false);
        this.navService.setDeleteButton(false);
        this.navService.setCancelButton(true);
        this.navService.setEditButton(false);
        this.navService.setSaveButton(true);
        this.navService.setProofButton(false);
      } else {
        this.navService.setPrintButton(true);
        this.navService.setSearchBar(false);
        this.navService.setDeleteButton(true);
        this.navService.setCancelButton(false);
        this.navService.setEditButton(true);
        this.navService.setSaveButton(false);
        this.navService.setProofButton(true);
      }
    });

    this.allegationData = this.xcs600403.detailAllegation;
    this.condemnData = this.xcs600403.detailCondemn;
    var splitSlash = this.allegationData.allegationCode.split("/");
    this.allegationNumber = splitSlash[0];
    this.allegationYear = splitSlash[1];

    this.fullName =
      this.condemnData.titleName +
      this.condemnData.firstName +
      " " +
      this.condemnData.lastName;
  }

  ngOnInit() {
    this.navService.setPrintButton(true);
    this.navService.setSearchBar(false);
    this.navService.setDeleteButton(true);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(true);
    this.navService.setSaveButton(false);
    this.navService.setProofButton(true);

    this.navService.setEditField(true);
  }

  attachFile(file) {
    this.fileItem.push({
      fileName: file[0].name,
      filePath: ""
    });
  }

}
