import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { FineService } from '../fine.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Compare, ICompareDetail, CompareDetail, CompareDetailReceipt } from '../fine-model';
import { Lawsuit } from '../../model/lawsuit-model';
import { Arrest } from '../../model/arrest';
import { ICompareCon, ICompareConAdv, ICompareIns, ICompareMistreat, IRateMistreat } from '../condition-model';
import { GuiltBase } from '../../model/guiltBase-model';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, FormsModule } from '@angular/forms';
import * as formatDate from '../../../config/dateFormat';
import { Message } from '../../../config/message';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { MatAutocomplete } from '@angular/material';
import { ArrestIndictment } from '../../arrests/arrest-indictment';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  viewMode: any;
  sub: any;
  param: any;
  modal: any;

  rawOptions = [];
  options = [];
  compareStaff = [];

  oCompare: Compare[];
  ListCompareDetail: CompareDetail[];
  oCompareDetail: CompareDetail = {};

  ListCompareDetailReceipt: CompareDetailReceipt[];
  oCompareDetailReceipt: CompareDetailReceipt = {};

  // ListCompareDetail: ICompareDetail[];
  // oCompareDetail: ICompareDetail = {};
  oCompareIns: ICompareIns = {};

  oLawsuit: Lawsuit;
  condtion: ICompareCon = {};
  conditionAdv: ICompareConAdv = {};
  conditionMistreat: ICompareMistreat = {};
  conditionRateMistreat: IRateMistreat = {};
  oArrest: Arrest;
  oGuiltBase: GuiltBase;


  LawsuitID: string;

  // ----- ข้อมูลรายละเอียดข้อกล่าวหา ----- //
  CompareID: string;
  ArrestCode: string;
  LawsuiltCode: string;
  ProveReportNo: string;
  LawsuiltDate: string;
  LawsuiltTime: string;
  ArrestStaffName: string;
  PositionName: string;
  DepartmentName: string;
  ArrestLocal: string;
  SectionName: string;
  GuiltBaseName: string;
  SectionNo: string;
  PenaltyDesc: string;
  IndictmentID: number;

  // ----- ข้อมูลคำให้การของผู้ต้องหา ----- //
  CompareDate: string;
  CompareTime: string;
  Station: string;
  ReceipStationCode: string;
  ApproveStationCode: string;
  Staff: string;
  ComparePosition: string;
  CompareDepartment: string;

  // ----- ข้อมูลคำให้การของผู้ต้องหา (Show Table) ----- //
  iF3: number;
  ArrestName: string;
  PaymentFineAppointDate: string;
  PaymentVatDate: string;
  Bail: string;
  Guaruntee: string;
  // yRequest: boolean;
  // nRequest: boolean;
  LawbrakerTestimony: string;

  // ----- ข้อมูลบันทึกการเปรียบเทียบคดีและชำระค่าปรับ --- //
  iF4: number;
  IsOutside: boolean;
  CompareYear: string;
  ReceiptBookNo: string;
  ReceiptNo: string;
  ReceiptChanel: number;
  ReferenceNo: string;
  ReceipStation: string;
  PaymentDate: string;
  PaymentTime: string;
  TotalFine: number;
  Lawbreaker: string;
  ReceipStaff: string;
  ReceipPosition: string;
  ReceipDepartment: string;

  // ---- รายงานการอนุมัติ ---//
  ApproveReportDate: string;
  ApproveReportType: string;
  CommandDate: string;
  Fact: string;
  CompareReason: string;
  iF5: number;

  // ----- Model ------ //
  @ViewChild('printDocModal') printDocModel: ElementRef;

  constructor(private router: Router,
    private navService: NavigationService,
    private fineService: FineService,
    private ngbModel: NgbModal,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.active_Route();
    this.navigate_Service();
    this.getStation();
    this.getStaff();

    this.oCompare = [];

    this.setCompareIns();

    this.PaymentFineAppointDate = this.getCurrentDate();
    this.PaymentVatDate = this.getCurrentDate();
    this.CompareDate = this.getCurrentDate();
    this.CompareTime = this.getCurrentTime();

    let date = new Date();
    this.CompareYear = (date.getFullYear() + 543).toString();

    this.getCompareByID();
  }

  private active_Route() {
    this.sub = this.navService.showFieldEdit.subscribe(status => {
      this.viewMode = status;
      if (!this.viewMode) {
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
    // this.sub = this.navService.showFieldEdit.subscribe(p => {
    //     this.showEditField = p;
    // });

    this.sub = this.navService.onSave.subscribe(async status => {
      if (status) {
        // set action save = false
        await this.navService.setOnSave(false);
        debugger
        if (this.CompareID == '-') {
          this.onInsCompare();

        } else {
          this.onUpdCompare();
          this.onComplete();
        }
      }
    });

    // this.sub = this.navService.onDelete.subscribe(async status => {
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

    this.sub = this.navService.onCancel.subscribe(async status => {
      if (status) {
        await this.navService.setOnCancel(true);
        await this.navService.setEditButton(true);
        await this.navService.setPrintButton(true);
        await this.navService.setDeleteButton(true);
        // set true
        await this.navService.setSaveButton(false);
        await this.navService.setCancelButton(false);
      }
    })
  }

  viewData() {
    this.router.navigate(['fine/detail']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  getCompareByID() {
    this.ListCompareDetail = [];
    this.ListCompareDetailReceipt = [];

    this.getLawsuitByID(this.LawsuitID);
    this.getArrestByID(this.ArrestCode);

    debugger
    if (this.CompareID != '-') {
      this.setCompareCondition();
      this.fineService.getByCon(this.condtion).then(async res => {

        if (Array.isArray(res)) {
          this.oCompare = res;

          this.oCompareIns.CompareCode = this.oCompare[0].CompareCode.split("/")[0];
          this.CompareYear = this.oCompare[0].CompareCode.split("/")[1];
          this.oCompareIns.IsOutside = this.oCompare[0].IsOutside.toString();
          this.oCompareIns.CompareStation = this.oCompare[0].CompareStation;
          this.oCompareIns.CompareStationCode = this.oCompare[0].CompareStationCode;

          if (this.oCompareIns.IsOutside == "1") {
            this.IsOutside = true;
          }
          else {
            this.IsOutside = false;
          }

          debugger
          for (var i = 0; i < this.ListCompareDetail.length; i += 1) {
            if (this.oCompare[0].CompareDetail.length > 0) {
              for (var j = 0; j < this.oCompare[0].CompareDetail.length; j += 1) {
                if (this.ListCompareDetail[i].IndictmentDetailID == this.oCompare[0].CompareDetail[j].IndictmentDetailID) {
                  this.ListCompareDetail[i].PaymentFineAppointDate = this.oCompare[0].CompareDetail[j].PaymentFineAppointDate;
                  this.ListCompareDetail[i].PaymentVatDate = this.oCompare[0].CompareDetail[j].PaymentVatDate;
                }
              }
            }
          }
        }
      }, (err: HttpErrorResponse) => {
        alert(err.message);
      });
    }
    // else
    // {
    //   for (var i = 0; i < this.ListCompareDetail.length; i += 1){
    //     this.ListCompareDetail[i].CompareDetailID = null;
    //     this.ListCompareDetail[i].IndictmentDetailID = null;
    //     this.ListCompareDetail[i].LawbrakerTestimony = "";
    //     this.ListCompareDetail[i].IsRequest = null;
    //     this.ListCompareDetail[i].IsProvisionalAcquittal = null;
    //     this.ListCompareDetail[i].Bail = "";
    //     this.ListCompareDetail[i].Guaruntee = "";
    //     this.ListCompareDetail[i].CompareFine = null;
    //     this.ListCompareDetail[i].PaymentFineDate = new Date(this.getCurrentDate());
    //     this.ListCompareDetail[i].PaymentVatDate = new Date(this.getCurrentDate());
    //     this.ListCompareDetail[i].PaymentFineAppointDate = new Date(this.getCurrentDate());
    //   }
    // }



    /*
        
        this.setCompareConditionAdv();
        debugger
        this.fineService.getByConAdv(this.conditionAdv).then(async res => {
          
          // if (Array.isArray(res)) {
          //   this.oCompare = res;
          //   this.oCompare[0].ArrestCode = "050100020";
    
            
          //   this.getArrestByID(this.oCompare[0].ArrestCode);
    
          //   // --- CL1 ---
          //   this.ArrestCode = this.oCompare[0].ArrestCode;  // CL1
          //   this.ProveReportNo = this.oCompare[0].ProveReportNo; // CL1
    
    
    
          //   // CL3
          //   this.CompareDate = new Date(this.oCompare[0].CompareDate).toISOString().substring(0, 10);   // CL3
          //   this.CompareTime = new Date(this.oCompare[0].CompareDate).toISOString().substring(0, 10);   // CL3
          //   this.Station = this.oCompare[0].CompareStation;
          //   this.Staff = this.oCompare[0].CompareStaff[0].TitleName + this.oCompare[0].CompareStaff[0].FirstName + ' ' + this.oCompare[0].CompareStaff[0].LastName;
          //   this.ComparePosition = this.oCompare[0].CompareStaff[0].PositionName;     // CL3
          //   this.CompareDepartment = this.oCompare[0].CompareStaff[0].DepartmentName; // CL3
            // this.ListCompareDetail = [];
            // this.ListCompareDetail = this.oCompare[0].CompareDetail;
    
            // if (this.ListCompareDetail.length == 0) {
    
            // }
    
            // CL4
            // this.IsOutside = this.oCompare[0].IsOutside;
            // this.CompareCode = this.oCompare[0].CompareCode.split("/")[0];
            // this.CompareYear = this.oCompare[0].CompareCode.split("/")[1];
    
            // this.ListCompareDetailReceipt = [];
    
            // for (var i = 0; i < this.oCompare[0].CompareDetail.length; i += 1) {
            //   for (var j = 0; j < this.ListCompareDetail[i].CompareDetailReceipt.length; j += 1) {
            //     this.ListCompareDetailReceipt.push(this.ListCompareDetail[i].CompareDetailReceipt[j]);
            //   }
            // }
    
            debugger
            // this.ListCompareDetail = [];
    
            // for (var i = 0; i < this.oCompare[0].CompareDetail.length; i += 1){
            //     this.oCompareDetail = {};
    
            //     this.oCompareDetail = {
            //       CompareID: this.oCompare[0].CompareID,
            //       CompareDetailID: this.oCompare[0].CompareDetail[i].CompareDetailID,
            //       IndictmentDetailID: this.oCompare[0].CompareDetail[i].IndictmentDetailID,
            //       LawbrakerTestimony: this.oCompare[0].CompareDetail[i].LawbrakerTestimony,
            //       IsRequest: this.oCompare[0].CompareDetail[i].IsRequest,
            //       IsProvisionalAcquittal: this.oCompare[0].CompareDetail[i].IsProvisionalAcquittal,
            //       Bail: this.oCompare[0].CompareDetail[i].Bail,
            //       Guaruntee: this.oCompare[0].CompareDetail[i].Guaruntee,
            //       CompareFine: this.oCompare[0].CompareDetail[i].CompareFine,
            //       PaymentFineDate: this.oCompare[0].CompareDetail[i].PaymentFineDate,
            //       PaymentVatDate: this.oCompare[0].CompareDetail[i].PaymentVatDate,
            //       PaymentFineAppointDate: this.oCompare[0].CompareDetail[i].PaymentFineAppointDate
            //     }
    
            //     // รอ get ArrestLawbreaker
            //    // this.oCompareDetail.Lawbreaker = "";
    
            //     this.ListCompareDetail.push(this.oCompareDetail);
            // } 
          }
          else {
            alert(Message.noRecord + 'ข้อมูลเปรียบแทียบและชำระค่าปรับ');
          }
        }, (err: HttpErrorResponse) => {
          alert(err.message);
        });
        */
  }

  getLawsuitByID(LawsuitID: string) {
    this.fineService.LawsuitegetByCon(LawsuitID).then(async res => {
      this.oLawsuit = res;

      // --- รายละเอียดข้อกล่าวหา ----
      this.LawsuiltCode = this.oLawsuit.LawsuitNo;
      this.LawsuiltDate = new Date(this.oLawsuit.LawsuitDate).toISOString().substring(0, 10);
      this.LawsuiltTime = new Date(this.oLawsuit.LawsuitTime).toISOString().substring(0, 10);
      this.IndictmentID = this.oLawsuit.IndictmentID;

    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });
  }

  getArrestByID(ArrestCode: string) {

    this.fineService.getByArrestCon(ArrestCode).then(async res => {
      this.oArrest = res;

      // --- รายละเอียดข้อกล่าวหา ----
      if (this.oArrest.ArrestStaff.length > 0) {
        this.ArrestStaffName = this.oArrest.ArrestStaff[0].TitleName + this.oArrest.ArrestStaff[0].FirstName + ' ' + this.oArrest.ArrestStaff[0].LastName;
        this.PositionName = this.oArrest.ArrestStaff[0].PositionName;     // CL1
        this.DepartmentName = this.oArrest.ArrestStaff[0].DepartmentName;  // CL1
      }

      if (this.oArrest.ArrestLocale.length > 0) {
        this.ArrestLocal = this.oArrest.ArrestLocale[0].SubDistrict + ' ' + this.oArrest.ArrestLocale[0].District + ' ' + this.oArrest.ArrestLocale[0].Province;
      }

      this.getGuiltBaseByID();



    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });
  }

  getMistreat(LawbreakerID: string, SectionNo: string) {
    this.conditionMistreat = {};

    this.conditionMistreat = {
      LawbreakerID: LawbreakerID,
      SectionNo: SectionNo
    }

    this.fineService.MistreatgetByCon(this.conditionMistreat).then(async res => {
      return res.length;

    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });

    return "0";
  }

  getRateMistreat(SubSectionID: string, GroupCode: string, MistreatNo: string, MistreatVolume: string) {
    this.conditionRateMistreat = {};

    this.conditionRateMistreat = {
      SubSectionID: SubSectionID,
      GroupCode: GroupCode,
      MistreatNo: MistreatNo,
      MistreatVolume: MistreatVolume
    }

    this.fineService.RateMistreatgetByCon(this.conditionRateMistreat).then(async res => {
      return res.length;

    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });

    return "0";
  }

  getRewardRate() {
    this.fineService.DivisionRategetByCon().then(async res => {
      if (res.RewardRate > res.RewardMaxMoney) {
        return res.RewardMaxMoney;
      }
      else {
        return res.RewardRate;
      }


    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });

    return "0";
  }

  getGuiltBaseByID() {
    var aIndex;
    var arrestIndex;
    if (this.oArrest.ArrestIndictment.length > 0) {
      aIndex = this.getIndexOf(this.oArrest.ArrestIndictment, this.IndictmentID, "IndictmentID");
    }

    if (aIndex != "false") {
      this.fineService.getGuiltBaseByCon(this.oArrest.ArrestIndictment[aIndex].GuiltBaseID.toString()).then(async res => {
        this.oGuiltBase = res;

        this.SectionName = this.oGuiltBase.CompareMasLawSection.SectionName         // CL1
        this.GuiltBaseName = this.oGuiltBase.CompareMasLawGuiltBase.GuiltBaseName;  // CL1
        this.SectionNo = this.oGuiltBase.CompareMasLawPenalty.SectionNo.toString(); // CL1
        this.PenaltyDesc = this.oGuiltBase.CompareMasLawPenalty.PenaltyDesc;        // CL1


        if (this.oArrest.ArrestIndictment[aIndex].OpsArrestIndicmentDetailCollection.length > 0) {
          for (var i = 0; i < this.oArrest.ArrestIndictment[aIndex].OpsArrestIndicmentDetailCollection.length; i += 1) {
            arrestIndex = this.getIndexOf(this.oArrest.ArrestLawbreaker, this.oArrest.ArrestIndictment[aIndex].OpsArrestIndicmentDetailCollection[i].LawbreakerID, "LawbreakerID");

            this.oCompareDetail = {};

            if (this.oArrest.ArrestLawbreaker[arrestIndex].EntityType == 0) {
              this.ArrestName = this.oArrest.ArrestLawbreaker[arrestIndex].CompanyTitle + this.oArrest.ArrestLawbreaker[arrestIndex].CompanyName;
            }
            else {
              this.ArrestName = this.oArrest.ArrestLawbreaker[arrestIndex].LawbreakerTitleName
                + this.oArrest.ArrestLawbreaker[arrestIndex].LawbreakerFirstName
                //+ ' ' + this.oArrest.ArrestLawbreaker[aIndex].LawbreakerMiddleName
                + ' ' + this.oArrest.ArrestLawbreaker[arrestIndex].LawbreakerLastName;
            }

            debugger
            var MistreatNo = this.getMistreat(this.oArrest.ArrestIndictment[aIndex].OpsArrestIndicmentDetailCollection[i].LawbreakerID.toString(), this.SectionNo);
            // var FineRate = this.getRateMistreat(this.oGuiltBase.CompareMasLawSubSection.SubSectionID.toString()
            //                               , ""
            //                               , ""
            //                               , "");
            // var VatValue = 20000;

            var RewardRate = "0";

            if (this.oArrest.NoticeCode != "" && this.oArrest.NoticeCode != null) {
              RewardRate = this.getRewardRate();
            }


            // ----- คำให้การผู้ต้องหา && รายงานการอนุมัติ ---//
            this.oCompareDetail = {
              CompareDetailID: "",
              CompareID: this.CompareID,
              IndictmentDetailID: this.oArrest.ArrestIndictment[aIndex].OpsArrestIndicmentDetailCollection[i].IndictmentDetailID.toString(),
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
              MistreatNo: "" + MistreatNo,
              FineType: "",
              AdjustReason: "",
              Lawbreaker: this.ArrestName,
              LawbreakerID: this.oArrest.ArrestLawbreaker[arrestIndex].LawbreakerID.toString(),
              ProductDesc: "",
              FineRate: "",
              VatValue: "",
              RewardRate: RewardRate,
              CompareDetailFine: [],
              CompareDetailReceipt: [],
            }

            this.ListCompareDetail.push(this.oCompareDetail);



            // ----- เปรียบเทียบและชำระค่าปรับ ---//
            this.oCompareDetailReceipt = {
              CompareReceiptID: null,
              ReceiptType: null,
              ReceiptBookNo: null,
              ReceiptNo: null,
              ReceiptDate: null,
              ReceiptChanel: null,
              ReferenceNo: null,
              StationCode: null,
              Station: null,
              CompareAuthority: null,
              CompareDetailID: null,
              PaymentDate: null,
              FineType: null,
              TotalFine: null,
              RevernueStatus: null,
              RevernueDate: null,
              Lawbreaker: this.ArrestName
            }

            this.ListCompareDetailReceipt.push(this.oCompareDetailReceipt);
          }
        }
      }, (err: HttpErrorResponse) => {
        alert(err.message);
      });
    }
  }

  getStation() {
    this.fineService.getStation().then(async res => {
      if (res) {
        this.rawOptions = res;
      }
      debugger
    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });
  }

  getStaff() {
    this.fineService.getStaff("134194").then(async res => {
      if (res) {
        this.compareStaff = res;
        this.Staff = res[0].TitleName + res[0].FirstName + ' ' + res[0].LastName;
      }
    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });
  }

  onClickEditF3(i: number) {
    this.ArrestName = this.ListCompareDetail[i].Lawbreaker;

    if (this.ListCompareDetail[i].PaymentFineDate != null && this.ListCompareDetail[i].PaymentFineDate != "") {
      this.PaymentFineAppointDate = this.ListCompareDetail[i].PaymentFineAppointDate.toString().substring(0, 10);
    }
    else {
      this.PaymentFineAppointDate = this.getCurrentDate();
    }

    if (this.ListCompareDetail[i].PaymentVatDate != null && this.ListCompareDetail[i].PaymentFineDate != "") {
      this.PaymentVatDate = this.ListCompareDetail[i].PaymentVatDate.toString().substring(0, 10);
    }
    else {
      this.PaymentVatDate = this.getCurrentDate();
    }

    this.Bail = this.ListCompareDetail[i].Bail;
    this.Guaruntee = this.ListCompareDetail[i].Guaruntee;

    this.LawbrakerTestimony = this.ListCompareDetail[i].LawbrakerTestimony;

    this.iF3 = i;
  }

  onSaveF3() {
    debugger
    this.ListCompareDetail[this.iF3].PaymentFineAppointDate = new Date(this.PaymentFineAppointDate).toISOString().substring(0, 10);
    this.ListCompareDetail[this.iF3].PaymentVatDate = new Date(this.PaymentVatDate).toISOString().substring(0, 10);
    this.ListCompareDetail[this.iF3].Bail = this.Bail;
    this.ListCompareDetail[this.iF3].Guaruntee = this.Guaruntee;

    // if (this.yRequest == true) {
    //   this.ListCompareDetail[this.iF3].IsRequest = "1";
    // }
    // else {
    //   this.ListCompareDetail[this.iF3].IsRequest = "0";
    // }

    this.ListCompareDetail[this.iF3].LawbrakerTestimony = this.LawbrakerTestimony;
    this.ListCompareDetail[this.iF3].Lawbreaker = this.ArrestName;
    this.iF3 = 0;

  }


  onClickEditF4(i: number) {
    this.ArrestName = this.ListCompareDetailReceipt[i].Lawbreaker;

    if (this.ListCompareDetailReceipt[i].PaymentDate != null) {
      this.PaymentDate = new Date(this.ListCompareDetailReceipt[i].PaymentDate).toISOString().substring(0, 10);
      this.PaymentTime = new Date(this.ListCompareDetailReceipt[i].PaymentDate).toISOString().substring(0, 10);
    }
    else {
      this.PaymentDate = this.getCurrentDate();
      this.PaymentTime = this.getCurrentDate();
    }

    this.ReceiptBookNo = this.ListCompareDetailReceipt[i].ReceiptBookNo;
    this.ReceiptNo = this.ListCompareDetailReceipt[i].ReceiptNo;
    this.ReceiptChanel = this.ListCompareDetailReceipt[i].ReceiptChanel;
    this.ReferenceNo = this.ListCompareDetailReceipt[i].ReferenceNo;
    this.ReceipStation = this.ListCompareDetailReceipt[i].Station;
    this.TotalFine = this.ListCompareDetailReceipt[i].TotalFine;
    this.ReceipStaff = this.ListCompareDetailReceipt[i].ReceipStaff;
    this.ReceipPosition = this.ListCompareDetailReceipt[i].ReceipPosition;
    this.ReceipDepartment = this.ListCompareDetailReceipt[i].ReceipDepartment;
    this.iF4 = i;
  }

  onSaveF4() {
    debugger
    this.ListCompareDetailReceipt[this.iF4].PaymentDate = new Date(this.PaymentDate);
    this.ListCompareDetailReceipt[this.iF4].ReceiptBookNo = this.ReceiptBookNo;
    this.ListCompareDetailReceipt[this.iF4].ReceiptNo = this.ReceiptNo;
    this.ListCompareDetailReceipt[this.iF4].ReceiptChanel = this.ReceiptChanel;
    this.ListCompareDetailReceipt[this.iF4].ReferenceNo = this.ReferenceNo;
    this.ListCompareDetailReceipt[this.iF4].Station = this.ReceipStation;
    this.ListCompareDetailReceipt[this.iF4].TotalFine = this.TotalFine;
    this.iF4 = 0;

  }

  ConfirmDelF4() {
    // let dialogConfirm: any;
    // dialogConfirm.afterClosed().subscribe(isConfirm => {
    //   if (isConfirm) {
    //     alert("Deleete");
    //   }
    // });

    for (var i = 0; i < this.ListCompareDetailReceipt.length; i += 1) {
      this.ListCompareDetailReceipt[i].ReceiptBookNo = null;
      this.ListCompareDetailReceipt[i].ReceiptNo = null;
      this.ListCompareDetailReceipt[i].ReceiptChanel = null;
      this.ListCompareDetailReceipt[i].ReferenceNo = null;
      this.ListCompareDetailReceipt[i].Station = null;
      this.ListCompareDetailReceipt[i].TotalFine = null;
      this.ListCompareDetailReceipt[i].PaymentDate = null;
      this.ListCompareDetailReceipt[i].ReceipStaff = null;
      this.ListCompareDetailReceipt[i].ReceipPosition = null;
      this.ListCompareDetailReceipt[i].ReceipDepartment = null;
    }
  }

  onClickEditF5(i: number) {
    debugger

    this.ArrestName = this.ListCompareDetail[i].Lawbreaker;

    if (this.ListCompareDetail[i].ApproveReportDate != null) {
      this.ApproveReportDate = new Date(this.ListCompareDetail[i].ApproveReportDate).toISOString().substring(0, 10);
    }
    else {
      this.ApproveReportDate = this.getCurrentDate();
    }

    if (this.ListCompareDetail[i].CommandDate != null) {
      this.CommandDate = new Date(this.ListCompareDetail[i].CommandDate).toISOString().substring(0, 10);
    }
    else {
      this.CommandDate = this.getCurrentDate();
    }

    debugger
    this.ApproveReportType = this.ListCompareDetail[i].ApproveReportType;
    this.Fact = this.ListCompareDetail[i].Fact;
    this.CompareReason = this.ListCompareDetail[i].CompareReason;
    this.iF5 = i;
  }

  onSaveF5() {
    debugger
    this.ListCompareDetail[this.iF5].ApproveReportDate = new Date(this.ApproveReportDate).toString();
    this.ListCompareDetail[this.iF5].ApproveReportType = this.ApproveReportType.toString();
    this.ListCompareDetail[this.iF5].CommandDate = new Date(this.CommandDate).toString();
    this.ListCompareDetail[this.iF5].Fact = this.Fact;
    this.ListCompareDetail[this.iF5].CompareReason = this.CompareReason;
    this.iF5 = 0;
  }

  onInsCompare() {
    if (this.IsOutside == true) {
      this.oCompareIns.IsOutside = "1";
    }
    else {
      this.oCompareIns.IsOutside = "0";
    }

    this.oCompareIns.CompareCode = this.oCompareIns.CompareCode + "/" + this.CompareYear;
    this.oCompareIns.CompareDate = this.CompareDate + " " + this.CompareTime;

    this.fineService.insAll(this.oCompareIns).then(async res => {
      if (res.IsSuccess == "True") {
        for (var i = 0; i < this.ListCompareDetail.length; i += 1) {
          this.CompareID = "99";

          if (this.ListCompareDetail[i].Bail == "") {
            this.ListCompareDetail[i].Bail == null;
          }

          if (this.ListCompareDetail[i].Guaruntee == "") {
            this.ListCompareDetail[i].Guaruntee == null;
          }

          if (this.ListCompareDetail[i].PaymentFineAppointDate != "") {
            this.ListCompareDetail[i].PaymentFineAppointDate = this.ListCompareDetail[i].PaymentFineAppointDate + " 00:00:00.00";
          }

          if (this.ListCompareDetail[i].PaymentVatDate != "") {
            this.ListCompareDetail[i].PaymentVatDate = this.ListCompareDetail[i].PaymentVatDate + " 00:00:00.00";
          }

          debugger

          this.setCompareConditionAdv();
          this.fineService.getByConAdv(this.conditionAdv).then(async res => {
            this.ListCompareDetail[i].CompareID = res[res.length - 1].CompareID.toString();

            this.fineService.insDetailAll(this.ListCompareDetail[i]).then(async res => { });

          });
        }

        alert(Message.saveComplete);
      } else {
        alert(Message.saveFail);
      }

    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });
  }

  onUpdCompare() {
    if (this.IsOutside == true) {
      this.oCompareIns.IsOutside = "1";
    }
    else {
      this.oCompareIns.IsOutside = "0";
    }

    this.oCompareIns.CompareCode = this.oCompareIns.CompareCode + "/" + this.CompareYear;
    this.oCompareIns.CompareID = this.CompareID;
    this.oCompareIns.CompareDate = this.CompareDate + " " + this.CompareTime;

    this.fineService.updByCon(this.oCompareIns).then(async res => {
      debugger
      if (res.IsSuccess == "True") {
        for (var i = 0; i < this.ListCompareDetail.length; i += 1) {
          if (this.ListCompareDetail[i].Bail == "") {
            this.ListCompareDetail[i].Bail == null;
          }

          if (this.ListCompareDetail[i].Guaruntee == "") {
            this.ListCompareDetail[i].Guaruntee == null;
          }

          if (this.ListCompareDetail[i].PaymentFineAppointDate != "") {
            this.ListCompareDetail[i].PaymentFineAppointDate = this.ListCompareDetail[i].PaymentFineAppointDate + " 00:00:00.00";
          }

          if (this.ListCompareDetail[i].PaymentVatDate != "") {
            this.ListCompareDetail[i].PaymentVatDate = this.ListCompareDetail[i].PaymentVatDate + " 00:00:00.00";
          }

          if (this.oCompare[0].CompareDetail.length > 0) {
            this.fineService.updDetailAll(this.ListCompareDetail[i]).then(async res => { });
          }
          else {
            this.fineService.insDetailAll(this.ListCompareDetail[i]).then(async res => { });
          }
        }
      } else {
        alert(Message.saveFail);
      }

    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });
  }


  setCompareCondition() {
    this.condtion = {};

    this.condtion = {
      CompareID: this.CompareID,
      CompareDetailID: "",
      CompareDetailReceiptID: "",
      FineType: "",
      CompareFineID: "",
      ReceiptFineType: "",
      StaffID: "",
      ProgramCode: "",
      ProcessCode: ""
    }
  }

  setCompareConditionAdv() {
    this.conditionAdv = {};

    this.conditionAdv = {
      ArrestCode: this.ArrestCode,
      LawsuitCOde: this.LawsuiltCode,
      ProveReportNo: "",
      CompareCode: "",
      CompareDateFrom: "",
      CompareDateTo: "",
      ProgramCode: "",
      ProcessCode: "",
      Staff: "",
      Department: ""
    }
  }

  setCompareIns() {
    this.oCompareIns = {
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
      IsOutside: "0",
      LawsuitID: this.LawsuitID
    }
  }

  getCurrentDate() {
    let date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString().substring(0, 10);
  }

  getCurrentTime() {
    let date = new Date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
  }

  // rdYesChange(event):void
  // {
  //   if(event.target.value == "on")
  //   {
  //     this.oCompareDetail[this.iF3].IsRequest = "1";
  //   }
  // }

  // rdNoChange(event):void
  // {
  //   if(event.target.value == "on")
  //   {
  //     this.oCompareDetail[this.iF3].IsRequest = "0";
  //   }
  // }

  onAutoChange(value: string) {
    if (value == '') {
      this.options = [];
    } else {

      this.options = this.rawOptions.filter(f => f.OfficeName.toLowerCase().indexOf(value.toLowerCase()) > -1);
      // debugger
    }
  }
  onAutoFocus(value: string) {
    if (value == '') {
      this.options = [];
    }
  }

  onAutoSelecteWord(event) {
    this.Station = event.OfficeCode;
  }

  onAutoSelecteReceip(event) {
    this.ReceipStationCode = event.OfficeCode;
  }

  onAutoSelecteApprove(event) {
    this.ApproveStationCode = event.OfficeCode;
  }

  getIndexOf(arr, val, prop) {
    var l = arr.length,
      k = 0;
    for (k = 0; k < l; k = k + 1) {
      if (arr[k][prop] === val) {
        return k;
      }
    }
    return false;
  }

  private async onComplete() {
    // set true
    await this.navService.setEditField(true);
    await this.navService.setEditButton(true);
    await this.navService.setPrintButton(true);
    await this.navService.setDeleteButton(true);
    // set false
    await this.navService.setSaveButton(false);
    await this.navService.setCancelButton(false);

    alert(Message.saveComplete);
  }
}
