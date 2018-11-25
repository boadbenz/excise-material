import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';

import { ReductionApiService } from '../reduction.api.service';

import { Subject } from 'rxjs/Subject';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReductionModelListComponent } from './reduction-model-list/reduction-model-list.component';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(ReductionModelListComponent)
  reductionModelList: ReductionModelListComponent;

  tableData = [
    {
      fullName: 'นายธวัชชัย บิงขุนทด',
      oldFine: '1,400,000.00',
      newFine: '',
      dateFine: '10-ม.ค.-2560',
      payment: 'เงินสด',
      receiptNo: '33',
      receiptRef: '001/2561',
      statusCase: 'รับรายการนำส่ง',
      typeCase: 'เปรียบเทียบคดี',
      period: '1/1'
    },
    {
      fullName: 'นายสุชาติ ปัญโญใหญ่',
      oldFine: '1,400,000.00',
      newFine: '',
      dateFine: '10-ม.ค.-2560',
      payment: 'เงินสด',
      receiptNo: '33',
      receiptRef: '001/2561',
      statusCase: 'รับรายการนำส่ง',
      typeCase: 'เปรียบเทียบคดี',
      period: '1/1'
    },
  ];

  listData = [{
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
    penalty: 'กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ'
             + ' 5 เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า'

  },
  {
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
    penalty: 'กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ'
             + ' 5 เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า'

  },
  {
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
    penalty: 'กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ'
             + ' 5 เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า'
  },
  {
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
    penalty: 'กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ'
           + ' 5 เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า'
  },
  {
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
    penalty: 'กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ'
           + ' 5 เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า'
  }]

  fileItem = [{
    fileName: '',
    filePath: '',
  }];

  fullName: any;
  detailData: any;
  showField: any;
  navServiceSub: any;
  selectAll: any;


  private getDataFromListPage: any;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public dialog: any;
  public compareID: string;
  public indictmentID: string;

  constructor
  (private router: Router,
    private activeRoute: ActivatedRoute,
    private navService: NavigationService,
    private apiServer: ReductionApiService,
    private ngbModel: NgbModal,
  ) { }

  ngOnInit() {
    if (this.activeRoute.snapshot.queryParamMap.get('compareID') == null
    || this.activeRoute.snapshot.queryParamMap.get('compareID') === '') {
      alert('ไม่สามารถดึงค่าข้อมูลรายการเปรียบเทียบได้');
      this.router.navigate(['/reduction/list']);
    }

    const param = this.activeRoute.snapshot.queryParams;
    this.compareID = param.compareID;
    this.indictmentID = param.indictmentID;

    this.navService.setEditField(true);
    // set show button
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

    this.getDataFromListPage = this.activeRoute.queryParams
      .subscribe(params => {
        // check id from list page
        for (let i = 0; i < this.listData.length; i++) {
          if (params.code === this.listData[i].arrestCode) {
            this.detailData = this.listData[i];
            this.fullName =
              this.listData[i].titleName +
              this.listData[i].firstName +
              ' ' +
              this.listData[i].lastName;
          }
        }
      });

    this.navService.onSave.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
          this.onSave();
      }
    });
  }

  private onSave() {
    console.log('5555');
  }

  viewData(id: string) {
    this.router.navigate(['/reduction/manage', 'V', this.detailData.arrestCode], { queryParams: { id: id } });
  }

  editData(id: string) {
    this.router.navigate(['/reduction/manage', 'E', this.detailData.arrestCode], { queryParams: { id: id } });
  }

  attachFile(file) {
    this.fileItem.push({
      fileName: file[0].name,
      filePath: ''
    });
  }

  showReductionPopup(e) {
    // jQuery(this.modalReduction.nativeElement).modal('show');
    // console.log(this.reductionModelList.listTest);

    this.dialog = this.ngbModel.open(e, { size: 'lg', centered: true });
    // this.reductionModelList.activeModel();
  }

  ngAfterViewInit() {

  }

  result(event) {
    console.log(event);
  }

  ngOnDestroy() {
    this.getDataFromListPage.unsubscribe();
    this.navServiceSub.unsubscribe();
  }
}
