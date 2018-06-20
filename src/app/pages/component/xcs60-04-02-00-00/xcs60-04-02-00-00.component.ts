import { Xcs6004020000Service } from "./xcs60-04-02-00-00.service";
import { NavigationService } from "./../../../shared/header-navigation/navigation.service";
import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Xcs6004030000Service } from "../xcs60-04-03-00-00/xcs60-04-03-00-00.service";

@Component({
  selector: "app-xcs60-04-02-00-00",
  templateUrl: "./xcs60-04-02-00-00.component.html",
  styleUrls: ["./xcs60-04-02-00-00.component.css"]
})
export class Xcs6004020000Component implements OnInit {
  tableData = [
    {
      allegationCode: "001/2561",
      allegationNo: "203",
      allegationSubject:
        "มีไว้ในครอบครองซึ่งสินค้าที่มิได้เสียภาษีหรือเสียมีไว้ในครอบครองซึ่งสินค้าที่มิได้เสียภาษีหรือเสีย",
      allegationStatus: "รับเป็นคดี",
      allegationPenalty:
        "กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ 5 เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า"
    },
    {
      allegationCode: "001/2561",
      allegationNo: "203",
      allegationSubject:
        "ขายหรือมีไว้เพื่อขายที่เป็นสินค้าที่มิได้เสียภาษีหรือขายหรือมีไว้เพื่อขายที่เป็นสินค้าที่มิได้เสียภาษีหรือ",
      allegationStatus: "ไม่รับเป็นคดี",
      allegationPenalty:
        "กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ 5 เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า"
    }
  ];
  detailData: any;
  fullName: any;

  constructor(
    private router: Router,
    private navService: NavigationService,
    private xcs600402: Xcs6004020000Service,
    private xcs600403: Xcs6004030000Service
  ) {}

  ngOnInit() {
    this.navService.setPrintButton(true);
    this.navService.setSearchBar(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);
    this.navService.setProofButton(false);

    this.detailData = this.xcs600402.detailData;
    this.fullName =
      this.detailData.titleName +
      this.detailData.firstName +
      " " +
      this.detailData.lastName;
  }

  viewData(item) {
    var data = {
      allegation: item,
      condemn: this.detailData
    };
    this.xcs600403.getData(data);
    this.router.navigate(["ILG60-04-03-00"]);
  }
}
