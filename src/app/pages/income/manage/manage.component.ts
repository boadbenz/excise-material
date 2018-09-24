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
    
    private sub: any;
    mode: string;
    modal: any;
    isCheckAll: any;
    // rawOptions = [];
    // options = [];

    // --------
    showEditField: any;
    selectAllChb: any;
    paginage = pagination;

    revenueID: string;
    RevenueCode: string;    // เลขที่นำส่งเงิน
    RevenueNo: string;  // เลขที่หนังสือนำส่ง
    InformTo: string;       // เรียน
    StaffSendID: string;    // รหัสผู้นำส่ง
    StaffSendName: string;  // ชื่อผู้นำส่ง
    PosSend: string;        // ตำแหน่งผู้นำส่ง
    DeptSend: string;       // แผนกผู้นำส่ง
    StaffID: string;        // รหัสผู้จัดทำ
    StaffName: string;      // ชื่อผู้จัดทำ
    PosStaff: string;        // ตำแหน่งผู้จัดทำ
    DeptStaff: string;       // แผนกผู้จัดทำ
    RevenueStation: string;   // เขียนที่
    CompareFine: string = "0";      // ยอดนำส่งรวม
    MistreatNo: number = 0;     // จำนวนคดี
    BribeMoney: string = "0";     // เงินสินบนรวม
    RewardMoney: string = "0";    // เงินรางวัลรวม
    TreasuryMoney: string = "0";  // เงินส่งคลัง
    RevenueDate: any;       // วันที่นำส่ง
    RevenueTime: string;    // เวลาที่นำส่ง
    RevenueStatus: number;  // สถานะนำส่ง



    StaffSendoptions = [];
    rawStaffSendOptions = [];
    Staffoptions = [];
    rawOptions = [];
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

        this.RevenueStatus = 0;
        this.RevenueNo = "";
        this.RevenueStation == "";
        this.StaffSendName == "";
        this.StaffName == "";
        this.InformTo = "";
        this.RevenueTime = await this.getCurrentTime();
        this.RevenueDate = setDateMyDatepicker(new Date(this.getCurrentDate()));

        await this.CreateObject();
        await this.getReveneueStaff();
        await this.getStation();
        await this.ShowRevenueCompare();

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

    async onInsRevenue() {
        this.preloader.setShowPreloader(true);

        let DRate, cDateRevenue;
        DRate = this.RevenueDate.date;

        if (DRate != undefined) {
            cDateRevenue = DRate.year + '-' + DRate.month + '-' + DRate.day + ' ' + this.RevenueTime;
        }
        this.oRevenue.RevenueID = "";
        this.oRevenue.RevenueNo = this.RevenueNo;
        this.oRevenue.RevenueDate = cDateRevenue;
        this.oRevenue.RevenueCode = this.RevenueCode;
        this.oRevenue.InformTo = this.InformTo;

        this.oRevenue.RevenueStaff = [];

        if (this.oRevenueSendStaff != null && this.oRevenueSendStaff != undefined) {
            this.oRevenue.RevenueStaff.push(this.oRevenueSendStaff);
        }

        if (this.oRevenueStaff != null && this.oRevenueStaff != undefined) {
            this.oRevenue.RevenueStaff.push(this.oRevenueStaff);
        }

        this.oRevenue.RevenueDetail = this.ListRevenueDetailPaging.filter(item => item.IsCheck === true);
        debugger

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
        DRate = this.RevenueDate.date;

        if (DRate != undefined) {
            cDateRevenue = DRate.year + '-' + DRate.month + '-' + DRate.day + ' ' + this.RevenueTime;
        }

        this.oRevenue.RevenueDate = cDateRevenue;
        this.oRevenue.RevenueCode = this.RevenueCode;
        this.oRevenue.InformTo = this.InformTo;

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

    StaffSendonAutoChange(value: string) {
        if (value == '') {
            this.StaffSendoptions = [];
            this.ClearStaffSendData();
        } else {
            if (this.rawStaffSendOptions.length == 0) {
                this.getReveneueStaff();
            }

            this.StaffSendoptions = this.rawStaffSendOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    StaffSendonAutoFocus(value: string) {
        if (value == '') {
            this.StaffSendoptions = [];
            this.ClearStaffSendData();
        }
    }

    StaffSendonAutoSelecteWord(event) {
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
            ContributorCode: "20",
            IsActive: "1"
        }

        this.PosSend = event.PosLevelName;
        this.DeptSend = event.OperationDeptName;
    }

    StaffonAutoChange(value: string) {
        if (value == '') {
            this.Staffoptions = [];
            this.ClearStaffData();
        } else {
            if (this.rawStaffSendOptions.length == 0) {
                this.getReveneueStaff();
            }
            debugger
            this.Staffoptions = this.rawStaffSendOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    StaffonAutoFocus(value: string) {
        if (value == '') {
            this.Staffoptions = [];
            this.ClearStaffData();
        }
    }

    StaffonAutoSelecteWord(event) {
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
            ContributorCode: "34",
            IsActive: "1"
        }

        this.PosStaff = event.PosLevelName;
        this.DeptStaff = event.OperationDeptName;
    }

    onAutoChange(value: string) {
        // 
        if (value == '') {
            this.options = [];

            this.oRevenue.StationCode = "";
            this.oRevenue.StationName = "";
        } else {
            this.options = this.rawOptions.filter(f => f.DepartmentNameTH.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    onAutoFocus(value: string) {
        if (value == '') {
            this.options = [];
        }
    }

    onAutoSelecteWord(event) {
        this.oRevenue.StationCode = event.DepartmentCode;
        this.oRevenue.StationName = event.DepartmentNameTH;
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

    //#endregion

    //#region "Getters"

    async getReveneueStaff() {
        await this.IncService.StaffgetByKeyword().then(async res => {
            if (res) {
                this.rawStaffSendOptions = res;
            }
        }, (err: HttpErrorResponse) => {
            alert(err.message);
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

    getCurrentDate() {
        let date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toISOString().substring(0, 10);
    }

    getCurrentTime() {
        let date = new Date();
        // 
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
    }

    //#endregion

    //#region "Others"

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

                this.RevenueCode = `LC-${(new Date).getTime()}`;
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
                    this.RevenueCode = p['code'];
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

                if (this.RevenueNo == "" || this.RevenueStation == "" || this.RevenueStation == undefined
                    || this.StaffSendName == "" || this.StaffSendName == undefined
                    || this.StaffName == "" || this.StaffName == undefined
                    || this.RevenueDate == null) {
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

        // this.sub = this.navService.onDelete.subscribe(async status => {
        //     if (status) {
        //         await this.navService.setOnDelete(false);
        //         this.onDelete();
        //     }
        // });

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

    

    ShowRevenue() {
        this.IncService.getByCon(this.RevenueCode).then(async res => {
            if (res != null) {
                // if (res[0].RevenueDetail.length > 0) {
                //     this.ReceiptBookNo = res[0].RevenueDetail[0].ReceiptBookNo;
                // }
                // else {
                //     this.ReceiptBookNo = "";
                // }

                this.oRevenue.RevenueID = res[0].RevenueID;
                this.oRevenue.StationCode = res[0].StationCode;
                this.RevenueStation = res[0].StationName;
                this.RevenueNo = res[0].RevenueNo;
                this.InformTo = res[0].InformTo;

                var RDate = res[0].RevenueDate.toString().split(" ");
                this.RevenueDate = setDateMyDatepicker(new Date(RDate[0]));
                this.RevenueTime = RDate[1] + ".000";

                var SStaff = res[0].RevenueStaff.filter(f => f.ContributorCode == "20");
                if (SStaff.length > 0) {
                    this.StaffSendName = SStaff[0].TitleName + SStaff[0].FirstName + ' ' + SStaff[0].LastName;
                    this.PosSend = SStaff[0].PositionName;
                    this.DeptSend = SStaff[0].DepartmentName;
                    this.StaffSendID = SStaff[0].StaffID;
                    this.oRevenueSendStaff = SStaff[0];
                }

                var Staff = res[0].RevenueStaff.filter(f => f.ContributorCode == "34");
                if (Staff.length) {
                    this.StaffName = Staff[0].TitleName + Staff[0].FirstName + ' ' + Staff[0].LastName;
                    this.PosStaff = Staff[0].PositionName;
                    this.DeptStaff = Staff[0].DepartmentName;
                    this.StaffID = Staff[0].StaffID;
                    this.oRevenueStaff = Staff[0];
                }

                if (res[0].RevenueDetail.length > 0) {
                    for (var i = 0; i < this.ListRevenueDetail.length; i += 1) {
                        for (var j = 0; j < res[0].RevenueDetail.length; j += 1) {
                            if (this.ListRevenueDetail[i].CompareReceiptID == res[0].RevenueDetail[j].CompareReceiptID) {
                                this.ListRevenueDetail[i].RevenueID = res[0].RevenueID;
                                this.ListRevenueDetail[i].RevenueDetailID = res[0].RevenueDetail[j].RevenueDetailID;
                                this.ListRevenueDetail[i].IsCheck = true;
                            }
                        }
                    }

                    this.checkIfAllChbSelected();
                }
            }
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }

    async ShowRevenueCompare() {
        await this.IncService.RevenueComparegetByCon().then(async res => {
            debugger
            if (res.length > 0) {
                for (var j = 0; j < res.length; j += 1) {
                    if (res[j].CompareDetail.length > 0) {
                        for (var i = 0; i < res[j].CompareDetail.length; i += 1) {
                            if (res[j].CompareDetail[i].CompareDetailReceipt.length > 0) {
                                for (var k = 0; k < res[j].CompareDetail[i].CompareDetailReceipt.length; k += 1) {
                                    this.oRevenueDetail = {
                                        RevenueDetailID: "",
                                        ReceiptBookNo: res[j].CompareDetail[i].CompareDetailReceipt[k].ReceiptBookNo,
                                        ReceiptNo: res[j].CompareDetail[i].CompareDetailReceipt[k].ReceiptNo,
                                        RevenueStatus: "0",
                                        RevenueID: "",
                                        CompareReceiptID: res[j].CompareDetail[i].CompareDetailReceipt[k].CompareReceiptID,
                                        CompareCode: res[j].CompareCode,
                                        LawBreaker: "นายธวัชชัย1 บิงขุนทด",
                                        StaffReceip: "น.ส.แพรทิพย์1 โครตแสนลี",
                                        PaymentDate: toLocalShort(res[j].CompareDetail[i].CompareDetailReceipt[k].PaymentDate),
                                        TotalFine: +`${res[j].CompareDetail[i].CompareDetailReceipt[k] == null ? 0 : res[j].CompareDetail[i].CompareDetailReceipt[k].TotalFine}`,
                                        BribeMoney: +`${res[j].CompareDetail[i].BribeMoney == null ? 0 : res[0].CompareDetail[i].BribeMoney}`,
                                        TreasuryMoney: +`${res[j].CompareDetail[i].TreasuryMoney == null ? 0 : res[0].CompareDetail[i].TreasuryMoney}`,
                                        RewardMoney: +`${res[j].CompareDetail[i].RewardMoney == null ? 0 : res[0].CompareDetail[i].RewardMoney}`,
                                        IsCheck: false
                                    }

                                    this.ListRevenueDetail.push(this.oRevenueDetail);
                                }
                            }
                        }
                    }

                }
            }
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
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
        this.PosSend = "";
        this.DeptSend = "";

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
        this.PosStaff = "";
        this.DeptStaff = "";

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

    selectedChkAll() {
        for (var i = 0; i < this.ListRevenueDetail.length; i++) {
            this.ListRevenueDetail[i].IsCheck = this.selectAllChb;
        }

        this.RevenueSummary();
    }

    checkIfAllChbSelected() {
        this.selectAllChb = this.ListRevenueDetail.every(function (item: any) {
            return item.IsCheck == true;
        });

        this.RevenueSummary();
    }

    RevenueSummary() {
        let CompareFine: number = 0, BribeMoney: number = 0, RewardMoney: number = 0, TreasuryMoney: number = 0;
        this.ListRevenueDetail.filter(item => item.IsCheck === true)
            .map(async item => {
                BribeMoney += +item.BribeMoney;
                RewardMoney += +item.RewardMoney;
                TreasuryMoney += +item.TreasuryMoney;
            });

        this.MistreatNo = this.ListRevenueDetail.length;
        this.CompareFine = (BribeMoney + RewardMoney + TreasuryMoney).toLocaleString("en");
        this.BribeMoney = BribeMoney.toLocaleString("en");
        this.RewardMoney = RewardMoney.toLocaleString("en");
        this.TreasuryMoney = TreasuryMoney.toLocaleString("en");
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

    //#endregion

}
