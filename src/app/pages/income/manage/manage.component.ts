//#region "Imports"
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { IncomeService } from '../income.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Revenue, RevenueDetail } from '../Revenue';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import * as formatDate from '../../../config/dateFormat';
import { Message } from '../../../config/message';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Staff } from '../staff';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { MatAutocomplete } from '@angular/material';
import { del } from '../../../../../node_modules/@types/selenium-webdriver/http';
import { IMyDateModel, IMyOptions } from 'mydatepicker-th';
import { async } from '../../../../../node_modules/@angular/core/testing';
import { toLocalShort, compareDate, setZeroHours, setDateMyDatepicker, getDateMyDatepicker } from '../../../config/dateFormat';
import { pagination } from '../../../config/pagination';

//#endregion

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit, OnDestroy {

    //#region "Variables"

    txtRevenueCode_Value: string;               // เลขที่นำส่งเงิน
    txtRevenueDate_Value: any;                  // วันที่นำส่ง
    txtRevenueTime_Value: string;               // เวลาที่นำส่ง
    txtRevenueNo_Value: string;                 // เลขที่หนังสือนำส่ง
    txtInformTo_Value: string;                  // เรียน
    txtRevenueStation_Value: string;            // เขียนที่
    txtStaffSendName_Value: string;             // ชื่อผู้นำส่ง
    txtPosSend_Value: string;                   // ตำแหน่งผู้นำส่ง
    txtDeptSend_Value: string;                  // แผนกผู้นำส่ง
    txtStaffName_Value: string;                 // ชื่อผู้จัดทำ
    txtPosStaff_Value: string;                  // ตำแหน่งผู้จัดทำ
    txtDeptStaff_Value: string;                 // แผนกผู้จัดทำ
    selRevenueStatus_Value: number;             // สถานะนำส่ง
    chkAll_Value: any;
    txtCompareFine_Value: string = "0.00";      // ยอดนำส่งรวม
    txtMistreatNo_Value: number = 0;            // จำนวนคดี
    txtBribeMoney_Value: string = "0.00";       // เงินสินบนรวม
    txtRewardMoney_Value: string = "0.00";      // เงินรางวัลรวม
    txtTreasuryMoney_Value: string = "0.00";    // เงินส่งคลัง
    revenueCmpList = [];
    
    private sub: any;
    mode: string;
    modal: any;
    isCheckAll: any;
    // rawOptions = [];
    // options = [];

    // --------
    showEditField: any;
    
    paginage = pagination;

    revenueCmp = [];
    

    revenueID: string;

    

    
    
    StaffSendID: string;    // รหัสผู้นำส่ง
    
    
    
    StaffID: string;        // รหัสผู้จัดทำ
    
    
    
    DeptStaffCode: string;
    
    
    
    
   
    
    
    



    StaffSendoptions = [];
    rawStaffSendOptions = [];
    Staffoptions = [];
    rawOptions = [];
    informOptions = [];
    options = [];
    ListRevenueDetail = [];
    ListRevenueDetailPaging = [];
    ListChK = [];


    oRevenue = new Revenue();
    oRevenueDetail = new RevenueDetail();
    oRevenueSendStaff = new Staff();
    oRevenueStaff = new Staff();

    isRequired: boolean | false;


    // ----- Model ------ //
    @ViewChild('printDocModal') printDocModel: ElementRef;

    //#endregion

    //#region "Ng"

    constructor(
        private activeRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private ngbModel: NgbModal,
        private navService: NavigationService,
        private IncService: IncomeService,
        private preloader: PreloaderService,
        private router: Router
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setNextPageButton(false);
    }

    async ngOnInit() {
        this.preloader.setShowPreloader(true);

        
        this.active_Route();
        this.navigate_Service();

        this.selRevenueStatus_Value = 0;
        this.txtRevenueNo_Value = "";
        this.txtRevenueStation_Value == "";
        this.txtStaffSendName_Value == "";
        this.txtStaffName_Value == "";
        this.txtInformTo_Value = "";
        this.txtRevenueTime_Value = await this.getCurrentTime();
        this.txtRevenueDate_Value = setDateMyDatepicker(new Date(this.getCurrentDate()));

        await this.CreateObject();
        await this.getMasStaffMaingetAll();
        // await this.getStation();
        // await this.ShowRevenueCompare();

        if (this.mode === 'R') {
            await this.ShowRevenue();
        }

        this.paginage.TotalItems = this.ListRevenueDetail.length;
        this.ListRevenueDetailPaging = this.ListRevenueDetail.slice(0, this.paginage.RowsPerPageOptions[0]);
        
        this.CheckCompareReceive();
        
        
        this.preloader.setShowPreloader(false);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
    
    //#endregion
    
    //#region "Events"

    chkAll_onChange() {
        for (var i = 0; i < this.revenueCmpList.length; i++) {
            this.revenueCmpList[i].IsCheck = this.chkAll_Value;
        }

        this.RevenueSummary();
    }

    chkDetail_onChange() {
        this.chkAll_Value = this.revenueCmpList.every(function (item: any) {
            return item.IsCheck == true;
        });

        this.RevenueSummary(); 
    }

    

        //#region " ผู้จัดทำ "

    txtStaffName_onInput(value: string) {
        if (value == '') {
            this.Staffoptions = [];
            this.ClearStaffData();

            this.txtPosStaff_Value = "";
            this.txtDeptStaff_Value = "";
            this.DeptStaffCode = "";
        } else {
            this.Staffoptions = this.rawStaffSendOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    txtStaffName_onFocus(value: string) {
        if (value == '') {
            this.Staffoptions = [];
            this.ClearStaffData();

            this.txtPosStaff_Value = "";
            this.txtDeptStaff_Value = "";
            this.DeptStaffCode = "";
        }
    }

    txtStaffName_onClick(event) {
        this.oRevenueStaff = {
            StaffID: this.StaffID,
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-07",
            RevenueID: this.revenueID,
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
            ContributorID: "34",
            IsActive: "1"
        }

        this.txtPosStaff_Value = event.PosLevelName;
        this.txtDeptStaff_Value = event.OfficeName;
        this.DeptStaffCode = event.OperationDeptCode;

        this.getRevenueComparegetByCon();
    }

        //#endregion

        //#region " ผู้นำส่ง "
    
    txtStaffSendName_onInput(value: string) {
        if (value == '') {
            this.StaffSendoptions = [];
            this.ClearStaffSendData();

            this.txtPosSend_Value = "";
            this.txtDeptSend_Value = "";
        } else {
            this.StaffSendoptions = this.rawStaffSendOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    txtStaffSendName_onFocus(value: string) {
        if (value == '') {
            this.StaffSendoptions = [];
            this.ClearStaffSendData();

            this.txtPosSend_Value = "";
            this.txtDeptSend_Value = "";
        }
    }

    txtStaffSendName_onClick(event) {
        this.oRevenueSendStaff = {
            StaffID: this.StaffSendID,
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-07",
            RevenueID: this.revenueID,
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
            ContributorID: "20",
            IsActive: "1"
        }

        this.txtPosSend_Value = event.PosLevelName;
        this.txtDeptSend_Value = event.OfficeName;
    }

        //#endregion

        //#region " เรียน "

    txtInformTo_onInput(value: string) {        
        if (value == '') {
            this.informOptions = [];
        } else {
            this.informOptions = this.rawStaffSendOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

        //#endregion

        //#region " เขียนที่ "

    txtRevenueStation_onFocus(value: string) {
        if (value == '') {
            this.options = [];

            this.oRevenue.StationCode = "";
            this.oRevenue.StationName = "";
        }
    }

    txtRevenueStation_onClick(event) {
        this.oRevenue.StationCode = event.OfficeCode;
        this.oRevenue.StationName = event.OfficeName;
    }

    txtRevenueStation_onInput(value: string) {
        if (value == '') {
            this.options = [];

            this.oRevenue.StationCode = "";
            this.oRevenue.StationName = "";
        } else {
            this.options = this.rawStaffSendOptions.filter(f => f.OfficeName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

        //#endregion

    

    //#endregion

    //#region "Getters"

    async getMasStaffMaingetAll() {
        await this.IncService.MasStaffMaingetAll().then(async res => {
            if (res) {
                this.rawStaffSendOptions = res;
            }
        }, (err: HttpErrorResponse) => {
            //alert(err.message);

            alert(err.statusText);
        });
    }

    async getRevenueComparegetByCon() {
        this.preloader.setShowPreloader(true);

        //alert(this.DeptStaffCode);
        //alert(this.getCurrentDate());

        await this.IncService.RevenueComparegetByCon(this.getCurrentDate()+"T00:00:00.0",this.DeptStaffCode).then(async res => {
            if (res) {

                if(res.length == 0){
                    alert("ไม่พบข้อมูล");
                }
                //console.log(res);

                await res.map((item) => {

                    item.IsCheck = null;

                    item.TreasuryMoney = item.RevenueCompareDetail[0].TreasuryMoney;
                    item.BribeMoney = item.RevenueCompareDetail[0].BribeMoney;
                    item.RewardMoney = item.RevenueCompareDetail[0].RewardMoney;
                    item.TotalFine = item.RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].TotalFine;
                    item.ReceiptNo = item.RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].ReceiptNo;

                    item.TreasuryMoney = parseFloat(item.TreasuryMoney).toLocaleString(undefined, {minimumFractionDigits: 2});
                    item.BribeMoney = parseFloat(item.BribeMoney).toLocaleString(undefined, {minimumFractionDigits: 2});
                    item.RewardMoney = parseFloat(item.RewardMoney).toLocaleString(undefined, {minimumFractionDigits: 2});
                    item.TotalFine = parseFloat(item.TotalFine).toLocaleString(undefined, {minimumFractionDigits: 2});

                    item.CompareReceiptID = item.RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].CompareReceiptID;

                    item.PaymentDate = toLocalShort(item.RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].PaymentDate);


                    //let tmp = item.RevenueCompareDetail[0].RevenueArrestIndicmentDetail[0].RevenueArrestLawbreaker.filter(i => i.IsActive === '1');

                    item.LawBreaker = item.RevenueCompareDetail[0].LawbreakerTitleName+item.RevenueCompareDetail[0].LawbreakerFirstName+' '+item.RevenueCompareDetail[0].LawbreakerLastName;

                    let tmp = item.RevenueCompareStaff.filter(i => i.ContributorID === 19);

                    item.StaffReceip = tmp[0].TitleName+tmp[0].FirstName+' '+tmp[0].LastName;

                    // item.RevenueDate = toLocalShort(item.RevenueDate);
                    // item.RevenueOneStaff = item.RevenueStaff.filter(item => item.ContributorID === '20');
        
                    // item.NameX = "";
        
                    // if(item.RevenueOneStaff.length > 0) {
                    //     item.NameX = item.RevenueOneStaff[0].TitleName+item.RevenueOneStaff[0].FirstName+' '+item.RevenueOneStaff[0].LastName;
                    // }
        
                    // console.log(item.RevenueOneStaff);
        
                    // item.Count = item.RevenueDetail.length;
        
                    // debugger
                    // if (item.RevenueDetail.length > 0) {
                    //     if (item.RevenueDetail[0].RevenueStatus == "0") {
                    //         item.RevenueDetail[0].RevenueStatus = "ยังไม่นำส่งเงินรายได้"
                    //     }
                    //     else if (item.RevenueDetail[0].RevenueStatus == "1") {
                    //         item.RevenueDetail[0].RevenueStatus = "นำส่งเงินรายได้"
                    //     }
                    //     else {
                    //         item.RevenueDetail[0].RevenueStatus = "รับรายการนำส่งเงิน"
                    //     }
                    // }
        
                })

                this.revenueCmp = res;

                this.paginage.TotalItems = this.revenueCmp.length;
                this.revenueCmpList = this.revenueCmp.slice(0, this.paginage.RowsPerPageOptions[0]);

                this.preloader.setShowPreloader(false);
            }
        }, (err: HttpErrorResponse) => {
            //alert(err.message);

            alert(err.statusText);
        });
    }

    async getReveneueStaff() {
        await this.IncService.StaffgetByKeyword().then(async res => {
            if (res) {
                this.rawStaffSendOptions = res;
            }
        }, (err: HttpErrorResponse) => {
            //alert(err.message);

            alert(err.statusText);
        });
    }

    async getStation() {
        // this.preloader.setShowPreloader(true);
        await this.IncService.getDepartment().then(async res => {
            if (res) {
                this.rawOptions = res;
            }

        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
        // this.preloader.setShowPreloader(false);
    }

    //#endregion

    //#region "Functions"

    ShowRevenue() {
        this.IncService.getByCon(this.revenueID).then(async res => {
            if (res != null) {

                this.preloader.setShowPreloader(true);

                // if (res[0].RevenueDetail.length > 0) {
                //     this.ReceiptBookNo = res[0].RevenueDetail[0].ReceiptBookNo;
                // }
                // else {
                //     this.ReceiptBookNo = "";
                // }

                this.txtRevenueCode_Value = res[0].RevenueCode;

                this.oRevenue.RevenueID = res[0].RevenueID;
                this.oRevenue.StationCode = res[0].StationCode;
                this.txtRevenueStation_Value = res[0].StationName;
                this.txtRevenueNo_Value = res[0].RevenueNo;
                this.txtInformTo_Value = res[0].InformTo;

                var RDate = res[0].RevenueDate.toString().split("T");
                this.txtRevenueDate_Value = setDateMyDatepicker(new Date(RDate[0]));
                this.txtRevenueTime_Value = RDate[1].substring(0,5);

                var SStaff = res[0].RevenueStaff.filter(f => f.ContributorID == 20);
                if (SStaff.length > 0) {
                    this.txtStaffSendName_Value = SStaff[0].TitleName + SStaff[0].FirstName + ' ' + SStaff[0].LastName;
                    this.txtPosSend_Value = SStaff[0].PositionName;
                    this.txtDeptSend_Value = SStaff[0].OfficeName;
                    this.StaffSendID = SStaff[0].StaffID;
                    this.oRevenueSendStaff = SStaff[0];
                }

                var Staff = res[0].RevenueStaff.filter(f => f.ContributorID == 34);
                if (Staff.length) {
                    this.txtStaffName_Value = Staff[0].TitleName + Staff[0].FirstName + ' ' + Staff[0].LastName;
                    this.txtPosStaff_Value = Staff[0].PositionName;
                    this.txtDeptStaff_Value = Staff[0].OfficeName;
                    this.StaffID = Staff[0].StaffID;
                    this.oRevenueStaff = Staff[0];
                }

                this.selRevenueStatus_Value = res[0].RevenueStatus;

                if (res[0].RevenueDetail.length > 0) {
                    //for (var i = 0; i < this.ListRevenueDetail.length; i += 1) {
                        var tmp = [];
                        for (var j = 0; j < res[0].RevenueDetail.length; j += 1) {

                            //alert(res[0].RevenueDetail.CompareReceiptID);
                            
                            await this.IncService.getRevenueComparegetByCompareReceiptID(res[0].RevenueDetail[0].CompareReceiptID).then(async res => {
                                var o = new Object;
                                o.CompareCode = res[0].CompareCode;
                                //o.ReceiptNo = "111";
                                o.LawBreaker = "111";
                                o.StaffReceip = "111";
                                //o.PaymentDate = "111";
                                //o.TotalFine = "111";
                                //o.BribeMoney = "111";
                                //o.TreasuryMoney = "111";
                                //o.RewardMoney = "111";

                                o.IsCheck = true;

                                o.TreasuryMoney = res[0].RevenueCompareDetail[0].TreasuryMoney;
                                o.BribeMoney = res[0].RevenueCompareDetail[0].BribeMoney;
                                o.RewardMoney = res[0].RevenueCompareDetail[0].RewardMoney;
                                o.TotalFine = res[0].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].TotalFine;
                                o.ReceiptNo = res[0].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].ReceiptNo;

                                o.TreasuryMoney = parseFloat(o.TreasuryMoney).toLocaleString(undefined, {minimumFractionDigits: 2});
                                o.BribeMoney = parseFloat(o.BribeMoney).toLocaleString(undefined, {minimumFractionDigits: 2});
                                o.RewardMoney = parseFloat(o.RewardMoney).toLocaleString(undefined, {minimumFractionDigits: 2});
                                o.TotalFine = parseFloat(o.TotalFine).toLocaleString(undefined, {minimumFractionDigits: 2});

                                o.CompareReceiptID = res[0].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].CompareReceiptID;

                                o.PaymentDate = toLocalShort(res[0].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].PaymentDate);


                                //let tmp = res[0].RevenueCompareDetail[0].RevenueArrestIndicmentDetail[0].RevenueArrestLawbreaker.filter(i => i.IsActive === '1');

                                o.LawBreaker = res[0].RevenueCompareDetail[0].LawbreakerTitleName+res[0].RevenueCompareDetail[0].LawbreakerFirstName+' '+res[0].RevenueCompareDetail[0].LawbreakerLastName;

                                let tmp2 = res[0].RevenueCompareStaff.filter(i => i.ContributorID === 19);

                                //alert(tmp.length);

                                o.StaffReceip = tmp2[0].TitleName+tmp2[0].FirstName+' '+tmp2[0].LastName;

                                

                                tmp.push(o);
                            });

                        }
                    //}

                    this.revenueCmpList = tmp;

                    this.chkDetail_onChange();

                    this.RevenueSummary();

                    this.preloader.setShowPreloader(false);
                }
            }
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }

    async ShowRevenueCompare() {
        // await this.IncService.RevenueComparegetByCon().then(async res => {
        //     debugger
        //     if (res.length > 0) {
        //         for (var j = 0; j < res.length; j += 1) {
        //             if (res[j].CompareDetail.length > 0) {
        //                 for (var i = 0; i < res[j].CompareDetail.length; i += 1) {
        //                     if (res[j].CompareDetail[i].CompareDetailReceipt.length > 0) {
        //                         for (var k = 0; k < res[j].CompareDetail[i].CompareDetailReceipt.length; k += 1) {
        //                             this.oRevenueDetail = {
        //                                 RevenueDetailID: "",
        //                                 ReceiptBookNo: res[j].CompareDetail[i].CompareDetailReceipt[k].ReceiptBookNo,
        //                                 ReceiptNo: res[j].CompareDetail[i].CompareDetailReceipt[k].ReceiptNo,
        //                                 RevenueStatus: "0",
        //                                 RevenueID: "",
        //                                 CompareReceiptID: res[j].CompareDetail[i].CompareDetailReceipt[k].CompareReceiptID,
        //                                 CompareCode: res[j].CompareCode,
        //                                 LawBreaker: "นายธวัชชัย1 บิงขุนทด",
        //                                 StaffReceip: "น.ส.แพรทิพย์1 โครตแสนลี",
        //                                 PaymentDate: toLocalShort(res[j].CompareDetail[i].CompareDetailReceipt[k].PaymentDate),
        //                                 TotalFine: +`${res[j].CompareDetail[i].CompareDetailReceipt[k] == null ? 0 : res[j].CompareDetail[i].CompareDetailReceipt[k].TotalFine}`,
        //                                 BribeMoney: +`${res[j].CompareDetail[i].BribeMoney == null ? 0 : res[0].CompareDetail[i].BribeMoney}`,
        //                                 TreasuryMoney: +`${res[j].CompareDetail[i].TreasuryMoney == null ? 0 : res[0].CompareDetail[i].TreasuryMoney}`,
        //                                 RewardMoney: +`${res[j].CompareDetail[i].RewardMoney == null ? 0 : res[0].CompareDetail[i].RewardMoney}`,
        //                                 IsCheck: false
        //                             }

        //                             this.ListRevenueDetail.push(this.oRevenueDetail);
        //                         }
        //                     }
        //                 }
        //             }

        //         }
        //     }
        // }, (err: HttpErrorResponse) => {
        //     alert(err.message);
        // });
    }


    CreateObject() {
        this.oRevenue = {
            RevenueID: "",
            RevenueCode: "",
            RevenueNo: "",
            RevenueDate: "",
            StationCode: "",
            StationName: "",
            InformTo: "",
            ISACTIVE: 1,
            RevenueOneStaff: [],
            RevenueDetail: [],
            RevenueStaff: []
        }
    }

    ClearStaffSendData() {
        this.txtPosSend_Value = "";
        this.txtDeptSend_Value = "";

        this.oRevenueSendStaff = {
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            StaffID: this.StaffSendID,
            RevenueID: this.revenueID,
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
            ContributorCode: "20",
            IsActive: "1"
        }
    }

    ClearStaffData() {
        this.txtPosStaff_Value = "";
        this.txtDeptStaff_Value = "";

        this.oRevenueStaff = {
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            StaffID: this.StaffID,
            RevenueID: this.revenueID,
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
            ContributorCode: "34",
            IsActive: "1"
        }
    }

    

    

    RevenueSummary() {
        let CompareFine: number = 0, BribeMoney: number = 0, RewardMoney: number = 0, TreasuryMoney: number = 0;

        let tmp = [];

        this.revenueCmpList.filter(item => item.IsCheck === true)
            .map(async item => {

                //alert(parseFloat(  item.TreasuryMoney.toString().replace(',','') ));

                BribeMoney += parseFloat(  item.BribeMoney.toString().replace(',','') );
                RewardMoney += parseFloat(  item.RewardMoney.toString().replace(',','') );
                TreasuryMoney += parseFloat(  item.TreasuryMoney.toString().replace(',','') );

                if(!tmp.includes(item.CompareCode)) {
                    tmp.push(item.CompareCode);
                }
            });

        this.txtMistreatNo_Value = tmp.length;
        this.txtCompareFine_Value = (BribeMoney + RewardMoney + TreasuryMoney).toLocaleString(undefined, {minimumFractionDigits: 2});
        
        this.txtBribeMoney_Value = BribeMoney.toLocaleString(undefined, {minimumFractionDigits: 2});
        this.txtRewardMoney_Value = RewardMoney.toLocaleString(undefined, {minimumFractionDigits: 2});
        this.txtTreasuryMoney_Value = TreasuryMoney.toLocaleString(undefined, {minimumFractionDigits: 2});
    }

    

    CheckCompareReceive()
    {
        this.ListChK = [];

        for (var i = 0; i < this.ListRevenueDetailPaging.length; i += 1) {
            if(this.ListRevenueDetailPaging[i].IsCheck){
                this.ListChK.push(true);
            }
            else{
                this.ListChK.push(false);
            }
        }
    }

    async onInsRevenue() {
        this.preloader.setShowPreloader(true);

        let DRate, cDateRevenue;
        DRate = this.txtRevenueDate_Value.date;

        if (DRate != undefined) {
            cDateRevenue = DRate.year + '-' + DRate.month + '-' + DRate.day + ' ' + this.txtRevenueTime_Value;
        }
        this.oRevenue.RevenueID = "";
        this.oRevenue.RevenueNo = this.txtRevenueNo_Value;
        this.oRevenue.RevenueDate = "2017-12-29T22:00:00.0";
        this.oRevenue.RevenueCode = this.txtRevenueCode_Value;
        this.oRevenue.InformTo = this.txtInformTo_Value;

        this.oRevenue.RevenueStaff = [];

        if (this.oRevenueSendStaff != null && this.oRevenueSendStaff != undefined) {
            this.oRevenue.RevenueStaff.push(this.oRevenueSendStaff);
        }

        if (this.oRevenueStaff != null && this.oRevenueStaff != undefined) {
            this.oRevenue.RevenueStaff.push(this.oRevenueStaff);
        }

        //this.oRevenue.RevenueDetail = this.ListRevenueDetailPaging.filter(item => item.IsCheck === true);

        //RevenueCompareDetailReceiptupdByCon
        

        this.oRevenue.RevenueDetail = [];
        

        debugger

        for (var i = 0; i < this.revenueCmpList.length; i += 1) {
            if(this.revenueCmpList[i].IsCheck){
                await this.IncService.RevenueCompareDetailReceiptupdByCon(this.revenueCmpList[i].CompareReceiptID);//.then(async item => {

                //     // debugger
        
        
                //     // if (!item.IsSuccess) {
                //     //     isSuccess = item.IsSuccess;
                //     // }
                // }, (error) => { isSuccess = false; console.error(error); return false; });

                //let o = {ReceiptBookNo:"1",ReceiptNo:"2",RevenueStatus:"3",CompareReceiptID:"4"};

                console.log(this.revenueCmpList[i].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].ReceiptBookNo);

                debugger

                let aaa: RevenueDetail = new RevenueDetail;
                aaa.ReceiptBookNo=this.revenueCmpList[i].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].ReceiptBookNo;
                aaa.ReceiptNo=this.revenueCmpList[i].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].ReceiptNo;
                aaa.RevenueStatus=this.revenueCmpList[i].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].RevenueStatus;
                aaa.CompareReceiptID=this.revenueCmpList[i].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].CompareReceiptID;

                
                

                this.oRevenue.RevenueDetail.push(aaa);

            }
            
        }

        let isSuccess: boolean = true;
        await this.IncService.RevenueinsAll(this.oRevenue).then(async item => {
            if (!item.IsSuccess) {
                isSuccess = item.IsSuccess;
            }
        }, (error) => { isSuccess = false; console.error(error); return false; });

        

        this.preloader.setShowPreloader(false);

        if (isSuccess) {
            alert(Message.saveComplete);
            // this.oProve = {};
            // this.router.navigate(['/prove/list']);
        } else {
            alert(Message.saveFail);

            if (!isSuccess) return false;
        }
    }

    async onUdpRevenue() {
        this.preloader.setShowPreloader(true);

        let DRate, cDateRevenue;
        DRate = this.txtRevenueDate_Value.date;

        if (DRate != undefined) {
            cDateRevenue = DRate.year + '-' + DRate.month + '-' + DRate.day + ' ' + this.txtRevenueTime_Value;
        }

        this.oRevenue.RevenueDate = cDateRevenue;
        this.oRevenue.RevenueCode = this.txtRevenueCode_Value;
        this.oRevenue.InformTo = this.txtInformTo_Value;

        this.oRevenue.RevenueStaff = [];

        if (this.oRevenueSendStaff != null && this.oRevenueSendStaff != undefined) {
            this.oRevenue.RevenueStaff.push(this.oRevenueSendStaff);
        }

        if (this.oRevenueStaff != null && this.oRevenueStaff != undefined) {
            this.oRevenue.RevenueStaff.push(this.oRevenueStaff);
        }

        this.oRevenue.RevenueDetail = this.ListRevenueDetail.filter(item => item.IsCheck === true);
        debugger

        let isSuccess: boolean = true;
        await this.IncService.RevenueUdp(this.oRevenue).then(async item => {
            if (!item.IsSuccess) {
                isSuccess = item.IsSuccess;
            }
        }, (error) => { isSuccess = false; console.error(error); return false; });

        this.preloader.setShowPreloader(false);

        if (isSuccess) {
            alert(Message.saveComplete);
            this.onComplete();
            this.navService.setOnSave(false);
        } else {
            alert(Message.saveFail);

            return false;
        }
    }

    onDelete(){
        if(confirm("ยืนยันการทำรายการหรือไม่")){
            this.preloader.setShowPreloader(true);
            this.IncService.RevenueupdDelete(this.revenueID).then(async res => {

                this.revenueCmpList.filter(item => item.IsCheck === true)
                    .map(async item => {

                        await this.IncService.RevenueCompareDetailReceiptupdDelete(item.CompareReceiptID);
                });
                alert("ลบข้อมูลสำเร็จ");
                this.router.navigate(['/income/list']);
            });
            
        }
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

    async pageChanges(event) {
        this.ListRevenueDetailPaging = await this.ListRevenueDetail.slice(event.startIndex - 1, event.endIndex);
        this.CheckCompareReceive();
    }

    getCurrentDate() {
        let date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toISOString().substring(0, 10);
    }

    getCurrentTime() {
        let date = new Date();

        let tmp = "000"+date.getHours();
        let tmp2 = "000"+date.getMinutes();

        // 
        return tmp.substring(tmp.length-2) + ":" + tmp2.substring(tmp2.length-2);
    }

    private active_Route() {
        this.sub = this.activeRoute.params.subscribe(p => {
            this.mode = p['mode'];
            if (p['mode'] === 'C') {
                // set false
                this.navService.setPrintButton(false);
                this.navService.setEditButton(false);
                this.navService.setDeleteButton(false);
                this.navService.setEditField(false);
                // set true
                this.navService.setSaveButton(true);
                this.navService.setCancelButton(true);

                this.txtRevenueCode_Value = `LC-${(new Date).getTime()}`;
            } else if (p['mode'] === 'R') {
                // set false
                this.navService.setSaveButton(false);
                this.navService.setCancelButton(false);
                // set true
                this.navService.setPrintButton(true);
                this.navService.setEditButton(true);
                this.navService.setDeleteButton(true);
                this.navService.setEditField(true);

                if (p['code']) {
                    this.revenueID = atob(p['code']);
                }
            }
        });
    }

    private navigate_Service() {
        this.sub = this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p;
        });

        this.sub = this.navService.onSave.subscribe(async status => {
            if (status) {
                // set action save = false
                await this.navService.setOnSave(false);

                if (this.txtRevenueNo_Value == "" || this.txtRevenueStation_Value == "" || this.txtRevenueStation_Value == undefined
                    || this.txtStaffSendName_Value == "" || this.txtStaffSendName_Value == undefined
                    || this.txtStaffName_Value == "" || this.txtStaffName_Value == undefined
                    || this.txtRevenueDate_Value == null) {
                    this.isRequired = true;
                    alert(Message.checkData);

                    return false;
                }

                if (this.mode == 'C') {
                    await this.onInsRevenue();
                    this.router.navigate(['/income/list']);
                } else {
                    await this.onUdpRevenue();
                }
            }
        });

        this.sub = this.navService.onDelete.subscribe(async status => {
            if (status) {
                await this.navService.setOnDelete(false);
                this.onDelete();
            }
        });

        // this.sub = this.navService.onPrint.subscribe(async status => {
        //     if (status) {
        //         await this.navService.setOnPrint(false);
        //         this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
        //     }
        // })

        this.sub = this.navService.onCancel.subscribe(async status => {
            if (status) {
                if (confirm(Message.confirmAction)) {
                    await this.navService.setOnCancel(false);
                    this.router.navigate(['/income/list']);
                }
            }
        })
    }

    //#endregion

}
