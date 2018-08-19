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
import { Compare, ICompareDetail, CompareDetail, CompareDetailReceipt } from '../fine-model';
import { MatAutocomplete, _MatListItemMixinBase } from '@angular/material';
// import { ProveStaff } from '../proveStaff';
// import { ProveScience } from '../proveScience';
// import { ProveProduct } from '../proveProduct';
import { Message } from '../../../config/message';
// import { ProveDocument } from '../proveDoc';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { ArrestStaff } from '../../model/arrest-staff';

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
  ReportOptions = [];
  ListCompareDetail = [];

  // ---- Varible ---
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
  CompareDate: string;      // วันที่จัดทำ
  CompareTime: string;      // เวลาจัดทำ

  // --- Object ---
  oArrest: Arrest;
  oCompareDetail: CompareDetail = {};

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
    await this.getLawsuitByID(this.LawsuitID);

    let date = new Date();
    //this.ProveYear = (date.getFullYear() + 543).toString();
    this.CompareDate = this.getCurrentDate();
    this.CompareTime = this.getCurrentTime();

    this.preloader.setShowPreloader(false);

  }


  private active_Route() {
    this.sub = this.navService.showFieldEdit.subscribe(status => {
      if (!status) {
        this.navService.setCancelButton(true);
        this.navService.setSaveButton(true);
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

      this.navService.setNextPageButton(true);
    });


    this.param = this.activeRoute.params.subscribe(p => {
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

    // this.sub = this.navService.onSave.subscribe(async status => {
    //     if (status) {
    //         debugger
    //          // set action save = false
    //          await this.navService.setOnSave(false);

    //         if (this.oProve) {
    //             if (this.ProveID == '0') {
    //                 await this.onInsProve();
    //             } else {                      
    //                 await this.onUpdProve();
    //                 //   this.onComplete();
    //             }
    //         }
    //     }
    // });

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


  async getLawsuitByID(LawsuitID: string) {
    // this.preloader.setShowPreloader(true);

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

    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });

    await this.getArrestByID(this.ArrestCode);

    // this.preloader.setShowPreloader(false);
  }

  async getArrestByID(ArrestCode: string) {
    // this.preloader.setShowPreloader(true);

    await this.ArrestSV.getByArrestCon(ArrestCode).then(async res => {
      res.ArrestStaff.map(async item => {
        item.FullName = `${item.TitleName == null ? '' : item.TitleName}`;
        item.FullName += `${item.FirstName == null ? '' : item.FirstName}`;
        item.FullName += ` ${item.LastName == null ? '' : item.LastName}`;
      });


      res.ArrestLocale.map(async item => {
        this.ArrestLocation = `${item.SubDistrict == null ? '' : item.SubDistrict}`;
        this.ArrestLocation += ` ${item.District == null ? '' : item.District}`;
        this.ArrestLocation += ` ${item.Province == null ? '' : item.Province}`;
      });


      res.ArrestStaff.filter(item => item.ContributorID === "11").map(async item => {
        this.ArrestStaffName = item.FullName;
        this.PositionName = item.PositionName;
        this.DepartmentName = item.DepartmentName;
      });

      this.oArrest = res;

    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });

    await this.getGuiltBaseByID();

    // this.preloader.setShowPreloader(false);
  }

  async getGuiltBaseByID() {
    // this.preloader.setShowPreloader(true);

    var aIndex;
    var arrestIndex;
    let ArrestIndictment = [];

    if (this.oArrest.ArrestIndictment.length > 0) {
      ArrestIndictment = this.oArrest.ArrestIndictment.filter(item => item.IndictmentID == +this.IndictmentID)

      await this.LawsuitSV.getGuiltBaseByCon(ArrestIndictment[0].GuiltBaseID.toString()).then(async res => {
        this.SectionName = res.CompareMasLawSection.SectionName;
        this.GuiltBaseName = res.CompareMasLawGuiltBase.GuiltBaseName;
        this.SectionNo = res.CompareMasLawPenalty.SectionNo.toString();
        this.PenaltyDesc = res.CompareMasLawPenalty.PenaltyDesc;

        if (ArrestIndictment[0].OpsArrestIndicmentDetailCollection.length > 0) {
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
      }, (err: HttpErrorResponse) => {
        alert(err.message);
        this.preloader.setShowPreloader(false);
      });
    }

    this.preloader.setShowPreloader(false);
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
    } else {
      debugger
      this.options = this.rawOptions.filter(f => f.OfficeName.toLowerCase().indexOf(value.toLowerCase()) > -1);
    }
  }

  onAutoFocus(value: string) {
    if (value == '') {
      this.options = [];
    }
  }

  onAutoSelecteWord(event) {
    // this.oProve.ProveStationCode = event.OfficeCode;
    // this.oProve.ProveStation = event.OfficeName;
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
}
