import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { FineService } from '../fine.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Compare, ICompareDetail, CompareDetail, CompareDetailReceipt } from '../fine-model';
import { Lawsuit } from '../lawsuit-model';
import { Arrest } from '../arrest';
import { ICompareCon, ICompareConAdv } from '../condition-model';
import { GuiltBase } from '../guiltBase-model';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, FormsModule } from '@angular/forms';
import * as formatDate from '../../../config/dateFormat';
import { Message } from '../../../config/message';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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


  oCompare: Compare[];
  //ListCompareDetail: CompareDetail[];
  ListCompareDetailReceipt: CompareDetailReceipt[];
  oCompareDetailReceipt: CompareDetailReceipt = {};

  ListCompareDetail: ICompareDetail[];
  oCompareDetail: ICompareDetail = {};

  oLawsuit: Lawsuit;
  condtion: ICompareCon = {};
  conditionAdv: ICompareConAdv = {};
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

  // ----- ข้อมูลคำให้การของผู้ต้องหา ----- //
  CompareDate: string;
  CompareTime: string;
  Station: string;
  Staff: string;
  ComparePosition: string;
  CompareDepartment: string;

  // ----- ข้อมูลคำให้การของผู้ต้องหา (Show Table) ----- //
  iF3: number;
  ArrestName: string;
  PaymentFineDate: string;
  PaymentVatDate: string;
  Bail: string;
  Guaruntee: string;
  IsRequest: number;
  LawbrakerTestimony: string;

  // ----- ข้อมูลบันทึกการเปรียบเทียบคดีและชำระค่าปรับ --- //
  iF4: number;
  IsOutside: number;
  CompareCode: string;
  CompareYear: string;
  ReceiptBookNo : string;
  ReceiptNo : string;
  ReceiptChanel : number;
  ReferenceNo : string;
  ReceipStation  : string;
  PaymentDate   : string;
  PaymentTime : string;
  TotalFine   : number;
  Lawbreaker: string;
  ReceipStaff: string;
  ReceipPosition: string;
  ReceipDepartment: string;

  // ---- รายงานการอนุมัติ ---//
  ApproveReportDate: string;
  ApproveReportType: number;
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

    this.oCompare = [];

    debugger
    this.PaymentFineDate = this.getCurrentDate();
    this.PaymentVatDate = this.getCurrentDate();

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

    // this.sub = this.navService.onSave.subscribe(async status => {
    //     if (status) {
    //         // set action save = false
    //         await this.navService.setOnSave(false);
    //         debugger
    //         if (this.mode === 'C') {
    //             this.onCreate();

    //         } else if (this.mode === 'R') {
    //             this.onReviced();
    //         }
    //     }
    // });

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

    if(this.CompareID != '-')
    {

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

      this.getGuiltBaseByID(this.oArrest.ArrestIndictment[0].GuiltBaseID.toString());

      if (this.oArrest.ArrestLawbreaker.length > 0) {
        for (var i = 0; i < this.oArrest.ArrestLawbreaker.length; i += 1) {
          this.oCompareDetail = {};

          if (this.oArrest.ArrestLawbreaker[i].EntityType == 0) {
            this.ArrestName = this.oArrest.ArrestLawbreaker[i].CompanyTitle + this.oArrest.ArrestLawbreaker[i].CompanyName;
          }
          else {
            this.ArrestName = this.oArrest.ArrestLawbreaker[i].LawbreakerTitleName
              + this.oArrest.ArrestLawbreaker[i].LawbreakerFirstName
              //+ ' ' + this.oArrest.ArrestLawbreaker[i].LawbreakerMiddleName
              + ' ' + this.oArrest.ArrestLawbreaker[i].LawbreakerLastName;
          }

          // ----- คำให้การผู้ต้องหา && รายงานการอนุมัติ ---//
          this.oCompareDetail = {
            CompareID: null,
            CompareDetailID: null,
            IndictmentDetailID: null,
            LawbrakerTestimony: null,
            IsRequest: 0,
            IsProvisionalAcquittal: null,
            Bail: "",
            Guaruntee: "",
            CompareFine: null,
            PaymentFineDate: null,
            PaymentVatDate: null,
            PaymentFineAppointDate: null,
            Lawbreaker: this.ArrestName,
            
            // รายงานการอนุมัติ
            ApproveReportDate: null,
            ApproveReportType: null,
            CommandDate: null,
            Fact: "",
            CompareReason: "",
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

  getGuiltBaseByID(GuiltBaseID: string) {
    this.fineService.getGuiltBaseByCon(GuiltBaseID).then(async res => {
      this.oGuiltBase = res;

      this.SectionName = this.oGuiltBase.CompareMasLawSection.SectionName         // CL1
      this.GuiltBaseName = this.oGuiltBase.CompareMasLawGuiltBase.GuiltBaseName;  // CL1
      this.SectionNo = this.oGuiltBase.CompareMasLawPenalty.SectionNo.toString(); // CL1
      this.PenaltyDesc = this.oGuiltBase.CompareMasLawPenalty.PenaltyDesc;        // CL1
    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });
  }

  onClickEditF3(i: number) {
    debugger

    this.ArrestName = this.ListCompareDetail[i].Lawbreaker;

    if (this.ListCompareDetail[i].PaymentFineDate != null) {
      this.PaymentFineDate = new Date(this.ListCompareDetail[i].PaymentFineAppointDate).toISOString().substring(0, 10);
    }
    else
    {
      this.PaymentFineDate = this.getCurrentDate();
    }

    if (this.ListCompareDetail[i].PaymentVatDate != null) {
      this.PaymentVatDate = new Date(this.ListCompareDetail[i].PaymentVatDate).toISOString().substring(0, 10);
    }
    else
    {
      this.PaymentVatDate = this.getCurrentDate();
    }

    this.Bail = this.ListCompareDetail[i].Bail;
    this.Guaruntee = this.ListCompareDetail[i].Guaruntee;
    this.IsRequest = this.ListCompareDetail[i].IsRequest;
    this.LawbrakerTestimony = this.ListCompareDetail[i].LawbrakerTestimony;

    this.iF3 = i;
  }

  onSaveF3() {
    debugger
    this.ListCompareDetail[this.iF3].PaymentFineAppointDate = new Date(this.PaymentFineDate);
    this.ListCompareDetail[this.iF3].PaymentVatDate = new Date(this.PaymentVatDate);
    this.ListCompareDetail[this.iF3].Bail = this.Bail;
    this.ListCompareDetail[this.iF3].Guaruntee = this.Guaruntee;
    this.ListCompareDetail[this.iF3].IsRequest = this.IsRequest;
    this.ListCompareDetail[this.iF3].LawbrakerTestimony = this.LawbrakerTestimony;
    this.ListCompareDetail[this.iF3].Lawbreaker = this.ArrestName;
    this.iF3 = 0;

  }


  onClickEditF4(i: number) {
    debugger

    this.ArrestName = this.ListCompareDetailReceipt[i].Lawbreaker;

    if (this.ListCompareDetailReceipt[i].PaymentDate != null) {
      this.PaymentDate = new Date(this.ListCompareDetailReceipt[i].PaymentDate).toISOString().substring(0, 10);
      this.PaymentTime = new Date(this.ListCompareDetailReceipt[i].PaymentDate).toISOString().substring(0, 10);
    }
    else
    {
      this.PaymentDate = this.getCurrentDate();
      this.PaymentTime = this.getCurrentDate();
    }

    this.ReceiptBookNo = this.ListCompareDetailReceipt[i].ReceiptBookNo;
    this.ReceiptNo = this.ListCompareDetailReceipt[i].ReceiptNo;
    this.ReceiptChanel  = this.ListCompareDetailReceipt[i].ReceiptChanel;
    this.ReferenceNo = this.ListCompareDetailReceipt[i].ReferenceNo;
    this.ReceipStation  = this.ListCompareDetailReceipt[i].Station;
    this.TotalFine  = this.ListCompareDetailReceipt[i].TotalFine;
    this.ReceipStaff  = this.ListCompareDetailReceipt[i].ReceipStaff;
    this.ReceipPosition  = this.ListCompareDetailReceipt[i].ReceipPosition;
    this.ReceipDepartment  = this.ListCompareDetailReceipt[i].ReceipDepartment; 
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

  ConfirmDelF4()
  {
    // let dialogConfirm: any;
    // dialogConfirm.afterClosed().subscribe(isConfirm => {
    //   if (isConfirm) {
    //     alert("Deleete");
    //   }
    // });

    for (var i = 0; i < this.ListCompareDetailReceipt.length; i += 1){
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
    else
    {
      this.ApproveReportDate = this.getCurrentDate();
    }

    if (this.ListCompareDetail[i].CommandDate != null) {
      this.CommandDate = new Date(this.ListCompareDetail[i].CommandDate).toISOString().substring(0, 10);
    }
    else
    {
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
    this.ListCompareDetail[this.iF5].ApproveReportDate = new Date(this.ApproveReportDate);
    this.ListCompareDetail[this.iF5].ApproveReportType = this.ApproveReportType;
    this.ListCompareDetail[this.iF5].CommandDate = new Date(this.CommandDate);
    this.ListCompareDetail[this.iF5].Fact = this.Fact;
    this.ListCompareDetail[this.iF5].CompareReason = this.CompareReason;
    this.iF5 = 0;
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
      ArrestCode: "050100020",
      LawsuitCOde: "2561/20",
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

  getCurrentDate() {
    let date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString().substring(0, 10);
  }
}
