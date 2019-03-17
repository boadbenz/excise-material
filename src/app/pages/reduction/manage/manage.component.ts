import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy, TemplateRef } from '@angular/core';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReductionApiService } from '../reduction.api.service';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReductionModelListComponent } from './reduction-model-list/reduction-model-list.component';

// import { PrintDocumentComponent } from './print-document/print-document.component';///////////
// import { AddReduceComponent } from './add-reduce/add-reduce.component';
import { PrintDocModalComponent } from '../print-doc-modal/print-doc-modal.component'
import swal from 'sweetalert2';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(ReductionModelListComponent)
  @ViewChild('printDocModal') printDocModel: ElementRef;
  reductionModelList: ReductionModelListComponent;

  private onPrintSubscribe: any
  modal: any

  // @ViewChild(PrintDocumentComponent) printDocumentComponent: PrintDocumentComponent;///////////////

  // @ViewChild('printList') public printList: TemplateRef<any>;//////////////////

  tableData = [];

  listData = {
    ArrestCode: '',
    LawsuitNo: '',
    ProofNo: '',
    CaseNumber: '',
    TitleName: '',
    FirstName: '',
    LastName: '',
    LawsuitDate: '',
    LawsuitTime: '',
    DepartmentlawName: '',
    PositionlawName: '',
    LocationlawName: '',
    FaultSubject: '',
    FaultNo: '',
    Penalty: '',
    CompareDate: ['', ''],
    AdjustArrestStaff: [
      {
        ArrestCode: '',
        ContributorID: '',
        DepartmentCode: '',
        DepartmentLevel: '',
        DepartmentName: '',
        FirstName: '',
        IsActive: '',
        LastName: '',
        OfficeCode: '',
        OfficeName: '',
        OfficeShortName: '',
        PosLevel: '',
        PosLevelName: '',
        PositionCode: '',
        PositionName: '',
        StaffCode: '',
        StaffID: '',
        TitleName: '',
      }
    ],
    AdjustCompareStaff: [
      {
        CompareID: null,
        ContributorID: null,
        DepartmentCode: null,
        DepartmentLevel: null,
        DepartmentName: null,
        FirstName: '',
        IsActive: 0,
        LastName: '',
        OfficeCode: '',
        OfficeName: '',
        OfficeShortName: '',
        PosLevel: '',
        PosLevelName: '',
        PositionCode: '',
        PositionName: '',
        StaffCode: '',
        StaffID: 0,
        TitleName: '',
      }
    ]
  };

  fileItem = [{
    fileName: '',
    filePath: '',
  }];

  fullName: any;
  detailData: any = this.listData;
  showField: any;
  navServiceSub: any;
  navServiceSubs: any;
  selectAll: any;
  adjustDetailData: any[] = [];
  documentMailgetAll: any[] = [];


  private getDataFromListPage: any;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public dialog: any;
  public print_dialog: any;
  public compareID: string;
  public indictmentID: string;

  constructor
    (private router: Router,
      private activeRoute: ActivatedRoute,
      private navService: NavigationService,
      private readonly apiServer: ReductionApiService,
      public ngbModel: NgbModal
    ) { }

  ngOnInit() {
    localStorage.setItem('programcode', 'ILG60-09-00');
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
    this.navService.setSendIncomeButton(false);
    this.navService.setDeleteButton(false);
    this.navServiceSub = this.navService.onCancel.subscribe(status => {
      if (status) {
        this.navService.setEditField(true);
      }
    });

    this.navServiceSub = this.navService.showFieldEdit.subscribe(status => {
      this.showField = status;
      if (!this.showField) {
        this.navService.setCancelButton(true);
        this.navService.setSaveButton(true);
        this.navService.setPrintButton(false);
        this.navService.setSearchBar(false);
        // this.navService.setDeleteButton(false);
        this.navService.setEditButton(false);
      } else {
        this.navService.setPrintButton(true);
        // this.navService.setDeleteButton(true);
        this.navService.setEditButton(true);
        this.navService.setSearchBar(false);
        this.navService.setCancelButton(false);
        this.navService.setSaveButton(false);
      }
    });

    this._adjustArrestgetByCon(this.compareID);
    // this._adjustReceiptgetByCon(this.compareID);
    // this._adjustDetailgetByCon(this.compareID);
    // this._masDocumentMailgetAll(this.compareID);

    console.log('adjustDetailgetByCon : ', this.adjustDetailData);
    console.log('adjustReceiptgetByCon : ', this.tableData);
    console.log('adjustArrestgetByCon : ', this.detailData);

    this.navService.onSave.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
        this.onSave();
      }
    });

    this.onPrintSubscribe = this.navService.onPrint.subscribe(async status => {
      console.log('status print');
      if (status) {
        await this.navService.setOnPrint(false);
        // this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
        this.buttonPrint()
      }
    })

  }
  public async buttonPrint() {

    let reports = [];
    try {
      reports = await this.apiServer.post('/XCS60/MasDocumentMaingetAll', {CompareID: this.compareID}, '8777').toPromise();
      if (reports.length === 0) {
        throw new Error('no data');
      }
    } catch (e) {
      console.log(e.message);
      if (e.message === 'no data') {
        swal('', 'ไม่มีข้อมูลรายงาน', 'error');
      } else {
        swal('', e.message, 'error');
      }

      return;
    }
    let ReportAll = [];

    console.log('++++detailData : ', this.detailData);
    const test: any[] = reports.map(m => ({
      DocName: `xxx `,
      DocType: 'แบบฟอร์ม', CompareDetailID: `xxx `, checked: false, TypeName: 'xxx'
    }));

    ReportAll = [...test]
    const dialogRef = this.ngbModel.open(PrintDocModalComponent, {
      backdrop: 'static', size: 'lg'
    });

    dialogRef.componentInstance.data = ReportAll;
    dialogRef.result.then(res => { });

  }

  // public onPrint = (content) => {//////////////////////
  //   console.log("Print2")
  //   this.modal = this.ngbModel.open(content, { size: 'lg', centered: true });
  // }

  private onSave() {
    console.log('5555');
  }

  private _adjustArrestgetByCon(compareID) {
    this.apiServer.post('/XCS60/AdjustComparegetByCon', {CompareID: compareID})
        .subscribe(response => {
          if (response.length > 0) {
            this.detailData = Object.assign(this.listData, response[0]);
          } else {
            this.detailData = Object.assign(this.listData, response);
          }

          console.log(this.detailData);
          if (this.detailData.AdjustArrestStaff.length > 0) {
            this.detailData.CompareName = this.detailData.AdjustArrestStaff[0].TitleName
                                        + this.detailData.AdjustArrestStaff[0].FirstName
                                        + ' '
                                        + this.detailData.AdjustArrestStaff[0].LastName;
          } else {
            this.detailData.CompareName = '';
            this.detailData.ComparePositionName = '';
          }

          if (this.detailData.IsOutside === 1) {
            this.detailData.CompareCode = 'น' + this.detailData.CompareCode;
          }

          if (this.detailData.CompareDate) {
            this.detailData.CompareDate = this.detailData.CompareDate.split(' ');
          } else {
            this.detailData.CompareDate = ['', ''];
          }

          this.tableData = this.detailData.AdjustCompareReceipt;
        }, error => console.log(error));
  }

  // private _adjustReceiptgetByCon(compareID) {
  //   this.apiServer.post('/XCS60/AdjustReceiptgetByCon', {CompareID: compareID})
  //       .subscribe(response => {
  //         this.tableData = response;
  //       }, error => {
  //         console.log(error);
  //       }
  //   );
  // }


  // private  _adjustDetailgetByCon(compareID) {
  //   this.apiServer.post('/XCS60/AdjustCompareDetailgetByCon', {CompareID: compareID})
  //       .subscribe(response => this.adjustDetailData =  response, error => console.log(error));
  // }

  private _masDocumentMailgetAll(compareID) {
    this.apiServer.post('/XCS60/MasDocumentMaingetAll', {DocumentType: 10, ReferenceCode: compareID})
        .subscribe(response => response.length > 0
                  ? this.documentMailgetAll = response
                  : this.documentMailgetAll = [{DocumentName: 'NonDoc', DocumentType: 'data'}]
                  , error => console.log(error));
  }

  viewData(CompareID: string = '', CompareDetailID: string = '') {
    this.router.navigate(['/reduction/manage', 'V', this.compareID]);
  }

  editData(CompareID: string, CompareDetailID: string) {
    this.router.navigate(['/reduction/manage', 'E', this.compareID]);
  }

  attachFile(file) {
    this.fileItem.push({
      fileName: file[0].name,
      filePath: ''
    });
  }

  public showReductionPopup(e) {
    console.log(e);
    this.dialog = this.ngbModel.open(e, { size: 'lg', centered: true });
  }

  public showPrintPopup(e) {
    console.log(e);
    this.print_dialog = this.ngbModel.open(e, { size: 'lg', centered: true});
  }

  ngAfterViewInit() {

  }

  result(event) {
    console.log(event);
  }

  printResult(event) {
    console.log(event);
  }

  ngOnDestroy() {
    // this.getDataFromListPage.unsubscribe();
    this.navService.setEditField(false);
    this.navServiceSub.unsubscribe();
  }
}
