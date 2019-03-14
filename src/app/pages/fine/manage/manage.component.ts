import { Component, OnInit, OnDestroy, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FineService } from '../fine.service';
import { ArrestService } from '../../model/arrest.service';
import { LawsuitService } from '../../model/lawsuit.service';
import { MasterService } from '../../model/master.service';
import { Arrest } from '../../model/arrest';
import { Compare } from '../compare';
import { CompareDetail } from '../compareDetail';
import { CompareDetailReceipt } from '../compareReceipt';
import { CompareStaff } from '../compareStaff';
import { ICompareDetail } from '../fine-model';
import { MatAutocomplete, _MatListItemMixinBase } from '@angular/material';
// import { ProveStaff } from '../proveStaff';
// import { ProveScience } from '../proveScience';
// import { ProveProduct } from '../proveProduct';
import { Message } from '../../../config/message';
// import { ProveDocument } from '../proveDoc';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { ArrestStaff } from '../../model/arrest-staff';
import { isNgTemplate } from '@angular/compiler';
import { async } from 'q';
import { isArray } from 'jquery';
import { FormGroup, FormControl, NgForm, FormArray, FormBuilder } from '@angular/forms';
import { IMyDpOptions, IMyDate } from 'mydatepicker';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import { toLocalShort } from 'app/config/dateFormat';
import Swal from 'sweetalert2'
import { MasDocumentMainService } from 'app/services/mas-document-main.service';
import swal from 'sweetalert2';
import { replaceFakePath } from 'app/config/dataString';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {
  isEditMode: any = {};
  IsOutside: number;
  OnSubscribe: any = {};
  compareForm: FormGroup;
  multiReward: any = {
    BribeMoney: 0.2,
    RewardMoney: 0.2,
    TreasuryMoney: 0.6
  };
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
  isFinishLoad: boolean;
  // Html
  modal: any;
  @ViewChild('printDocModal') printDocModel: ElementRef;
  @ViewChild('accusedForm') accusedForm: NgForm;
  @ViewChild('accusedPopupForm') accusedPopupForm: NgForm;
  // Date
  DateOption: IMyDpOptions = {
    // other options...
    dateFormat: 'dd mmm yyyy'
  };
  YearOption: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy'
  };
  year: any = [];
  compareDate: any = {year: 0, month: 0, day: 0};
  // Object for binding
  headerData: any = {};
  params: any = {};
  accused: any = {};
  showEditField: any;
  ListCompareDetail: any = []; // รายละเอียดค่าปรับ
  receipt: any = {}; // รายละเอียดค่าปรับ
  approveReportList: any = []; // รายละเอียดค่าปรับ
  sumAllCompare: any = { sum: 0, sum1: 0, sum2: 0, sum3: 0};
  paymentChanel: any = ['เงินสด', 'EDC', 'เครดิต', 'เดบิต'];
  // AutoComplete
  options: any = [];
  optionsStation: any = [];
  rawOptions: any = [];
  Staffoptions: any = [];
  rawStaffOptions: any = [];
  // file
  AllAddFiles: any = [];
  filePath: any = [];
  // Popup
  editUser: any = {};
  userCompareReceiptDetail: any = {};
  compareUserDetailPopup: any = {};
  // Data save all
  DataToSave: any = {};
  DateToday: any = {};
  timeNow: any = {};
  dataForCompare: any = {};
  // Btn Save
  btnAccuse: HTMLElement = document.getElementById('btnAccuse') as HTMLElement;
  receiptSave: HTMLElement = document.getElementById('receiptSave') as HTMLElement;
  btnApprove: HTMLElement = document.getElementById('btnApprove') as HTMLElement;
  btnAccusedHeader: HTMLElement = document.getElementById('btnAccusedHeader') as HTMLElement;
  // DataForUpdate
  compareDataUpdate: any;
  compareDataUpdateTmp: any;
  formatterStaff = (x: { TitleName: string, FirstName: string, LastName: string }) =>
        `${x.TitleName || ''} ${x.FirstName || ''} ${x.LastName || ''}`;
  isReportNo: any = false;
  logedinUser: any = {};
  staffTmp: any = {};
  get CompareDocument(): FormArray {
    return this.compareForm.get('CompareDocument') as FormArray;
  }

  constructor(private navService: NavigationService,
    private ngbModel: NgbModal,
    private activeRoute: ActivatedRoute,
    private fineService: FineService,
    private ArrestSV: ArrestService,
    private LawsuitSV: LawsuitService,
    private MasterSV: MasterService,
    private router: Router,
    private preloader: PreloaderService,
    private sidebarService: SidebarService,
    private masDocumentMainService: MasDocumentMainService,
    private fb: FormBuilder
  ) {
    this.isFinishLoad = false;
    this.isEditMode.receipt = {};
    this.sidebarService.setVersion('0.0.0.52');
    // set false
    this.navService.setNewButton(false);
    this.navService.setSearchBar(false);
    // set true
    // this.navService.setNextPageButton(true);
    // this.navService.setInnerTextNextPageButton('ส่งเงินรายได้');
    this.IsOutside = 0;
    this.receipt.list = [];
    const d: Date = new Date();
    this.compareDate = { date: {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}};
    this.DateToday = { date: {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}, formatted: toLocalShort(d.toString()).replace(/ /g, '/') };
    this.timeNow = this.getTimeNow();
    this.accused.CompareTime = this.timeNow + ' น.';
    this.generateYear();
    this.setAutocompleteStyle();
  }

  async ngOnInit() {
    try {
      this.preloader.setShowPreloader(true);
      await this.MasofficeMaingetAll();
      await this.MasStaffMaingetAll();
      await this.getRouteParams();
      await this.subscribeHeaderBtn();
      await this.CompareArrestgetByIndictmentID();
      await this.getMultiplyReward();
      this.accused.CompareDate = this.compareDate;
      console.log(this.accused);
      this.preloader.setShowPreloader(false);
      this.btnAccuse = document.getElementById('btnAccuse') as HTMLElement;
      this.receiptSave = document.getElementById('receiptSave') as HTMLElement;
      this.btnApprove = document.getElementById('btnApprove') as HTMLElement;
      this.btnAccusedHeader = document.getElementById('btnAccusedHeader') as HTMLElement;
      if (this.params.CompareID == '0') {
        this.showEditField = false;
      } else {
        this.showEditField = true;
      }
      if (this.showEditField) {
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditButton(true);
        this.navService.setSearchBar(false);
        this.navService.setCancelButton(false);
        this.navService.setSaveButton(false);
        // this.navService.setNextPageButton(true);
      } else {
        this.navService.setSaveButton(true);
        this.navService.setCancelButton(true);
        this.navService.setPrintButton(false);
        this.navService.setSearchBar(false);
        this.navService.setDeleteButton(false);
        this.navService.setEditButton(false);
        this.navService.setNextPageButton(false);
      }
      await this.getCompareData();
      await this.setAllCompareData();
      this.calSum();
      this.isFinishLoad = true;
    } catch (err) {
      this.navService.setPrintButton(false);
      this.navService.setDeleteButton(false);
      this.navService.setEditButton(false);
      this.navService.setSearchBar(false);
      this.navService.setCancelButton(false);
      this.navService.setSaveButton(false);
      this.navService.setNextPageButton(false);
      this.preloader.setShowPreloader(false);
      console.log(err);
      this.router.navigate([`/fine/list`]);
     }

    console.log( this.showEditField);
    // this.navigate_Service();
  }
  ngOnDestroy() {
    this.navService.setPrintButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setEditButton(false);
    this.navService.setSearchBar(false);
    this.navService.setCancelButton(false);
    this.navService.setSaveButton(false);
    this.navService.setNextPageButton(false);
    for (const k of Object.keys(this.OnSubscribe)) {
      this.OnSubscribe[k].unsubscribe();
    }
  }
  async getMultiplyReward() {
    try {
      const resp: any = await this.CompareNoticegetByArrestCode();
      if (resp && resp.length > 0) {
        this.multiReward = {
          BribeMoney: 0.2,
          RewardMoney: 0.2,
          TreasuryMoney: 0.6
        };
      } else {
        this.multiReward = {
          BribeMoney: 0,
          RewardMoney: 0.2,
          TreasuryMoney: 0.8
        };
      }
    } catch (err) {
      this.multiReward = {
        BribeMoney: 0,
        RewardMoney: 0.2,
        TreasuryMoney: 0.8
      };
    }
  }
  setAutocompleteStyle() {
    const cusid_ele = document.getElementsByClassName('cdk-overlay-container');
    console.log(cusid_ele);
    for (let i = 0; i < cusid_ele.length; ++i) {
        let item: any = cusid_ele[i];
        item.style['z-index'] = '9999';
        console.log(item);
    }
  }
  generateYear() {
    for (let i = 100 ; i > 0 ; i--) {
      this.year.push(((+this.DateToday.date.year) - i) + 544);
    }
  }
  toDatePickerFormat(d: any) {
    return { date: {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}, formatted: toLocalShort(d.toString()).replace(/ /g, ' ') };
  }
  async getCompareData() {
    if (+this.params.CompareID) {
      await this.CompareDetailgetByCon();
    }
  }
  async CompareDetailgetByCon() {
    try {
      const data: any = { CompareID: +this.params.CompareID }
      const resp: any = await this.fineService.postMethod('ComparegetByCon', data);
      if (resp) {
        this.compareDataUpdate = this.jsonCopy(resp);
        this.compareDataUpdateTmp = this.jsonCopy(resp);
        this.staffTmp = this.jsonCopy(resp.CompareStaff);
      } else {
        swal('', 'ไม่พบข้อมูลการเปรียบเทียบ', 'error');
        throw 'ไม่พบข้อมูลการเปรียบเทียบ';
      }

      console.log(JSON.stringify(this.compareDataUpdate) === JSON.stringify(resp));
    } catch (err) {

    }
  }
  async setAllCompareData() {
    if (this.compareDataUpdateTmp) {
      await this.setAccusedDataList();
      await this.setCompareDetail();
      await this.setReceiptData();
      await this.setApproveReportList();
      await this.setDocument();
      this.dataForCompare.accused = this.jsonCopy(this.accused);
      this.dataForCompare.approveReportList = this.jsonCopy(this.approveReportList);
      this.dataForCompare.receipt = this.jsonCopy(this.receipt);
    }
  }
  async MasDocumentMaingetAll() {
    try {
      const data: any = {
        "DocumentType": "3",
        "ReferenceCode": "TN9011126100002"
      };
      return await this.fineService.postMethod('MasDocumentMaingetAll', data, '8777');
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
        this.filePath.push({path: ap.FilePath, name: ap.DocumentName });
      }
    }
    this.dataForCompare.document = this.jsonCopy(file);
  }
  async setApproveReportList() {
    const staff: any = this.jsonCopy(this.compareDataUpdateTmp.CompareStaff);
    let i = 0;
    const cmpD: any = this.jsonCopy(this.compareDataUpdateTmp.CompareDetail);
    if (staff.length > 0 && cmpD.length > 0) {
      for (const ap of this.compareDataUpdateTmp.CompareDetail) {
        console.log(cmpD[i]);
        if (!this.approveReportList[i]) {
          this.approveReportList.push({});
        }
        this.approveReportList[i].ApproveStation = cmpD[i].ApproveStation;
        this.approveReportList[i].payDate = this.toDatePickerFormat(new Date(cmpD[i].PaymentFineAppointDate));
        this.approveReportList[i].payTime = this.getTimeNow(new Date(cmpD[i].PaymentFineAppointDate));
        this.approveReportList[i].ApproveStationCode = cmpD[i].ApproveStationCode;
        this.approveReportList[i].ApproveType = cmpD[i].ApproveReportType ? cmpD[i].ApproveReportType : 1;
        this.approveReportList[i].ApproveReportDate = cmpD[i].ApproveReportDate ? this.toDatePickerFormat(new Date(cmpD[i].ApproveReportDate)) : null;
        this.approveReportList[i].ApproveReportDateShow = this.approveReportList[i].ApproveReportDate ? this.approveReportList[i].ApproveReportDate.formatted : null;
        this.approveReportList[i].dateOfIssue = cmpD[i].CommandDate ? this.toDatePickerFormat(new Date(cmpD[i].CommandDate)) : null;
        this.approveReportList[i].departOrder = cmpD[i].CommandNo;
        this.approveReportList[i].detailFact = cmpD[i].Fact;
        this.approveReportList[i].other = cmpD[i].CompareReason;
        let j = 0;
        // console.log( this.approveReportList[i]);
        i++;
      }
      i = 0;
      for (const list of this.approveReportList) {
        let j: any = 0;
        for (const st of staff) {
          const name: string = (st? st.TitleName: '') + ' ' + st.FirstName + ' ' + st.LastName;
          // console.log((+st.ProcessCode) , parseFloat(j + '.1'), st.ContributorID);
          if (st.ContributorID == 17) {
            // console.log('contribute');
            this.accused.staff = st;
            this.accused.CompareStaffName = name;
            this.accused.OperationPosName = st.PositionName ? st.PositionName : this.accused.OperationPosName;
            this.accused.OperationPosCode = st.PositionCode ? st.PositionCode : this.accused.OperationPosCode;
            this.accused.OperationDeptCode = st.OfficeCode;
            this.accused.OperationDeptName = st.OfficeShortName;
          } else if (st.ProcessCode && st.ProcessCode.split('.').length == 2) {
            const code: any = st.ProcessCode.split('.');
            j = code[0];
            if ((+st.ProcessCode) == parseFloat(j + '.1')) {
              // console.log((+st.ProcessCode) , parseFloat(j + '.1'));
              this.approveReportList[j].staff = name;
              this.approveReportList[j].position1 = st.PositionName;
              this.approveReportList[j].department1 = st.OfficeShortName;
              this.approveReportList[j].staff1 = this.jsonCopy(st);
            } else if ((+st.ProcessCode) === parseFloat(j + '.2')) {
              // console.log((+st.ProcessCode) , parseFloat(j + '.2'));
              this.approveReportList[j].reviewer = name;
              this.approveReportList[j].rank = st.PositionName;
              this.approveReportList[j].department2 = st.OfficeShortName;
              this.approveReportList[j].staff2 = this.jsonCopy(st);
            } else if ((+st.ProcessCode) === parseFloat(j + '.3')) {
              // console.log((+st.ProcessCode) , parseFloat(j + '.3'));
              this.approveReportList[j].approver = name;
              this.approveReportList[j].rank2 = st.PositionName;
              this.approveReportList[j].department3 = st.OfficeShortName;
              this.approveReportList[j].staff3 = this.jsonCopy(st);
            }
          } else if (st.ProcessCode && st.ProcessCode.split('.').length == 1) {
            // console.log('staff 19 ', st.ProcessCode, j);
            const ind: any = parseInt(st.ProcessCode != null ? st.ProcessCode : 0);
            // console.log(ind);
            let indexUser = 0;
            if (typeof ind == 'number' && this.receipt.list.length > ind) {
              try {
                // console.log((+st.ProcessCode) == parseFloat(j));
                this.receipt.list[ind].OperationPosName = st.PositionName ? st.PositionName : this.receipt.list[ind].OperationPosName;
                this.receipt.list[ind].OperationPosCode = st.PositionCode ? st.PositionCode : this.receipt.list[ind].OperationPosCode;
                this.receipt.list[ind].ReceiptStaff = name;
                this.receipt.list[ind].ReceipPosition = st.PositionName;
                this.receipt.list[ind].ReceipDepartment = st.OfficeShortName;
                this.receipt.list[ind].staff = st;
              } catch (err) {
                console.log(err);
              }
            }
            for (const u of this.DataToSave.userData) {
              if (st.ContributorID == 19 && u.IndictmentDetailID == st.ProcessCode) {
                try {
                  this.receipt.list[indexUser].OperationPosName = st.PositionName ? st.PositionName : this.receipt.list[indexUser].OperationPosName;
                  this.receipt.list[indexUser].OperationPosCode = st.PositionCode ? st.PositionCode : this.receipt.list[indexUser].OperationPosCode;
                  this.receipt.list[indexUser].ReceiptStaff = name;
                  this.receipt.list[indexUser].ReceipPosition = st.PositionName;
                  this.receipt.list[indexUser].ReceipDepartment = st.OfficeShortName;
                  this.receipt.list[indexUser].staff = st;
                } catch (err) {
                  console.log(err);
                }
              } else if (u.IndictmentDetailID == st.ProcessCode) {
                if (st.ContributorID == 39) {
                  this.approveReportList[indexUser].staff = name;
                  this.approveReportList[indexUser].position1 = st.PositionName;
                  this.approveReportList[indexUser].department1 = st.OfficeShortName;
                  this.approveReportList[indexUser].staff1 = this.jsonCopy(st);
                } else if (st.ContributorID == 40) {
                  // console.log((+st.ProcessCode) , parseFloat(j + '.2'));
                  this.approveReportList[indexUser].reviewer = name;
                  this.approveReportList[indexUser].rank = st.PositionName;
                  this.approveReportList[indexUser].department2 = st.OfficeShortName;
                  this.approveReportList[indexUser].staff2 = this.jsonCopy(st);
                } else if (st.ContributorID == 41) {
                  // console.log((+st.ProcessCode) , parseFloat(j + '.3'));
                  this.approveReportList[indexUser].approver = name;
                  this.approveReportList[indexUser].rank2 = st.PositionName;
                  this.approveReportList[indexUser].department3 = st.OfficeShortName;
                  this.approveReportList[indexUser].staff3 = this.jsonCopy(st);
                }
              }
              indexUser++;
            }
          }
        }
        i++;
      }
    }
  }
  async setAccusedDataList() {
    // const staff: any = this.searchStaffByContributorID(17);
    // if (staff.length > 0) {
    //   this.accused.staff = staff[0];
    //   this.accused.CompareStaffName = staff[0].TitleName + ' ' + staff[0].FirstName + ' ' + staff[0].LastName;
    //   this.accused.OperationPosName = staff[0].PositionName;
    //   this.accused.OperationDeptName = staff[0].OfficeShortName;
    // }
    this.accused.StationName = this.compareDataUpdateTmp.CompareStation;
    this.accused.StationCode = this.compareDataUpdateTmp.CompareStationCode;
    this.accused.CompareDate = this.toDatePickerFormat(new Date(this.compareDataUpdateTmp.CompareDate));
    this.accused.CompareTime = this.getTimeNow(new Date(this.compareDataUpdateTmp.CompareDate)) + ' น.';
    // console.log(staff);
  }
  async setCompareDetail() {
    let i = 0;
    let countCD = 0;
    for (const compare of this.compareDataUpdateTmp.CompareDetail) {
      if (!this.accused.list[i]) {
        this.accused.list.push({});
      }
      this.accused.list[i].PaymentFineAppointDate = this.toDatePickerFormat(new Date(compare.PaymentFineAppointDate));
      this.accused.list[i].PaymentFineAppointShow = this.accused.list[i].PaymentFineAppointDate.formatted;
      if (compare.PaymentVatDate) {
        this.accused.list[i].PaymentVatDate = this.toDatePickerFormat(new Date(compare.PaymentVatDate));
        this.accused.list[i].PaymentVatDateShow = this.accused.list[i].PaymentVatDate.formatted;
      }
      this.accused.list[i].request = compare.IsRequest;
      this.accused.list[i].Bail = compare.Bail;
      this.accused.list[i].Guaruntee = compare.Guaruntee;
      if (compare.Guaruntee && compare.Guaruntee.length > 0) {
        this.accused.list[i].checkBox2 = true;
      }
      if (compare.Bail && compare.Bail.length > 0) {
        this.accused.list[i].checkBox1 = true;
      }

      const accuseDate: any = new Date(this.accused.CompareDate.date.year, (+this.accused.CompareDate.date.month) - 1, this.accused.CompareDate.date.day);
      const d: any = this.accused.list[i].PaymentFineAppointDate;
      const PaymentFineAppointDate: any = new Date(d.date.year, (+d.date.month) - 1, d.date.day);
      this.accused.list[i].cancheck = accuseDate < PaymentFineAppointDate;
      this.accused.list[i].LawbrakerTestimony = compare.LawbrakerTestimony;
      this.accused.list[i].IsProvisionalAcquittal = compare.IsProvisionalAcquittal;
      // this.e ditUser.PaymentFineAppointDate.formatted
      if (compare.CompareDetailReceipt.length > 0) {
        const length: any = (this.compareDataUpdateTmp.CompareDetail.length - compare.CompareDetailReceipt.length) + i;
        console.log(this.receipt.list[i]);
        // this.receipt.list[i].TotalFine = compare.CompareFine;
        if (!this.receipt.list[i]) {
          this.receipt.list.push({});
        }
        const recLength: any = compare.CompareDetailReceipt.length;
        const recLastIndex: any = recLength > 0 ? recLength - 1 : recLength;
        this.receipt.list[i].PaymentDate = compare.CompareDetailReceipt[recLastIndex].PaymentDate ? this.convertToNormalDate(new Date(compare.CompareDetailReceipt[recLastIndex].PaymentDate), true) : null;
        this.receipt.list[i].ReceipStation = compare.CompareDetailReceipt[recLastIndex].Station ? compare.CompareDetailReceipt[recLastIndex].Station : '';
        this.receipt.list[i].ReceiptChanel = compare.CompareDetailReceipt[recLastIndex].ReceiptChanel ? compare.CompareDetailReceipt[recLastIndex].ReceiptChanel : '';
        this.receipt.list[i].ReceiptBookNo = compare.CompareDetailReceipt[recLastIndex].ReceiptBookNo ? compare.CompareDetailReceipt[recLastIndex].ReceiptBookNo : '';
        this.receipt.list[i].ReferenceNo = compare.CompareDetailReceipt[recLastIndex].ReferenceNo != 'null' ? compare.CompareDetailReceipt[recLastIndex].ReferenceNo : '';
        this.receipt.list[i].ReceiptNo = compare.CompareDetailReceipt[recLastIndex].ReceiptNo ? compare.CompareDetailReceipt[recLastIndex].ReceiptNo : '';
        this.receipt.list[i].CompareReceiptID = compare.CompareDetailReceipt[recLastIndex].CompareReceiptID;
        this.receipt.list[i].CompareDetailID = compare.CompareDetailReceipt[recLastIndex].CompareDetailID;
      }
      console.log('compare');
      console.log(compare);
      if (compare.CompareDetailFine) {
        for (const cd of compare.CompareDetailFine) {
          if (!this.ListCompareDetail[countCD]) {
            this.ListCompareDetail.push({});
          }
          console.log(cd);
          console.log(cd.ProductFine);
          this.ListCompareDetail[countCD]['userNo' + i + ':' + countCD] = cd.ProductFine;
          countCD++;
        }
      }
      i++;
    }
    // console.log('ขอ้มูลการเสียค่าปรับ');
    // console.log(this.accused);
    this.calSum();
  }
  setReceiptData() {
    this.receipt.IsOutside = this.compareDataUpdateTmp.IsOutside;
    const compNo: any = this.compareDataUpdateTmp.CompareCode.split('/');
    this.receipt.CompareNo = compNo[0];
    if ((+compNo[1]) > this.year[this.year.length - 1] || (+compNo[1]) < this.year[0]) {
      this.year.push((+compNo[1]));
    }
    this.receipt.CompareYear = compNo[1];
    if (this.receipt.CompareNo && this.receipt.CompareYear) {
      this.receipt.isHaveData = true;
    }
    console.log(this.receipt);
  }
  searchStaffByContributorID(ContributorID) {

    return this.compareDataUpdateTmp.CompareStaff.filter(f => f.ContributorID === ContributorID);
  }
  getTimeNow(d: any = new Date) {
    let h = d.getHours().toString();
    let m = d.getMinutes().toString();
    if((+h) < 10) {
      h = '0' + h;
    }
    if((+m) < 10) m = '0' + m;
    return h + ':' + m;
  }
  private getRouteParams() {
    this.activeRoute.params.subscribe(p => {
      this.navService.setPrintButton(true);
      this.navService.setDeleteButton(true);
      this.navService.setEditButton(true);
      this.navService.setSearchBar(false);
      this.navService.setCancelButton(false);
      this.navService.setSaveButton(false);

      // this.navService.setNextPageButton(true);
      if (p['code1']) {
        this.params.CompareID = p['code1'];
      }
      if (p['code2']) {
        this.params.IndictmentID = p['code2'];
      }
      if (p['code3']) {
        this.params.ArrestCode = p['code3'];
      }
    });
  }
  async subscribeHeaderBtn() {
    this.navService.showFieldEdit.subscribe(status => {
      this.showEditField = status;
      if (!this.showEditField) {
        this.navService.setSaveButton(true);
        this.navService.setCancelButton(true);
        this.navService.setPrintButton(false);
        this.navService.setSearchBar(false);
        this.navService.setDeleteButton(false);
        this.navService.setEditButton(false);
        this.navService.setNextPageButton(false);
      } else {
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditButton(true);
        this.navService.setSearchBar(false);
        this.navService.setCancelButton(false);
        this.navService.setSaveButton(false);
        // this.navService.setNextPageButton(true);
      }
    });
    this.OnSubscribe.cancel = this.navService.onCancel.subscribe(async status => {
      if (status && this.isFinishLoad) {
        Swal({
          title: '',
          text: "ต้องการยกเลิกรายการจริงหรือไม่!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ใช่',
          cancelButtonText: 'ไม่'
        }).then( async (result) => {
          if (result.value) {
            if (this.params.CompareID && this.params.CompareID > 0) {
              this.preloader.setShowPreloader(true);
              await this.initData();
              await this.navService.setOnCancel(false);
              this.showEditField = status;
              this.navService.setPrintButton(true);
              this.navService.setDeleteButton(true);
              this.navService.setEditButton(true);
              this.navService.setSearchBar(false);
              this.navService.setCancelButton(false);
              this.navService.setSaveButton(false);
              // this.navService.setNextPageButton(true);
              this.preloader.setShowPreloader(false);
              this.showEditField = true;
            } else {
              this.router.navigate([`/fine/list`]);
              // this.navService
            }
          }
        });
        
        
      }
    });
    this.OnSubscribe.save = this.navService.onSave.subscribe(async status => {
      console.log(status);
      if (status && this.isFinishLoad) {
        if (this.params.CompareID.toString() === '0') {
          this.btnAccusedHeader.click();
        } else {
          this.btnAccusedHeader.click();
        }
      }
    });
    this.OnSubscribe.delete = this.navService.onDelete.subscribe(async status => {
      if (status && this.isFinishLoad) {
        this.deleteCompare();
      }
    });
    this.OnSubscribe.print = this.navService.onPrint.subscribe(async status => {
      if (status && this.isFinishLoad) {
        await this.navService.setOnPrint(false);
        this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
      }
    })
  }
  async deleteCompare() {
    try {
      if (this.params.CompareID > 0) {
        Swal({
          title: 'ยืนยันการทำรายการ?',
          text: "ต้องการลบข้อมูลจริงหรือไม่!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ลบ',
          cancelButtonText: 'ยกเลิก'
        }).then( async (result) => {
          if (result.value) {
            this.preloader.setShowPreloader(true);
            let resp: any = null;
            const data: any = {CompareID: this.params.CompareID};
            let message: any = '';
            for (const rec of this.receipt.list) {
              if (rec.RevenueStatus == 1) {
                resp = null;
                message = '';
                break;
              } else if (rec === this.receipt.list[this.receipt.list.length - 1]) {
                resp = await this.fineService.postMethod('CompareupdDelete', data);
              }
            }
            if (resp) {
              if (resp.IsSuccess == 'True') {
                swal('', 'ลบข้อมูลสำเร็จ', 'success');
                await this.preloader.setShowPreloader(false);
                this.router.navigate([`/fine/list`]);
              } else {
                this.preloader.setShowPreloader(false);
                swal('', 'ลบข้อมูลไม่สำเร็จ', 'error');
              }
            } else {
              this.preloader.setShowPreloader(false);
              swal('', 'ลบข้อมูลไม่สำเร็จ', 'error');
            }
          }
        });
      }
    } catch (err) {

    }
  }
  async checkReceiptData(CompareDetailID: any, index: any = 0) {
    let receiptData: any = {};
    const rec = this.receipt.list[index];
    console.log(this.receipt);
    {
      if (this.isNotValidTxtField(rec.PaymentDate)) {
        return false;
      } else {
        try {
          const rec1: any = {
            ReceiptType: 'A',
            ReceiptBookNo: rec.ReceiptBookNo,
            ReceiptNo: rec.ReceiptNo,
            ReceiptDate: this.convertToNormalDate(rec.PaymentDate.date) + ' 00:00:00 +07.00',
            StationCode: this.DataToSave.CompareStationData ? this.DataToSave.CompareStationData.OfficeCode : '',
            Station: this.accused.StationName,
            CompareDetailID: CompareDetailID,
            PaymentDate: this.convertToNormalDate(rec.PaymentDate.date) + ' 00:00:00 +07.00',
            TotalFine: this.sumAllCompare.sum,
            RevenueStatus: 0,
            IsActive: 1,
            ReceiptChanel: rec.ReceiptChanel,
            ReferenceNo: rec.ReferenceNo,
            CompareAuthority: 0,
            FineType: 1
          };
          const reqField: any = ['ReceiptBookNo', 'ReceiptNo', 'ReceiptChanel', 'ReceiptDate'];
          receiptData = rec1;
          console.log('ข้อมูลการส่งใบเสร็จ');
          console.log(rec1);
          if (this.validateReceiptData(rec1, reqField) && rec.staff && !this.isNotValidTxtField(rec.ReceiptStaff)) {
            receiptData.RevenueDate = '';
            // || !(JSON.stringify(this.receipt.list[index]) === JSON.stringify(this.dataForCompare.receipt[index]))
            if (!this.receipt.list[index].CompareReceiptID) {
              const resp :any = await this.CompareDetailReceipinsAll(receiptData);
              console.log('ค่าการรีเทิร์น');
              console.log(resp);
              if (resp.CompareReceiptID) {
                await this.ComparePaymentFineinsAll(resp.CompareReceiptID, index);
              }
            }
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
    }
  }
  validateReceiptData(rec, field) {
    console.log(rec);
    for (const r of field) {
      console.log(r);
        console.log(rec[r]);
      if (this.isNotValidTxtField(rec[r])) {
        return false;
      }
    }
    return true;
  }
  async CompareDetailReceipinsAll(data) {
    try {
      const resp: any = await this.fineService.postMethod('CompareDetailReceiptinsAll', data);
      console.log(resp);
      return resp;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async CompareNoticegetByArrestCode() {
    try {
      const data: any = {
        'ArrestCode': this.params.ArrestCode
      };
      return await this.fineService.postMethod('CompareNoticegetByArrestCode', data);
    } catch (err) {
      return [];
    }
  }
  async ComparePaymentFineinsAll(CompareReceiptID: number, index: any) {
    try {
      const rec: any = this.receipt.list[index];
        const data: any = {
          FineType: ((+this.params.CompareID) > 0 ? 1 : 0),
          ReferenceID: CompareReceiptID,
          PaymentPeriodNo: 1,
          PaymentFine: this.sumAllCompare.sum,
          PaymentDueDate: '',
          PaymentActualDate: this.convertToNormalDate(rec.PaymentDate.date) + ' 00:00:00 +07.00',
          ReceiveFinRate: '',
          IsActive: 1,
          IsRequestReward: 0,
          ComparePaymentFineDetail: []
        };
        const resp: any = await this.CompareNoticegetByArrestCode();
        for (const notice of resp) {
          data.ComparePaymentFineDetail.push({
            "NoticeCode": notice.NoticeCode,
            "IsRequestBribe": '0',
            "IsActive": '1'
          });
        
      }
      const insPaymentFine: any = await this.fineService.postMethod('ComparePaymentFineinsAll', data);
      console.log(insPaymentFine);
    } catch (err) {
      console.log(err);
    }
  }
  async saveAccusedHeader() {
    this.preloader.setShowPreloader(true);
    if ((+this.params.CompareID) == 0 || ((+this.params.CompareID) > 0 && this.isDatachange())) {
      const resp: any = await this.CompareinsAll()
      console.log('ข้อมูลการรีเทิร์นจาก CompareinsAll');
      console.log(resp);
      if (resp && (resp.IsSuccess == 'True' || (resp && resp.CompareDetail))) {
        if (resp.CompareDetail) {
          let i = 0;
          for (const r of resp.CompareDetail) {
            if (resp.CompareDetail && resp.CompareDetail[0].CompareDetailID) {
              await this.checkReceiptData(r.CompareDetailID, i);
            }else if ((+this.params.CompareID) > 0) {
              console.log('wait to updaate detail');
            } else {
              console.log('ไม่พบข้อมูล CompareDetailID');
            }
            i++;
          }
        } else if(resp && resp.IsSuccess == 'True') {
          let i = 0;
          for (const r of this.compareDataUpdateTmp.CompareDetail) {
            await this.checkReceiptData(r.CompareDetailID, i);
            i++;
          }
        }

        if (this.AllAddFiles.length > 0) {
          for (const f of this.AllAddFiles) {
            if (f.IsNewItem && f.IsActive) {
              await this.insertFile(f);
            }
          }
        }
        await this.navService.setOnSave(false);
        await this.navService.setOnCancel(false);
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditButton(true);
        this.navService.setSearchBar(false);
        this.navService.setCancelButton(false);
        this.navService.setSaveButton(false);
        this.showEditField = status;
        console.log(this.params.CompareID);
        Swal(
          '',
          'บันทึกข้อมูลสำเร็จ.',
          'success'
        );
        this.params.CompareID = resp.CompareID ? resp.CompareID : this.params.CompareID;
        this.preloader.setShowPreloader(true);
        await this.initData();
        this.preloader.setShowPreloader(false);
        this.showEditField = true;
        this.router.navigate([`fine/manage/R/${this.params.CompareID}/${this.params.IndictmentID}/${this.params.ArrestCode}`]);

      } else if (resp && resp.IsSuccess == 'True') {
        Swal(
          '',
          'แก้ไขสำเร็จ.',
          'success'
        );
        this.preloader.setShowPreloader(true);
        this.showEditField = true;
        await this.initData()
        this.preloader.setShowPreloader(false);
      } else if (resp != false) {
        Swal(
          '',
          'ไม่สามารถบันทึกข้อมูลได้ กรุณาตรวจสอบการเชื่อมต่อ.',
          'error'
        );
      }
    } else if ((+this.params.CompareID) > 0) {
      Swal(
        '',
        'ไม่พบการเปลี่ยนแปลงข้อมูล.',
        'error'
      );
    }

    this.preloader.setShowPreloader(false);
  }
  async initData() {
    this.IsOutside = 0;
    this.receipt.list = [];
    const d: Date = new Date();
    this.compareDate = { date: {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}};
    this.DateToday = { date: {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}, formatted: toLocalShort(d.toString()).replace(/ /g, '/') };
    this.timeNow = this.getTimeNow();
    this.accused.CompareTime = this.timeNow + ' น.';
    this.generateYear();

    this.DataToSave = {};
    this.accused = {};
    this.IsOutside = 0;
    this.receipt.list = [];
    this.compareDate = { date: {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}};
    this.DateToday = { date: {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}, formatted: toLocalShort(d.toString()).replace(/ /g, '/') };
    this.timeNow = this.getTimeNow();
    this.accused.CompareTime = this.timeNow + ' น.';
    this.compareDocument = {
        DocumentID: '',
        DocumentName: '',
        ReferenceCode: '',
        FilePath: '',
        DataSource: '',

        // --- Custom --- //
        IsNewItem: false,
        IsActive: 1,
    }
    // Html
    
      this.year = [];
      this.compareDate = {year: 0, month: 0, day: 0};
    // Object for binding
      this.headerData = {};
      this.accused = {};
      this.ListCompareDetail = []; // รายละเอียดค่าปรับ
      this.receipt = {}; // รายละเอียดค่าปรับ
      this.approveReportList = []; // รายละเอียดค่าปรับ
      this.sumAllCompare = { sum: 0, sum1: 0, sum2: 0, sum3: 0};
    // AutoComplete
      // this.options = [];
      // this.optionsStation = [];
      // rawOptions: any = [];
    // Staffoptions: any = [];
    // rawStaffOptions: any = [];
    // file
      this.AllAddFiles = [];
      this.filePath = [];
    // Popup
      this.editUser = {};
      this.userCompareReceiptDetail = {};
      this.compareUserDetailPopup = {};
    // Data save all
      this.DataToSave = {};
      this.timeNow = {};
      this.dataForCompare = {};
    // await this.ngOnInit();
    this.showEditField = true;
    this.generateYear();
    await this.CompareArrestgetByIndictmentID();
    await this.getCompareData();
    await this.setAllCompareData();
  }
  isDatachange() {
    const case1: any = JSON.stringify(this.dataForCompare.accused) === JSON.stringify(this.accused);
    const case2: any = JSON.stringify(this.dataForCompare.approveReportList) === JSON.stringify(this.approveReportList);
    const case3: any = JSON.stringify(this.dataForCompare.receipt) === JSON.stringify(this.receipt);
    const case4: any = JSON.stringify(this.AllAddFiles) === JSON.stringify(this.dataForCompare.document);
    console.log(!(case1 && case2));
    console.log(this.dataForCompare);
    console.log(this.accused);
    console.log(this.approveReportList);
    console.log(case1 + ' and ' + case2);
    return !(case1 && case2 && case3 && case4);
  }
  async checkStaff(data: any) {
    return data;
  }
  async CompareinsAll () {
    try {
      let readyToSave: any = true;
      this.btnAccusedHeader.click();
      console.log(this.receipt);
      const case1: any = this.isNotValidTxtField(this.receipt.CompareNo);
      const case2: any = this.isNotValidTxtField(this.receipt.CompareYear);
      const case3: any = this.isNotValidTxtField(this.accused.OperationPosName);
      const case4: any = this.isNotValidTxtField(this.accused.OperationDeptName);
      if (case1 || case2) {
        readyToSave = false;
        Swal(
          'แจ้งเตือน!',
          'กรุณากรอกเลขที่คดีเปรียบเทียบ.',
          'warning'
        );
        return false;
      } else if (case3 || case4) {
        Swal(
          'แจ้งเตือน!',
          'กรุณาเลือกรายชื่อผู้เปรียบเทียบ.',
          'warning'
        );
        return false;
      }
      const res: any = await this.CompareVerifyCompareCode();
      console.log(res);
      if ((res && res.length === 0 ) || Object.keys(res).length === 0 || (+this.params.CompareID) > 0) {
          const data: any = await this.prepareDataToSave();
          if (data.length === 0) {

          } else {
            console.log('ข้อมูล Data เพื่อส่ง CompareinsAll');
            data.CompareStaff = await this.checkStaff(this.jsonCopy(data.CompareStaff));
            console.log(data);

            // return null;
            if (this.params.CompareID == 0) {
              return await this.fineService.postMethod('CompareinsAll', data);
              // console.log(data);
              // return null;
            } else {
              console.log(data);
              if (this.isDatachange) {
                return await this.fineService.postMethod('CompareupdByCon', data);
                // return null;
              } else {
                Swal(
                  '',
                  'ข้อมูลไม่มีการเปลี่ยนแปลง.',
                  'warning'
                );
              }
            }
          }
      } else {
        Swal(
          '',
          'คดีเปรียบเทียบซ้ำ กรุณาใส่ใหม่.',
          'warning'
        );
        return false;
      }
    } catch (err) { console.log(err) }
    return null;
  }
  isNotValidTxtField(inputBox: any) {
    return !inputBox || (inputBox && inputBox.toString().length === 0);
  }
  async CompareVerifyCompareCode() {
    try {
      console.log(this.DataToSave);
      const data: any = {
        "CompareCode" : this.receipt.CompareNo + '/' + this.receipt.CompareYear,
        "OfficeCode" : this.accused.StationCode,
        "IsOutside" : this.receipt.IsOutside ? 1 : 0
      }
      return await this.fineService.postMethod('CompareVerifyCompareCode', data);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async MasofficeMaingetAll() {
    try {
      this.rawOptions = await this.fineService.postMethod('MasOfficeMaingetAll', {}, '8777');
    } catch (err) { console.log(err); }
  }
  async MasStaffMaingetAll() {
    try {
      this.rawStaffOptions = await this.fineService.postMethod('MasStaffMaingetAll', {}, '8777');
    } catch (err) { console.log(err); }
  }
  async CompareArrestgetByIndictmentID() {
    this.DataToSave.userData = [];
    this.DataToSave.Product = [];
    this.accused.list = [];
    this.receipt.list = [];
    try {
      const resp: any = await this.fineService.postMethod('CompareArrestgetByIndictmentID', { IndictmentID: this.params.IndictmentID});
      // ส่วนรายละเอียด Header
      if (resp && resp.length > 0) {
        this.headerData.ArrestCode = resp[0].ArrestCode;
        this.headerData.LawsuitNo = resp[0].LawsuitNo;
        if (resp[0].CompareProve[0]) {
          this.headerData.ProveReportNo = resp[0].CompareProve[0].ProveReportNo;
          this.isReportNo = true;
        }

        this.headerData.LawsuitID = resp[0].LawsuitID;
        this.headerData.OfficeShortName = resp[0].OfficeShortName;
        this.headerData.PositionName = resp[0].PositionName;
        this.headerData.LawsuitDate = this.toDatePickerFormat(new Date(resp[0].LawsuitDate)).formatted;
        this.headerData.LawsuitTime = resp[0].LawsuitTime;
        this.headerData.SectionNo = resp[0].SectionNo;
        this.headerData.Province = resp[0].Province;
        this.headerData.GuiltbaseName = resp[0].GuiltbaseName;
        this.headerData.PenaltyDesc = resp[0].PenaltyDesc;
        this.params.ArrestCode = resp[0].ArrestCode;
        this.headerData.ArrestLocation = `${resp[0].SubDistrict} ${resp[0].District} ${resp[0].Province}`;
        this.headerData.ArrestStaffName = `${resp[0].TitleName}${resp[0].FirstName} ${resp[0].LastName}`;
        // รายละเอียดค่าปรับ
        if (localStorage.getItem('officeShortName')) {
          this.accused.StationName = localStorage.getItem('officeShortName');
          this.accused.StationCode = localStorage.getItem('officeCode');
        }
        if (localStorage.getItem('fullName')) {
          this.accused.CompareStaffName = localStorage.getItem('fullName');
          const staff = this.rawStaffOptions.filter(f => (f.TitleName + f.FirstName + f.LastName) === this.accused.CompareStaffName.replace(/\s/g, ''));
          this.accused.staff = staff[0];
        }
        if (localStorage.getItem('operationPosName')) {
          this.accused.OperationPosName = localStorage.getItem('operationPosName');
        }
        if (localStorage.getItem('officeShortName')) {
          this.accused.OperationDeptName = localStorage.getItem('officeShortName');
        }
        this.logedinUser = this.jsonCopy(this.accused);
        this.logedinUser.officeCode = localStorage.getItem('officeCode');
        this.logedinUser.officeShortName = localStorage.getItem('officeShortName');
        for (const lawbreaker of resp[0].CompareArrestIndictmentDetail) {
          this.DataToSave.Product = lawbreaker.CompareArrestProductDetail;
          const CompareDetail: any = {};
          const LawBreaker: any = lawbreaker.CompareArrestLawbreaker[0];
          if (!LawBreaker) {
            Swal(
              '',
              'ไม่พบข้อมูลผู้ต้องหา.',
              'warning'
            );
            throw 'ไม่พบข้อมูลผู้ต้องหา';
            break;
          } else {
            CompareDetail.LawbreakerName = LawBreaker ? `${LawBreaker.LawbreakerTitleName ? LawBreaker.LawbreakerTitleName : ''}${LawBreaker.LawbreakerFirstName} ${LawBreaker.LawbreakerMiddleName ? LawBreaker.LawbreakerMiddleName : ''} ${LawBreaker.LawbreakerLastName}` : '';
            const Mistreat: any = await this.CompareCountMistreatgetByCon(LawBreaker.LawbreakerRefID, resp[0].SubSectionID);
            CompareDetail.Mistreat = Mistreat.Mistreat ? Mistreat.Mistreat : 0;
            this.ListCompareDetail.push(CompareDetail);
            // ชื่อผู้ต้องหาคำให้การ
            const accuse: any = {};
            accuse.LawbreakerName = CompareDetail.LawbreakerName;
            accuse.PaymentFineAppointDate = this.DateToday;
            accuse.request = 1;
            this.receipt.CompareYear = this.year[this.year.length - 1];
            if (resp[0].SubSectionID==366 || resp[0].SubSectionID==367) {
              accuse.PaymentVatDate = this.jsonCopy(this.DateToday);
              accuse.isFillVatDate = false;
            } else {
              accuse.isFillVatDate = true;
            }
            this.accused.list.push(accuse);
            // บันทึกการเปรียบเทียบและชำระค่าปรับ
            const receiptData: any = {};
            receiptData.LawBrakerName = CompareDetail.LawbreakerName;
            receiptData.PaymentDate = this.DateToday;
            receiptData.ReceiptChanel = 1;
            if (localStorage.getItem('officeShortName')) {
              receiptData.officeShortName = localStorage.getItem('officeShortName');
            }
            if (localStorage.getItem('fullName')) {
              receiptData.ReceiptStaff = localStorage.getItem('fullName');
              const staff = this.rawStaffOptions.filter(f => (f.TitleName + f.FirstName + f.LastName) === receiptData.ReceiptStaff.replace(/\s/g, ''));
              receiptData.staff = staff[0];
            }
            if (localStorage.getItem('operationPosName')) {
              receiptData.OperationPosName = localStorage.getItem('operationPosName');
            }
            if (localStorage.getItem('officeShortName')) {
              receiptData.OperationDeptName = localStorage.getItem('officeShortName');
            }
            
            this.receipt.list.push(receiptData);
            // รายงานการขออนุมัติ
            const approve: any = {};
            approve.LawBrakerName = CompareDetail.LawbreakerName;
            approve.ApproveStation = receiptData.officeShortName;
            approve.ApproveType = 1;
            if (localStorage.getItem('officeCode')) {
              receiptData.officeCode = localStorage.getItem('officeCode');
            }
            this.approveReportList.push(approve);
            const userData: any = {};
            userData.LawbrakerName =  CompareDetail.LawbreakerName;
            userData.IndictmentDetailID = lawbreaker.IndictmentDetailID;
            userData.MistreatNo = CompareDetail.Mistreat;
            this.DataToSave.userData.push(userData);
          }
          console.log(this.receipt);
        }
        // คำให้การผู้ต้องหา
        this.setAccusedData(resp);
        await this.getProductToCompareDetail(resp[0]);
        console.log(resp);
      } else {
        Swal(
          '',
          'ไม่สามารถแสดงข้อมูลได้.',
          'error'
        );
        throw 'ไม่สามารถแสดงข้อมูลได้';
      }

    } catch (err) {
      console.log(err);
    }
  }
  async getProductToCompareDetail(resp: any) {
    const compareDetailTmp = this.jsonCopy(this.ListCompareDetail);
    const newDetailArr: any = [];
    let user_count = 0;
    let i = 0;
    const fineCompare: any = await this.CompareMasLawFineTypegetBySubSectionRuleID(resp.SubSectionRuleID);
    console.log(fineCompare);
    if (true) {
      for (const cmp of compareDetailTmp) {
        const detail: any = {};
        detail.Mistreat = this.ListCompareDetail[user_count].Mistreat;
        detail.LawbreakerName = cmp.LawbreakerName;
        let loop = 0;
        let sum = 0;
        let sum1 = 0;
        let sum2 = 0;
        let sum3 = 0;
        if (resp.CompareProve[0]) {
          for (const p of resp.CompareProve[0].CompareProveProduct) {
            if (loop === 0) {
              detail.isFirstLoop = true;
            } else {
              detail.isFirstLoop = false;
            }
            detail.product = p;
            detail.multi = 1;
            detail.FineAmount = p.VatProve;
            detail.FineType = fineCompare.FineType;
            switch (fineCompare.FineType) {
              case 0 : {
                console.log('case 0');
                detail.multi = 1;
                detail.FineAmount = fineCompare.CompareMasLawGuiltbaseFine[0].FineAmount;
              } break;
              case 1 : {
                console.log('case 1');
                for (const fCmp of fineCompare.CompareMasLawGuiltbaseFine) {
                  const checkCase1: any = (fCmp == (fineCompare.CompareMasLawGuiltbaseFine[fineCompare.CompareMasLawGuiltbaseFine.length- 1]));
                  const checkCase2: any = (p.Mistreat === fCmp.MistreatStartNo);
                  if (checkCase1 || checkCase2) {
                    if ((!fCmp.FineRate) || fCmp.FineRate == 0 || fCmp.FineRate == null) {
                      detail.multi = 1;
                      detail.FineAmount = fCmp.FineAmount;
                      console.log('if');
                    } else {
                      detail.multi = fCmp.FineRate;
                      detail.FineAmount = p.VatProve;
                      console.log('else');
                    }
                    break;
                  }
                }
              } break;
              case 2 : {
                console.log('case 2');
                for (const fCmp of fineCompare.CompareMasLawGuiltbaseFine) {
                  const checkCase1: any = (fCmp == (fineCompare.CompareMasLawGuiltbaseFine[fineCompare.CompareMasLawGuiltbaseFine.length - 1]));
                  const checkCase2: any = (p.NetVolume > fCmp.MistreatStartVolume) && (p.NetVolume <= fCmp.MistreatToVolume);
                  if (checkCase1 || checkCase2) {
                    if ((!fCmp.FineRate) || fCmp.FineRate == 0 || fCmp.FineRate == null) {
                      detail.multi = 1;
                      detail.FineAmount = fCmp.FineAmount;
                      console.log('if');
                    } else {
                      detail.multi = fCmp.FineRate;
                      detail.FineAmount = p.VatProve;
                      console.log('else');
                    }
                    break;
                  }
                }
              } break;
              case 3 : {
                console.log('case 3');
                let fineOfMatch = fineCompare.CompareMasLawGuiltbaseFine.filter(f => f.GroupCode === p.GroupCode);
                let isMatch = fineOfMatch.length > 0 ? true : false;
                console.log('Match');
                console.log(isMatch);
                if (!isMatch) {
                  fineOfMatch = this.jsonCopy(fineCompare.CompareMasLawGuiltbaseFine);
                }
                console.log(fineOfMatch);
                for (const fMatch of fineOfMatch) {
                  if (fMatch.GroupCode || (!fMatch.GroupCode && !isMatch)) {
                    if (detail.Mistreat == fMatch.MistreatStartNo || fMatch === fineOfMatch[fineOfMatch.length - 1]) {
                      if ((!fMatch.FineRate) || fMatch.FineRate == 0 || fMatch.FineRate == null) {
                        detail.multi = 1;
                        detail.FineAmount = fMatch.FineAmount;
                        console.log('if');
                      } else {
                        detail.multi = fMatch.FineRate;
                        detail.FineAmount = p.VatProve;
                        console.log('else');
                      }
                      break;
                    }
                  } else {

                  }

                }
                console.log(detail);
              } break;
            }
            console.log(p);
            detail.all = this.roundDigit((detail.multi * detail.FineAmount));
            detail.BribeMoney = this.roundDigit((detail.multi * detail.FineAmount) * this.multiReward.BribeMoney);
            detail.RewardMoney = this.roundDigit((detail.multi * detail.FineAmount) *  this.multiReward.RewardMoney);
            detail.TreasuryMoney = this.roundDigit((detail.multi * detail.FineAmount) *  this.multiReward.TreasuryMoney);
            sum = (+sum) + (+detail.all);
            sum1 = (+sum1) + (+detail.BribeMoney);
            sum2 = (+sum2) + (+detail.RewardMoney);
            sum3 = (+sum3) + (+detail.TreasuryMoney);
            detail.userNo = user_count;
            detail['userNo' + user_count + ':' + i] = detail.all;
            newDetailArr.push(this.jsonCopy(detail));
            i++;
            loop++;
          }
        } else {
          detail.Mistreat = this.ListCompareDetail[user_count].Mistreat;
          let loop = 0;
          let sum = 0;
          let sum1 = 0;
          let sum2 = 0;
          let sum3 = 0;
          detail.userNo = user_count;
          detail['userNo' + user_count + ':' + 0] = detail.all;
          detail.isFirstLoop = true;
          detail.isSum = false;
          detail.product = {};
          detail.multi = 1;
            const p: any = {};
            detail.FineAmount = p.VatProve;
            detail.FineType = fineCompare.FineType;
            switch (fineCompare.FineType) {
              case 0 : {
                detail.multi = 1;
                detail.FineAmount = fineCompare.CompareMasLawGuiltbaseFine[0].FineAmount;
              } break;
              case 1 : {
                for (const fCmp of fineCompare.CompareMasLawGuiltbaseFine) {
                  const checkCase1: any = (fCmp === (fineCompare.CompareMasLawGuiltbaseFine[fineCompare.CompareMasLawGuiltbaseFine.length] - 1));
                  const checkCase2: any = (p.Mistreat === fCmp.MistreatStartNo);
                  if (checkCase1 || checkCase2) {
                    if (fCmp.FineRate === 0) {
                      detail.multi = 1;
                      detail.FineAmount = fCmp.FineAmount;
                    } else {
                      detail.multi = fCmp.FineRate;
                      detail.FineAmount = p.VatProve;
                    }
                    break;
                  }
                }
              } break;
              case 2 : {
                for (const fCmp of fineCompare.CompareMasLawGuiltbaseFine) {
                  const checkCase1: any = (fCmp === (fineCompare.CompareMasLawGuiltbaseFine[fineCompare.CompareMasLawGuiltbaseFine.length] - 1));
                  const checkCase2: any = (p.NetVolume > fCmp.MistreatStartVolume) && (p.NetVolume <= fCmp.MistreatToVolume);
                  if (checkCase1 || checkCase2) {
                    if (fCmp.FineRate === 0) {
                      detail.multi = 1;
                      detail.FineAmount = fCmp.FineAmount;
                    } else {
                      detail.multi = fCmp.FineRate;
                      detail.FineAmount = p.VatProve;
                    }
                    break;
                  }
                }
              } break;
              case 3 : {
                let fineOfMatch = fineCompare.CompareMasLawGuiltbaseFine.filter(f => f.GroupCode === p.GroupCode);
                let isMatch = fineOfMatch.length > 0 ? true : false;
                console.log('Match');
                console.log(isMatch);
                if (!isMatch) {
                  fineOfMatch = this.jsonCopy(fineCompare.CompareMasLawGuiltbaseFine);
                }
                console.log(fineOfMatch);
                for (const fMatch of fineOfMatch) {
                  if (!fMatch.GroupCode) {
                    if (detail.Mistreat === fMatch.MistreatStartNo || fMatch === fineOfMatch[fineOfMatch.length - 1]) {
                      if (fMatch.FineRate === 0) {
                        detail.multi = 1;
                        detail.FineAmount = fMatch.FineAmount;
                      } else {
                        detail.multi = fMatch.FineRate;
                        detail.FineAmount = p.VatProve;
                      }
                      break;
                    }
                  }

                }
                console.log(detail);
              } break;
            }
          console.log(detail);
          detail.all = this.roundDigit((detail.multi * detail.FineAmount));
          detail.BribeMoney = this.roundDigit((detail.multi * detail.FineAmount) * this.multiReward.BribeMoney);
          detail.RewardMoney = this.roundDigit((detail.multi * detail.FineAmount) * this.multiReward.RewardMoney);
          detail.TreasuryMoney = this.roundDigit((detail.multi * detail.FineAmount) * this.multiReward.TreasuryMoney);
          sum = (+sum) + (+detail.all);
          sum1 = (+sum1) + (+detail.BribeMoney);
          sum2 = (+sum2) + (+detail.RewardMoney);
          sum3 = (+sum3) + (+detail.TreasuryMoney);
          detail.userNo = user_count;
          detail['userNo' + user_count + ':' + i] = detail.all;
          console.log(sum, sum1, sum2, sum3);
          this.DataToSave.userData[detail.userNo].CompareFine = sum;
          this.DataToSave.userData[detail.userNo].BribeMoney = sum1;
          this.DataToSave.userData[detail.userNo].RewardMoney = sum2;
          this.DataToSave.userData[detail.userNo].TreasuryMoney = sum3;
          console.log(sum, sum1, sum2, sum3);
          detail.all = sum;
          detail.BribeMoney = sum1;
          detail.RewardMoney = sum2;
          detail.TreasuryMoney = sum3;
          detail['userNo' + user_count + ':' + i] = detail.all;
          this.sumAllCompare.sum = sum;
          this.sumAllCompare.sum1 = sum1;
          this.sumAllCompare.sum2 = sum2;
          this.sumAllCompare.sum3 = sum3;
          detail.isNo2 = true;
        }
        console.log(sum, sum1, sum2, sum3);

        if (resp.CompareProve[0]) {
          detail.isSum = 1;
          this.DataToSave.userData[detail.userNo].CompareFine = sum;
          this.DataToSave.userData[detail.userNo].BribeMoney = sum1;
          this.DataToSave.userData[detail.userNo].RewardMoney = sum2;
          this.DataToSave.userData[detail.userNo].TreasuryMoney = sum3;
          console.log(sum, sum1, sum2, sum3);
          detail.all = sum;
          detail.BribeMoney = sum1;
          detail.RewardMoney = sum2;
          detail.TreasuryMoney = sum3;
          detail['userNo' + user_count + ':' + i] = detail.all;
        }
        newDetailArr.push(this.jsonCopy(detail));
        user_count++;
        i++;
      }
      // console.log('cal sum');
      this.ListCompareDetail = newDetailArr;
      if (resp.CompareProve[0]) {
        this.calSum();
      }
    }
    console.log(this.ListCompareDetail);
  }
  async CompareMasLawFineTypegetBySubSectionRuleID(SubSectionRuleID: any) {
    try {
      return await this.fineService.postMethod('CompareMasLawFineTypegetBySubSectionRuleID', {SubSectionRuleID: SubSectionRuleID});
    } catch (err) {
      return [];
    }
  }
  roundDigit(num) {
    return parseFloat((Math.round(num * 100) / 100).toString()).toFixed(2);
  }
  async setAccusedData(resp: any) {
    // this.accused.list = [];
  }
  async CompareCountMistreatgetByCon(LawbreakerRefID, SubSectionID) {
    try {
      const data: any = {
        LawbreakerID: LawbreakerRefID,
        SubSectionID: SubSectionID
      };
      return await this.fineService.postMethod('CompareCountMistreatgetByCon', data);
    } catch (err) {
      console.log(err);
    }
  }
  jsonCopy(src) {
    return JSON.parse(JSON.stringify(src));
  }
  onAutoChange(value: string) {
    if (value === '') {
      this.options = [];
      this.optionsStation = [];
    } else {
      this.options = this.rawOptions.filter(f => f.OfficeShortName.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0,10);;
      this.optionsStation = this.options;
    }
    this.setAutocompleteStyle();
  }
  onAutoFocus(value: string) {
    if (value === '') {
      this.options = [];
    }
  }
  onAutoSelecteWord(event, type: any = 0) {
    console.log(type);
    if (type == 1) {
      this.DataToSave.CompareStationData = event;
    } else if (type == 2) {
      this.compareUserDetailPopup.OfficeShortName = event.OfficeShortName;
      this.compareUserDetailPopup.ApproveStationCode = event.OfficeCode;
    } else if (type == 3) {
      this.userCompareReceiptDetail.StationCode = event.OfficeCode;
    }
    console.log(event);
  }
  StaffonAutoChange(value: string) {
    //
    if (value === '') {
      this.Staffoptions = [];
    } else {
      if (this.rawStaffOptions.length === 0) {
        this.MasStaffMaingetAll();
      }
      this.Staffoptions = this.rawStaffOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0,10);
    }
    this.setAutocompleteStyle();
  }
  StaffonAutoFocus(value: string) {
    if (value === '') {
      this.Staffoptions = [];
      this.ClearStaffData();
    }
  }
  ClearStaffData() {
  }
  StaffonAutoSelecteWord(event, type: any = 0, index: any = null) {
    type = (+type);
    console.log(type);
    console.log(event);
    if (!event) {
      event = this.Staffoptions[0];
    }
    if (event) {
      const name: any = (event.TitleName? event.TitleName:'') + event.FirstName + ' ' + event.LastName;
      if (type == 0) {
        this.accused.OperationPosName = event.OperationPosName;
        this.accused.OperationDeptName = event.OfficeShortName;
        console.log('type' + type);
      } else if (type == 2) {
        this.accused.CompareStaffName = (event.TitleName? event.TitleName:'') + event.FirstName + ' ' + event.LastName;
        this.accused.OperationPosName = event.OperationPosName;
        this.accused.OperationDeptName = event.OfficeShortName;
        this.accused.staff = event;
        this.accused.ProgramCode = 'ILG60-06-02-00';
        this.accused.ProcessCode = null;
        this.accused['staff'] = event;
        console.log('type' + type);
      } else if (type == 1) {
        console.log(this.receipt.list);
        console.log(index);
        if (index || (index) == 0) {
          this.receipt.list[index].ReceiptStaff = name;
          this.receipt.list[index].staff = event;
          this.receipt.list[index].ReceipPosition = event.OperationPosName;
          this.receipt.list[index].ReceipDepartment = event.OfficeShortName;
          this.receipt.list[index].ProgramCode = 'ILG60-06-02-03-00';
        } else {
          this.userCompareReceiptDetail.ReceiptStaff = name;
          this.userCompareReceiptDetail.staff = event;
          this.userCompareReceiptDetail.ReceipPosition = event.OperationPosName;
          this.userCompareReceiptDetail.ReceipDepartment = event.OfficeShortName;
          this.userCompareReceiptDetail.ProgramCode = 'ILG60-06-02-03-00';
        }
        console.log('type' + type);
      } else if (type == 3) {
        this.compareUserDetailPopup.staff = name;
        this.compareUserDetailPopup.staff1 = event;
        this.compareUserDetailPopup.ProgramCode = 'ILG60-06-02-04-00';
        this.compareUserDetailPopup.position1 = event.OperationPosName;
        this.compareUserDetailPopup.department1 = event.OfficeShortName;
        console.log('type' + type);
      } else if (type == 4) {
        this.compareUserDetailPopup.reviewer = name;
        this.compareUserDetailPopup.staff2 = event;
        this.compareUserDetailPopup.ProgramCode = 'ILG60-06-02-04-00';
        this.compareUserDetailPopup.rank = event.OperationPosName;
        this.compareUserDetailPopup.department2 = event.OfficeShortName;
        console.log('type' + type);
      } else if (type == 5) {
        this.compareUserDetailPopup.approver = name;
        this.compareUserDetailPopup.staff3 = event;
        this.compareUserDetailPopup.ProgramCode = 'ILG60-06-02-04-00';
        this.compareUserDetailPopup.rank2 = event.OperationPosName;
        this.compareUserDetailPopup.department3 = event.OfficeShortName;
        console.log('type' + type);
      }
    }
  }
  editAccused(item: any, index: any, type: any) {
    this.editUser = this.jsonCopy(item);
    this.editUser.cancheck  = false;
    this.editUser.index = index;
    if (!this.editUser.PaymentFineAppointDate) {
      this.editUser.PaymentFineAppointDate = this.jsonCopy(this.DateToday);
    } else {
      this.canCheck(this.editUser.PaymentFineAppointDate);
    }
    if (!this.editUser.PaymentVatDate && !this.editUser.isFillVatDate) {
      this.editUser.PaymentVatDate = this.jsonCopy(this.DateToday);
    }
    if (type) {
      // do something
    }
    console.log(this.editUser);
  }
  canCheck(event, index: any = null) {
    // console.log(index);
    // const accuseDate: any = new Date(this.accused.CompareDate.date.year, (+this.accused.CompareDate.date.month) - 1, this.accused.CompareDate.date.day);
    // const d: any = event;
    // console.log(d);
    // const PaymentFineAppointDate: any = new Date(d.date.year, (+d.date.month) - 1, d.date.day);
    // console.log(accuseDate);
    // console.log(PaymentFineAppointDate); 
    // this.accused.list[index].cancheck = accuseDate < PaymentFineAppointDate;
    // console.log(this.accused.list[index].cancheck);
    if ((index || (index) == 0) && this.accused.list[index]) {
      const accuseDate: any = new Date(this.accused.CompareDate.date.year, (+this.accused.CompareDate.date.month) - 1, this.accused.CompareDate.date.day);
      const d: any = event;
      console.log(d);
      // const PaymentFineAppointDate: any = new Date(this.accused.list[index].PaymentFineAppointDate.date.year,(+this.accused.list[index].PaymentFineAppointDate.date.month) - 1, this.accused.list[index].PaymentFineAppointDate.date.day);
      const PaymentFineAppointDate: any = new Date(d.date.year, (+d.date.month) - 1, d.date.day);
      console.log(accuseDate);
      console.log(PaymentFineAppointDate);
      console.log(accuseDate < PaymentFineAppointDate);
      this.accused.list[index].cancheck = accuseDate < PaymentFineAppointDate;
      // if (accuseDate < PaymentFineAppointDate) {
      //   this.accused.list[index].cancheck = true;
      //   if (this.accused.CompareDate.date.day == d.date.day) {
      //     this.accused.list[index].cancheck = false;
      //   }
      // } else {
      //   this.accused.list[index].cancheck = false;
      // }
    } else {
      console.log(index);
      const accuseDate: any = new Date(this.accused.CompareDate.date.year, (+this.accused.CompareDate.date.month) - 1, this.accused.CompareDate.date.day);
      const d: any = event;
      console.log(d);
      const PaymentFineAppointDate: any = new Date(d.date.year, (+d.date.month) - 1, d.date.day);
      console.log(accuseDate);
      console.log(PaymentFineAppointDate); 
      this.editUser.cancheck = accuseDate < PaymentFineAppointDate;
      // console.log(this.accused.list[index].cancheck);
      // if (accuseDate < PaymentFineAppointDate) {
      //   this.editUser.cancheck = true;
      //   if (this.accused.CompareDate.date.day == d.date.day) {
      //     this.editUser.cancheck = false;
      //   }
      // } else {
      //   this.editUser.cancheck = false;
      // }
      // console.log(this.editUser.cancheck);
    }

  }
  checkBoxData(type = null) {
    if (this.editUser.checkBox2) {
      this.editUser.checkBox1 = true;
    }
  }
  saveAccused() {
    if (!this.editUser.checkBox2) {
      this.editUser.Guaruntee = '';
    }
    if (!this.editUser.checkBox1) {
      this.editUser.Bail = '';
      this.editUser.Guaruntee = '';
    }
    this.accused.list[this.editUser.index] = this.jsonCopy(this.editUser);
    this.accused.list[this.editUser.index].PaymentFineAppointDate = this.editUser.PaymentFineAppointDate;
    this.accused.list[this.editUser.index].PaymentFineAppointShow = this.editUser.PaymentFineAppointDate.formatted;
    this.accused.list[this.editUser.index].PaymentVatDate = this.editUser.PaymentVatDate;
    this.accused.list[this.editUser.index].PaymentVatDateShow = this.editUser.PaymentVatDate.formatted;
    // if ((this.editUser.Bail && this.editUser.Bail.length > 0) && (this.editUser.Guaruntee && this.editUser.Guaruntee.length > 0)) {
    //   this.accused.list[this.editUser.index].IsProvisionalAcquittal = 3;
    // } else if ((this.editUser.Bail && this.editUser.Bail.length > 0)) {
    //   this.accused.list[this.editUser.index].IsProvisionalAcquittal = 1;
    // } else if (this.editUser.Guaruntee && this.editUser.Guaruntee.length > 0) {
    //   this.accused.list[this.editUser.index].IsProvisionalAcquittal = 2;
    // } else {
    //   this.accused.list[this.editUser.index].IsProvisionalAcquittal = 0;
    // }
    this.clearDataList(this.editUser);
    console.log(this.accused);
  }
  editReceipt(item: any, index, type) {
    this.userCompareReceiptDetail = this.jsonCopy(item);
    let userCount = 0;
    let i = 0;
    console.log( this.ListCompareDetail);
    for (const cmpD of this.ListCompareDetail) {
      console.log('issum : ' + cmpD.isSum + ' count : ' + userCount);
      if (cmpD.isSum) {
        if ((+userCount) === (+index)) {
          this.userCompareReceiptDetail.TotalFine = cmpD.all;
          break;
        }
        userCount++;
      }
      i++;
    }
    this.userCompareReceiptDetail.PaymentDate = this.DateToday;
    this.userCompareReceiptDetail.PaymentTime = this.timeNow;
    this.userCompareReceiptDetail.index = index;
  }
  async userReceiptSave() {
    this.receipt.list[this.userCompareReceiptDetail.index] = this.jsonCopy(this.userCompareReceiptDetail);
    console.log(this.userCompareReceiptDetail);
    this.receipt.list[this.userCompareReceiptDetail.index].PaymentDateShow = this.userCompareReceiptDetail.PaymentDate.formatted;
    if (this.receipt.list[this.userCompareReceiptDetail.index].CompareDetailID) {
      try {
        const resp: any = await this.checkReceiptData(this.receipt.list[this.userCompareReceiptDetail.index].CompareDetailID, this.userCompareReceiptDetail.index);
        if (resp.IsSuccess == 'True') {
          Swal(
            '',
            'เพิ่มข้อมูลใบเสร็จเรีบยบร้อย.',
            'success'
          );
        } else {
          Swal(
            '',
            'เพิ่มข้อมูลใบเสร็จผิดพลาด.',
            'success'
          );
        }
      } catch (err) {
        console.log(err);
        Swal(
          '',
          'เกิดข้อผิดพลาดในการเพิ่มใบเสร็จ.',
          'error'
        );
      }
    }
    this.clearDataList(this.userCompareReceiptDetail);
  }
  async userReceiptDelete() {
    const index = this.userCompareReceiptDetail.index;
    Swal({
      title: 'ยืนยันการทำรายการ?',
      text: "ต้องการลบใบเสร็จจริงหรือไม่!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก'
    }).then( async (result) => {
      if (result.value) {
        if (index || index == 0) {
          try {
            if (this.userCompareReceiptDetail.CompareReceiptID) {
              const resp: any = await this.CompareDetailReceipupdDelete();
              console.log(resp);
              if (resp.error) {
                Swal(
                  '',
                  resp.error.error,
                  'error'
                );
              } else {
                const name: any = this.userCompareReceiptDetail.LawBrakerName;
                this.clearDataList(this.receipt.list[index]);
                this.receipt.list[index].LawBrakerName = name;
                Swal(
                  '',
                  'ลบสำเร็จ.',
                  'success'
                );
              }
            } else {
              const name: any = this.userCompareReceiptDetail.LawBrakerName;
              this.clearDataList(this.receipt.list[index]);
              this.receipt.list[index].LawBrakerName = name;
              Swal(
                '',
                'ลบสำเร็จ.',
                'success'
              );
            }
          } catch (err) {
            console.log(err);
          }
        }
        if (index || index === 0) {
          if (index > -1) {
            this.filePath.splice(index, 1);
          }
        }
      }
    });
  }
  async CompareDetailReceipupdDelete() {
    try {
      const data: any = { CompareReceiptID: this.userCompareReceiptDetail.CompareReceiptID};
      return await this.fineService.postMethod('CompareDetailReceipupdDelete', data);
    } catch (err) {
      console.log(err);
      return err;
    }
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
    fileData.DocumentType = "3";
    this.AllAddFiles.push(fileData);
    this.filePath.push({path: '', name: '' });

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
    fileData.CompareCode = this.params.CompareCode;
    fileData.ReferenceCode = this.params.ArrestCode;
    fileData.IsActive = 1;
    fileData.DocumentType = "3";
    this.AllAddFiles[index] = fileData;
    this.filePath[index] = {path: replaceFakePath(files.target.value), name: files.target.files.item(0).name };
  }
  async deleteFile(id: any, index: any) {
    Swal({
      title: 'ยืนยันการทำรายการ?',
      text: "ต้องการลบไฟล์จริงหรือไม่!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก'
    }).then( async (result) => {
      if (result.value) {
        console.log(id);
        if (id) {
          try {
            const resp: any = await this.fineService.postMethod('/MasDocumentMainupdDelete', {'DocumentID': id}, "8777");
            Swal(
              '',
              'ลบไฟล์สำเร็จ.',
              'success'
            );
            if (index > -1) {
              this.filePath.splice(index, 1);
              this.AllAddFiles.splice(index, 1);
            }
          } catch (err) {
            Swal(
              '',
              'ลบไฟล์ไม่สำเร็จ.',
              'error'
            );
          }
        } else if (index || index === 0) {
          if (index > -1) {
            this.filePath.splice(index, 1);
            this.AllAddFiles.splice(index, 1);
            Swal(
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
  editApproveReport(item: any, index: any, type: any) {
    console.log(item);
    this.compareUserDetailPopup = this.jsonCopy(item);
    this.compareUserDetailPopup.index = index;
    this.compareUserDetailPopup.payDate = item.payDate ? item.payDate : this.DateToday;
    this.compareUserDetailPopup.payTime = ( item.payTime ? item.payTime : this.timeNow ) + ' น.';
    this.compareUserDetailPopup.dateOfIssue = item.dateOfIssue ?  item.dateOfIssue : this.DateToday;
    this.compareUserDetailPopup.payAmount = this.sumAllCompare.sum;
    this.compareUserDetailPopup.ApproveReportDate = this.DateToday;
    this.compareUserDetailPopup.payAmount = this.roundDigit(this.compareUserDetailPopup.payAmount);
    console.log(this.compareUserDetailPopup);
  }
  saveApprove() {
    console.log(this.compareUserDetailPopup);
    this.approveReportList[this.compareUserDetailPopup.index] = this.jsonCopy(this.compareUserDetailPopup);
    this.approveReportList[this.compareUserDetailPopup.index].payTime = this.compareUserDetailPopup.payTime.substr(0, 5);
    this.approveReportList[this.compareUserDetailPopup.index].ApproveReportDateShow = this.compareUserDetailPopup.ApproveReportDate.formatted.split('/').join(' ');
    this.clearDataList(this.compareUserDetailPopup);
  }
  clearDataList(data: any) {
    for (const d of Object.keys(data)) {
      data[d] = null;
    }
  }
  getAllFile() {
    try {
      let i: any = 0;
      for (const f of this.AllAddFiles) {
        f.DocumentID = i;
      }
      return this.AllAddFiles;
    } catch (err) {
      console.log(err);
    }
  }
  async prepareDataToSave() {
    // console.log(this.approveReportList);
    // console.log(this.accused);
    // console.log(this.DataToSave);
    // console.log('data');
    // console.log(this.accused.StationName);
    const compareStation: any = this.rawOptions.filter(f => (this.accused.StationName) === f.OfficeShortName);
    // console.log(compareStation);
    const CompareData: any = {
      CompareID: this.params.CompareID ? (+this.params.CompareID) : '',
      CompareCode: this.receipt.CompareNo + '/' + this.receipt.CompareYear,
      CompareDate: `${this.convertToNormalDate(this.accused.CompareDate.date).toString()} ${this.accused.CompareTime.toString().substring(0, 5)}:00 +07.00`,
      CompareStation: this.accused.StationName,
      CompareStationCode: ( compareStation && compareStation[0] ) ? compareStation[0].OfficeCode : '',
      IsOutside: this.receipt.IsOutside ? 1 : 0,
      LawsuitID: this.headerData.LawsuitID,
      IsActive: 1,
      CompareDetail: [
      ],
      CompareStaff: [
      ],
      CompareDocument: [
      ]
    };
    CompareData.CompareDocument = this.getAllFile();
    let id = 0;
    const isFillForm1: any = '';
    // console.log('การร้องขอ');
    // console.log(this.accused);
    for (const user of this.DataToSave.userData) {
      console.log('ข้อมูลแต่ละคน');
      console.log(user);
      if (this.accused.list[id].PaymentFineAppointDate) {
        console.log(this.approveReportList);
        const isAppFill: any = !this.isNotValidTxtField(this.approveReportList[id].ApproveReportDate);
        let CompareDetailID: any = '';
        if ((+this.params.CompareID) &&  this.compareDataUpdateTmp.CompareDetail[id]) {
          CompareDetailID = this.compareDataUpdateTmp.CompareDetail[id].CompareDetailID;
        }
        // console.log(this.accused.list[id].PaymentFineAppointDate);
        // console.log(this.DateToday);
        let IsProvisionalAcquittal: any = 1;
        if (JSON.stringify(this.accused.list[id].PaymentFineAppointDate.date) === JSON.stringify(this.DateToday.date)) {
          IsProvisionalAcquittal = 0;
          //this.accused.list[id].IsProvisionalAcquittal
        }
        try {
          const approveStation: any = this.rawOptions.filter(f => (isAppFill ? this.approveReportList[id].ApproveStation : '') === f.OfficeShortName);;
          const detail: any = {
            CompareID: this.params.CompareID ? (+this.params.CompareID) : '',
            CompareDetailID: (+CompareDetailID),
            IndictmentDetailID: this.DataToSave.userData[id].IndictmentDetailID,
            CompareAction: null,
            LawbrakerTestimony: this.accused.list[id].LawbrakerTestimony,
            Fact: isAppFill ? this.approveReportList[id].detailFact : '',
            IsRequest: this.accused.list[id].request,
            RequestForAction: '',
            CompareReason: isAppFill ? this.approveReportList[id].other : '',
            IsProvisionalAcquittal:  IsProvisionalAcquittal,
            Bail: this.accused.list[id].Bail,
            Guaruntee: this.accused.list[id].Guaruntee,
            CompareFine: user.CompareFine,
            PaymentFineDate: '',
            PaymentFineAppointDate: this.convertToNormalDate(this.accused.list[id].PaymentFineAppointDate.date) + ' 00:00:00 +07.00',
            PaymentVatDate: this.accused.list[id].PaymentVatDate ? this.convertToNormalDate(this.accused.list[id].PaymentVatDate.date) + ' 00:00:00 +07.00' : '',
            TreasuryMoney: user.TreasuryMoney,
            BribeMoney: user.BribeMoney,
            RewardMoney: user.RewardMoney,
            IsActive: 1,
            ApproveStationCode: (approveStation && approveStation[0]) ? approveStation[0].OfficeCode : '',
            ApproveStation: isAppFill ? this.approveReportList[id].ApproveStation : '',
            ApproveReportDate: isAppFill ? this.convertToNormalDate(this.approveReportList[id].ApproveReportDate.date) + ' 00:00:00 +07.00' : '',
            CommandNo: isAppFill ? this.approveReportList[id].departOrder : '',
            CommandDate: isAppFill ? this.convertToNormalDate(this.approveReportList[id].dateOfIssue.date) + ' 00:00:00 +07.00' : '',
            CompareAuthority: null,
            ApproveReportType: isAppFill ? this.approveReportList[id].ApproveType.toString().replace('แบบอนุมัติ ', '') : '',
            MistreatNo: user.MistreatNo,
            FineType: 1,
            AdjustReason: null,
            CompareDetailFine: []
          };
          detail.CompareDetailReceipt = this.prepareReceiptData();
          // if ((+this.params.CompareID) == 0) {

          // } else {
          //   detail.CompareDetailID = this.compareDataUpdateTmp.CompareDetail[id].CompareDetailID;
          //   detail.CompareID = this.params.CompareID;
          // }
          CompareData.CompareDetail.push(detail);
        } catch (err) {
          console.log(err);
        }
      } else {
        Swal(
          '',
          'กรุณากรอกข้อมูลคำให้การของผู้ต้องหา.',
          'warning'
        );
        return false;
      }

      id++;
    }
    // console.log(CompareData);
    // console.log(this.ListCompareDetail);
    id = 0;
    let j = 0;
    let compareFine: any = [];
    let userNoTmp: any = {};
    if ((+this.params.CompareID) > 0) {
      let i = 0;
      for (const user of this.ListCompareDetail) {
        if (!userNoTmp['u' + user.userNo]) {
          userNoTmp['u' + user.userNo] = 0;
          j = 0;
        } else {
          j = userNoTmp['u' + user.userNo];
        }
        // console.log('receipt by id');
        // console.log(this.receipt.list[id]);
        // console.log(!user.isSum , !this.isReportNo);
        // console.log(this.compareDataUpdateTmp.CompareDetail[user.userNo]);
        if (!user.isSum || !this.isReportNo) {
          const compareDetailFine: any = {
            CompareFineID: this.compareDataUpdateTmp.CompareDetail[user.userNo] ? (this.compareDataUpdateTmp.CompareDetail[user.userNo].CompareDetailFine[j] ? (+this.compareDataUpdateTmp.CompareDetail[user.userNo].CompareDetailFine[j].CompareFineID) : '') : '',
            CompareDetailID: this.compareDataUpdateTmp.CompareDetail[user.userNo] ? (this.compareDataUpdateTmp.CompareDetail[user.userNo].CompareDetailFine[j] ? (+this.compareDataUpdateTmp.CompareDetail[user.userNo].CompareDetailFine[j].CompareDetailID) : '' ) : '',
            ProductID: user.product? user.product.ProductID : '',
            ProductFine: user['userNo' + user.userNo + ':' + i],
            VatValue: user.FineAmount,
            FineRate: user.multi,
            IsActive: 1,
            FineType: user.FineType,
            CompareArrestProductDetail: this.DataToSave.Product ? this.DataToSave.product : []
          }
          compareFine.push(compareDetailFine);
          if (!this.isReportNo) {
            CompareData.CompareDetail[id].CompareDetailFine = compareFine;
            compareFine = [];
            id++;
          }
        } else {
          CompareData.CompareDetail[id].CompareDetailFine = this.jsonCopy(compareFine);
          if (this.isDatachange()) {
            await this.CompareDetailupdByCon(this.jsonCopy( CompareData.CompareDetail[id]));
          }
          compareFine = [];
          id++;
        }
        i++;
        userNoTmp['u' + user.userNo] = j;
        j++;
      }
    } else {
      let i = 0;
      for (const user of this.ListCompareDetail) {
        // console.log(!user.isSum , !this.isReportNo);
        // console.log('receipt by id');
        // console.log(this.receipt.list[id]);
        if (!user.isSum || !this.isReportNo) {
          const compareDetailFine: any = {
            CompareFineID: null,
            CompareDetailID: null,
            ProductID: user.product ? user.product.ProductID : '',
            ProductFine: user['userNo' + user.userNo + ':' + i],
            VatValue: user.FineAmount,
            FineRate: user.multi,
            IsActive: 1,
            FineType: user.FineType,
            CompareArrestProductDetail: this.DataToSave.Product ? this.DataToSave.Product : []
          }
          compareFine.push(compareDetailFine);
          if (!this.isReportNo) {
            CompareData.CompareDetail[id].CompareDetailFine = compareFine;
            compareFine = [];
            id++;
          }
        } else {
          CompareData.CompareDetail[id].CompareDetailFine = compareFine;
          compareFine = [];
          id++;
        }
        i++;
      }
    }
    CompareData.CompareStaff = this.getAllStaff();
    console.log(CompareData);
    return CompareData;
  }
  async CompareDetailupdByCon (data: any) {
    return await this.fineService.postMethod('CompareDetailupdByCon ', data);
  }
  prepareProductData() {
    // const product: any = [];
    // for (const p of this.DataToSave.Product) {
    //   try {
    //     const data: any = {
    //       ProductID: p.ProductID,
    //       IsProdcutCo: 1,
    //       Qty: p.Qty,
    //       QtyUnit: p.QtyUnit,
    //       Size: p.Size,
    //       SizeUnit: p.SizeUnitName,
    //       Volume: p.NetVolume,
    //       VolumeUnit: p.NetVolumeUnit,
    //       MistreatRate: '',
    //       Fine: 0,
    //       IndictmentDetailID: '',
    //       IsActive: ''
    //     };
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

  }
  prepareReceiptData() {
    let receiptData: any = [];
    let i: any = 0;
    console.log(this.receipt);
    const reqField: any = ['ReceiptBookNo', 'ReceiptNo', 'ReceiptChanel', 'PaymentDate'];
    for (const rec of this.receipt.list) {
      console.log(rec);
      if (rec.CompareReceiptID) {
        const rec1: any = {
          CompareReceiptID: rec.CompareReceiptID,
          CompareDetailID: rec.CompareDetailID,
          ReceiptType: 'A',
          ReceiptBookNo: rec.ReceiptBookNo,
          ReceiptNo: rec.ReceiptNo,
          ReceiptDate: this.convertToNormalDate(rec.PaymentDate.date) + ' 00:00:00 +07.00',
          StationCode: this.DataToSave.CompareStationData ? this.DataToSave.CompareStationData.OfficeCode : '',
          Station: this.accused.StationName,
          PaymentDate: this.convertToNormalDate(rec.PaymentDate.date) + ' 00:00:00 +07.00',
          TotalFine: this.sumAllCompare.sum,
          RevenueStatus: 0,
          RevenueDate: '',
          IsActive: 1,
          ReceiptChanel: rec.ReceiptChanel,
          ReferenceNo: rec.ReferenceNo,
          CompareAuthority: 0,
          FineType: 1
        };
        receiptData.push(rec1);
      } else if (!this.validateReceiptData(rec, reqField)) {
        receiptData.push({});
      } else {
        try {
          const rec1: any = {
            ReceiptType: 'A',
            ReceiptBookNo: rec.ReceiptBookNo,
            ReceiptNo: rec.ReceiptNo,
            ReceiptDate: this.convertToNormalDate(rec.PaymentDate.date) + ' 00:00:00 +07.00',
            StationCode: this.DataToSave.CompareStationData ? this.DataToSave.CompareStationData.OfficeCode : '',
            Station: this.accused.StationName,
            PaymentDate: this.convertToNormalDate(rec.PaymentDate.date) + ' 00:00:00 +07.00',
            TotalFine: this.sumAllCompare.sum,
            RevenueStatus: 0,
            RevenueDate: '',
            IsActive: 1,
            ReceiptChanel: rec.ReceiptChanel,
            ReferenceNo: rec.ReferenceNo,
            CompareAuthority: 0,
            FineType: 1
          };
          receiptData.push(rec1);
        } catch (err) {
          receiptData.push({});
          console.log(err);
        }
      }
      i++;
    }
    console.log(receiptData);
    return receiptData;
  }
  getAllStaff() {
    const staff: any = [];
    // console.log(this.accused);
    // console.log(this.approveReportList);
    // console.log(this.receipt);
    this.accused.staff = this.jsonCopy(this.accused.staff);
    this.receipt.list = this.jsonCopy(this.receipt.list);
    this.approveReportList = this.jsonCopy(this.approveReportList);
    this.accused.staff.ProcessCode = null;
    this.accused.staff.ProgramCode = 'ILG60-06-02-00';
    this.accused.staff.ContributorID = 17;
    if (this.accused.staff.OperationPosName && this.accused.staff.OperationPosCode) {
      this.accused.staff.PositionName = this.accused.staff.OperationPosName;
      this.accused.staff.PositionCode = this.accused.staff.OperationPosCode;
    } else {
      this.accused.staff.PositionName = this.logedinUser.operationPosName;
      this.accused.staff.PositionCode = this.logedinUser.OperationPosCode;
    }
    staff.push(this.accused.staff);
    // for (const d of this.accused.list) {
    //   d.staff.ProgramCode = d.ProgramCode;
    //   d.staff.ProcessCode = '';
    //   staff.push(d.staff);
    // }
    let i = 0;
    let staffReceipt: any = [];
    for (const d of this.receipt.list) {
      if (d.staff) {
        d.staff.ProgramCode = 'ILG60-06-02-03';
        d.staff.ProcessCode = this.DataToSave.userData[i].IndictmentDetailID;
        d.staff.ContributorID = 19;
        if (d.staff.OperationPosName && d.staff.OperationPosCode) {
          d.staff.PositionName = d.staff.OperationPosName;
          d.staff.PositionCode = d.staff.OperationPosCode;
        } else {
          d.staff.PositionName = this.logedinUser.operationPosName;
          d.staff.PositionCode = this.logedinUser.OperationPosCode;
        }
        staffReceipt.push(d.staff);
      } else {
        // staffReceipt = [];
        // break;
      }
      i++;
    }
    i = 0;
    let staffApprove: any = [];
    for (const d of this.approveReportList) {
      if (d.staff1) {
        d.staff1.ProgramCode = 'ILG60-06-02-04';
        d.staff1.ProcessCode = this.DataToSave.userData[i].IndictmentDetailID;
        if (d.staff1.OperationPosName && d.staff1.OperationPosCode) {
          d.staff1.PositionName = d.staff1.OperationPosName;
          d.staff1.PositionCode = d.staff1.OperationPosCode;
        } else {
          d.staff1.PositionName = this.logedinUser.operationPosName;
          d.staff1.PositionCode = this.logedinUser.OperationPosCode;
        }
        d.staff1.ContributorID = 39;
        staffApprove.push(d.staff1);
      } else {
        // staffApprove = [];
        // break;
      }
      if (d.staff2) {
        d.staff2.ProgramCode = 'ILG60-06-02-04';
        d.staff2.ProcessCode = this.DataToSave.userData[i].IndictmentDetailID;
        if (d.staff2.OperationPosName && d.staff2.OperationPosCode) {
          d.staff2.PositionName = d.staff2.OperationPosName;
          d.staff2.PositionCode = d.staff2.OperationPosCode;
        } else {
          d.staff2.PositionName = this.logedinUser.operationPosName;
          d.staff2.PositionCode = this.logedinUser.OperationPosCode;
        }
        d.staff2.ContributorID = 40;
        staffApprove.push(d.staff2);
      }
      if (d.staff3) {
        d.staff3.ProgramCode = 'ILG60-06-02-04';
        d.staff3.ProcessCode = this.DataToSave.userData[i].IndictmentDetailID;
        if (d.staff3.OperationPosName && d.staff3.OperationPosCode) {
          d.staff3.PositionName = d.staff3.OperationPosName;
          d.staff3.PositionCode = d.staff3.OperationPosCode;
        } else {
          d.staff3.PositionName = this.logedinUser.operationPosName;
          d.staff3.PositionCode = this.logedinUser.OperationPosCode;
        }
        d.staff3.ContributorID = 41;
        staffApprove.push(d.staff3);
        i++;
      }
    }
    for (const st of staffReceipt) {
      staff.push(st);
    }
    for (const st of staffApprove) {
      staff.push(st);
    }

    if (this.compareDataUpdateTmp) {
      for (let st of staff) {
        for (let tmp of this.compareDataUpdateTmp.CompareStaff) {
          // alert(st.ProcessCode + ' ' + tmp.ProcessCode + ' ' + (!st.ProcessCode && !tmp.ProcessCode));
          if ((st.ProcessCode == tmp.ProcessCode) || (st.ProcessCode == null && tmp.ProcessCode == 'null')) {
            // console.log(st);
            st.StaffID = tmp.StaffID;
            st.CompareID = tmp.CompareID;
            st.PosLevelName = st.operationPosName;
            st.PosLevel = st.OperationPosCode;
            if (!st.OperationPosCode) {
              st.OperationPosCode = tmp.PositionCode;
            }
            if (!st.OperationPosName) {
              st.OperationPosName = tmp.PositionName;
            }
            st.PositionCode = st.OperationPosCode;
            st.PositionName = st.OperationPosName;
          } else {
            st.CompareID = tmp.CompareID;
            st.PosLevelName = st.operationPosName;
            st.PosLevel = st.OperationPosCode;
          }
        }
      }
    }
    // console.log(staff);
    return staff;
  }
  getStaffData(data: any) {
    const staffData: any = this.jsonCopy(data);
    staffData.PositionCide = staffData.OperationPosCode;
    staffData.PositionName = staffData.OperationPosName;
    staffData.DepartmentCode = staffData.OperationDeptCode;
    staffData.DepartmentName = staffData.OperationDeptName;
    staffData.DepartmentLevel = staffData.DeptLevel;
    staffData.ContributorID = null;
    staffData.IsActive = 1;
    return staffData;
  }
  convertToNormalDate(date: any, isNewDate: any = null) {
    if (!date || (typeof date.year) == 'undefined') {
      const d = new Date();
      const m: any = d.getMonth() + 1;
      date = {day: d.getDate(), month: m.length == 1 ? '0' + m : m, year: d.getFullYear()};
      console.log(date);
    }
    let m: any;
    if (isNewDate) {
      m = date.month == 0 ? (date.month + 1).toString() : date.month;
    } else {
      m = date.month == 0 ? (date.month + 1).toString() : date.month;
    }
    
    return `${date.year}-${m}-${date.day}`;
  }
  calSum(id: any = null) {
    console.log('start');
    let i = 0;
    let sum = 0;
    let sum1 = 0;
    let sum2 = 0;
    let sum3 = 0;
    // console.log(this.ListCompareDetail);
    this.sumAllCompare = {sum: 0, sum1: 0, sum2: 0, sum3: 0};
    for (const cmp of this.ListCompareDetail) {
      if (cmp['userNo' + cmp.userNo + ':' + i]) {
        // console.log(cmp['userNo' + cmp.userNo + ':' + i], this.roundDigit(cmp['userNo' + cmp.userNo + ':' + i]));
        if (cmp['userNo' + cmp.userNo + ':' + i] > parseInt((cmp['userNo' + cmp.userNo + ':' + i]*100).toString())/100.00) {
          cmp['userNo' + cmp.userNo + ':' + i] = parseInt((cmp['userNo' + cmp.userNo + ':' + i]*100).toString())/100.00;
          // console.log(cmp['userNo' + cmp.userNo + ':' + i]);
        }
      }
      if (cmp.isNo2) {
        this.ListCompareDetail[i].BribeMoney = this.roundDigit(cmp['userNo' + cmp.userNo + ':' + i] * this.multiReward.BribeMoney);
        this.ListCompareDetail[i].RewardMoney = this.roundDigit(cmp['userNo' + cmp.userNo + ':' + i] * this.multiReward.RewardMoney);
        this.ListCompareDetail[i].TreasuryMoney = this.roundDigit(cmp['userNo' + cmp.userNo + ':' + i] * this.multiReward.TreasuryMoney);
        this.DataToSave.userData[cmp.userNo].payment = cmp['userNo' + cmp.userNo + ':' + i];
        sum = (+sum) + (+cmp['userNo' + cmp.userNo + ':' + i]);
        sum1 = (+sum1) + (+cmp.BribeMoney);
        sum2 = (+sum2) + (+cmp.RewardMoney);
        sum3 = (+sum3) + (+cmp.TreasuryMoney);
        if (i == this.ListCompareDetail.length - 1) {
          this.sumAllCompare.sum = sum;
          this.sumAllCompare.sum1 = sum1;
          this.sumAllCompare.sum2 = sum2;
          this.sumAllCompare.sum3 = sum3;
        }
        this.DataToSave.userData[cmp.userNo].CompareFine = cmp['userNo' + cmp.userNo + ':' + i];
        this.DataToSave.userData[cmp.userNo].BribeMoney = cmp.BribeMoney;
        this.DataToSave.userData[cmp.userNo].RewardMoney = cmp.RewardMoney;
        this.DataToSave.userData[cmp.userNo].TreasuryMoney = cmp.TreasuryMoney;
        this.receipt.list[cmp.userNo].TotalFine = sum;
        this.receipt.list[cmp.userNo].CompareFine = cmp['userNo' + cmp.userNo + ':' + i];
      } else {
        if (cmp.isSum) {
          this.ListCompareDetail[i].BribeMoney = sum1;
          this.ListCompareDetail[i].RewardMoney = sum2;
          this.ListCompareDetail[i].TreasuryMoney = sum3;
          this.ListCompareDetail[i].all = sum;
          this.sumAllCompare.sum = (+this.sumAllCompare.sum) + sum;
          this.sumAllCompare.sum1 = (+this.sumAllCompare.sum1) + sum1;
          this.sumAllCompare.sum2 = (+this.sumAllCompare.sum2) + sum2;
          this.sumAllCompare.sum3 = (+this.sumAllCompare.sum3) + sum3;
          this.DataToSave.userData[cmp.userNo].CompareFine = cmp['userNo' + cmp.userNo + ':' + i];
          this.DataToSave.userData[cmp.userNo].BribeMoney = sum1;
          this.DataToSave.userData[cmp.userNo].RewardMoney = sum2;
          this.DataToSave.userData[cmp.userNo].TreasuryMoney = sum3;
          sum = 0;
          sum1 = 0;
          sum2 = 0;
          sum3 = 0;
        } else {
          this.ListCompareDetail[i].BribeMoney = this.roundDigit(cmp['userNo' + cmp.userNo + ':' + i] * this.multiReward.BribeMoney);
          this.ListCompareDetail[i].RewardMoney = this.roundDigit(cmp['userNo' + cmp.userNo + ':' + i] * this.multiReward.RewardMoney);
          this.ListCompareDetail[i].TreasuryMoney = this.roundDigit(cmp['userNo' + cmp.userNo + ':' + i] * this.multiReward.TreasuryMoney);
          sum = (+sum) + (+cmp['userNo' + cmp.userNo + ':' + i]);
          sum1 = (+sum1) + (+this.ListCompareDetail[i].BribeMoney);
          sum2 = (+sum2) + (+this.ListCompareDetail[i].RewardMoney);
          sum3 = (+sum3) + (+this.ListCompareDetail[i].TreasuryMoney);
          if (!this.receipt.list[cmp.userNo]) {
            this.receipt.list[cmp.userNo] = {};
          }
          this.receipt.list[cmp.userNo].TotalFine = sum;
          this.receipt.list[cmp.userNo].CompareFine = cmp['userNo' + cmp.userNo + ':' + i];
          if (!this.DataToSave.userData[cmp.userNo]) {
            this.DataToSave.userData[cmp.userNo] = {};
          }
          this.DataToSave.userData[cmp.userNo].payment = cmp['userNo' + cmp.userNo + ':' + i];
        }
      }
      i++;
    }
    console.log(this.ListCompareDetail);
  }
  onSubmit() {
    const case1: any = this.isNotValidTxtField(this.compareUserDetailPopup.position1);
    const case2: any = this.isNotValidTxtField(this.compareUserDetailPopup.rank);
    const case3: any = this.isNotValidTxtField(this.compareUserDetailPopup.rank2);
    if (case1 && this.compareUserDetailPopup.ApproveType != 1) {
      Swal(
        '',
        'กรุณาเลือกผู้เสนอพิจารณาเห็นชอบจากรายการ.',
        'warning'
      );
    } else if (case2) {
      Swal(
        '',
        'กรุณาเลือกผู้พิจารณาเห็นชอบจากรายการ.',
        'warning'
      );
    } else if (case3) {
      Swal(
        '',
        'กรุณาเลือกผู้มีอำนาจอนุมัติจากรายการ.',
        'warning'
      );
    } else {
      this.btnApprove.click();
    }
  }
  submitAccused() {

    this.btnAccuse.click();
  }
  submitReceipt() {
    if (this.isNotValidTxtField(this.userCompareReceiptDetail.ReceipPosition)) {
      Swal(
        '',
        'กรุณาเลือกผู้รับชำระค่าปรับจากรายการ.',
        'warning'
      );
    } else {
      this.receiptSave.click();
    }
  }
  getOnlyNumber(type: string) {
    console.log(type);
    return type ? (+type.replace('แบบอนุมัติ ', '')) : 0;
  }
  chooseFirstOption(event, type = null): void {
    console.log(event.key );
    console.log(this.optionsStation.length);
    if (this.optionsStation[0]) {
      this.onAutoSelecteWord(this.optionsStation[0], type);
    }
    if (this.optionsStation.length > 0) {
      if (type == 2) {
        this.compareUserDetailPopup.ApproveStation = this.optionsStation[0].OfficeShortName;
      }
      if (type == 3) {
        this.userCompareReceiptDetail.ReceipStation = this.optionsStation[0].OfficeShortName
      } else {
        this.accused.StationName = this.optionsStation[0].OfficeShortName;
      }
      console.log('here');
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event){
    for (const el of document.getElementsByTagName('p') as any) {
      if (el) {
        el.style.maxWidth = (+(event.target.innerWidth)*0.08) + 'px';
      }
    }
  }
  formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i: any = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;

      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e)
    }
  };
  isFilledReceipt(index) {
    const item: any = this.receipt.list[index];
    if (item.ReceiptStaff && (item.ReceiptChanel || (+item.ReceiptChanel) === 0 ) && item.ReceiptBookNo && item.ReceiptNo) {
      return true;
    } else {
      return false;
    }
  }
  addDocument() {
    const lastIndex = this.compareDocument.length - 1;
    let document = this.compareDocument;
    document.DocumentID = ""+(lastIndex + 1);
    document.DocumentName = "";
    document.FilePath = "";
    document.IsNewItem = true;
    if (lastIndex < 0) {
        this.compareDocument.push(this.fb.group(document));
    } else {
        const lastDoc = this.compareDocument.at(lastIndex).value;
        if (lastDoc.DocumentName && lastDoc.FilePath) {
            this.compareDocument.push(this.fb.group(document));
        }
    }
  }
  changeNoticeDoc(e: any, index: number) {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
        let dataSource = reader.result.toString().split(',')[1];
        if (dataSource && dataSource !== undefined) {
            this.compareDocument.at(index).patchValue({
                ReferenceCode: this.params.CompareID,
                FilePath: replaceFakePath(e.target.value),
                DataSource: dataSource,
                IsActive: 1
            })
        }
    };
  }
  clearStaff() {
    this.compareUserDetailPopup.staff = null;
    this.compareUserDetailPopup.staff1 = null;
    this.compareUserDetailPopup.ProgramCode = null;
    this.compareUserDetailPopup.position1 = null;
    this.compareUserDetailPopup.department1 = null;
  }
  documentId:any = "";
  documentIndex:any = "";
}
