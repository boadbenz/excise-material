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
    this.sidebarService.setVersion('0.0.0.7');
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

    // this.navigate_Service();
  }
  ngOnDestroy() {
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
      if (status) {
        await this.navService.setOnSave(false);
        await this.navService.setOnCancel(false);
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditButton(true);
        this.navService.setSearchBar(false);
        this.navService.setCancelButton(false);
        this.navService.setSaveButton(false);
      }
    });
    this.OnSubscribe.print = this.navService.onPrint.subscribe(async status => {
      if (status) {
        await this.navService.setOnPrint(false);
        this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
      }
    })
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
    this.accused.list = []
    try {
      const resp: any = await this.fineService.postMethod('/CompareArrestgetByIndictmentID', { IndictmentID: this.params.IndictmentID});
      // ส่วนรายละเอียด Header
      this.headerData.ArrestCode = resp[0].ArrestCode;
      this.headerData.LawsuitNo = resp[0].LawsuitNo;
      if (resp[0].CompareProve[0]) {
        this.headerData.ProveReportNo = resp[0].CompareProve[0].ProveReportNo;
      }
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
        CompareDetail.LawbreakerName = `${LawBreaker.LawbreakerTitleName}${LawBreaker.LawbreakerFirstName} ${LawBreaker.LawbreakerMiddleName ? LawBreaker.LawbreakerMiddleName : ''} ${LawBreaker.LawbreakerLastName}`;
        const Mistreat: any = await this.CompareCountMistreatgetByCon(LawBreaker.LawbreakerID, resp[0].SectionNo);
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
    for (const cmp of compareDetailTmp) {
      const detail: any = {};
      detail.LawbreakerName = cmp.LawbreakerName;
      for (const p of resp.CompareProve[0].CompareProveProduct) {

      }
    }
    const product: any = {};
    return product;
  }
  async setAccusedData(resp: any) {
    // this.accused.list = [];
  }
  async CompareCountMistreatgetByCon(LawbreakerID, SectionNo) {
    try {
      const data: any = {
        LawBreakerID: LawbreakerID,
        SectionNo: SectionNo
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
      this.options = this.rawOptions.filter(f => f.OfficeShortName.toLowerCase().indexOf(value.toLowerCase()) > -1);
      this.optionsStation = this.options;
    }
  }
  onAutoFocus(value: string) {
    if (value === '') {
      this.options = [];
    }
  }
  onAutoSelecteWord(event) {
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
      this.Staffoptions = this.rawStaffOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1);
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
    if (type === 0) {
      this.accused.OperationPosName = event.OperationPosName;
      this.accused.OperationDeptName = event.OfficeShortName;
    }
  }
  editAccused(item: any, index: any, type: any) {
    this.editUser = this.jsonCopy(item);
    this.editUser.cancheck  = false;
    this.editUser.index = index;
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
    console.log(this.showEditField);
    console.log(this.editUser.cancheck);
  }
  saveAccused() {
    this.accused.list[this.editUser.index] = this.jsonCopy(this.editUser);
    this.accused.list[this.editUser.index].PaymentFineAppointDate = this.editUser.PaymentFineAppointDate;
    this.accused.list[this.editUser.index].PaymentFineAppointShow = this.editUser.PaymentFineAppointDate.formatted;
    this.accused.list[this.editUser.index].PaymentVatDate = this.editUser.PaymentVatDate;
    this.accused.list[this.editUser.index].PaymentVatDateShow = this.editUser.PaymentVatDate.formatted;
    console.log((this.editUser.Bail && this.editUser.Bail.length > 0) || (this.editUser.Guaruntee && this.editUser.Guaruntee.length > 0));
    if ((this.editUser.Bail && this.editUser.Bail.length > 0) || (this.editUser.Guaruntee && this.editUser.Guaruntee.length > 0)) {
      this.accused.list[this.editUser.index].IsProvisionalAcquittal = 1;
    }
    this.clearDataList(this.editUser);
    console.log(this.accused);
  }
  editReceipt(item: any, index, type) {
    this.userCompareReceiptDetail = this.jsonCopy(item);
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
    this.compareUserDetailPopup.index = index
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
}



