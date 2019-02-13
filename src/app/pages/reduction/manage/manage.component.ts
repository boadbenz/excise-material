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
  @ViewChild('printDocModal') printDocModel: ElementRef;
  reductionModelList: ReductionModelListComponent;

  private onPrintSubscribe: any;
  modal: any;

  tableData = [
    // {
    //   fullName: 'นายธวัชชัย บิงขุนทด',
    //   oldFine: '1,400,000.00',
    //   newFine: '',
    //   dateFine: '10-ม.ค.-2560',
    //   payment: 'เงินสด',
    //   receiptNo: '33',
    //   receiptRef: '001/2561',
    //   statusCase: 'รับรายการนำส่ง',
    //   typeCase: 'เปรียบเทียบคดี',
    //   period: '1/1'
    // }
  ];

  listData = {
    ArrestCode: 'TN90806026000001',
    LawsuitNo: '001/2561',
    ProofNo: '001/2561',
    CaseNumber: '001/2561',
    TitleName: 'นาย',
    FirstName: 'ธวัชชัย',
    LastName: 'บิงขุนทด',
    LawsuitDate: '10-ม.ค.-2560',
    LawsuitTime: '12.00',
    DepartmentlawName: 'สสท.ระนอง สาขาเมืองกระบุรี',
    PositionlawName: 'เจ้าพนักงานสรรพสามิตชำนาญงาน',
    LocationlawName: 'คลองจั่น/บางกะปิ/กรุงเทพมหานคร',
    FaultSubject: 'มีไว้ในครอบครองซึ่งสินค้าที่มิได้เสียภาษี',
    FaultNo: '203',
    Penalty: 'กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ'
      + ' 5 เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า'
  };

  fileItem = [{
    fileName: '',
    filePath: '',
  }];

  fullName: any;
  detailData: any = this.listData;
  showField: any;
  navServiceSub: any;
  selectAll: any;
  adjustDetailData: any[] = [];


  private getDataFromListPage: any;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public dialog: any;
  public compareID: string;
  public indictmentID: string;

  constructor
    (private router: Router,
      private activeRoute: ActivatedRoute,
      private navService: NavigationService,
      private readonly apiServer: ReductionApiService,
      private ngbModel: NgbModal
    ) { }

  ngOnInit() {
    if (this.activeRoute.snapshot.queryParamMap.get('CompareID') == null
      || this.activeRoute.snapshot.queryParamMap.get('CompareID') === '') {
      alert('ไม่สามารถดึงค่าข้อมูลรายการเปรียบเทียบได้');
      this.router.navigate(['/reduction/list']);
    }

    const param = this.activeRoute.snapshot.queryParams;
    this.compareID = param.CompareID;
    this.indictmentID = param.IndictmentID;

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

    this._adjustArrestgetByCon(this.compareID);
    this._adjustReceiptgetByCon(this.compareID);
    this._adjustDetailgetByCon(this.compareID);

    console.log("adjustDetailgetByCon : ",this.adjustDetailData)
    console.log("adjustReceiptgetByCon : ", this.tableData)
    console.log("adjustArrestgetByCon : ", this.detailData)

    this.navService.onSave.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
        this.onSave();
      }
    });

    this.onPrintSubscribe = this.navService.onPrint.subscribe(async status => {
      if (status) {
        await this.navService.setOnPrint(false);
        this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
      }
    })

  }

  // public onPrint = (content) => {
  //   console.log("Print2")
  //   this.modal = this.ngbModel.open(content, { size: 'lg', centered: true });
  // }

  private onSave() {
    console.log('5555');
  }

  private _adjustArrestgetByCon(compareID) {
    this.apiServer.post('/XCS60/AdjustArrestgetByCon', { CompareID: compareID })
      .subscribe(response => {
        if (response.length > 0) {
          this.detailData = Object.assign(this.listData, response[0]);
        } else {
          this.detailData = Object.assign(this.listData, response);
        }

        this.fullName =
          this.detailData.TitleName +
          this.detailData.FirstName +
          ' ' +
          this.detailData.LastName;
      }, error => console.log(error));
  }

  private _adjustReceiptgetByCon(compareID) {
    this.apiServer.post('/XCS60/AdjustReceiptgetByCon', { CompareID: compareID })
      .subscribe(response => {
        this.tableData = response;
      }, error => {
        console.log(error);
      }
      );
  }


  private _adjustDetailgetByCon(compareID) {
    this.apiServer.post('/XCS60/AdjustDetailgetByCon', { CompareID: compareID })
      .subscribe(response => this.adjustDetailData = response, error => console.log(error));
  }

  viewData(CompareID: string, CompareDetailID: string) {
    console.log(CompareID, ' and ', CompareDetailID);
    console.log(this.detailData.ArrestCode);
    this.router.navigate(['/reduction/manage', 'V', CompareID, CompareDetailID]);
  }

  editData(CompareID: string, CompareDetailID: string) {
    this.router.navigate(['/reduction/manage', 'E', CompareID, CompareDetailID]);
  }

  attachFile(file) {
    this.fileItem.push({
      fileName: file[0].name,
      filePath: ''
    });
  }

  showReductionPopup(e) {
    this.dialog = this.ngbModel.open(e, { size: 'lg', centered: true });
  }

  ngAfterViewInit() {

  }

  result(event) {
    console.log(event);
  }

  ngOnDestroy() {
    // this.getDataFromListPage.unsubscribe();
    this.navServiceSub.unsubscribe();
  }
}
