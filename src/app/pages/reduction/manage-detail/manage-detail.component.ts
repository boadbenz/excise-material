import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { ReductionApiService } from '../reduction.api.service';
import { PrintDocModalComponent } from '../print-doc-modal/print-doc-modal.component'
import moment = require('moment');
import 'moment/locale/th';
import { toLocalShort } from 'app/config/dateFormat';

import { Subject } from 'rxjs/Subject';
import { MatAutocomplete, _MatListItemMixinBase } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

import { replaceFakePath } from 'app/config/dataString';
import { MasDocumentMainService } from 'app/services/mas-document-main.service';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import { IMyDpOptions } from 'mydatepicker';
import { PreloaderService } from 'app/shared/preloader/preloader.component';

@Component({
  selector: 'app-manage-detail',
  templateUrl: './manage-detail.component.html',
  styleUrls: ['./manage-detail.component.scss']
})
export class ManageDetailComponent implements OnInit, OnDestroy {

  /**
   * Send data to autocomplete child.
   */
  public autoCompleteData: any = {
    api: '/XCS60/MassStaffMaingetAll'
  };

  private destroy$: Subject<boolean> = new Subject<boolean>();

  public mode = 'A';
  public adjustArrest = {
    ArrestCode: '',
    ArrestDate: '',
    LawsuitDate: '',
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
    Fact: '',
    ApproveStation: '',
    AdjustReason: '',
    ApproveReportType: '',
    PaymentFineDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    PaymentFineAppointDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    ApproveReportDate: moment().format('YYYY-MM-DD HH:mm:ss') + ' +00:00',
    CommandDate: moment().format('YYYY-MM-DD HH:mm:ss'),
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
  public EditApproveCaseComparisonData: any[] = [];
  public EditApproveCaseComparisonPopUp: any = {
    fullName: '',
    PaymentFineDate: [moment().format('DD-MM-YYYY'), '00:00:00.000', '+12:15'],
    FineType: '1',
    proponentsName: '',
    date: moment().format('DD-MM-YYYY'),
    offerstaff: '',
    offerPosition: '',
    offerDepartment: '',
    offerStaffCode: '',
    staff: '',
    position: '',
    department: '',
    staffCode: '',
    approveStaff: '',
    approvePosition: '',
    approveDepartment: '',
    approveCode: '',
    departmentOrders: '',
    orderDate: '',
    fact: '',
    reason: ''
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

  public startIndexSum = 0;
  public startList = [];

  public Staffoptions: any = [];
  public rawStaffOptions: any = [];

  public AdjustCompareStaff: any = [];
  private onPrintSubscribe: any;

  AllAddFiles: any = [];
  compareDocument: any = {
    DocumentID: '',
    DocumentName: '',
    ReferenceCode: '',
    FilePath: '',
    DataSource: '',

    // --- Custom --- //
    IsNewItem: false,
    IsActive: 1,
  }
  filePath: any = [];
  dataForCompare: any = {};
  public sinbon = 0;
  public rangwan = 20;
  public songkrang = 80;

  // Date
  DateOption: IMyDpOptions = {
    // other options...
    dateFormat: 'dd mmm yyyy'
  };
  YearOption: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy'
  };

  public fineIdex;

  public unsub = {
    cancel: null,
    edit: null,
    incame: null,
    save: null,
    delete: null,
    print: null
  }
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private navService: NavigationService,
    private readonly apiService: ReductionApiService,
    public ngbModel: NgbModal,
    private masDocumentMainService: MasDocumentMainService,
    private sidebarService: SidebarService,
    private preloaderService: PreloaderService,
  ) { }

  public async ngOnInit() {
    this.preloaderService.setShowPreloader(true);
    this.navService.setOnCancel(false);
    this.sidebarService.setVersion('0.0.3.21');
    this.mode = this.activeRoute.snapshot.paramMap.get('mode');
    if (this.activeRoute.snapshot.paramMap.get('mode') === 'V') {
      this.navService.setEditField(true);
      this.navService.setSendIncomeButton(true);
    } else if (this.activeRoute.snapshot.paramMap.get('mode') === 'E') {
      this.navService.setEditField(false);
      this.navService.setSendIncomeButton(false);
    } else if (this.activeRoute.snapshot.paramMap.get('mode') === 'A') {
      this.navService.setEditField(false);
      this.navService.setSendIncomeButton(false);
    }

    this.compareID = this.activeRoute.snapshot.paramMap.get('compareid');
    this.compareIdDetail = this.activeRoute.snapshot.paramMap.get('comparedetailid');
    this.indictmentID = this.activeRoute.snapshot.paramMap.get('compareid'); // shoud it differren

    // set show button
    this.unsub.cancel = this.navService.onCancel.subscribe(async status => {
      console.log('cancel status -> ', status);
      if (status) {
        await swal({
          title: '',
          text: 'ยืนยันการทำรายการหรือไม่',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ไม่ตกลง'
        }).then(async (result) => {
          if (result.value) {
            this.mode = 'V';
            this.navService.setEditField(true);
            this.navService.setDeleteButton(true);
            if (this.activeRoute.snapshot.paramMap.get('mode') === 'A') {
              this.router.navigate(['/reduction/manage', 'R'], { queryParams: {CompareID: this.compareID} });
            }
          } else {
            this.mode = 'E';
            this.navService.setEditField(false);
            this.navService.setDeleteButton(false);
          }
        });
      }
    });

    this.unsub.edit = this.navService.showFieldEdit.subscribe(status => {
      this.showField = status;
      if (!this.showField) {
        this.navService.setDeleteButton(false);
        this.navService.setSaveButton(true);
        this.navService.setCancelButton(true);
        this.navService.setPrintButton(false);
        this.navService.setSearchBar(false);
        this.navService.setEditButton(false);
        this.navService.setSendIncomeButton(false);
        this.mode = 'E';
      } else {
        this.navService.setDeleteButton(true);
        this.navService.setPrintButton(true);
        this.navService.setEditButton(true);
        this.navService.setSearchBar(false);
        this.navService.setCancelButton(false);
        this.navService.setSaveButton(false);
        this.navService.setSendIncomeButton(true);
        this.mode = 'V';
      }
    });

    this.unsub.incame = this.navService.onSendIncome.subscribe(status => {
      if (status) {
        this.sentInCome();
      }
    });

    this.unsub.delete = this.navService.onDelete.subscribe(async status => {
      if (status) {
        await this.DeletData();
      }
    });

    await this.MasStaffMaingetAll();
    await this.GetAdjustCompareCRgetByCon(this.compareID);
    await this.GetAdjustCompareReciptConfirmgetByCon(this.compareID);
    await this.GetAdjustCompareDetailgetByCon (this.compareIdDetail);
    await this.setDocument();
    await this.GetAdjustNoticegetByArrestCode();

    this.unsub.save = this.navService.onSave.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
          this.checkSave();
      }
    });

    this.unsub.print = this.navService.onPrint.subscribe(async status => {
      if (status) {
        await this.navService.setOnPrint(false);
        this.buttonPrint()
      }
    })

  }

  // เตรียมข้อมูลรายละเอียดคดีจาก
  public async GetAdjustCompareCRgetByCon(CompareID: any = null): Promise<void> {
    if (CompareID == null ) { return }
    try {
      const response = await this.apiService.post('/XCS60/AdjustCompareCRgetByCon', {CompareID: CompareID}).toPromise();
      Object.assign(this.adjustArrest, response);

      this.adjustArrest.ArrestStaff = this.adjustArrest.AdjustArrestStaff[0].TitleName + this.adjustArrest.AdjustArrestStaff[0].FirstName
                                    + ' ' + this.adjustArrest.AdjustArrestStaff[0].LastName;
      this.adjustArrest.Locations = this.adjustArrest.SubDistrict + ' ' + this.adjustArrest.District + ' ' + this.adjustArrest.Province;
      this.adjustArrest.CompareCode = this.adjustArrest.IsOutside === 1
                                    ? 'น' + this.adjustArrest.CompareCode
                                    : this.adjustArrest.CompareCode;

      this.adjustArrest.CompareName = this.adjustArrest.AdjustCompareStaff[0].TitleName + this.adjustArrest.AdjustCompareStaff[0].FirstName
                                    + ' ' + this.adjustArrest.AdjustCompareStaff[0].LastName;
      this.adjustFine = this.adjustArrest.AdjustCompareReceiptCR;

      if (this.adjustArrest.ArrestDate) {
        Object.assign(this.adjustArrest, ({
          ArrestDateShow: moment(this.adjustArrest.ArrestDate).add(543, 'years').format('DD MMM YYYY')
        } || ''));
      }

      if (this.adjustArrest.LawsuitDate) {
        Object.assign(this.adjustArrest, ({
          LawsuitDateShow: moment(this.adjustArrest.LawsuitDate).add(543, 'years').format('DD MMM YYYY')
        } || ''));
      }

      if (this.adjustArrest.CompareDate) {
        Object.assign(this.adjustArrest, ({
          CompareDateShow: moment(this.adjustArrest.CompareDate).add(543, 'years').format('DD MMM YYYY')
        } || ''));

        Object.assign(this.adjustArrest, ({
          CompareTimeShow: moment(this.adjustArrest.CompareDate).format('HH:mm') + ' น.'
        } || ''));
      }

      this.adjustFine.forEach((e, i) => {
        this.calAdjustFine(i);
      });
    } catch (e) {
      console.log(e);
    }
    console.log('ข้อมูลกล่องแรก -> ', this.adjustArrest);
  }

  // คำนวณปรับเพิ่ม-ลด ใหม่
  public async enterNewValue(event, index): Promise<void> {
    console.log(this.adjustFine[index].CompareFine);
    await this.calAdjustFine(index);
  }

  // คำนวณปรับเพิ่มลด
  public async calAdjustFine(index): Promise<any> {
    this.adjustFine[index].CompareFineDiff = 0;
    this.adjustFine[index].CompareFineTreasuryMoney = 0;
    this.adjustFine[index].CompareFineBribeMoney = 0;
    this.adjustFine[index].CompareFineRewardMoney = 0;
    if (this.adjustFine[index].CompareFine) {
      this.adjustFine[index].CompareFineDiff = this.adjustFine[index].CompareFine - this.adjustFine[index].ProductFine;
      if (this.adjustFine[index].ProductFine < this.adjustFine[index].CompareFine) {
        this.adjustFine[index].CompareFineStatus = true;
      } else if (this.adjustFine[index].ProductFine > this.adjustFine[index].CompareFine) {
        this.adjustFine[index].CompareFineStatus = false;
      }

      this.adjustFine[index].CompareFineTreasuryMoney = (this.sinbon * this.adjustFine[index].CompareFine) / 100;
      this.adjustFine[index].CompareFineBribeMoney = (this.rangwan * this.adjustFine[index].CompareFine) / 100;
      this.adjustFine[index].CompareFineRewardMoney = (this.songkrang * this.adjustFine[index].CompareFine) / 100;
    }
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
      console.log('กล่องสอง -> ', response);
      this.CompareReceipt = response;
      this.CompareReceipt = this.CompareReceipt.filter(element => {
        if (element.LawbreakerFirstName) {
          return element;
        }
      });
    } catch (e) {
      console.log(e);
    }
  }


  public async GetAdjustCompareDetailgetByCon(compareIdDetail: any = null): Promise<void> {
    this.AdjustCompareDetail = [];
    try {
      if (compareIdDetail !== '') {
        const response = await this.apiService.post('/XCS60/AdjustCompareDetailgetByCon',
                                  {CompareDetailID: compareIdDetail})
                            .toPromise();
                            console.log('กล่องสาม -> ', response);
        this.AdjustCompareDetail.push(response);
      } else {
        this.AdjustCompareDetail = [];
      }
    } catch (e) {
      console.log(e);
    }

    if (this.AdjustCompareDetail.length > 0) {
      this.CompareReason = this.AdjustCompareDetail[0].CompareReason;
    }
  }


  public async DeletData(): Promise<void> {
    console.log(this.adjustArrest.AdjustCompareReceiptCR);
    if (this.adjustArrest.AdjustCompareReceiptCR.length === 0) {
      swal('', 'ไม่สามรถาลบข้อมูลได้', 'error');
      return;
    }

    swal({
      title: 'ยืนยันการทำรายการ?',
      text: 'ต้องการลบข้อมูลจริงหรือไม่!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก'
    }).then(async (result) => {
      if (result.value) {
        let isDelete = false;
        const deleteData = await this.apiService.post('/XCS60/AdjustCompareDetailUpdDelete', {
          CompareDetailID: this.compareIdDetail
        }).toPromise();

        if (deleteData) {
          isDelete = true;
        }

        if (isDelete) {
          swal('', 'ลบข้อมูลเรียบร้อย', 'success').then(results => {
            this.router.navigate(['/reduction/list']);
          });
        } else {
          swal('', 'ไม่สามรถาลบข้อมูลได้', 'error');
        }
      }
    });
  }

  public viewData() {
    this.viewMode = true;
  }

  public editData() {
    this.viewMode = false;
  }

  public async ViewApproveData(CompareDetailID: any, index: any) {
    this.viewMode = true;
    this.fineIdex = index;
    await this.GetEditApproveCaseComparisonData(CompareDetailID);
    if (this.activeRoute.snapshot.paramMap.get('mode') === 'A') {
      this.viewMode = false;
      this.EditApproveCaseComparisonPopUp.departmentOrders = '';
      this.EditApproveCaseComparisonPopUp.CommandDate = '';
      this.EditApproveCaseComparisonPopUp.Fact = '';
      this.EditApproveCaseComparisonPopUp.AdjustReason = '';
    }

    this.changApproveReportType();
  }

  public async EditApproveData(CompareDetailID: any, index: any) {
    this.viewMode = false;
    this.fineIdex = index;
    await this.GetEditApproveCaseComparisonData(CompareDetailID);
    if (this.activeRoute.snapshot.paramMap.get('mode') === 'A') {
      this.viewMode = false;
      this.EditApproveCaseComparisonPopUp.departmentOrders = '';
      this.EditApproveCaseComparisonPopUp.CommandDate = '';
      this.EditApproveCaseComparisonPopUp.Fact = '';
      this.EditApproveCaseComparisonPopUp.AdjustReason = '';
    }
    this.changApproveReportType();
  }

  public async GetEditApproveCaseComparisonData(CompareDetailID: any) {
    if (this.EditApproveCaseComparison.indexOf(CompareDetailID) === (-1)) {
      this.EditApproveCaseComparison.push(CompareDetailID);

      const response = await this.apiService.post('/XCS60/AdjustCompareDetailgetByCon', {
        CompareDetailID: CompareDetailID
      }).toPromise();

      this.EditApproveCaseComparisonData[CompareDetailID] = response;
      this.EditApproveCaseComparisonData[CompareDetailID].PaymentFineDate =
      [this.toDatePickerFormat(new Date(moment().format('YYYY-MM-DD'))), '15:25 น.', '+12:15'];
      this.EditApproveCaseComparisonData[CompareDetailID].ApproveReportDate =
      this.toDatePickerFormat(new Date(moment().format('YYYY-MM-DD')));

      if (this.EditApproveCaseComparisonData[CompareDetailID].ApproveReportType === 1) {
        this.EditApproveCaseComparisonData[CompareDetailID].ApproveReportType = '1';
      } else if (this.EditApproveCaseComparisonData[CompareDetailID].ApproveReportType === 2) {
        this.EditApproveCaseComparisonData[CompareDetailID].ApproveReportType = '2';
      } else if (this.EditApproveCaseComparisonData[CompareDetailID].ApproveReportType === 3) {
        this.EditApproveCaseComparisonData[CompareDetailID].ApproveReportType = '3';
      } else if (this.EditApproveCaseComparisonData[CompareDetailID].ApproveReportType === 4) {
        this.EditApproveCaseComparisonData[CompareDetailID].ApproveReportType = '4';
      } else {
        this.EditApproveCaseComparisonData[CompareDetailID].ApproveReportType = '';
      }

      this.EditApproveCaseComparisonData[CompareDetailID].fullName =
      (this.EditApproveCaseComparisonData[CompareDetailID].AdjustCompareLawbreaker[0].LawbreakerTitleName || '') +
      (this.EditApproveCaseComparisonData[CompareDetailID].AdjustCompareLawbreaker[0].LawbreakerFirstName || '') + ' ' +
      (this.EditApproveCaseComparisonData[CompareDetailID].AdjustCompareLawbreaker[0].LawbreakerLastName || '');

      if (this.EditApproveCaseComparisonData[CompareDetailID].AdjustCompareStaff.length > 0) {
        const staffs = this.EditApproveCaseComparisonData[CompareDetailID].AdjustCompareStaff;
        const offerstaff = staffs.find(st => {
          return st.ContributorID === 39;
        });
        this.AdjustCompareStaff[0] = offerstaff || {};
        if (offerstaff != null) {
          this.EditApproveCaseComparisonData[CompareDetailID].offerstaff
              = offerstaff.TitleName + offerstaff.FirstName + ' ' + offerstaff.LastName || '';
          this.EditApproveCaseComparisonData[CompareDetailID].offerPosition = offerstaff.PositionName || '';
          this.EditApproveCaseComparisonData[CompareDetailID].offerDepartment = offerstaff.DepartmentName || '';
        }

        const staff = staffs.find(st => {
          return st.ContributorID === 40;
        });
        this.AdjustCompareStaff[1] = staff || {};
        if (staff != null) {
          this.EditApproveCaseComparisonData[CompareDetailID].staff
              = staff.TitleName + staff.FirstName + ' ' + staff.LastName || '';
          this.EditApproveCaseComparisonData[CompareDetailID].position = staff.PositionName || '';
          this.EditApproveCaseComparisonData[CompareDetailID].department = staff.DepartmentName || '';
        }

        const approveStaff = staffs.find(st => {
          return st.ContributorID === 41;
        });
        this.AdjustCompareStaff[2] = approveStaff || {};
        if (approveStaff != null) {
          this.EditApproveCaseComparisonData[CompareDetailID].approveStaff
              = approveStaff.TitleName + approveStaff.FirstName + ' ' + approveStaff.LastName || '';
          this.EditApproveCaseComparisonData[CompareDetailID].approvePosition = approveStaff.PositionName || '';
          this.EditApproveCaseComparisonData[CompareDetailID].approveDepartment = approveStaff.DepartmentName || '';
        }
      }

      console.log(this.AdjustCompareStaff);

      this.EditApproveCaseComparisonPopUp = this.EditApproveCaseComparisonData[CompareDetailID];
      console.log(this.EditApproveCaseComparisonData);
      console.log(this.EditApproveCaseComparisonPopUp);
    } else {
      console.log('has data alredy');
      this.EditApproveCaseComparisonPopUp = this.EditApproveCaseComparisonData[CompareDetailID];
      console.log(this.EditApproveCaseComparisonData);
      console.log(this.EditApproveCaseComparisonPopUp);
    }
  }

  public compare(a, b) {
    if (a.ContibutorID < b.ContibutorID) {
      return -1;
    }
    if (a.ContibutorID > b.ContibutorID) {
      return 1;
    }
    return 0;
  }

  public checkPopUp(detailID: any): any {
    this.adjustArrest.Fact = this.EditApproveCaseComparisonPopUp.Fact;
    console.log(this.EditApproveCaseComparisonPopUp.PaymentFineDate[0]);
    this.adjustArrest.PaymentFineDate = moment(this.EditApproveCaseComparisonPopUp.PaymentFineDate[0].jsdate).format('YYYY-MM-DD') + ' '
                                      + this.EditApproveCaseComparisonPopUp.PaymentFineDate[1].replace(' น.', '') + ':00.000000 +00:00'
    this.adjustArrest.PaymentFineAppointDate = this.EditApproveCaseComparisonPopUp.PaymentFineAppointDate;
    this.adjustArrest.ApproveStation = this.EditApproveCaseComparisonPopUp.ApproveStation;
    this.adjustArrest.AdjustReason = this.EditApproveCaseComparisonPopUp.AdjustReason;

    // tslint:disable-next-line:max-line-length
    this.adjustArrest.ApproveReportDate = moment(this.EditApproveCaseComparisonPopUp.ApproveReportDate.jsdate).format('YYYY-MM-DD HH:mm:ss') + ' +00:00';
    this.adjustArrest.CommandDate = moment(this.EditApproveCaseComparisonPopUp.CommandDate.jsdate).format('YYYY-MM-DD HH:mm:ss') + ' +00:00';
    this.adjustArrest.ApproveReportType = this.EditApproveCaseComparisonPopUp.ApproveReportType;
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

  public async MasStaffMaingetAll(): Promise<void> {
    try {
      this.rawStaffOptions = await this.apiService.post('/XCS60/MasStaffMaingetAll', {}, '8777').toPromise();
      console.log('ข้อมูล staff ทั้งหมด -> ', this.rawStaffOptions);
    } catch (e) {
      console.log('ดึง staff error -> ', e);
    }
  }

  public async StaffonAutoChange(value: string) {
    //
    if (value === '') {
      this.Staffoptions = [];
    } else {
      if (this.rawStaffOptions.length === 0) {
        await this.MasStaffMaingetAll();
      }
      this.Staffoptions = this.rawStaffOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10);
    }
    this.setAutocompleteStyle();
  }

  public StaffonAutoFocus(value: string) {
    if (value === '') {
      this.Staffoptions = [];
      this.ClearStaffData();
    }
  }

  public ClearStaffData() {
  }

  public StaffonAutoSelecteWord(event, type: any = 0, index: any = null) {
    if (type === 1) {
      this.EditApproveCaseComparisonPopUp.offerPosition = event.OperationPosName;
      this.EditApproveCaseComparisonPopUp.offerDepartment = event.OperationDeptName;
      this.EditApproveCaseComparisonPopUp.offerStaffCode = event.StaffCode;
      event = Object.assign({ContibutorID: 39}, event);
      this.AdjustCompareStaff[0] = event;
    } else if (type === 2) {
      this.EditApproveCaseComparisonPopUp.position = event.OperationPosName;
      this.EditApproveCaseComparisonPopUp.department = event.OperationDeptName;
      this.EditApproveCaseComparisonPopUp.staffCode = event.StaffCode;
      event = Object.assign({ContibutorID: 40}, event);
      this.AdjustCompareStaff[1] = event;
    } else if (type === 3) {
      this.EditApproveCaseComparisonPopUp.approvePosition = event.OperationPosName;
      this.EditApproveCaseComparisonPopUp.approveDepartment = event.OperationDeptName;
      this.EditApproveCaseComparisonPopUp.approveStaffCode = event.StaffCode;
      event = Object.assign({ContibutorID: 41}, event);
      this.AdjustCompareStaff[2] = event;
    }
  }


  public setAutocompleteStyle() {
    const cusid_ele = document.getElementsByClassName('cdk-overlay-container');
    console.log(cusid_ele);
    for (let i = 0; i < cusid_ele.length; ++i) {
      const item: any = cusid_ele[i];
      item.style['z-index'] = '9999';
      console.log(item);
    }
  }

  public async checkSave(): Promise<void> {
    console.log(this.adjustFine);
    const adjustData = [];

    const Fine = [];

    let cansave = true;
    let document = true;
    let document_name = true;
    let TreasuryMoney = 0;
    let BribeMoney = 0;
    let RewardMoney = 0;
    let CompareFine = 0;
    let ProductFine = 0;
    for (let i = 0; i < this.adjustFine.length; i++) {
      console.log(this.adjustFine[i].CompareFine);
      if (this.adjustFine[i].CompareFine == null || this.adjustFine[i].CompareFine === '') {
        swal('', 'ไม่ได้กรอกข้อมูลการปรับเพิ่ม-ลด กรุณากรอกข้อมูล', 'error');
        cansave = false;
        break;
      }

      if (isNaN(this.adjustFine[i].CompareFine)) {
        swal('', 'ข้อมูลการปรับเพิ่ม-ลด ต้องเป็นตัวเลขเท่านั้น', 'error');
        cansave = false;
        break;
      }

      Fine[this.adjustFine[i].CompareDetailID] = this.adjustFine[i].ProductFine;

      TreasuryMoney += this.adjustFine[i].CompareFineTreasuryMoney;
      BribeMoney += this.adjustFine[i].CompareFineBribeMoney;
      RewardMoney += this.adjustFine[i].CompareFineRewardMoney;
      CompareFine += this.adjustFine[i].CompareFine;
      ProductFine += this.adjustFine[i].ProductFine;

      adjustData.push({
        CompareFineID: '',
        CompareDetailID: this.activeRoute.snapshot.paramMap.get('mode') === 'A' ? '' : this.adjustFine[i].CompareDetailID,
        ProductID: this.adjustFine[i].ProductID,
        ProductFine: this.adjustFine[i].CompareFine,
        VatValue: 500,
        FineRate: 300,
        IsActive: 1,
        FineType: this.adjustFine[i].CompareFineDiff > 0 ? 0 : this.adjustFine[i].CompareFineDiff === 0 ? 1 : 2
      });
    }

    if (!cansave) {
      return;
    }


    if (this.EditApproveCaseComparisonPopUp.offerstaff === '' || this.EditApproveCaseComparisonPopUp.offerstaff == null) {
      cansave = false;
      swal('', 'กรุณากรอกผู้เสนอพิจารณาเห็นชอบ', 'error');
      return;
    }

    if (this.EditApproveCaseComparisonPopUp.staff === '' || this.EditApproveCaseComparisonPopUp.staff == null) {
      cansave = false;
      swal('', 'กรุณากรอกผู้พิจารณาเห็นชอบ', 'error');
      return;
    }

    if (this.EditApproveCaseComparisonPopUp.approveStaff === '' || this.EditApproveCaseComparisonPopUp.approveStaff == null) {
      cansave = false;
      swal('', 'กรุณากรอกผู้มีอำนาจอนุมัติ', 'error');
      return;
    }

    if (this.EditApproveCaseComparisonPopUp.Fact === '' || this.EditApproveCaseComparisonPopUp.Fact == null) {
      cansave = false;
      swal('', 'กรุณากรอกข้อเท็จจริงเกี่ยวกับความผิดโดยละเอียด', 'error');
    }

    if (this.EditApproveCaseComparisonPopUp.AdjustReason === '' || this.EditApproveCaseComparisonPopUp.AdjustReason == null) {
      cansave = false;
      swal('', 'กรุณากรอกเหตุผลที่ควรเปรียบเทียบคดีและ/หรือจัดการของกลาง', 'error');
    }

    if (this.AllAddFiles.length === 0) {
      // swal('', 'กรุณาแนบเอกสาร', 'error');
      document = false;
    }

    for (let j = 0; j < this.AllAddFiles.length; j++) {
      if (this.AllAddFiles[j].DocumentName == null || this.AllAddFiles[j].DocumentName === '' || !this.AllAddFiles[j].DocumentName) {
        // swal('', 'กรุณากรอกข้อมูลชื่อเอกสาร', 'error');
        document_name = false;
      }

      if (this.AllAddFiles[j].FilePath == null || this.AllAddFiles[j].FilePath === '' || !this.AllAddFiles[j].FilePath) {
        // swal('', 'กรุณาแนบเอกสาร', 'error');
        document = false;
        break;
      }
    }

    if (!document || !document_name) {
      if (!document) {
        swal({
          title: 'ไม่มีเอกสารแนบ?',
          text: 'ต้องการบันทึกข้อมูลจริงหรือไม่!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก'
        }).then(async result => {
          if (result.value) {
            await this.saveData(adjustData, CompareFine, TreasuryMoney, BribeMoney, RewardMoney, Fine);
          } else {
            return;
          }
        });
      }
    } else {
      await this.saveData(adjustData, CompareFine, TreasuryMoney, BribeMoney, RewardMoney, Fine);
    }
  }

  public async saveData(adjustData, CompareFine, TreasuryMoney, BribeMoney, RewardMoney, Fine): Promise<void> {
    console.log(adjustData);

    const param = {
      CompareDetailID: this.activeRoute.snapshot.paramMap.get('mode') === 'A' ? '' : this.compareIdDetail,
      CompareID: this.compareID,
      IndictmentDetailID: 0,
      CompareAction: '',
      LawbrakerTestimony: '',
      Fact: '',
      IsRequest: '',
      RequestForAction: '',
      CompareReason: '',
      IsProvisionalAcquittal: 0,
      Bail: '',
      Guaruntee: '',
      CompareFine: CompareFine,
      PaymentFineDate: '',
      PaymentFineAppointDate: '',
      PaymentVatDate: moment().format('YYYY-MM-DD HH:mm:ss') + ' +00:00',
      TreasuryMoney: TreasuryMoney,
      BribeMoney: BribeMoney,
      RewardMoney: RewardMoney,
      IsActive: 1,
      ApproveStationCode: '',
      ApproveStation: '',
      ApproveReportDate: '',
      CommandNo: '',
      CommandDate: '',
      CompareAuthority: '',
      ApproveReportType: 1,
      MistreatNo: 2,
      FineType: 1,
      AdjustReason: '',
      AdjustCompareDetailFine: [],
      AdjustCompareDetailReceipt: [],
      AdjustCompareStaff: []
    };

    for (const key in this.adjustArrest) {
      if (key in param) {
        // delete this.adjustArrest[key];
        param[key] = this.adjustArrest[key];
      }
    }

    // Object.assign(param, this.adjustArrest);

    this.CompareReceipt = this.CompareReceipt.filter((element, i) => {
      if (element.LawbreakerFirstName) {
        Object.assign(element, {
          CompareReceiptID: this.activeRoute.snapshot.paramMap.get('mode') === 'A' ? '' :
          this.AdjustCompareDetail[0].AdjustCompareDetailReceipt[0].CompareReceiptID,
          ReceiptType: this.mode,
          ReceiptDate: moment().format('YYYY-MM-DD HH:mm:ss') + ' +00:00',
          StationCode: this.EditApproveCaseComparisonPopUp.ApproveStationCode,
          Station: this.EditApproveCaseComparisonPopUp.ApproveStation,
          TotalFine: Fine[element.CompareDetailID],
          RevenueDate: moment().format('YYYY-MM-DD HH:mm:ss') + ' +00:00',
          IsActive: 1,
          CompareAuthority: 1,
          FineType: 1
        });
        return element;
      }
    });

    param.AdjustCompareDetailFine = adjustData;
    param.AdjustCompareDetailReceipt = this.CompareReceipt;
    param.AdjustCompareStaff = this.AdjustCompareStaff;
    // tslint:disable-next-line:radix
    param.CompareID = this.compareID;
    console.log(param);
return;
    try {
      let data;
      if (this.activeRoute.snapshot.paramMap.get('mode') === 'A') {
        data = await this.apiService.post('/XCS60/AdjustCompareDetailinsAll', param).toPromise();
      } else {
        data = await this.apiService.post('/XCS60/AdjustCompareDetailupdByCon', param).toPromise();
      }
      console.log(data);
      if (data.IsSuccess) {
        swal('', 'บันทึกข้อมูลสำเร็จ', 'success').then( async (result) => {
          if (result) {
            this.mode = 'V';
            this.navService.setPrintButton(true);
            this.navService.setDeleteButton(true);
            this.navService.setEditButton(true);
            this.navService.setSearchBar(false);
            this.navService.setCancelButton(false);
            this.navService.setSaveButton(false);

            this.navService.setEditField(true);
            this.navService.setSendIncomeButton(true);

            await this.GetAdjustCompareCRgetByCon(this.compareID);
            await this.GetAdjustCompareDetailgetByCon (this.compareID);
            await this.GetAdjustCompareReciptConfirmgetByCon(this.compareID);

            console.log('success');
          }
        });
      }
    } catch (e) {
      console.log(e);
      swal('', 'บันทึกข้อมูลไม่สำเร็จ', 'error');
    }

    if (this.AllAddFiles.length > 0) {
      for (const f of this.AllAddFiles) {
        if (f.IsNewItem && f.IsActive) {
          await this.insertFile(f);
        }
      }
    }
  }

  public async GetAdjustNoticegetByArrestCode() {
    const res = await this.apiService.post('/XCS60/AdjustCompareNoticegetByArrestCode', {
      ArrestCode: this.adjustArrest.ArrestCode
    }).toPromise();

    this.preloaderService.setShowPreloader(false);

    console.log('ข้อมูล % -> ', res);
    if (res) {
      this.sinbon = 20;
      this.rangwan = 20;
      this.songkrang = 60;
    }
  }

  public async buttonPrint() {

    let reports = [];
    try {
      reports = await this.apiService.post('/XCS60/MasDocumentMaingetAll', {
        'DocumentType': '3',
        'ReferenceCode': this.adjustArrest.ArrestCode
      }, '8777').toPromise();
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

    // console.log('++++detailData : ', this.detailData);
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

  jsonCopy(src) {
    return JSON.parse(JSON.stringify(src));
  }

  async MasDocumentMaingetAll() {
    try {
      const data: any = {
        'DocumentType': '3',
        'ReferenceCode': this.adjustArrest.ArrestCode
      };
      const report = await this.apiService.post('/XCS60/MasDocumentMaingetAll', data, '8777').toPromise();
      return report;
    } catch (err) {
      return [];
    }
  }

  async setDocument() {
    this.AllAddFiles = [];
    this.filePath = [];
    const file: any = await this.MasDocumentMaingetAll();
    if (file) {
      for (const ap of file) {
        const fileData: any = this.jsonCopy(ap);
        fileData.DocumentName = ap.DocumentName;
        fileData.DataSource = ap.DataSource;
        fileData.FilePath = ap.FilePath;
        fileData.DocumentID = ap.DocumentID;
        fileData.CompareCode = ap.CompareCode;
        fileData.ReferenceCode = ap.ReferenceCode;
        fileData.IsActive = 1;
        this.AllAddFiles.push(fileData);
        this.filePath.push({ path: ap.FilePath, name: ap.DocumentName });
      }
    }
    this.dataForCompare.document = this.jsonCopy(file);
  }

  addNewFile() {
    const fileData: any = this.jsonCopy(this.compareDocument);
    fileData.DocumentName = '';
    fileData.DataSource = '';
    fileData.IsNewItem = true;
    fileData.FilePath = '';
    fileData.DocumentID = null;
    fileData.CompareCode = '';
    fileData.ReferenceCode = '';
    fileData.IsActive = 0;
    fileData.DocumentType = '3';
    this.AllAddFiles.push(fileData);
    this.filePath.push({ path: '', name: '' });

  }

  handleFileInput(files: any, index: any) {
    // this.fileToUpload = files.item(0);
    console.log(files);
    const fileData: any = this.jsonCopy(this.compareDocument);
    fileData.DocumentName = files.target.files.item(0).name;
    fileData.DataSource = fileData.DocumentName;
    fileData.IsNewItem = true;
    fileData.FilePath = replaceFakePath(files.target.value);
    fileData.DocumentID = null;
    fileData.CompareCode = this.adjustArrest.CompareCode;
    fileData.ReferenceCode = this.adjustArrest.ArrestCode;
    fileData.IsActive = 1;
    fileData.DocumentType = '3';
    this.AllAddFiles[index] = fileData;
    this.filePath[index] = { path: replaceFakePath(files.target.value), name: files.target.files.item(0).name };
  }

  async deleteFile(id: any, index: any) {
    swal({
      title: 'ยืนยันการทำรายการ?',
      text: 'ต้องการลบไฟล์จริงหรือไม่!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก'
    }).then(async (result) => {
      if (result.value) {
        console.log(id);
        if (id) {
          try {
            const resp: any = await this.apiService.post('/MasDocumentMainupdDelete', { 'DocumentID': id }, '8777');
            swal(
              '',
              'ลบไฟล์สำเร็จ.',
              'success'
            );
            if (index > -1) {
              this.filePath.splice(index, 1);
              this.AllAddFiles.splice(index, 1);
            }
          } catch (err) {
            swal(
              '',
              'ลบไฟล์ไม่สำเร็จ.',
              'error'
            );
          }
        } else if (index || index === 0) {
          if (index > -1) {
            this.filePath.splice(index, 1);
            this.AllAddFiles.splice(index, 1);
            swal(
              '',
              'ลบไฟล์สำเร็จ.',
              'success'
            );
          }
        }
      }
    });
  }

  async insertFile(file: any) {
    try {
      file.DocumentID = null;
      const resp: any = await this.masDocumentMainService.MasDocumentMaininsAll(file);
      return resp;
    } catch (err) {
      console.log(err);
      return null;
    }

  }

  getAllFile() {
    try {
      const i: any = 0;
      for (const f of this.AllAddFiles) {
        f.DocumentID = i;
      }
      return this.AllAddFiles;
    } catch (err) {
      console.log(err);
    }
  }

  toDatePickerFormat(d: any) {
    return {
      date: {
        year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()
      },
      formatted: toLocalShort(d.toString()).replace(/ /g, ' ')
    };
  }

  changApproveReportType(): any {
    console.log(this.EditApproveCaseComparisonPopUp.ApproveReportType);
    this.AdjustCompareDetail[this.fineIdex].ApproveReportType = this.EditApproveCaseComparisonPopUp.ApproveReportType;
  }

  changeReceiptChanel(event, i) {
    this.CompareReceipt[i].ReceiptChanel = event.target.value;
  }

  public ngOnDestroy() {
    // hind ส่งรายได้
    this.navService.setSendIncomeButton(false);
    // hide ปุ่มลบ
    this.navService.setDeleteButton(false);
    // hide ปุ่มยกเลิก
    this.navService.setCancelButton(false);

    this.navService.setOnCancel(false);

    this.unsub.cancel.unsubscribe();
    this.unsub.delete.unsubscribe();
    this.unsub.edit.unsubscribe();
    this.unsub.incame.unsubscribe();
    this.unsub.print.unsubscribe();
    this.unsub.save.unsubscribe();
  }

}

