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

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  private sub: any;
  mode: string;
  modal: any;
  param: any;
  programSpect = 'ILG60-06-02-00'

  // --------
  showEditField: any;

  // -- Parameter ---
  LawsuitID: string;
  ArrestCode: string;
  CompareID: string;


  // --- Array ---
  rawOptions = [];
  options = [];
  rawStaffOptions = [];
  Staffoptions = [];
  ReportOptions = [];
  ListCompareDetail = [];
  ListCompareDetailReceipt = [];
  ListCompareStaff = [];
  ArrestIndictment = [];

  // ---- Varible ---
  CompareNo: string = "";   // เลขที่เปรียบเทียบ  (ไม่รวม /ปี พ.ศ.)
  CompareYear: string;      // ปี พ.ศ.
  LawsuiltCode: string;   // เลขที่คดีรับคำกล่าวโทษ
  LawsuiltDate: string;   // วันที่รับทำคดี
  LawsuiltTime: string;
  SectionName: string;    // ฐานความผิดมาตรา
  GuiltBaseName: string;  // ฐานความผิด
  SectionNo: string;      // บทกำหนดโทษ
  PenaltyDesc: string;    // อัตราโทษ
  IndictmentID: string;
  ArrestStaffName: string;  // ผู้กล่าวหา
  PositionName: string;     // ตำแหน่ง
  DepartmentName: string;   // หน่วยงาน
  ArrestLocation: string;   // สถานที่จับกุม
  AccuserSubdistrictCode: string;   // รหัสสถานที่จับกลุ่ม
  AccuserSubdistrict: string;   // สถานที่จับกลุ่ม

  CompareDate: string;      // วันที่จัดทำ
  CompareTime: string;      // เวลาจัดทำ
  StationName: string;      // เขียนที่ (คำให้การของผู้ต้องหา)
  CompareStaffName: string; // ชื่อผู้เปรียบเทียบ (คำให้การของผู้ต้องหา)
  OperationPosName: string; // ตำแหน่งผู้เปรียบเทียบ (คำให้การของผู้ต้องหา)
  OperationDeptName: string; // แผนกผู้เปรียบเทียบ (คำให้การของผู้ต้องหา)
  CompareStaffID: string;   // รหัสผู้เปรียบเทียบ (คำให้การของผู้ต้องหา)
  IsOutside: string;        // flg คดีเปรียบเทียบนอกสถานที่ทำการ

  // --- Object ---
  oArrest: Arrest;
  oCompare: Compare;
  oCompareDetail: CompareDetail = {};
  oCompareStaff: CompareStaff;

  // ----- Model ------ //
  @ViewChild('printDocModal') printDocModel: ElementRef;

  constructor(private navService: NavigationService,
    private ngbModel: NgbModal,
    private activeRoute: ActivatedRoute,
    private fineService: FineService,
    private ArrestSV: ArrestService,
    private LawsuitSV: LawsuitService,
    private MasterSV: MasterService,
    private router: Router,
    private preloader: PreloaderService
  ) {
    // set false
    this.navService.setNewButton(false);
    this.navService.setSearchBar(false);
    // set true
    this.navService.setNextPageButton(true);
  }

  async ngOnInit() {
    this.preloader.setShowPreloader(true);

    this.active_Route();
    this.navigate_Service();

    await this.getStation();
    await this.getCompareStaff();
    this.CreateObject();
    this.getLawsuitByID(this.LawsuitID);
    await this.getArrestByID(this.ArrestCode);

    let date = new Date();
    this.CompareYear = (date.getFullYear() + 543).toString();
    this.CompareDate = this.getCurrentDate();
    this.CompareTime = this.getCurrentTime();

    if (this.CompareID != '0') {
      await this.getCompareByID();
      await this.ShowData();
    }


    this.preloader.setShowPreloader(false);

  }


  private active_Route() {
    // this.sub = this.navService.showFieldEdit.subscribe(status => {
    //   if (!status) {
    //     this.navService.setCancelButton(true);
    //     this.navService.setSaveButton(true);
    //     this.navService.setPrintButton(false);
    //     this.navService.setSearchBar(false);
    //     this.navService.setDeleteButton(false);
    //     this.navService.setEditButton(false);

    //   } else {
    //     this.navService.setPrintButton(true);
    //     this.navService.setDeleteButton(true);
    //     this.navService.setEditButton(true);
    //     this.navService.setSearchBar(false);
    //     this.navService.setCancelButton(false);
    //     this.navService.setSaveButton(false);
    //   }

    //   this.navService.setNextPageButton(true);
    // });


    this.param = this.activeRoute.params.subscribe(p => {
      this.navService.setPrintButton(true);
      this.navService.setDeleteButton(true);
      this.navService.setEditButton(true);
      this.navService.setSearchBar(false);
      this.navService.setCancelButton(false);
      this.navService.setSaveButton(false);

      this.navService.setNextPageButton(true);

      if (p['code1']) {
        this.LawsuitID = p['code1'];
      }

      if (p['code2']) {
        this.ArrestCode = p['code2'];
      }

      if (p['code3']) {
        this.CompareID = p['code3'];
      }
    });
  }

  private navigate_Service() {
    this.sub = this.navService.showFieldEdit.subscribe(p => {
      this.showEditField = p;
    });

    this.sub = this.navService.onSave.subscribe(async status => {
      if (status) {
        await this.navService.setOnSave(false);

        if (this.CompareID == '0') {
          await this.onInsCompare();
          this.router.navigate(['/fine/list']);
        } else {
          await this.onUpdCompare();
          await this.onComplete();
        }
      }
    });

    // this.sub =  this.navService.onDelete.subscribe(async status => {
    //     if (status) {
    //         await this.navService.setOnDelete(false);
    //         this.onDelete();
    //     }
    // });

    this.sub = this.navService.onPrint.subscribe(async status => {
      if (status) {
        await this.navService.setOnPrint(false);
        this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
      }
    })

    // this.sub = this.navService.onCancel.subscribe(async status => {
    //     if (status) {
    //         if (confirm(Message.confirmAction)) {
    //             await this.navService.setOnCancel(false);
    //             this.router.navigate(['/prove/list']);
    //         }
    //     }
    // })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.param.unsubscribe();
  }

  onComplete() {
    this.navService.setPrintButton(true);
    this.navService.setDeleteButton(true);
    this.navService.setEditButton(true);
    this.navService.setSearchBar(false);
    this.navService.setCancelButton(false);
    this.navService.setSaveButton(false);

    this.showEditField = true;
  }

  CreateObject() {
    this.oCompare = {
      CompareID: "",
      CompareCode: "",
      CompareDate: "",
      CompareStationCode: "",
      CompareStation: "",
      CompareSubdistrictCode: "",
      CompareSubdistrict: "",
      CompareDistrictCode: "",
      CompareDistrict: "",
      CompareProvinceCode: "",
      CompareProvince: "",
      AccuserSubdistrictCode: "",
      AccuserSubdistrict: "",
      AccuserDistrictCode: "",
      AccuserDistrict: "",
      AccuserProvinceCode: "",
      AccuserProvince: "",
      IsOutside: "",
      LawsuitID: ""
    }
  }

  async getLawsuitByID(LawsuitID: string) {
    this.preloader.setShowPreloader(true);

    await this.LawsuitSV.LawsuitegetByCon(LawsuitID).then(async res => {
      // --- รายละเอียดคดี ----

      if (res.IsOutside == "1") {
        this.LawsuiltCode = "น " + res.LawsuitNo;
      }
      else {
        this.LawsuiltCode = res.LawsuitNo;
      }

      this.LawsuiltDate = new Date(res.LawsuitDate).toISOString().substring(0, 10);
      this.LawsuiltTime = new Date(res.LawsuitTime).toISOString().substring(0, 10);
      this.IndictmentID = res.IndictmentID.toString();

      this.preloader.setShowPreloader(false);
    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });


  }

  async getArrestByID(ArrestCode: string) {
    this.preloader.setShowPreloader(true);

    await this.ArrestSV.getByArrestCon(ArrestCode).then(async res => {
      debugger
      res.ArrestStaff.map(async item => {
        item.FullName = `${item.TitleName == null ? '' : item.TitleName}`;
        item.FullName += `${item.FirstName == null ? '' : item.FirstName}`;
        item.FullName += ` ${item.LastName == null ? '' : item.LastName}`;
      });


      this.ArrestLocation = `${res.ArrestLocale[0].SubDistrict == null ? '' : res.ArrestLocale[0].SubDistrict}`;
      this.ArrestLocation += ` ${res.ArrestLocale[0].District == null ? '' : res.ArrestLocale[0].District}`;
      this.ArrestLocation += ` ${res.ArrestLocale[0].Province == null ? '' : res.ArrestLocale[0].Province}`;
      this.AccuserSubdistrictCode = `${res.ArrestLocale[0].SubDistrictCode == null ? '' : res.ArrestLocale[0].SubDistrictCode}`;
      this.AccuserSubdistrict =  `${res.ArrestLocale[0].SubDistrict == null ? '' : res.ArrestLocale[0].SubDistrict}`;

      res.ArrestStaff.filter(item => item.ContributorID === "11").map(async item => {
        this.ArrestStaffName = item.FullName;   // ผู้กล่าวหา
        this.PositionName = item.PositionName;  // ตำแหน่งผู้กล่าวหา
        this.DepartmentName = item.DepartmentName;  // แผนกผู้กล่าวหา
      });

      this.oArrest = res;

      this.oArrest.ArrestLawbreaker.map(async item => {
        if (item.EntityType == 0) {
          item.LawbreakerFullName = `${item.CompanyTitle == null ? '' : item.CompanyTitle}`;
          item.LawbreakerFullName += ` ${item.CompanyName == null ? '' : item.CompanyName}`;
        }
        else {
          item.LawbreakerFullName = `${item.LawbreakerTitleName == null ? '' : item.LawbreakerTitleName}`;
          item.LawbreakerFullName += `${item.LawbreakerFirstName == null ? '' : item.LawbreakerFirstName}`;
          item.LawbreakerFullName += ` ${item.LawbreakerLastName == null ? '' : item.LawbreakerLastName}`;
        }
      });

      await this.getGuiltBaseByID();

      this.preloader.setShowPreloader(false);
    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });


  }

  async getGuiltBaseByID() {
    this.preloader.setShowPreloader(true);

    var aIndex;
    var arrestIndex;

    if (this.oArrest.ArrestIndictment.length > 0) {
      this.ArrestIndictment = this.oArrest.ArrestIndictment.filter(item => item.IndictmentID == +this.IndictmentID)

      await this.LawsuitSV.getGuiltBaseByCon(this.ArrestIndictment[0].GuiltBaseID.toString()).then(async res => {
        this.SectionName = res.CompareMasLawSection.SectionName;
        this.GuiltBaseName = res.CompareMasLawGuiltBase.GuiltBaseName;
        this.SectionNo = res.CompareMasLawPenalty.SectionNo.toString();
        this.PenaltyDesc = res.CompareMasLawPenalty.PenaltyDesc;

        /*
        if (this.ArrestIndictment[0].OpsArrestIndicmentDetailCollection.length > 0) {
          let ArrestLawbreaker = [];
          let ArrestName = "";


          ArrestLawbreaker = this.oArrest.ArrestLawbreaker;
          ArrestLawbreaker.map(async item => {
            if (item.EntityType == 0) {
              item.ArrestName = `${item.CompanyTitle == null ? '' : item.CompanyTitle}`;
              item.ArrestName += `${item.CompanyName == null ? '' : item.CompanyName}`;
            }
            else {
              item.ArrestName = `${item.LawbreakerTitleName == null ? '' : item.LawbreakerTitleName}`;
              item.ArrestName += `${item.LawbreakerFirstName == null ? '' : item.LawbreakerFirstName}`;
              item.ArrestName += ` ${item.LawbreakerLastName == null ? '' : item.LawbreakerLastName}`;
            }
          });


          // ถ้ามี CompareID แต่ไม่มี CompareDetail => get from  Arrest
          if (this.CompareID == '-') {
            for (var i = 0; i < ArrestIndictment[0].OpsArrestIndicmentDetailCollection.length; i += 1) {
              let ArrestList = [];
              let Product = "";

              ArrestList = ArrestLawbreaker.filter(item => item.LawbreakerID === ArrestIndictment[0].OpsArrestIndicmentDetailCollection[i].LawbreakerID);

              if (ArrestList.length > 0) {
                for (var j = 0; j < this.oArrest.ArrestProduct.length; j++) {
                  if (Product == "") {
                    Product += this.oArrest.ArrestProduct[j].ProductDesc;
                  }
                  else {
                    Product += "<br>" + this.oArrest.ArrestProduct[j].ProductDesc;
                  }
                }

                // ----- คำให้การผู้ต้องหา && รายงานการอนุมัติ ---//
                this.oCompareDetail = {
                  CompareDetailID: "",
                  CompareID: this.CompareID,
                  IndictmentDetailID: ArrestIndictment[0].OpsArrestIndicmentDetailCollection[i].IndictmentDetailID.toString(),
                  CompareAction: "",
                  LawbrakerTestimony: "",
                  Fact: "",
                  IsRequest: "0",
                  RequestForAction: "",
                  CompareReason: "",
                  IsProvisionalAcquittal: "",
                  Bail: null,
                  Guaruntee: null,
                  CompareFine: "",
                  PaymentFineDate: "",
                  PaymentFineAppointDate: "",
                  PaymentVatDate: "",
                  TreasuryMoney: "",
                  BribeMoney: "",
                  RewardMoney: "",
                  ApproveStationCode: "",
                  ApproveStation: "",
                  ApproveReportDate: "",
                  CommandNo: "",
                  CommandDate: "",
                  CompareAuthority: "",
                  ApproveReportType: "",
                  MistreatNo: "", //+ MistreatNo
                  FineType: "",
                  AdjustReason: "",
                  Lawbreaker: ArrestList[0].ArrestName,
                  LawbreakerID: ArrestList[0].LawbreakerID,
                  ProductDesc: Product,
                  FineRate: "",
                  VatValue: "",
                  RewardRate: "", //RewardRate
                  CompareDetailFine: [],
                  CompareDetailReceipt: [],
                }

                this.ListCompareDetail.push(this.oCompareDetail);
              }

            }
          }

        }
        */
      }, (err: HttpErrorResponse) => {
        alert(err.message);
      });
    }

    this.preloader.setShowPreloader(false);
  }

  async getCompareByID() {
    this.preloader.setShowPreloader(true);

    await this.fineService.getByCon(this.CompareID).then(async res => {
      if (res != null) {
        this.oCompare = res[0];

        this.preloader.setShowPreloader(false);
      }
    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });

    //this.ListProveDoc = [];

    // await this.proveService.DocumentgetByCon(this.oProve.ProveReportNo).then(async doc => {
    //   if (doc) {
    //     this.ListProveDoc.push(doc);

    //     for (var i = 0; i < this.ListProveDoc.length; i += 1) {
    //       this.ListProveDoc[i].DocumentSeq = i;
    //       this.ListProveDoc[i].IsNewItem = false;
    //       this.ListProveDoc[i].IsDelItem = false;
    //     }
    //   }
    // }, (err: HttpErrorResponse) => {
    //   alert(err.message);
    // });

    // this.preloader.setShowPreloader(false);
  }

  ShowData() {
    debugger
    if (this.CompareID != "0") {
      var CRN = this.oCompare.CompareCode.split('/');

      if (CRN.length > 1) {
        this.CompareNo = CRN[0];
        this.CompareYear = CRN[1];
      }

      var CDate = this.oCompare.CompareDate.split(" ");
      this.CompareDate = CDate[0];
      this.CompareTime = CDate[1] + ".000";

      this.IsOutside = this.oCompare.IsOutside;
      this.StationName = this.oCompare.CompareStation;
      this.ListCompareDetail = this.oCompare.CompareDetail;
      this.ListCompareStaff = this.oCompare.CompareStaff;

      this.ListCompareStaff.filter(f => f.ContributorCode == "18").map(async item => {
        this.CompareStaffName = `${item.TitleName == null ? '' : item.TitleName}`;
        this.CompareStaffName += `${item.FirstName == null ? '' : item.FirstName}`;
        this.CompareStaffName += ` ${item.LastName == null ? '' : item.LastName}`;

        this.OperationPosName = `${item.PositionName == null ? '' : item.PositionName}`;
        this.OperationDeptName = `${item.DepartmentName == null ? '' : item.DepartmentName}`;
        this.CompareStaffID = `${item.StaffID == null ? '' : item.StaffID}`;
        this.oCompareStaff = item;
        this.oCompareStaff.IsNewItem = false;
      });

      for (var i = 0; this.ListCompareDetail.length; i++) {
        this.ListCompareDetail[i].LawBrakerName = "";
        this.ListCompareDetailReceipt.push(this.oCompare.CompareDetail[i].CompareDetailReceipt);
        this.ListCompareDetail[i].IsNewItem = false;
        this.ListCompareDetailReceipt[i].IsNewItem = false;

        if (this.ListCompareDetail[i].IndictmentDetailID != null && this.ListCompareDetail[i].IndictmentDetailID || "") {
          let LawbreakerID = this.oArrest.ArrestIndictment
            .filter(item => item.IndictmentID === +this.IndictmentID)[0].OpsArrestIndicmentDetailCollection
            .filter(item => item.IndictmentDetailID === this.ListCompareDetail[i].IndictmentDetailID);

          let result = this.oArrest.ArrestLawbreaker.filter(item => item.LawbreakerID === +LawbreakerID[0].LawbreakerID);

          if (result.length > 0) {
            this.ListCompareDetail[i].LawBrakerName = result[0].LawbreakerFullName;
            this.ListCompareDetailReceipt[i].LawBrakerName = result[0].LawbreakerFullName;
          }
        }
      }
    }
  }

  getIndexOf(arr, val, prop) {
    var l = arr.length,
      k = 0;
    for (k = 0; k < l; k = k + 1) {
      if (arr[k][prop] == val) {
        return k;
      }
    }
    return false;
  }


  async onInsCompare() {

  }

  async onUpdCompare() {
    this.preloader.setShowPreloader(true);

    this.oCompare.CompareCode = this.CompareNo + "/" + this.CompareYear;
    this.oCompare.CompareDate = this.CompareDate + ' ' + this.CompareTime;
    
    this.oCompare.AccuserSubdistrictCode = this.AccuserSubdistrictCode;
    this.oCompare.AccuserSubdistrict = this.AccuserSubdistrict;

    var aIndex;
    aIndex = this.getIndexOf(this.ListCompareStaff, "18", "ContributorCode");
    this.ListCompareStaff[aIndex] = this.oCompareStaff;
    this.oCompare.IsOutside = '1';
    // debugger
    // if (this.IsOutside == 'true') {
    //   this.oCompare.IsOutside = '1';
    // }
    // else {
    //   this.oCompare.IsOutside = '0';
    // }

    let isSuccess: boolean = true;
    debugger
    // Update compare
    await this.fineService.CompareupdByCon(this.oCompare).then(IsSuccess => {
      if (!IsSuccess) {
        isSuccess = IsSuccess;
        return false;
      }
    }, (error) => { isSuccess = false; console.error(error); return false; });

    if (!isSuccess) return false;

    if (isSuccess) {
      alert(Message.saveComplete);
    } else {
      alert(Message.saveFail);
    }

    this.preloader.setShowPreloader(false);
  }

  // --- เขียนที่ (คำให้การของผู้ต้องหา) ---
  getStation() {
    // this.preloader.setShowPreloader(true);
    this.MasterSV.getStation().then(async res => {
      if (res) {
        this.rawOptions = res;
      }

    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });
    // this.preloader.setShowPreloader(false);
  }

  onAutoChange(value: string) {
    // 
    if (value == '') {
      this.options = [];

      this.oCompare.CompareStationCode = "";
      this.oCompare.CompareStation = "";
    } else {
      this.options = this.rawOptions.filter(f => f.OfficeName.toLowerCase().indexOf(value.toLowerCase()) > -1);
    }
  }

  onAutoFocus(value: string) {
    if (value == '') {
      this.options = [];
    }
  }

  onAutoSelecteWord(event) {
    this.oCompare.CompareStationCode = event.OfficeCode;
    this.oCompare.CompareStation = event.OfficeName;
    debugger
  }
  // ----- End เขียนที่ (คำให้การของผู้ต้องหา) ---


  // --- เขียนที่ (รายงานขออนุมัติการเปรียบเทียบคดีและแบบอนุมัติ) ---
  ReportonAutoChange(value: string) {
    // 
    if (value == '') {
      this.ReportOptions = [];
    } else {
      this.ReportOptions = this.rawOptions.filter(f => f.OfficeName.toLowerCase().indexOf(value.toLowerCase()) > -1);
    }
  }

  ReportonAutoFocus(value: string) {
    if (value == '') {
      this.ReportOptions = [];
    }
  }

  ReportonAutoSelecteWord(event) {
    // this.oProve.ProveStationCode = event.OfficeCode;
    // this.oProve.ProveStation = event.OfficeName;
  }
  // ----- End เขียนที่ (รายงานขออนุมัติการเปรียบเทียบคดีและแบบอนุมัติ) ---


  // ----- Format Datetime ---
  getCurrentDate() {
    let date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toISOString().substring(0, 10);
  }

  getCurrentTime() {
    let date = new Date();
    // 
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
  }
  // ----- End DateTime -----


  // ----- ผู้เปรียบเทียบ ---
  async getCompareStaff() {
    // this.preloader.setShowPreloader(true);
    await this.MasterSV.getStaff().then(async res => {
      if (res) {
        this.rawStaffOptions = res;
      }
    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });
    // this.preloader.setShowPreloader(false);
  }


  StaffonAutoChange(value: string) {
    // 
    if (value == '') {
      this.Staffoptions = [];
      this.ClearStaffData();
    } else {
      if (this.rawStaffOptions.length == 0) {
        this.getCompareStaff();
      }
      this.Staffoptions = this.rawStaffOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1);

    }
  }

  StaffonAutoFocus(value: string) {
    if (value == '') {
      this.Staffoptions = [];
      this.ClearStaffData();
    }
  }

  StaffonAutoSelecteWord(event) {
    this.oCompareStaff = {
      StaffID: this.CompareStaffID,
      ProgramCode: "XCS-60",
      ProcessCode: "XCS-60-06",
      // LawsuitID: this.LawsuitID,
      StaffCode: event.StaffCode,
      TitleName: event.TitleName,
      FirstName: event.FirstName,
      LastName: event.LastName,
      PositionCode: event.OperationPosCode,
      PositionName: event.OperationPosName,
      PosLevel: event.PosLevel,
      PosLevelName: event.PosLevelName,
      DepartmentCode: event.OperationDeptCode,
      DepartmentName: event.OperationDeptName,
      DepartmentLevel: event.DeptLevel,
      OfficeCode: event.OfficeCode,
      OfficeName: event.OfficeName,
      OfficeShortName: event.OfficeShortName,
      ContributorID: "18",
      IsActive: "1"
    }

    if (this.CompareStaffID == '' || this.CompareStaffID == undefined) {
      this.oCompareStaff.IsNewItem = true;
    }

    this.OperationPosName = event.PosLevelName;
    this.OperationDeptName = event.OperationDeptName;
  }

  ClearStaffData() {
    this.OperationPosName = "";
    this.OperationDeptName = "";

    this.oCompareStaff = {
      ProgramCode: "XCS-60",
      ProcessCode: "XCS-60-05",
      StaffID: this.CompareStaffID,
      // LawsuitID: this.LawsuitID,
      StaffCode: "",
      TitleName: "",
      FirstName: "",
      LastName: "",
      PositionCode: "",
      PositionName: "",
      PosLevel: "",
      PosLevelName: "",
      DepartmentCode: "",
      DepartmentName: "",
      DepartmentLevel: "",
      OfficeCode: "",
      OfficeName: "",
      OfficeShortName: "",
      ContributorID: "18"
    }

    if (this.CompareStaffID == '' || this.CompareStaffID == undefined) {
      this.oCompareStaff.IsNewItem = true;
    }
  }
  // ----- End ผู้เปรียบเทียบ ---
}



