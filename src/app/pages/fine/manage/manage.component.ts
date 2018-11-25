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

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {
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
    dateFormat: 'dd/mmm/yyyy'
  };
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
  // Btn Save
  btnAccuse: HTMLElement = document.getElementById('btnAccuse') as HTMLElement;
  receiptSave: HTMLElement = document.getElementById('receiptSave') as HTMLElement;
  btnApprove: HTMLElement = document.getElementById('btnApprove') as HTMLElement;
  btnAccusedHeader: HTMLElement = document.getElementById('btnAccusedHeader') as HTMLElement;
  
  constructor(private navService: NavigationService,
    private ngbModel: NgbModal,
    private activeRoute: ActivatedRoute,
    private fineService: FineService,
    private ArrestSV: ArrestService,
    private LawsuitSV: LawsuitService,
    private MasterSV: MasterService,
    private router: Router,
    private preloader: PreloaderService,
    private sidebarService: SidebarService
  ) {
    this.sidebarService.setVersion('0.0.0.10');
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
  }

  async ngOnInit() {
    this.preloader.setShowPreloader(true);
    this.MasofficeMaingetAll();
    this.MasStaffMaingetAll();
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
    // this.navigate_Service();
  }
  ngOnDestroy() {
  }
  getTimeNow() {
    const d = new Date();       
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
      if (this.params.CompareID === '0') {
        this.showEditField = true;
      } else {
        this.showEditField = false;
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
      } else {
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditButton(true);
        this.navService.setSearchBar(false);
        this.navService.setCancelButton(false);
        this.navService.setSaveButton(false);
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
  async checkReceiptData(CompareDetailID: any) {
    let receiptData: any = {};
    for (const rec of this.receipt.list) {
      if (this.isNotValidTxtField(rec.PaymentDate)) {
        return false;
      } else {
        try {
          const rec1: any = {
            ReceiptType: 'A',
            ReceiptBookNo: rec.ReceiptNo,
            ReceiptNo: rec.ReceiptChanel,
            ReceiptDate: this.convertToNormalDate(rec.PaymentDate.date) + ' 00:00:00 +07.00',
            StationCode: rec.StationCode,
            Station: rec.ReceipStation,
            CompareDetailID: CompareDetailID,
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
          receiptData = rec1;
          const resp :any = await this.CompareDetailReceipinsAll(receiptData);
          if (resp.CompareReceiptID) {
            await this.ComparePaymentFineinsAll(resp.CompareReceiptID);
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
    }
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
  async ComparePaymentFineinsAll(CompareReceiptID: number) {
    try {
      for (const rec of this.receipt.list) {
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
        }
        const insPaymentFine: any = await this.fineService.postMethod('ComparePaymentFineinsAll', data);
        console.log(insPaymentFine);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async saveAccusedHeader() {
    console.log('here');
    const resp: any = await this.CompareinsAll()
    console.log('compare');
    console.log(resp);
    if (resp) {
      await this.checkReceiptData(resp.CompareDetailID);
      console.log('pass');
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
      alert('บันทึกสำเร็จ');
    } else {
      console.log('pass2');
    }
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
        alert('กรุณากรอกเลขที่คดีเปรียบเทียบ');
        return false;
      } else if (case3 || case4) {
        alert('กรุณาเลือกรายชื่อผู้เปรียบเทียบ');
        return false;
      }
      const res: any = await this.CompareVerifyCompareCode();
      console.log(res);
      if (Object.keys(res).length === 0) {
          const data: any = this.prepareDataToSave();
          if (data.length === 0) {

          } else {
            return await this.fineService.postMethod('/CompareinsAll  ', data);
          }
      } else {
        alert('คดีเปรียบเทียบซ้ำ กรุณาใส่ใหม่');
      }
    } catch (err) { console.log(err) }
    return null;
  }
  isNotValidTxtField(inputBox: any) {
    return !inputBox || (inputBox && inputBox.length === 0);
  }
  async CompareVerifyCompareCode() {
    try {
      console.log(this.DataToSave);
      const data: any = {
        "CompareCode" : this.receipt.CompareNo + '/' + this.receipt.CompareYear,
        "OfficeCode" : this.DataToSave.CompareStationData.OfficeCode,
        "IsOutside" : this.receipt.IsOutside ? 1 : 0
      }
      return await this.fineService.postMethod('/CompareVerifyCompareCode', data);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async MasofficeMaingetAll() {
    try {
      this.rawOptions = await this.fineService.postMethod('/MasOfficeMaingetAll', {}, '7789');
    } catch (err) { console.log(err); }
  }
  async MasStaffMaingetAll() {
    try {
      this.rawStaffOptions = await this.fineService.postMethod('/MasStaffMaingetAll', {}, '7789');
    } catch (err) { console.log(err); }
  }
  async CompareArrestgetByIndictmentID() {
    this.DataToSave.userData = [];
    this.accused.list = []
    try {
      const resp: any = await this.fineService.postMethod('/CompareArrestgetByIndictmentID', { IndictmentID: this.params.IndictmentID});
      // ส่วนรายละเอียด Header
      this.headerData.ArrestCode = resp[0].ArrestCode;
      this.headerData.LawsuitNo = resp[0].LawsuitNo;
      if (resp[0].CompareProve[0]) {
        this.headerData.ProveReportNo = resp[0].CompareProve[0].ProveReportNo;
      }
      this.headerData.LawsuitID = resp[0].LawsuitID;
      this.headerData.OfficeShortName = resp[0].OfficeShortName;
      this.headerData.PositionName = resp[0].PositionName;
      this.headerData.LawsuitDate = resp[0].LawsuitDate.toLocaleString('en-GB', { timeZone: 'UTC' });
      this.headerData.LawsuitTime = resp[0].LawsuitTime;
      this.headerData.SectionNo = resp[0].SectionNo;
      this.headerData.GuiltbaseName = resp[0].GuiltbaseName;
      this.headerData.PenaltyDesc = resp[0].PenaltyDesc;
      this.headerData.ArrestLocation = `${resp[0].SubDistrict} ${resp[0].District}`;
      this.headerData.ArrestStaffName = `${resp[0].TitleName}${resp[0].FirstName} ${resp[0].LastName}`;
      // รายละเอียดค่าปรับ
      for (const lawbreaker of resp[0].CompareArrestIndictmentDetail) {
        const CompareDetail: any = {};
        const LawBreaker: any = lawbreaker.CompareArrestLawbreaker[0];
        CompareDetail.LawbreakerName = `${LawBreaker.LawbreakerTitleName ? LawBreaker.LawbreakerTitleName : ''}${LawBreaker.LawbreakerFirstName} ${LawBreaker.LawbreakerMiddleName ? LawBreaker.LawbreakerMiddleName : ''} ${LawBreaker.LawbreakerLastName}`;
        const Mistreat: any = await this.CompareCountMistreatgetByCon(LawBreaker.LawbreakerID, resp[0].SubSectionID);
        CompareDetail.Mistreat = Mistreat.Mistreat ? Mistreat.Mistreat : 1;
        this.ListCompareDetail.push(CompareDetail);
        // ชื่อผู้ต้องหาคำให้การ
        const accuse: any = {};
        accuse.LawbreakerName = CompareDetail.LawbreakerName;
        this.accused.list.push(accuse);
        // บันทึกการเปรียบเทียบและชำระค่าปรับ
        const receiptData: any = {};
        receiptData.LawBrakerName = CompareDetail.LawbreakerName;
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
      // คำให้การผู้ต้องหา
      this.setAccusedData(resp);
      await this.getProductToCompareDetail(resp[0]);
      console.log(resp);
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
    if (resp.CompareProve[0]) {
      for (const cmp of compareDetailTmp) {
        const detail: any = {};
        detail.Mistreat = this.ListCompareDetail[user_count].Mistreat;
        detail.LawbreakerName = cmp.LawbreakerName;
        let loop = 0;
        let sum = 0;
        let sum1 = 0;
        let sum2 = 0;
        let sum3 = 0;
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
              detail.FineAmount = fineCompare[0].FineAmount;
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
                const checkCase2: any = (p.NetVolume === fCmp.MistreatStartVolume);
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
              // console.log('Match');
              // console.log(isMatch);
              if (!isMatch) {
                fineOfMatch = this.jsonCopy(fineCompare.CompareMasLawGuiltbaseFine);
              }
              // console.log(fineOfMatch);
              for (const fMatch of fineOfMatch) {
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
              // console.log(detail); 
            } break;
          }
          // console.log(p);
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
        this.DataToSave.userData[detail.userNo].CompareFine = sum;
        this.DataToSave.userData[detail.userNo].BribeMoney = sum1;
        this.DataToSave.userData[detail.userNo].RewardMoney = sum2;
        this.DataToSave.userData[detail.userNo].TreasuryMoney = sum3;
        detail.all = sum;
        detail.BribeMoney = sum1;
        detail.RewardMoney = sum2;
        detail.TreasuryMoney = sum3;
        detail['userNo' + user_count + ':' + i] = detail.all;
        detail.isSum = 1;
        newDetailArr.push(this.jsonCopy(detail));
        user_count++;
        i++;
      }
      console.log('cal sum');
      this.ListCompareDetail = newDetailArr;
      this.calSum();
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
  StaffonAutoSelecteWord(event, type: any = 0) {
    type = (+type);
    console.log(type);
    if (type == 0) {
      this.accused.OperationPosName = event.OperationPosName;
      this.accused.OperationDeptName = event.OfficeShortName;
      console.log('type' + type);
    } else if (type == 2) {
      this.accused.OperationPosName = event.OperationPosName;
      this.accused.OperationDeptName = event.OfficeShortName;
      this.accused.staff = event;
      this.accused.ProgramCode = 'ILG60-06-02-00';
      this.accused.ProcessCode = null;
      this.accused['staff'] = event;
      console.log('type' + type);
    } else if (type == 1) {
      this.userCompareReceiptDetail.staff = event;
      this.userCompareReceiptDetail.ReceipPosition = event.OperationPosName;
      this.userCompareReceiptDetail.ReceipDepartment = event.OfficeShortName;
      this.userCompareReceiptDetail.ProgramCode = 'XCS60-06-02-03-00';
      console.log('type' + type);
    } else if (type == 3) {
      this.compareUserDetailPopup.staff1 = event;
      this.compareUserDetailPopup.ProgramCode = 'XCS60-06-02-04-00';
      this.compareUserDetailPopup.position1 = event.OperationPosName;
      this.compareUserDetailPopup.department1 = event.OfficeShortName;
      console.log('type' + type);
    } else if (type == 4) {
      this.compareUserDetailPopup.staff2 = event;
      this.compareUserDetailPopup.ProgramCode = 'XCS60-06-02-04-00';
      this.compareUserDetailPopup.rank = event.OperationPosName;
      this.compareUserDetailPopup.department2 = event.OfficeShortName;
      console.log('type' + type);
    } else if (type == 5) {
      this.compareUserDetailPopup.staff3 = event;
      this.compareUserDetailPopup.ProgramCode = 'XCS60-06-02-04-00';
      this.compareUserDetailPopup.rank2 = event.OperationPosName;
      this.compareUserDetailPopup.department3 = event.OfficeShortName;
      console.log('type' + type);
    }
  }
  editAccused(item: any, index: any, type: any) {
    this.editUser = this.jsonCopy(item);
    this.editUser.cancheck  = false;
    this.editUser.index = index;
    if (!this.editUser.PaymentFineAppointDate) {
      this.editUser.PaymentFineAppointDate = this.jsonCopy(this.DateToday);
    }
    if (!this.editUser.PaymentVatDate) {
      this.editUser.PaymentVatDate = this.jsonCopy(this.DateToday);
    }
    if (type) {
      // do something
    }
    console.log(this.editUser);
  }
  canCheck(event) {
    const accuseDate: any = new Date(this.accused.CompareDate.date.year, this.accused.CompareDate.date.month, this.accused.CompareDate.date.day);
    const d: any = event;
    const PaymentFineAppointDate: any = new Date(d.date.year, d.date.month, d.date.day);
    if (accuseDate.getTime() > PaymentFineAppointDate.getTime()) {
      this.editUser.cancheck = true;
    } else {
      this.editUser.cancheck = false;
    }
    console.log(this.editUser.cancheck);
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
  userReceiptSave() {
    this.receipt.list[this.userCompareReceiptDetail.index] = this.jsonCopy(this.userCompareReceiptDetail);
    console.log(this.userCompareReceiptDetail);
    this.receipt.list[this.userCompareReceiptDetail.index].PaymentDateShow = this.userCompareReceiptDetail.PaymentDate.formatted;
    console.log(this.receipt);
    this.clearDataList(this.userCompareReceiptDetail);
  }
  userReceiptDelete() {}
  handleFileInput(files: any) {
    // this.fileToUpload = files.item(0);
    console.log(files);
    this.AllAddFiles.push(files.target.files.item(0));
    this.filePath.push({path: files.target.value, name: files.target.files.item(0).name });
  }
  async deleteFile(id: any, index: any) {
    const r = confirm('ต้องการลบไฟล์จริงหรือไม่!');
    if (r) {
      if (id) {
        try {
          const resp: any = await this.fineService.postMethod('/MasDocumentMainupdDelete', {'DocumentID': id});
          alert('ลบไฟล์สำเร็จ');
        } catch (err) {
        }
      }
      if (index || index === 0) {
        if (index > -1) {
          this.filePath.splice(index, 1);
        }
      }
    }
  }
  editApproveReport(item: any, index: any, type: any) {
    this.compareUserDetailPopup = this.jsonCopy(item);
    this.compareUserDetailPopup.index = index;
    this.compareUserDetailPopup.payDate = this.receipt.list[index].PaymentDate;
    this.compareUserDetailPopup.payTime = this.receipt.list[index].PaymentTime;
    this.compareUserDetailPopup.dateOfIssue = this.DateToday;
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
  prepareDataToSave() {
    // console.log(this.approveReportList);
    // console.log(this.accused);
    // console.log(this.DataToSave);
    // console.log('data');

    const CompareData: any = {
      CompareCode: this.receipt.CompareNo + '/' + this.receipt.CompareYear,
      CompareDate: `${this.convertToNormalDate(this.accused.CompareDate.date).toString()} ${this.accused.CompareTime.toString()}:00 +07.00`,
      CompareStation: this.accused.StationName,
      CompareStationCode: this.DataToSave.CompareStationData.OfficeCode,
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
      if (this.accused.list[id].PaymentVatDateShow) {
        console.log(this.approveReportList);
        const isAppFill: any = !this.isNotValidTxtField(this.approveReportList[id].ApproveReportDate);
        try {
          const detail: any = {
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
            PaymentVatDate: this.convertToNormalDate(this.accused.list[id].PaymentVatDate.date) + ' 00:00:00 +07.00',
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
            CompareDetailFine: [
            ]
          };
          CompareData.CompareDetail.push(detail);
        } catch (err) {
          console.log(err);
        }
      } else {
        alert('กรุณากรอกข้อมูลคำให้การของผู้ต้องหา');
        return false;
      }
      
      id++;
    }
    console.log(CompareData);
    console.log(this.ListCompareDetail);
    id = 0;
    for (const user of this.ListCompareDetail) {
      if (user.isSum) {
        const compareDetailFine: any = {
          CompareFineID: null,
          CompareDetailID: null,
          ProductID: user.product.ProductID,
          ProductFine: user.all,
          VatValue: user.FineAmount,
          FineRate: user.multi,
          IsActive: 1,
          FineType: user.FineType
        }
        CompareData.CompareDetail[id].CompareDetailFine.push(compareDetailFine);
        id++;
      }
    }
    CompareData.CompareStaff = this.getAllStaff();
    console.log(CompareData);
    return CompareData;
  }
  getAllStaff() {
    const staff: any = [];
    console.log(this.accused);
    console.log(this.approveReportList);
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
        d.staff.ProgramCode = d.ProgramCode;
        d.staff.ProcessCode = i;
        staffReceipt.push(d.staff);
        i++;
      } else {
        staffReceipt = [];
        break;
      }
    }
    i = 0;
    let staffApprove: any = [];
    for (const d of this.approveReportList) {
      if (d.staff1 && d.staff2 && d.staff3) {
        d.staff1.ProgramCode = d.ProgramCode;
        d.staff1.ProcessCode = i + '.1';
        d.staff2.ProgramCode = d.ProgramCode;
        d.staff2.ProcessCode = i + '.2';
        d.staff3.ProgramCode = d.ProgramCode;
        d.staff3.ProcessCode = i + '.3';
        staffApprove.push(d.staff1);
        staffApprove.push(d.staff2);
        staffApprove.push(d.staff3);
        i++;
      } else {
        staffApprove = [];
        break;
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
      if (cmp.isSum) {
        this.ListCompareDetail[i].BribeMoney = sum1;
        this.ListCompareDetail[i].RewardMoney = sum2;
        this.ListCompareDetail[i].TreasuryMoney = sum3;
        this.ListCompareDetail[i].all = sum;
        this.sumAllCompare.sum = (+this.sumAllCompare.sum) + sum;
        this.sumAllCompare.sum1 = (+this.sumAllCompare.sum) + sum1;
        this.sumAllCompare.sum2 = (+this.sumAllCompare.sum) + sum2;
        this.sumAllCompare.sum3 = (+this.sumAllCompare.sum) + sum3;
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
      i++;
    }
  }
  onSubmit() {
    const case1: any = this.isNotValidTxtField(this.compareUserDetailPopup.position1);
    const case2: any = this.isNotValidTxtField(this.compareUserDetailPopup.rank);
    const case3: any = this.isNotValidTxtField(this.compareUserDetailPopup.rank2);
    if (case1) {
      alert('กรุณาเลือกผู้เสนอพิจารณาเห็นชอบจากรายการ');
    } else if (case2) {
      alert('กรุณาเลือกผู้พิจารณาเห็นชอบจากรายการ');
    } else if (case3) {
      alert('กรุณาเลือกผู้มีอำนาจอนุมัติจากรายการ');
    } else {
      this.btnApprove.click();
    }
  }
  submitAccused() {
    this.btnAccuse.click();
  }
  submitReceipt() {
    if (this.isNotValidTxtField(this.userCompareReceiptDetail.ReceipPosition)) {
      alert('กรุณาเลือกผู้รับชำระค่าปรับจากรายการ');
    } else {
      this.receiptSave.click();
    }
  }
  getOnlyNumber(type: string) {
    console.log(type);
    return type ? (+type.replace('แบบอนุมัติ ', '')) : 0;
  }
  chooseFirstOption(event): void {
    console.log(event.key );
    console.log(this.optionsStation.length);
      if (this.optionsStation.length > 0) {
        this.accused.StationName = this.optionsStation[0].OfficeShortName;
        console.log('here');
      }
  }
}
