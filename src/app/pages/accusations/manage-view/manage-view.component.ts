import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';


@Component({
  selector: 'app-manage-view',
  templateUrl: './manage-view.component.html'
})
export class ManageViewComponent implements OnInit {

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
  listData = [{
    ArrestCode: "TN90806026000001",
    LawsuitNo: "001/2561",
    LawsuitDate: "10-ม.ค.-2560",
    lawsuitTime: "12.14",
    TitleName: "นาย",
    FirstName: "ธวัชชัย",
    LastName: "บิงขุนทด",
    DepartmentName: "สสท.ระนอง สาขาเมืองกระบุรี",
    positionLawName: "เจ้าพนักงานสรรพสามิตชำนาญงาน",
  }]
  fullName: any;
  detailData: any;
  private getDataFromListPage: any;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private navService: NavigationService) { }

  ngOnInit() {

    //set show button
    this.navService.setPrintButton(true);
    this.navService.setNewButton(false);
    this.navService.setSearchBar(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);

    this.detailData = this.listData[0];
    this.getDataFromListPage = this.activeRoute.queryParams
      .subscribe(params => {
        //check id from list page
        for (let i = 0; i < this.listData.length; i++) {
          if (params.code == this.listData[i].ArrestCode) {
            this.detailData = this.listData[i];
            this.fullName =
              this.listData[i].TitleName +
              this.listData[i].FirstName +
              " " +
              this.listData[i].LastName;
          }
        }
      });
  }

  viewData(id: string) {
    this.router.navigate(['/accusations/manage', 'R', this.detailData.arrestCode], { queryParams: { id: id } });
  }

  ngOnDestroy() {
    this.getDataFromListPage.unsubscribe();
  }

}
