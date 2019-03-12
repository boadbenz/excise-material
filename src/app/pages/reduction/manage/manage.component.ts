import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy, TemplateRef } from '@angular/core';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';

import { ReductionApiService } from '../reduction.api.service';

import { Subject } from 'rxjs/Subject';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReductionModelListComponent } from './reduction-model-list/reduction-model-list.component';
import { PrintDocumentComponent } from './print-document/print-document.component';
// import { AddReduceComponent } from './add-reduce/add-reduce.component';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(ReductionModelListComponent)
  reductionModelList: ReductionModelListComponent;

  @ViewChild(PrintDocumentComponent) printDocumentComponent: PrintDocumentComponent;

  @ViewChild('printList') public printList: TemplateRef<any>;

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
        // this.navService.setPrintButton(false);
        this.navService.setSearchBar(false);
        // this.navService.setDeleteButton(false);
        this.navService.setEditButton(false);
      } else {
        // this.navService.setPrintButton(true);
        // this.navService.setDeleteButton(true);
        this.navService.setEditButton(true);
        this.navService.setSearchBar(false);
        this.navService.setCancelButton(false);
        this.navService.setSaveButton(false);
      }
    });

    this.navServiceSub = this.navService.onPrint.subscribe(status => {
      if (status) {
        this.showPrintPopup(this.printList);
      }
    });

    this._adjustArrestgetByCon(this.compareID);
    // this._adjustReceiptgetByCon(this.compareID);
    // this._adjustDetailgetByCon(this.compareID);
    // this._masDocumentMailgetAll(this.compareID);

    this.navService.onSave.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
          this.onSave();
      }
    });
  }

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
                  : this.documentMailgetAll = [{DocumentName: 'tees', DocumentType: 'data'}]
                  , error => console.log(error));
  }

  viewData(CompareID: string = '', CompareDetailID: string = '') {
    this.router.navigate(['/reduction/manage', 'V', this.compareID, CompareDetailID]);
  }

  editData(CompareID: string, CompareDetailID: string) {
    this.router.navigate(['/reduction/manage', 'E', this.compareID, CompareDetailID]);
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
