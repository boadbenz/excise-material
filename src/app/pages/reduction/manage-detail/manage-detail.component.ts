import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { ReductionApiService } from '../reduction.api.service';

@Component({
  selector: 'app-manage-detail',
  templateUrl: './manage-detail.component.html',
  styleUrls: ['./manage-detail.component.scss']
})
export class ManageDetailComponent implements OnInit, OnDestroy {

  approveDataTable = [{
    fullName: 'นายธวัชชัย บิงขุนทด',
    dateReport: '10-ม.ค.-2560',
    typeApprove: 'แบบอนุมัติ 4'
  }, {
    fullName: 'นายสุชาติ ปัญโญใหญ่',
    dateReport: '',
    typeApprove: ''
  }];

  reductionDataTable = [];

  payFineDataTable = [];


  listData = [
    {
      arrestCode: 'TN90806026000001',
      lawsuitNo: '001/2561',
      proofNo: '001/2561',
      caseNumber: '001/2561',
      titleName: 'นาย',
      firstName: 'ธวัชชัย',
      lastName: 'บิงขุนทด',
      lawsuitDate: '10-ม.ค.-2560',
      lawsuitTime: '12.00',
      departmentlawName: 'สสท.ระนอง สาขาเมืองกระบุรี',
      positionlawName: 'เจ้าพนักงานสรรพสามิตชำนาญงาน',
      locationlawName: 'คลองจั่น/บางกะปิ/กรุงเทพมหานคร',
      faultSubject: 'มีไว้ในครอบครองซึ่งสินค้าที่มิได้เสียภาษี',
      faultNo: '203',
      penalty: 'กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ '
            + ' 5 เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า'

    }, {
      arrestCode: 'TN90806026000002',
      lawsuitNo: 'น.001/2561',
      proofNo: 'น.001/2561',
      caseNumber: '001/2561',
      titleName: 'นาย',
      firstName: 'ธวัชชัย',
      lastName: 'บิงขุนทด',
      lawsuitDate: '19-มี.ค.-2560',
      lawsuitTime: '12.00',
      departmentlawName: 'สสท.ระนอง สาขาเมืองกระบุรี',
      positionlawName: 'เจ้าพนักงานสรรพสามิตชำนาญงาน',
      locationlawName: 'คลองจั่น/บางกะปิ/กรุงเทพมหานคร',
      faultSubject: 'มีไว้ในครอบครองซึ่งสินค้าที่มิได้เสียภาษี',
      faultNo: '203',
      penalty: 'กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า'
             + ' เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ 5 เท่า กระทำผิดครั้งที่ 2 ปรับ 5'
             + ' เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า'

    }, {
      arrestCode: 'TN90806026000003',
      lawsuitNo: '002/2561',
      proofNo: '002/2561',
      caseNumber: '002/2561',
      titleName: 'นาย',
      firstName: 'ธวัชชัย',
      lastName: 'บิงขุนทด',
      lawsuitDate: '22-ต.ค.-2560',
      lawsuitTime: '12.00',
      departmentlawName: 'สสท.ระนอง สาขาเมืองกระบุรี',
      positionlawName: 'เจ้าพนักงานสรรพสามิตชำนาญงาน',
      locationlawName: 'คลองจั่น/บางกะปิ/กรุงเทพมหานคร',
      faultSubject: 'มีไว้ในครอบครองซึ่งสินค้าที่มิได้เสียภาษี',
      faultNo: '203',
      penalty: 'กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ 5'
             + ' เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า'
    }, {
      arrestCode: 'TN90806026000004',
      lawsuitNo: '003/2561',
      proofNo: '003/2561',
      caseNumber: '003/2561',
      titleName: 'นาย',
      firstName: 'ธวัชชัย',
      lastName: 'บิงขุนทด',
      lawsuitDate: '11-ธ.ค.-2560',
      lawsuitTime: '12.00',
      departmentlawName: 'สสท.ระนอง สาขาเมืองกระบุรี',
      positionlawName: 'เจ้าพนักงานสรรพสามิตชำนาญงาน',
      locationlawName: 'คลองจั่น/บางกะปิ/กรุงเทพมหานคร',
      faultSubject: 'มีไว้ในครอบครองซึ่งสินค้าที่มิได้เสียภาษี',
      faultNo: '203',
      penalty: 'กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ 5'
             + ' เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า'
    }, {
      arrestCode: 'TN90806026000005',
      lawsuitNo: '004/2561',
      proofNo: '004/2561',
      caseNumber: '004/2561',
      titleName: 'นาย',
      firstName: 'ธวัชชัย',
      lastName: 'บิงขุนทด',
      lawsuitDate: '03-มี.ค.-2561',
      lawsuitTime: '12.00',
      departmentlawName: 'สสท.ระนอง สาขาเมืองกระบุรี',
      positionlawName: 'เจ้าพนักงานสรรพสามิตชำนาญงาน',
      locationlawName: 'คลองจั่น/บางกะปิ/กรุงเทพมหานคร',
      faultSubject: 'มีไว้ในครอบครองซึ่งสินค้าที่มิได้เสียภาษี',
      faultNo: '203',
      penalty: 'กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ 5'
             + ' เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า'
    }]

  public detailData = {
    ArrestCode: '',
    ArrestDate: '',
    ArrestTime: '',
    Behaviour: '',
    CompareCode: '',
    CompareDate: '',
    CompareID: '',
    CompareName: '',
    CompareOfficeShortName: '',
    ComparePositionName: '',
    CompareTime: '',
    IsMatchNotice: '',
    LawsuitName: '',
    LawsuitNo: '',
    LawsuitOfficeShortName: '',
    LawsuitPositionName: '',
    OccurrenceDate: '',
    OccurrenceTime: '',
    Prompt: '',
    Testimony: '',
  }

  public fileItem = [{
    fileName: '',
    filePath: '',
  }];

  public fullName: any;
  public showField: any;
  public viewMode = true;
  public navServiceSub: any;

  public errorShow: any;

  public compareID: string;
  public indictmentID: string;
  private getDataFromListPage: any;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private navService: NavigationService,
    private readonly apiService: ReductionApiService
  ) { }

  ngOnInit() {

    if (this.activeRoute.snapshot.paramMap.get('mode') === 'V') {
      this.navService.setEditField(true);
    } else if (this.activeRoute.snapshot.paramMap.get('mode') === 'E') {
      this.navService.setEditField(false);
    }
    // set show button
    this.navServiceSub = this.navService.showFieldEdit.subscribe(status => {
      this.showField = status;
      if (!this.showField) {
        this.navService.setSaveButton(true);
        this.navService.setCancelButton(true);
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


    // this.getDataFromListPage = this.activeRoute.params
    //   .subscribe(params => {
    //     // check id from manage view page
    //     for (let i = 0; i < this.listData.length; i++) {
    //       if (params.code === this.listData[i].arrestCode) {
    //         this.detailData = this.listData[i];
    //         this.fullName =
    //           this.listData[i].titleName +
    //           this.listData[i].firstName +
    //           ' ' +
    //           this.listData[i].lastName;
    //       }
    //     }
    //   });

    this.getAdjustArrestgetByCon(this.activeRoute.snapshot.paramMap.get('compareid'));
    this.getAdjustFinegetByCon(this.activeRoute.snapshot.paramMap.get('compareid'),
    this.activeRoute.snapshot.paramMap.get('comparedetailid'));
  }

  // เตรียมข้อมูลรายละเอียดคดีจาก
  public getAdjustArrestgetByCon(CompareID: any = null): void {
    if (CompareID == null ) { return }
    this.apiService.post('/XCS60/AdjustArrestgetByCon', {CompareID: CompareID})
        .subscribe(response => {
          if (response.length > 0) {
            Object.assign(this.detailData, response[0]);
          }
        }, error => console.log(error))
  }

  // ดึงข้อมูลการปรับเพิ่มหรือปรับลด
  public getAdjustFinegetByCon(CompareID: any = null, CompareDetailID: any = null) {
    if (CompareID == null || CompareDetailID == null) { return }
    this.apiService.post('/XCS60/AdjustFinegetByCon', {
      CompareID: CompareID,
      CompareDetailID: CompareDetailID
    })
    .subscribe(response => {
      if (response.length > 0) {
        this.reductionDataTable = response;
      }
    }, error => {
      console.log(error);
    });
  }

  // ดึงข้อมูลในส่วนของการชำระค่าปรับ
  public getAdjustReceiptgetByCompareDetailId(CompareDetailID: any = null) {
    if (CompareDetailID == null) { return; }
    this.apiService.post('/XCS60/AdjustReceiptgetByCompareDetailId', {
      CompareDetailID: CompareDetailID
    })
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  // ดึงข้อมูลการจออนุมัติเปรียบเทียบคดีและแบบอนุ
  public getAdjustDetailgetByCompareDetailId(CompareDetailID: any = null) {
    if (CompareDetailID == null ) { return; }
    this.apiService.post('/XCS60/AdjustDetailgetByCompareDetailId', { CompareDetailID: CompareDetailID})
        .subscribe(response => {
          console.log(response);
        }, error => {
          console.log(error);
        });
  }

  // ดึงข้อมูลเอกสารแนบภายใน
  public getMasDocumentMaingetAll(CompareID: any = null) {
    if (CompareID == null) { return; }
    this.apiService.post('/XCS60/MasDocumentMaingetAll', {
      DocumentType: 10,
      ReferenceCode: CompareID
    })
    .subscribe(response => {
      console.log(response);
    }, error => console.log(error));
  }

  // ดึงข้อมูลตรวจสอบข้อมูล
  public getAdjustFinecheckComplete(CompareDetailID: any = null) {
    if (CompareDetailID == null) { return; }
    this.apiService.post('/XCS60/AdjustFinecheckComplete', {
      CompareDetailID: CompareDetailID
    })
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  viewData() {
    this.viewMode = true;
  }

  editData() {
    this.viewMode = false;
  }

  attachFile(file) {
    this.fileItem.push({
      fileName: file[0].name,
      filePath: ''
    });
  }

  ngOnDestroy() {
    // this.getDataFromListPage.unsubscribe();
    this.navServiceSub.unsubscribe();
  }

}

