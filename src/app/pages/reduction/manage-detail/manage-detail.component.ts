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

  public adjustArrest = {
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

  adjustFine = [];

  adjustReceipt = [];

  adjustDetail = [];


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
  public compareIdDetail: string;
  public indictmentID: string;
  private getDataFromListPage: any;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private navService: NavigationService,
    private readonly apiService: ReductionApiService
  ) { }

  public ngOnInit() {

    if (this.activeRoute.snapshot.paramMap.get('mode') === 'V') {
      this.navService.setEditField(true);
      this.navService.setSendIncomeButton(true);
    } else if (this.activeRoute.snapshot.paramMap.get('mode') === 'E') {
      this.navService.setEditField(false);
      this.navService.setSendIncomeButton(false);
    }

    this.compareID = this.activeRoute.snapshot.paramMap.get('compareid');
    this.compareIdDetail = this.activeRoute.snapshot.paramMap.get('comparedetailid');
    this.indictmentID = this.activeRoute.snapshot.paramMap.get('compareid'); // shoud it differren

    // set show button
    this.navServiceSub = this.navService.onCancel.subscribe(status => {
      if (status) {
        this.navService.setEditField(true);
      }
    });

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

    this.navServiceSub = this.navService.onSendIncome.subscribe(status => {
      console.log(status);
      if (status) {
        this.sentInCome();
      }
    });

    this.getAdjustArrestgetByCon(this.compareID);
    this.getAdjustFinegetByCon(this.compareID, this.compareIdDetail);
    this.getAdjustReceiptgetByCompareDetailId(this.compareIdDetail);
    this.getAdjustDetailgetByCompareDetailId(this.compareIdDetail);
    this.getMasDocumentMaingetAll(this.compareID);
    this.getAdjustFinecheckComplete(this.compareIdDetail);
  }

  // เตรียมข้อมูลรายละเอียดคดีจาก
  public getAdjustArrestgetByCon(CompareID: any = null): void {
    if (CompareID == null ) { return }
    this.apiService.post('/XCS60/AdjustArrestgetByCon', {CompareID: CompareID})
        .subscribe(response => {
          if (response.length > 0) {
            Object.assign(this.adjustArrest, response[0]);
          }
        }, error => console.log(error))
  }

  // ดึงข้อมูลการปรับเพิ่มหรือปรับลด
  public getAdjustFinegetByCon(CompareID: any = null, CompareDetailID: any = null) {
    console.log(CompareID, CompareDetailID);
    if (CompareID == null || CompareDetailID == null) { return }
    this.apiService.post('/XCS60/AdjustFinegetByCon', {
      CompareID: CompareID,
      CompareDetailID: CompareDetailID
    })
    .subscribe(response => {
      if (response.length > 0) {
        this.adjustFine = response;
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
      this.adjustReceipt = response;
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
          this.adjustDetail = response;
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

  public viewData() {
    this.viewMode = true;
  }

  public editData() {
    this.viewMode = false;
  }

  public attachFile(file) {
    this.fileItem.push({
      fileName: file[0].name,
      filePath: ''
    });
  }

  public sentInCome(): void {
    this.router.navigate(['/income/manage', 'R', this.compareID]);
  }

  public ngOnDestroy() {
    // hind ส่งรายได้
    this.navService.setSendIncomeButton(false);
    // hide ปุ่มลบ
    this.navService.setDeleteButton(false);

    this.navServiceSub.unsubscribe();
  }

}

