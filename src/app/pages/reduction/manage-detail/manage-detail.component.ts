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

  public mode = 'A';
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
    SubDistrict : '',
    District : '',
    Province: '',
    Locations: '',
    IsOutside: 0,
    ArrestStaff: '',
    AdjustArrestStaff: [
      {
        StaffID: 0,
        ArrestCode: '',
        StaffCode: '',
        TitleName: '',
        FirstName: '',
        LastName: '',
        PositionCode: '',
        PositionName: '',
        PosLevel: '',
        PosLevelName: '',
        DepartmentCode: '',
        DepartmentName: '',
        DepartmentLevel: null,
        OfficeCode: '',
        OfficeName: '',
        OfficeShortName: '.บึงกาฬ',
        ContributorID: 0,
        IsActive: 0
      }
    ],
    AdjustCompareStaff: [
      {
        CompareID: 0,
        ContributorID: 0,
        DepartmentCode: '',
        DepartmentLevel: '',
        DepartmentName: '',
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
    ],
    AdjustCompareReceiptCR: [{
      CompareDetailID: 0,
      FineType: 0,
      LawbreakerName: '',
      ProductDesc: '',
      ProductFine: 0,
      ProductID: 0,
      ReceiptDate: '',
    }]
  }

  public AdjustCompareDetail: any = [];
  public CompareReason = '';

  public CompareReceipt: any = [];

  public EditApproveCaseComparison: number[] = [];

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

  public startIndexSum = 0;
  public startList = [];
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private navService: NavigationService,
    private readonly apiService: ReductionApiService
  ) { }

  public async ngOnInit() {

    this.mode = this.activeRoute.snapshot.paramMap.get('mode');
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

    await this.GetAdjustCompareCRgetByCon(this.compareID);
    await this.GetAdjustCompareDetailgetByCon (this.compareID);
    await this.GetAdjustCompareReciptConfirmgetByCon(this.compareID);
    this.getAdjustDetailgetByCompareDetailId(this.compareIdDetail);
    // this.getMasDocumentMaingetAll(this.compareID);
    this.getAdjustFinecheckComplete(this.compareIdDetail);
  }

  // เตรียมข้อมูลรายละเอียดคดีจาก
  public async GetAdjustCompareCRgetByCon(CompareID: any = null): Promise<void> {
    if (CompareID == null ) { return }
    try {
      const response = await this.apiService.post('/XCS60/AdjustCompareCRgetByCon', {CompareID: CompareID}).toPromise();
      Object.assign(this.adjustArrest, response);

      this.adjustArrest.ArrestStaff = this.adjustArrest.AdjustArrestStaff[0].TitleName + this.adjustArrest.AdjustArrestStaff[0].FirstName
                                    + ' ' + this.adjustArrest.AdjustArrestStaff[0].LastName;
      this.adjustArrest.Locations = this.adjustArrest.SubDistrict + '/' + this.adjustArrest.District + '/' + this.adjustArrest.Province;
      this.adjustArrest.CompareCode = this.adjustArrest.IsOutside === 1
                                    ? 'น' + this.adjustArrest.CompareCode
                                    : this.adjustArrest.CompareCode;

      this.adjustArrest.CompareName = this.adjustArrest.AdjustCompareStaff[0].TitleName + this.adjustArrest.AdjustCompareStaff[0].FirstName
                                    + ' ' + this.adjustArrest.AdjustCompareStaff[0].LastName;
      this.adjustFine = this.adjustArrest.AdjustCompareReceiptCR;
      this.adjustFine.forEach((e, i) => {
        this.calAdjustFine(i);
      });
    } catch (e) {
      console.log(e);
    }
    console.log(this.adjustArrest);
  }

  // ดึงข้อมูลการปรับเพิ่มหรือปรับลด
  public async GetAdjustCompareDetailgetByCon(CompareID: any = null): Promise<void> {
    if (this.adjustArrest.AdjustCompareReceiptCR.length === 0
        && this.adjustArrest.AdjustCompareReceiptCR[0].CompareDetailID === 0) {
      return;
    }

    for (let i = 0; i < this.adjustArrest.AdjustCompareReceiptCR.length; i++) {
      try {
        const response = await this.apiService.post('/XCS60/AdjustCompareDetailgetByCon',
                                    {CompareDetailID: this.adjustArrest.AdjustCompareReceiptCR[0].CompareDetailID})
                             .toPromise();
        this.AdjustCompareDetail.push(response);
      } catch (e) {
        console.log(e);
      }
    }

    if (this.AdjustCompareDetail.length > 0) {
      this.CompareReason = this.AdjustCompareDetail[0].CompareReason;
    }
    console.log(this.AdjustCompareDetail);
  }

  // คำนวณปรับเพิ่ม-ลด ใหม่
  public async enterNewValue(event, index): Promise<void> {
    if (event.keyCode === 13) {
      console.log(this.adjustFine[index].CompareFine);
      await this.calAdjustFine(index);
    }
  }

  // คำนวณปรับเพิ่มลด
  public async calAdjustFine(index): Promise<any> {
    this.adjustFine[index].CompareFineDiff = 0;
    this.adjustFine[index].CompareFineTreasuryMoney = 0;
    this.adjustFine[index].CompareFineBribeMoney = 0;
    this.adjustFine[index].CompareFineRewardMoney = 0;
    if (this.adjustFine[index].CompareFine) {
      this.adjustFine[index].CompareFineDiff = this.adjustFine[index].ProductFine - this.adjustFine[index].CompareFine;
      if (this.adjustFine[index].ProductFine < this.adjustFine[index].CompareFine) {
        this.adjustFine[index].CompareFineStatus = true;
      } else if (this.adjustFine[index].ProductFine > this.adjustFine[index].CompareFine) {
        this.adjustFine[index].CompareFineStatus = false;
      }

      this.adjustFine[index].CompareFineTreasuryMoney = (20 * this.adjustFine[index].CompareFine) / 100;
      this.adjustFine[index].CompareFineBribeMoney = (20 * this.adjustFine[index].CompareFine) / 100;
      this.adjustFine[index].CompareFineRewardMoney = (60 * this.adjustFine[index].CompareFine) / 100;
    }

    console.log(this.adjustFine);
  }

  public sumAllAdjustFine(column, start = 0, end = this.adjustFine.length): any {
    let sum = 0;
    for (let i = start; i < end; i++) {
      sum += this.adjustFine[i][column];
    }
    sum = isNaN(sum) ? 0 : sum;
    return sum;
  }

  public changestartIndexSum(start_index) {
    this.startIndexSum = start_index;
  }

  // ดึงข้อมูลในส่วนของการชำระค่าปรับ
  public async GetAdjustCompareReciptConfirmgetByCon(CompareID: any = null) {
    if (CompareID == null) { return; }

    try {
      const response = await this.apiService.post('/XCS60/AdjustCompareReciptConfirmgetByCon', {
        CompareID: CompareID
      }).toPromise();
      this.CompareReceipt = response;
    } catch (e) {
      console.log(e);
    }
  }

  // ดึงข้อมูลการจออนุมัติเปรียบเทียบคดีและแบบอนุ
  public getAdjustDetailgetByCompareDetailId(CompareDetailID: any = null) {
    if (CompareDetailID == null ) { return; }
    this.apiService.post('/XCS60/AdjustDetailgetByCompareDetailID', { CompareDetailID: CompareDetailID})
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

  public ViewApproveData(CompareDetailID: any) {
    this.viewMode = true;
    console.log(CompareDetailID);
  }

  public EditApproveData(CompareDetailID: any) {
    this.viewMode = false;
    console.log(CompareDetailID);
    if (this.EditApproveCaseComparison.indexOf(CompareDetailID) === (-1)) {
      this.EditApproveCaseComparison.push(CompareDetailID);
    }

    console.log(this.EditApproveCaseComparison);
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

