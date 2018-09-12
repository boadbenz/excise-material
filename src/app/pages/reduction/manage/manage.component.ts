import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ReductionService } from '../reduction.service';
import { toLocalShort, toTimeShort } from '../../../config/dateFormat';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {


  tableData = [
    {
      fullName: "นายธวัชชัย บิงขุนทด",
      oldFine: "1,400,000.00",
      newFine: "",
      dateFine: "10-ม.ค.-2560",
      payment: "เงินสด",
      receiptNo: "33",
      receiptRef: "001/2561",
      statusCase: "รับรายการนำส่ง",
      typeCase: "เปรียบเทียบคดี",
      period: "1/1"
    },
    {
      fullName: "นายสุชาติ ปัญโญใหญ่",
      oldFine: "1,400,000.00",
      newFine: "",
      dateFine: "10-ม.ค.-2560",
      payment: "เงินสด",
      receiptNo: "33",
      receiptRef: "001/2561",
      statusCase: "รับรายการนำส่ง",
      typeCase: "เปรียบเทียบคดี",
      period: "1/1"
    },
  ];

  listData = [{
    arrestCode: "TN90806026000001",
    lawsuitNo: "001/2561",
    proofNo: "001/2561",
    caseNumber: "001/2561",
    titleName: "นาย",
    firstName: "ธวัชชัย",
    lastName: "บิงขุนทด",
    lawsuitDate: "10-ม.ค.-2560",
    lawsuitTime: "12.00",
    departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี",
    positionlawName: "เจ้าพนักงานสรรพสามิตชำนาญงาน",
    locationlawName: "คลองจั่น/บางกะปิ/กรุงเทพมหานคร",
    faultSubject: "มีไว้ในครอบครองซึ่งสินค้าที่มิได้เสียภาษี",
    faultNo: "203",
    penalty: "กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ 5 เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า"

  },
  {
    arrestCode: "TN90806026000002",
    lawsuitNo: "น.001/2561",
    proofNo: "น.001/2561",
    caseNumber: "001/2561",
    titleName: "นาย",
    firstName: "ธวัชชัย",
    lastName: "บิงขุนทด",
    lawsuitDate: "19-มี.ค.-2560",
    lawsuitTime: "12.00",
    departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี",
    positionlawName: "เจ้าพนักงานสรรพสามิตชำนาญงาน",
    locationlawName: "คลองจั่น/บางกะปิ/กรุงเทพมหานคร",
    faultSubject: "มีไว้ในครอบครองซึ่งสินค้าที่มิได้เสียภาษี",
    faultNo: "203",
    penalty: "กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ 5 เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า"

  },
  {
    arrestCode: "TN90806026000003",
    lawsuitNo: "002/2561",
    proofNo: "002/2561",
    caseNumber: "002/2561",
    titleName: "นาย",
    firstName: "ธวัชชัย",
    lastName: "บิงขุนทด",
    lawsuitDate: "22-ต.ค.-2560",
    lawsuitTime: "12.00",
    departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี",
    positionlawName: "เจ้าพนักงานสรรพสามิตชำนาญงาน",
    locationlawName: "คลองจั่น/บางกะปิ/กรุงเทพมหานคร",
    faultSubject: "มีไว้ในครอบครองซึ่งสินค้าที่มิได้เสียภาษี",
    faultNo: "203",
    penalty: "กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ 5 เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า"
  },
  {
    arrestCode: "TN90806026000004",
    lawsuitNo: "003/2561",
    proofNo: "003/2561",
    caseNumber: "003/2561",
    titleName: "นาย",
    firstName: "ธวัชชัย",
    lastName: "บิงขุนทด",
    lawsuitDate: "11-ธ.ค.-2560",
    lawsuitTime: "12.00",
    departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี",
    positionlawName: "เจ้าพนักงานสรรพสามิตชำนาญงาน",
    locationlawName: "คลองจั่น/บางกะปิ/กรุงเทพมหานคร",
    faultSubject: "มีไว้ในครอบครองซึ่งสินค้าที่มิได้เสียภาษี",
    faultNo: "203",
    penalty: "กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ 5 เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า"
  },
  {
    arrestCode: "TN90806026000005",
    lawsuitNo: "004/2561",
    proofNo: "004/2561",
    caseNumber: "004/2561",
    titleName: "นาย",
    firstName: "ธวัชชัย",
    lastName: "บิงขุนทด",
    lawsuitDate: "03-มี.ค.-2561",
    lawsuitTime: "12.00",
    departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี",
    positionlawName: "เจ้าพนักงานสรรพสามิตชำนาญงาน",
    locationlawName: "คลองจั่น/บางกะปิ/กรุงเทพมหานคร",
    faultSubject: "มีไว้ในครอบครองซึ่งสินค้าที่มิได้เสียภาษี",
    faultNo: "203",
    penalty: "กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ 5 เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า"
  }]

  fileItem = [{
    fileName: "",
    filePath: "",
  }];
  tableDataModal: Array<any> = [];
  fullName: any;
  detailData: any;
  showField: any;
  navServiceSub: any;
  selectAll: any;
  private getDataFromListPage: any;
  paramsCode: number;
  Arrest: any;
  fullNameComparer: string;
  AdjustComparegetByConRs: any = {};
  ArrestgetByConList: Array<any> = [];
  @ViewChild('reductionPopup') modalReduction: ElementRef;
  @ViewChild('printDocModal') printDocModel: ElementRef;
  modal: any;
  printModalRs: Array<any> = [];
  compareId: number;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private navService: NavigationService,
    private reductionService: ReductionService,
    private ngbModel: NgbModal
  ) { }

  ngOnInit() {

    //set show button
    this.navServiceSub = this.navService.showFieldEdit.subscribe(status => {
      this.showField = status;
      if (!this.showField) {
        this.navService.setCancelButton(true);
        this.navService.setSaveButton(true);
        this.navService.setPrintButton(false);
        this.navService.setSearchBar(false);
        this.navService.setDeleteButton(false);
        this.navService.setEditButton(false);

      } else {
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditButton(true);
        this.navService.setSearchBar(false);
        this.navService.setCancelButton(false);
        this.navService.setSaveButton(false);
      }
    });

    this.navService.onPrint.subscribe(data => {
      // console.log(data);
      if (data) {
        this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
        this.navService.setPrintButton(false);
      }
    })


    this.getDataFromListPage = this.activeRoute.queryParams
      .subscribe(params => {
        //check id from list page
        this.paramsCode = params.code;
        for (let i = 0; i < this.listData.length; i++) {
          if (i == 0) {
            this.detailData = this.listData[i];
            this.fullName =
              this.listData[i].titleName +
              this.listData[i].firstName +
              " " +
              this.listData[i].lastName;
          }
        }
        this.compareId = params.code;
        this.initManage(params.code);
      });


  }

  async initManage(code) {
    await this.reductionService.AdjustComparegetByCon(code).then(data => {
      this.detailData.CompareCode = data.CompareCode;
      this.detailData.CompareDate = toLocalShort(data.CompareDate);
      this.detailData.CompareTime = toTimeShort(data.CompareDate);
      this.detailData.fullNameComparer = data.AdjustCompareStaff[0].TitleName + data.AdjustCompareStaff[0].FirstName + ' ' + data.AdjustCompareStaff[0].LastName;
      this.detailData.positionComparer = data.AdjustCompareStaff[0].PositionName;
      this.detailData.departmentComparer = data.AdjustCompareStaff[0].DepartmentName;
      //PositionName
      this.AdjustComparegetByConRs = data;
      this.findArrest(data.ArrestCode, data.LawsuitID);
    });
  }
  async findArrest(ArrestCode, LawsuitID) {
    await this.reductionService.ArrestgetByCon(ArrestCode).then(data => {
      // console.log(data);
      // this.detailData = data[0];
      if (data && data.length > 0 && data[0].ArrestStaff.length > 0) {
        this.detailData.ArrestCode = data[0].ArrestCode;
        this.detailData.OccurrenceDate = toLocalShort(data[0].OccurrenceDate);
        this.detailData.OccurrenceTime = toTimeShort(data[0].OccurrenceDate);
        this.fullName = data[0].ArrestStaff[0].TitleName + data[0].ArrestStaff[0].FirstName + ' ' + data[0].ArrestStaff[0].LastName;
        if (data[0].ArrestStaff.length > 0) {
          this.detailData.positionlawName = data[0].ArrestStaff[0].PositionName;
          this.detailData.departmentlawName = data[0].ArrestStaff[0].DepartmentName;
        } else {
          this.detailData.positionlawName = '';
          this.detailData.departmentlawName = '';
        }
        this.detailData.locationlawName = data[0].ArrestLocale.length > 0 ? data[0].ArrestLocale[0].SubDistrict + data[0].ArrestLocale[0].District + data[0].ArrestLocale[0].Province : '';
      }

      this.ArrestgetByConList = data;
      this.resModal();
      this.resData();
      this.findLawsuilt(LawsuitID);
    });
  }

  async findLawsuilt(LawsuitID) {
    await this.reductionService.LawsuiltgetByCon(LawsuitID).then(data => {
      // console.log(data);
      this.detailData.lawsuitNo = data[0].ArrestIndicment[0].Lawsuit[0].LawsuitNo;
      this.detailData.lawsuitDate = toLocalShort(data[0].ArrestIndicment[0].Lawsuit[0].LawsuitDate);
      this.detailData.lawsuitTime = data[0].ArrestIndicment[0].Lawsuit[0].LawsuitTime;
      let GuiltBaseID = data[0].ArrestIndicment[0].GuiltBaseID;
      this.findAdjustCompareMasLawgetByConAdv(GuiltBaseID);
    });
  }

  async findAdjustCompareMasLawgetByConAdv(GuiltBaseID) {
    await this.reductionService.AdjustCompareMasLawgetByConAdv(GuiltBaseID).then(data => {
      // console.log(data);
      this.detailData.faultWornNo = data.AdjustCompareMasLawSection[0].SectionName;
      this.detailData.faultSubject = data.AdjustCompareMasLawGuiltbase[0].GuiltBaseName;
      this.detailData.faultNo = data.AdjustCompareMasLawSection[0].SectionNo;
      this.detailData.penalty = ''; //PenaltyDesc
    });
  }

  resData() {
    // tableData = [
    //   {
    //     fullName: "นายธวัชชัย บิงขุนทด",
    //     oldFine: "1,400,000.00",
    //     newFine: "",
    //     dateFine: "10-ม.ค.-2560",
    //     payment: "เงินสด",
    //     receiptNo: "33",
    //     receiptRef: "001/2561",
    //     statusCase: "รับรายการนำส่ง",
    //     typeCase: "เปรียบเทียบคดี",
    //     period: "1/1"
    //   }
    this.tableData = [];

    this.ArrestgetByConList.forEach(data => {
      data.ArrestLawbreaker.forEach(law => {
        let name = '';
        if (law.EntityType == 1) {
          name = law.LawbreakerTitleName +
            law.LawbreakerFirstName +
            law.LawbreakerMiddleName +
            law.LawbreakerLastName;
        } else if (law.EntityType == 1) {
          name = law.CompanyTitle + law.CompanyName;
        }
        this.tableData.push({
          fullName: name,
          oldFine: "",
          newFine: "",
          dateFine: "",
          payment: "",
          receiptNo: "",
          receiptRef: "",
          statusCase: "",
          typeCase: "",
          period: ""
        });
      })
    });

  }

  resModal() {
    this.ArrestgetByConList.forEach(data => {
      data.ArrestLawbreaker.forEach(law => {
        let name = '';
        if (law.EntityType == 1) {
          name = law.LawbreakerTitleName +
            law.LawbreakerFirstName +
            law.LawbreakerMiddleName +
            law.LawbreakerLastName;
        } else if (law.EntityType == 1) {
          name = law.CompanyTitle + law.CompanyName;
        }
        this.tableDataModal.push({
          fullName: name,
          LawbreakerReferenceID: law.LawbreakerRefID,
          receiptRef: this.AdjustComparegetByConRs.CompareCode,
          dateFine: toLocalShort(this.AdjustComparegetByConRs.CompareDate)
        });
      })
    });
  }

  next() {
    console.log(this.selectAll);
  }

  viewData(id: string) {
    this.router.navigate(['/reduction/manage', 'R', this.detailData.arrestCode], { queryParams: { id: id } });
  }

  editData(id: string) {
    this.router.navigate(['/reduction/manage', 'R', this.detailData.arrestCode], { queryParams: { id: id } });
  }

  attachFile(file) {
    this.fileItem.push({
      fileName: file[0].name,
      filePath: ""
    });
  }

  showReductionPopup(reductionPopup) {
    if (!this.showField) {
      reductionPopup.setAttribute("data-toggle", "modal");
      reductionPopup.setAttribute("data-target", "#reductionPopup");
      reductionPopup.click();
      reductionPopup.setAttribute("data-toggle", "");
      reductionPopup.setAttribute("data-target", "");
    }
  }

  ngOnDestroy() {
    this.getDataFromListPage.unsubscribe();
    this.navServiceSub.unsubscribe();
  }
}
