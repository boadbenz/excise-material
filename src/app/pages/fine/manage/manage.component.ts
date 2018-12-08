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
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { IMyDpOptions, IMyDate } from 'mydatepicker';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import { toLocalShort } from 'app/config/dateFormat';
import Swal from 'sweetalert2'
import { MasDocumentMainService } from 'app/services/mas-document-main.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {
  isEditMode: any = {};
  IsOutside: number;
  OnSubscribe: any = {};
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
    private masDocumentMainService: MasDocumentMainService
  ) {
    this.isEditMode.receipt = {};
    this.sidebarService.setVersion('0.0.0.22');
    // set false
    this.navService.setNewButton(false);
    this.navService.setSearchBar(false);
    // set true
    this.navService.setNextPageButton(true);
    this.navService.setInnerTextNextPageButton('ส่งเงินรายได้');
    this.IsOutside = 0;
    this.receipt.list = [];
    const d: Date = new Date();
    this.compareDate = { date: {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}};
    this.DateToday = { date: {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}, formatted: toLocalShort(d.toString()).replace(/ /g, '/') };
    this.timeNow = this.getTimeNow();
    this.accused.CompareTime = this.timeNow;
    this.generateYear();
  }

  async ngOnInit() {
    this.preloader.setShowPreloader(true);
    await this.MasofficeMaingetAll();
    await this.MasStaffMaingetAll();
    await this.getRouteParams();
    await this.subscribeHeaderBtn();
    await this.CompareArrestgetByIndictmentID();
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
      this.navService.setNextPageButton(true);
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
    console.log( this.showEditField);
    // this.navigate_Service();
  }
  ngOnDestroy() {
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
      const resp: any = await this.fineService.postMethod('/ComparegetByCon', data);
      this.compareDataUpdate = this.jsonCopy(resp);
      this.compareDataUpdateTmp = this.jsonCopy(resp);
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
      this.dataForCompare.accused = this.jsonCopy(this.accused);
      this.dataForCompare.approveReportList = this.jsonCopy(this.approveReportList);
    }
  }
  async setApproveReportList() {
    const staff: any = this.jsonCopy(this.compareDataUpdateTmp.CompareStaff);
    let i = 0;
    const cmpD: any = this.jsonCopy(this.compareDataUpdateTmp.CompareDetail);
    if (staff.length > 0 && cmpD.length > 0) {
      for (const ap of this.compareDataUpdateTmp.CompareDetail) {
        console.log(cmpD[i]);
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
        console.log( this.approveReportList[i]);
        i++;
      }
      i = 0;
      for (const list of this.approveReportList) {
        let j: any = 0;
        
        for (const st of staff) {
          const name: string = (st? st.TitleName: '') + ' ' + st.FirstName + ' ' + st.LastName;
          console.log((+st.ProcessCode) , parseFloat(j + '.1'), st.ContributorID);
          if (st.ProcessCode && st.ProcessCode.split('.').length == 2) {
            const code: any = st.ProcessCode.split('.');
            j = code[0];
            if ((+st.ProcessCode) == parseFloat(j + '.1')) {
              console.log((+st.ProcessCode) , parseFloat(j + '.1'));
              this.approveReportList[i].staff = name;
              this.approveReportList[i].position1 = st.PositionName;
              this.approveReportList[i].department1 = st.OfficeShortName;
              this.approveReportList[i].staff1 = st;
            } else if ((+st.ProcessCode) === parseFloat(j + '.2')) {
              console.log((+st.ProcessCode) , parseFloat(j + '.2'));
              this.approveReportList[i].reviewer = name;
              this.approveReportList[i].rank = st.PositionName;
              this.approveReportList[i].department2 = st.OfficeShortName;
              this.approveReportList[i].staff2 = st;
            } else if ((+st.ProcessCode) === parseFloat(j + '.3')) {
              console.log((+st.ProcessCode) , parseFloat(j + '.3'));
              this.approveReportList[i].approver = name;
              this.approveReportList[i].rank2 = st.PositionName;
              this.approveReportList[i].department3 = st.OfficeShortName;
              this.approveReportList[i].staff3 = st;
            } 
          } else if ((+st.ProcessCode) === (+j)) {
            console.log((+st.ProcessCode) == parseFloat(j));
            this.receipt.list[i].ReceiptStaff = name;
            this.receipt.list[i].ReceipPosition = st.PositionName;
            this.receipt.list[i].ReceipDepartment = st.OfficeShortName;
            this.receipt.list[i].staff = st;
          } else if (!st.ProcessCode && st.ContributorID == 17) {
            console.log('contribute');
            this.accused.staff = st;
            this.accused.CompareStaffName = name;
            this.accused.OperationPosName = st.PositionName;
            this.accused.OperationDeptName = st.OfficeShortName;
          }
        }
        i++;
      }
    }
  }
  async setAccusedDataList() {
    const staff: any = this.searchStaffByContributorID(17);
    if (staff.length > 0) {
      this.accused.staff = staff[0];
      this.accused.CompareStaffName = staff[0].TitleName + ' ' + staff[0].FirstName + ' ' + staff[0].LastName;
      this.accused.OperationPosName = staff[0].PositionName;
      this.accused.OperationDeptName = staff[0].OfficeShortName;
    }
    this.accused.StationName = this.compareDataUpdateTmp.CompareStation;
    this.accused.StationCode = this.compareDataUpdateTmp.CompareStationCode;
    this.accused.CompareDate = this.toDatePickerFormat(new Date(this.compareDataUpdateTmp.CompareDate));
    this.accused.CompareTime = this.getTimeNow(new Date(this.compareDataUpdateTmp.CompareDate));
    console.log(staff);
  }
  async setCompareDetail() {
    let i = 0;
    for (const compare of this.compareDataUpdateTmp.CompareDetail) {
      this.accused.list[i].PaymentFineAppointDate = this.toDatePickerFormat(new Date(compare.PaymentFineAppointDate));
      this.accused.list[i].PaymentFineAppointShow = this.accused.list[i].PaymentFineAppointDate.formatted;
      this.accused.list[i].PaymentVatDate = this.toDatePickerFormat(new Date(compare.PaymentVatDate));
      this.accused.list[i].PaymentVatDateShow = this.accused.list[i].PaymentVatDate.formatted;
      this.accused.list[i].request = compare.IsRequest;
      this.accused.list[i].Bail = compare.Bail;
      this.accused.list[i].Guaruntee = compare.Guaruntee;
      if (compare.Guaruntee && compare.Guaruntee.length > 0) {
        this.accused.list[i].checkBox2 = true;
      }
      if (compare.Bail && compare.Bail.length > 0) {
        this.accused.list[i].checkBox1 = true;
      }
      this.accused.list[i].LawbrakerTestimony = compare.LawbrakerTestimony;
      this.accused.list[i].IsProvisionalAcquittal = compare.IsProvisionalAcquittal;
      // this.e ditUser.PaymentFineAppointDate.formatted
      if (compare.CompareDetailReceipt.length > 0) {
        const length: any = (this.compareDataUpdateTmp.CompareDetail.length - compare.CompareDetailReceipt.length) + i;
        console.log(this.receipt.list[i]);
        this.receipt.list[i].TotalFine = compare.CompareDetailReceipt[0].TotalFine;
        this.receipt.list[i].PaymentDate = compare.CompareDetailReceipt[0].PaymentDate ? this.convertToNormalDate(new Date(compare.CompareDetailReceipt[0].PaymentDate)) : null;
        this.receipt.list[i].ReceipStation = compare.CompareDetailReceipt[0].Station ? compare.CompareDetailReceipt[0].Station : '';
        this.receipt.list[i].ReceiptChanel = compare.CompareDetailReceipt[0].ReceiptChanel ? compare.CompareDetailReceipt[0].ReceiptChanel : '';
        this.receipt.list[i].ReceiptBookNo = compare.CompareDetailReceipt[0].ReceiptBookNo ? compare.CompareDetailReceipt[0].ReceiptBookNo : '';
        this.receipt.list[i].ReferenceNo = compare.CompareDetailReceipt[0].ReferenceNo != 'null' ? compare.CompareDetailReceipt[0].ReferenceNo : '';
        this.receipt.list[i].ReceiptNo = compare.CompareDetailReceipt[0].ReceiptNo ? compare.CompareDetailReceipt[0].ReceiptNo : '';
        this.receipt.list[i].CompareReceiptID = compare.CompareDetailReceipt[0].CompareReceiptID;
      }
      i++;
    }
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

      this.navService.setNextPageButton(true);
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
        this.navService.setNextPageButton(true);
      }
    });
    this.OnSubscribe.cancel = this.navService.onCancel.subscribe(async status => {
      if (status) {
        await this.navService.setOnCancel(false);
        this.showEditField = status;
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditButton(true);
        this.navService.setSearchBar(false);
        this.navService.setCancelButton(false);
        this.navService.setSaveButton(false);
        this.navService.setNextPageButton(true);
      }
    });
    this.OnSubscribe.save = this.navService.onSave.subscribe(async status => {
      console.log(status);
      if (status) {
        if (this.params.CompareID.toString() === '0') {
          this.btnAccusedHeader.click();
        } else {
          this.btnAccusedHeader.click();
        }
      }
    });
    this.OnSubscribe.print = this.navService.onPrint.subscribe(async status => {
      if (status) {
        await this.navService.setOnPrint(false);
        this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
      }
    })
  }
  async checkReceiptData(CompareDetailID: any, index: any = 0) {
    let receiptData: any = {};
    const rec = this.receipt.list[index];
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
            StationCode: this.DataToSave.CompareStationData ? this.DataToSave.CompareStationData.StationCode : '',
            Station: this.accused.StationName,
            CompareDetailID: CompareDetailID,
            PaymentDate: this.convertToNormalDate(rec.PaymentDate.date) + ' 00:00:00 +07.00',
            TotalFine: rec.TotalFine,
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
          if (this.validateReceiptData(rec1, reqField) && rec.staff && this.isNotValidTxtField(rec.ReceiptStaff)) {
            receiptData.RevenueDate = '';
            const resp :any = await this.CompareDetailReceipinsAll(receiptData);
            console.log('ค่าการรีเทิร์น');
            console.log(resp);
            if (resp.CompareReceiptID) {
              await this.ComparePaymentFineinsAll(resp.CompareReceiptID, index);
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
    for (const r of field) {
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
          FineType: 0,
          ReferenceID: CompareReceiptID,
          PaymentPeriodNo: 1,
          PaymentFine: rec.TotalFine,
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
        const insPaymentFine: any = await this.fineService.postMethod('ComparePaymentFineinsAll', data);
        console.log(insPaymentFine);
      }
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
      if (resp && resp.CompareDetail) {
        for (const r of resp.CompareDetail) {
          if (this.params.CompareID == 0 && resp.CompareDetail && resp.CompareDetail[0].CompareDetailID) {
            await this.checkReceiptData(r.CompareDetailID);
          }else if ((+this.params.CompareID) > 0) {
            console.log('wait to updaate detail');
          } else {
            console.log('ไม่พบข้อมูล CompareDetailID');
          }
        }
        if (this.AllAddFiles.length > 0) {
          for (const f of this.AllAddFiles) {
            if (!f.id) {
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
          'สำเร็จ!',
          'บันทึกข้อมูลสำเร็จ.',
          'success'
        );
      } else if (resp && resp.IsSuccess == 'True') {
        Swal(
          'สำเร็จ!',
          'แก้ไขสำเร็จ.',
          'success'
        );
        this.dataForCompare.accused = this.jsonCopy(this.accused);
        this.dataForCompare.approveReportList = this.jsonCopy(this.approveReportList);
      } else {
        console.log('pass2');
      }
    } else if ((+this.params.CompareID) > 0) {
      Swal(
        'ข้อผิดพลาด!',
        'ไม่พบการเปลี่ยนแปลงข้อมูล.',
        'error'
      );
    }
    
    this.preloader.setShowPreloader(false);
  }
  isDatachange() {
    const case1: any = JSON.stringify(this.dataForCompare.accused) === JSON.stringify(this.accused);
    const case2: any = JSON.stringify(this.dataForCompare.approveReportList) === JSON.stringify(this.approveReportList);
    const case3: any = JSON.stringify(this.dataForCompare.receipt) === JSON.stringify(this.receipt);
    console.log(!(case1 && case2));
    console.log(this.dataForCompare);
    console.log(this.accused);
    console.log(this.approveReportList);
    console.log(case1 + ' and ' + case2);
    return !(case1 && case2);
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
      if (Object.keys(res).length === 0 || (+this.params.CompareID) > 0) {
          const data: any = await this.prepareDataToSave();
          if (data.length === 0) {

          } else {
            console.log('ข้อมูล Data เพื่อส่ง CompareinsAll');
            console.log(data);
            if (this.params.CompareID == 0) {
              return await this.fineService.postMethod('CompareinsAll', data);
              // console.log(data);
              // return null;
            } else {
              console.log(data);
              if (this.isDatachange) {
                return await this.fineService.postMethod('CompareupdByCon', data);
              } else {
                Swal(
                  'ข้อผิดพลาด!',
                  'ข้อมูลไม่มีการเปลี่ยนแปลง.',
                  'error'
                );
              }
            }
          }
      } else {
        Swal(
          'ข้อผิดพลาด!',
          'คดีเปรียบเทียบซ้ำ กรุณาใส่ใหม่.',
          'error'
        );
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
        "OfficeCode" : this.DataToSave.CompareStationData ? this.DataToSave.CompareStationData.OfficeCode : '',
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
      this.rawOptions = await this.fineService.postMethod('MasOfficeMaingetAll', {}, '7789');
    } catch (err) { console.log(err); }
  }
  async MasStaffMaingetAll() {
    try {
      this.rawStaffOptions = await this.fineService.postMethod('MasStaffMaingetAll', {}, '7789');
    } catch (err) { console.log(err); }
  }
  async CompareArrestgetByIndictmentID() {
    this.DataToSave.userData = [];
    this.DataToSave.Product = [];
    this.accused.list = []
    try {
      const resp: any = await this.fineService.postMethod('CompareArrestgetByIndictmentID', { IndictmentID: this.params.IndictmentID});
      // ส่วนรายละเอียด Header
      if (resp && resp.length > 0) {
        this.headerData.ArrestCode = resp[0].ArrestCode;
        this.headerData.LawsuitNo = resp[0].LawsuitNo;
        if (resp[0].CompareProve[0]) {
          this.headerData.ProveReportNo = resp[0].CompareProve[0].ProveReportNo;
        }
        this.headerData.LawsuitID = resp[0].LawsuitID;
        this.headerData.OfficeShortName = resp[0].OfficeShortName;
        this.headerData.PositionName = resp[0].PositionName;
        this.headerData.LawsuitDate = this.toDatePickerFormat(new Date(resp[0].LawsuitDate)).formatted; 
        this.headerData.LawsuitTime = resp[0].LawsuitTime;
        this.headerData.SectionNo = resp[0].SectionNo;
        this.headerData.GuiltbaseName = resp[0].GuiltbaseName;
        this.headerData.PenaltyDesc = resp[0].PenaltyDesc;
        this.params.ArrestCode = resp[0].ArrestCode;
        this.headerData.ArrestLocation = `${resp[0].SubDistrict} ${resp[0].District}`;
        this.headerData.ArrestStaffName = `${resp[0].TitleName}${resp[0].FirstName} ${resp[0].LastName}`;
        // รายละเอียดค่าปรับ
        for (const lawbreaker of resp[0].CompareArrestIndictmentDetail) {
          this.DataToSave.Product = lawbreaker.CompareArrestProductDetail;
          const CompareDetail: any = {};
          const LawBreaker: any = lawbreaker.CompareArrestLawbreaker[0];
          if (!LawBreaker) {
            Swal(
              'ข้อผิดพลาด!',
              'ไม่พบข้อมูลผู้ต้องหา.',
              'error'
            );
            this.router.navigate([`/fine/list`]);
          } else {
            CompareDetail.LawbreakerName = LawBreaker ? `${LawBreaker.LawbreakerTitleName ? LawBreaker.LawbreakerTitleName : ''}${LawBreaker.LawbreakerFirstName} ${LawBreaker.LawbreakerMiddleName ? LawBreaker.LawbreakerMiddleName : ''} ${LawBreaker.LawbreakerLastName}` : '';
            const Mistreat: any = await this.CompareCountMistreatgetByCon(LawBreaker.LawbreakerID, resp[0].SubSectionID);
            CompareDetail.Mistreat = Mistreat.Mistreat ? Mistreat.Mistreat : 1;
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
            this.receipt.list.push(receiptData);
            // รายงานการขออนุมัติ
            const approve: any = {};
            approve.LawBrakerName = CompareDetail.LawbreakerName;
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
          'ข้อผิดพลาด!',
          'ไม่สามารถแสดงข้อมูลได้.',
          'error'
        );
        this.router.navigate([`/fine/list`]);
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
            console.log(p);
            detail.all = this.roundDigit((detail.multi * detail.FineAmount));
            detail.BribeMoney = this.roundDigit((detail.multi * detail.FineAmount) * 0.2);
            detail.RewardMoney = this.roundDigit((detail.multi * detail.FineAmount) * 0.2);
            detail.TreasuryMoney = this.roundDigit((detail.multi * detail.FineAmount) * 0.6);
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
          detail.BribeMoney = this.roundDigit((detail.multi * detail.FineAmount) * 0.2);
          detail.RewardMoney = this.roundDigit((detail.multi * detail.FineAmount) * 0.2);
          detail.TreasuryMoney = this.roundDigit((detail.multi * detail.FineAmount) * 0.6);
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
      console.log('cal sum');
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
  async CompareCountMistreatgetByCon(LawbreakerID, SubSectionID) {
    try {
      const data: any = {
        LawbreakerID: LawbreakerID,
        SubSectionID: SubSectionID
      };
      return await this.fineService.postMethod('/CompareCountMistreatgetByCon', data);
    } catch (err) {
      console.log(err);
    }
  }
  jsonCopy(src) {
    return JSON.parse(JSON.stringify(src));
  }
  onAutoChange(value: string) {
    //
    if (value === '') {
      this.options = [];
      this.optionsStation = [];
    } else {
      this.options = this.rawOptions.filter(f => f.OfficeShortName.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0,10);;
      this.optionsStation = this.options;
    }
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
    console.log(index);
    if ((index || (index) == 0) && this.accused.list[index]) {
      const accuseDate: any = new Date(this.accused.CompareDate.date.year, this.accused.CompareDate.date.month, this.accused.CompareDate.date.day);
      const d: any = event;
      const PaymentFineAppointDate: any = new Date(this.accused.list[index].PaymentFineAppointDate.date.year,this.accused.list[index].PaymentFineAppointDate.date.month, this.accused.list[index].PaymentFineAppointDate.date.day);
      if (accuseDate <= PaymentFineAppointDate) {
        this.accused.list[index].cancheck = true;
        if (this.accused.CompareDate.date.day == d.date.day) {
          this.accused.list[index].cancheck = false;
        }
      } else {
        this.accused.list[index].cancheck = false;
      }
    } else {
      const accuseDate: any = new Date(this.accused.CompareDate.date.year, this.accused.CompareDate.date.month, this.accused.CompareDate.date.day);
      const d: any = event;
      const PaymentFineAppointDate: any = new Date(d.date.year, d.date.month, d.date.day);
      if (accuseDate <= PaymentFineAppointDate) {
        this.editUser.cancheck = true;
        if (this.accused.CompareDate.date.day == d.date.day) {
          this.editUser.cancheck = false;
        }
      } else {
        this.editUser.cancheck = false;
      }
      console.log(this.editUser.cancheck);
    }
    
  }
  saveAccused() {
    console.log(this.editUser);
    this.accused.list[this.editUser.index] = this.jsonCopy(this.editUser);
    this.accused.list[this.editUser.index].PaymentFineAppointDate = this.editUser.PaymentFineAppointDate;
    this.accused.list[this.editUser.index].PaymentFineAppointShow = this.editUser.PaymentFineAppointDate.formatted;
    this.accused.list[this.editUser.index].PaymentVatDate = this.editUser.PaymentVatDate;
    this.accused.list[this.editUser.index].PaymentVatDateShow = this.editUser.PaymentVatDate.formatted;
    if ((this.editUser.Bail && this.editUser.Bail.length > 0) && (this.editUser.Guaruntee && this.editUser.Guaruntee.length > 0)) {
      this.accused.list[this.editUser.index].IsProvisionalAcquittal = 3;
    } else if ((this.editUser.Bail && this.editUser.Bail.length > 0)) {
      this.accused.list[this.editUser.index].IsProvisionalAcquittal = 1;
    } else if (this.editUser.Guaruntee && this.editUser.Guaruntee.length > 0) {
      this.accused.list[this.editUser.index].IsProvisionalAcquittal = 2;
    } else {
      this.accused.list[this.editUser.index].IsProvisionalAcquittal = 0;
    }
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
            'สำเร็จ!',
            'เพิ่มข้อมูลใบเสร็จเรีบยบร้อย.',
            'success'
          );
        } else {
          Swal(
            'สำเร็จ!',
            'เพิ่มข้อมูลใบเสร็จผิดพลาด.',
            'success'
          );
        }
      } catch (err) {
        console.log(err);
        Swal(
          'ผิดพลาด!',
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
                  'ข้อผิดพลาด!',
                  resp.error.error,
                  'error'
                );
              } else {
                const name: any = this.userCompareReceiptDetail.LawBrakerName;
                this.clearDataList(this.receipt.list[index]);
                this.receipt.list[index].LawBrakerName = name;
                Swal(
                  'สำเร็จ!',
                  'ลบสำเร็จ.',
                  'success'
                );
              }
            } else {
              const name: any = this.userCompareReceiptDetail.LawBrakerName;
              this.clearDataList(this.receipt.list[index]);
              this.receipt.list[index].LawBrakerName = name;
              Swal(
                'สำเร็จ!',
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
  handleFileInput(files: any) {
    // this.fileToUpload = files.item(0);
    console.log(files);
    this.AllAddFiles.push(files.target.files.item(0));
    this.filePath.push({path: files.target.value, name: files.target.files.item(0).name });
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
        if (id) {
          try {
            const resp: any = await this.fineService.postMethod('/MasDocumentMainupdDelete', {'DocumentID': id});
            Swal(
              'สำเร็จ!',
              'ลบไฟล์สำเร็จ.',
              'success'
            );
          } catch (err) {
          }
        }
        if (index || index === 0) {
          if (index > -1) {
            this.filePath.splice(index, 1);
            this.AllAddFiles.splice(index, 1);
          }
        }
      }
    });
  }
  async insertFile(file: any) {
    try {
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
    this.compareUserDetailPopup.payTime = item.payTime ? item.payTime : this.timeNow;
    this.compareUserDetailPopup.dateOfIssue = item.dateOfIssue ?  item.dateOfIssue : this.DateToday;
    this.compareUserDetailPopup.payAmount = this.sumAllCompare.sum;
    this.compareUserDetailPopup.ApproveReportDate = this.DateToday;
    console.log(this.compareUserDetailPopup);
  }
  saveApprove() {
    console.log(this.compareUserDetailPopup);
    this.approveReportList[this.compareUserDetailPopup.index] = this.jsonCopy(this.compareUserDetailPopup);
    this.approveReportList[this.compareUserDetailPopup.index].ApproveReportDateShow = this.compareUserDetailPopup.ApproveReportDate.formatted;
    this.clearDataList(this.compareUserDetailPopup);
  }
  clearDataList(data: any) {
    for (const d of Object.keys(data)) {
      data[d] = null;
    }
  }
  async prepareDataToSave() {
    // console.log(this.approveReportList);
    // console.log(this.accused);
    // console.log(this.DataToSave);
    // console.log('data');
    
    const CompareData: any = {
      CompareCode: this.receipt.CompareNo + '/' + this.receipt.CompareYear,
      CompareDate: `${this.convertToNormalDate(this.accused.CompareDate.date).toString()} ${this.accused.CompareTime.toString()}:00 +07.00`,
      CompareStation: this.accused.StationName,
      CompareStationCode: this.DataToSave.CompareStationData ? this.DataToSave.CompareStationData.OfficeCode : '',
      IsOutside: this.receipt.IsOutside ? 1 : 0,
      LawsuitID: this.headerData.LawsuitID,
      IsActive: 1,
      CompareDetail: [
      ],
      CompareStaff: [
      ]
    };
    let id = 0;
    const isFillForm1: any = '';
    for (const user of this.DataToSave.userData) {
      if (this.accused.list[id].PaymentFineAppointDate) {
        console.log(this.approveReportList);
        const isAppFill: any = !this.isNotValidTxtField(this.approveReportList[id].ApproveReportDate);
        try {
          const detail: any = {
            CompareDetailID: '',
            IndictmentDetailID: this.DataToSave.userData[id].IndictmentDetailID,
            CompareAction: null,
            LawbrakerTestimony: this.accused.list[id].LawbrakerTestimony,
            Fact: isAppFill ? this.approveReportList[id].detailFact : '',
            IsRequest: this.accused.list[id].request,
            RequestForAction: '',
            CompareReason: isAppFill ? this.approveReportList[id].other : '',
            IsProvisionalAcquittal:  this.accused.list[id].IsProvisionalAcquittal,
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
            ApproveStationCode: isAppFill ? this.approveReportList[id].ApproveStationCode : '',
            ApproveStation: isAppFill ? this.approveReportList[id].ApproveStation : '',
            ApproveReportDate: isAppFill ? this.convertToNormalDate(this.approveReportList[id].ApproveReportDate.date) + ' 00:00:00 +07.00' : '',
            CommandNo: isAppFill ? this.approveReportList[id].departOrder : '',
            CommandDate: isAppFill ? this.convertToNormalDate(this.approveReportList[id].dateOfIssue.date) + ' 00:00:00 +07.00' : '',
            CompareAuthority: null,
            ApproveReportType: isAppFill ? this.approveReportList[id].ApproveType.toString().replace('แบบอนุมัติ ', '') : '',
            MistreatNo: user.MistreatNo,
            FineType: null,
            AdjustReason: null,
            CompareDetailFine: []
          };
          if ((+this.params.CompareID) == 0) {
            detail.CompareDetailReceipt = this.prepareReceiptData();
          } else {
            detail.CompareDetailID = this.compareDataUpdateTmp.CompareDetail[id].CompareDetailID;
            detail.CompareID = this.params.CompareID;
          }
          CompareData.CompareDetail.push(detail);
        } catch (err) {
          console.log(err);
        }
      } else {
        Swal(
          'แจ้งเตือน!',
          'กรุณากรอกข้อมูลคำให้การของผู้ต้องหา.',
          'warning'
        );
        return false;
      }
      
      id++;
    }
    console.log(CompareData);
    console.log(this.ListCompareDetail);
    id = 0;
    let j = 0;
    let compareFine: any = [];
    if ((+this.params.CompareID) > 0) {
      for (const user of this.ListCompareDetail) {
        if (!user.isSum) {
          const compareDetailFine: any = {
            CompareFineID: this.compareDataUpdateTmp.CompareDetail[id].CompareDetailFine[j].CompareFineID,
            CompareDetailID: this.compareDataUpdateTmp.CompareDetail[id].CompareDetailFine[j].CompareDetailID,
            ProductID: user.product? user.product.ProductID : '',
            ProductFine: user.all ? user.all : this.receipt.list[id].TotalFine,
            VatValue: user.FineAmount,
            FineRate: user.multi,
            IsActive: 1,
            FineType: user.FineType,
            CompareArrestProductDetail: this.DataToSave.Product
          }
          j++;
          compareFine.push(compareDetailFine);
        } else {
          CompareData.CompareDetail[id].CompareDetailFine = this.jsonCopy(compareFine);
          if (this.isDatachange()) {
            await this.CompareDetailupdByCon(this.jsonCopy( CompareData.CompareDetail[id]));
          }
          compareFine = [];
          id++;
          j = 0;
        }
      }
    } else {
      for (const user of this.ListCompareDetail) {
        if (!user.isSum) {
          const compareDetailFine: any = {
            CompareFineID: null,
            CompareDetailID: null,
            ProductID: user.product? user.product.ProductID : '',
            ProductFine: user.all ? user.all : this.receipt.list[id].TotalFine,
            VatValue: user.FineAmount,
            FineRate: user.multi,
            IsActive: 1,
            FineType: user.FineType,
            CompareArrestProductDetail: this.DataToSave.Product
          }
          compareFine.push(compareDetailFine);
        } else {
          CompareData.CompareDetail[id].CompareDetailFine = compareFine;
          compareFine = [];
          id++;
        }
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
    for (const rec of this.receipt.list) {
      if (this.isNotValidTxtField(rec.PaymentDate)) {
        return [];
      } else {
        try {
          const rec1: any = {
            ReceiptType: 'A',
            ReceiptBookNo: rec.ReceiptNo,
            ReceiptNo: rec.ReceiptChanel,
            ReceiptDate: this.convertToNormalDate(rec.PaymentDate.date) + ' 00:00:00 +07.00',
            StationCode: rec.StationCode,
            Station: rec.ReceipStation,
            PaymentDate: this.convertToNormalDate(rec.PaymentDate.date) + ' 00:00:00 +07.00',
            TotalFine: rec.TotalFine,
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
          return [];
          console.log(err);
        }
      }
    }
    return receiptData;
  }
  getAllStaff() {
    const staff: any = [];
    console.log(this.accused);
    console.log(this.approveReportList);
    this.accused.staff.ProcessCode = null;
    this.accused.staff.ProgramCode = 'ILG60-06-02-00';
    this.accused.staff.ContributorID = 17;
    this.accused.staff.PositionName = this.accused.staff.OperationPosName;
    this.accused.staff.PositionCode = this.accused.staff.OperationPosCode;
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
        d.staff.ProgramCode = 'ILG60-06-02-03-00';
        d.staff.ProcessCode = i;
        d.staff.ContributorID = 19;
        d.staff.PositionName = d.staff.OperationPosName;
        d.staff.PositionCode = d.staff.OperationPosCode;
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
      if (d.staff1 && d.staff2 && d.staff3) {
        d.staff1.ProgramCode = 'ILG60-06-02-04-00';
        d.staff1.ProcessCode = i + '.1';
        d.staff1.PositionName = d.staff1.OperationPosName;
        d.staff1.PositionCode = d.staff1.OperationPosCode;
        d.staff2.ProgramCode = 'ILG60-06-02-04-00';
        d.staff2.ProcessCode = i + '.2';
        d.staff2.PositionName = d.staff2.OperationPosName;
        d.staff2.PositionCode = d.staff2.OperationPosCode;
        d.staff3.ProgramCode = 'ILG60-06-02-04-00';
        d.staff3.ProcessCode = i + '.3';
        d.staff3.PositionName = d.staff3.OperationPosName;
        d.staff3.PositionCode = d.staff3.OperationPosCode;
        d.staff1.ContributorID = 39;
        staffApprove.push(d.staff1);
        d.staff2.ContributorID = 40;
        staffApprove.push(d.staff2);
        d.staff3.ContributorID = 41;
        staffApprove.push(d.staff3);
        i++;
      } else {
        // staffApprove = [];
        // break;
      }
    }
    for (const st of staffReceipt) {
      staff.push(st);
    }
    for (const st of staffApprove) {
      staff.push(st);
    }
    console.log(staff);
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
  convertToNormalDate(date: any) {
    if (!date || (typeof date.year) == 'undefined') {
      const d = new Date();
      date = {day: d.getDate(), month: d.getMonth(), year: d.getFullYear()};
      console.log(date);
    }
    return `${date.year}-${date.month}-${date.day}`;
  
      
  }
  calSum() {
    console.log('start');
    let i = 0;
    let sum = 0;
    let sum1 = 0;
    let sum2 = 0;
    let sum3 = 0;
    console.log(this.ListCompareDetail);
    this.sumAllCompare = {sum: 0, sum1: 0, sum2: 0, sum3: 0};
    for (const cmp of this.ListCompareDetail) {
      if (cmp.isNo2) {
        this.ListCompareDetail[i].BribeMoney = this.roundDigit(cmp['userNo' + cmp.userNo + ':' + i] * 0.2);
        this.ListCompareDetail[i].RewardMoney = this.roundDigit(cmp['userNo' + cmp.userNo + ':' + i] * 0.2);
        this.ListCompareDetail[i].TreasuryMoney = this.roundDigit(cmp['userNo' + cmp.userNo + ':' + i] * 0.6);
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
          this.DataToSave.userData[cmp.userNo].CompareFine = sum;
          this.DataToSave.userData[cmp.userNo].BribeMoney = sum1;
          this.DataToSave.userData[cmp.userNo].RewardMoney = sum2;
          this.DataToSave.userData[cmp.userNo].TreasuryMoney = sum3;
          sum = 0;
          sum1 = 0;
          sum2 = 0;
          sum3 = 0;
        } else {
          this.ListCompareDetail[i].BribeMoney = this.roundDigit(cmp['userNo' + cmp.userNo + ':' + i] * 0.2);
          this.ListCompareDetail[i].RewardMoney = this.roundDigit(cmp['userNo' + cmp.userNo + ':' + i] * 0.2);
          this.ListCompareDetail[i].TreasuryMoney = this.roundDigit(cmp['userNo' + cmp.userNo + ':' + i] * 0.6);
          sum = (+sum) + (+cmp['userNo' + cmp.userNo + ':' + i]);
          sum1 = (+sum1) + (+cmp.BribeMoney);
          sum2 = (+sum2) + (+cmp.RewardMoney);
          sum3 = (+sum3) + (+cmp.TreasuryMoney);
        }
      }
      i++;
    }
  }
  onSubmit() {
    const case1: any = this.isNotValidTxtField(this.compareUserDetailPopup.position1);
    const case2: any = this.isNotValidTxtField(this.compareUserDetailPopup.rank);
    const case3: any = this.isNotValidTxtField(this.compareUserDetailPopup.rank2);
    if (case1) {
      Swal(
        'แจ้งเตือน!',
        'กรุณาเลือกผู้เสนอพิจารณาเห็นชอบจากรายการ.',
        'warning'
      );
    } else if (case2) {
      Swal(
        'แจ้งเตือน!',
        'กรุณาเลือกผู้พิจารณาเห็นชอบจากรายการ.',
        'warning'
      );
    } else if (case3) {
      Swal(
        'แจ้งเตือน!',
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
        'แจ้งเตือน!',
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
}
