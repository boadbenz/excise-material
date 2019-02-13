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
    Penalty: ''
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
    this._adjustReceiptgetByCon(this.compareID);
    this._adjustDetailgetByCon(this.compareID);

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
    this.apiServer.post('/XCS60/AdjustArrestgetByCon', {CompareID: compareID})
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
    this.apiServer.post('/XCS60/AdjustReceiptgetByCon', {CompareID: compareID})
        .subscribe(response => {
          this.tableData = response;
        }, error => {
          console.log(error);
        }
    );
  }


  private  _adjustDetailgetByCon(compareID) {
    this.apiServer.post('/XCS60/AdjustDetailgetByCon', {CompareID: compareID})
        .subscribe(response => this.adjustDetailData =  response, error => console.log(error));
  }

  viewData(CompareID: string, CompareDetailID: string) {
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
