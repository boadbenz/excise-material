import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { IncomeService } from '../income.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Revenue } from '../Revenue';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import * as formatDate from '../../../config/dateFormat';
import { Message } from '../../../config/message';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Staff } from '../staff';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { MatAutocomplete } from '@angular/material';
import { del } from '../../../../../node_modules/@types/selenium-webdriver/http';
import { toLocalShort, compareDate, setZeroHours } from '../../../config/dateFormat';
import { IMyDateModel, IMyOptions } from 'mydatepicker-th';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit, OnDestroy {

    private sub: any;
    mode: string;
    modal: any;
    RevenueCode: string;
    isCheckAll: any;
    StaffSendName: string;
    StaffName: string;
    // rawOptions = [];
    // options = [];

    // --------
    showEditField: any;

    revenueID: string;
    StaffSendID: string;    // รหัสผู้นำส่ง
    PosSend: string;        // ตำแหน่งผู้นำส่ง
    DeptSend: string;       // แผนกผู้นำส่ง
    StaffID: string;        // รหัสผู้จัดทำ
    PosStaff: string;        // ตำแหน่งผู้จัดทำ
    DeptStaff: string;       // แผนกผู้จัดทำ
    RevenueStation: string;   // เขียนที่
    CompareFine: number;      // ยอดนำส่งรวม
    MistreatNo: number;     // จำนวนคดี
    BribeMoney: number;     // เงินสินบนรวม
    RewardMoney: number;    // เงินรางวัลรวม
    TreasuryMoney: number;  // เงินส่งคลัง


    StaffSendoptions = [];
    rawStaffSendOptions = [];
    Staffoptions = [];
    rawOptions = [];
    options = [];


    oRevenue: Revenue;
    oRevenueSendStaff: Staff;
    oRevenueStaff: Staff;


    // ----- Model ------ //
    @ViewChild('printDocModal') printDocModel: ElementRef;

    constructor(
        private activeRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private ngbModel: NgbModal,
        private navService: NavigationService,
        private IncService: IncomeService,
        private preloader: PreloaderService
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
        await this.CreateObject();

        // await this.getReveneueStaff();
        // await this.getStation();
        this.ShowRevenueCompare();

        this.preloader.setShowPreloader(false);
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
                    // this.arrestCode = p['code'];
                    // this.getByCon(p['code']);
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

                // if (this.ReportNo == "" || this.ProveStaffName == "" || this.ScienceStaffName == "" 
                //     || this.ProveStation == "" || this.ProveDate == null || this.DeliveryDate == null) {
                //     this.isRequired = true;
                //     alert(Message.checkData);

                //     // this.showEditField = false;

                //     return false;
                // }

                if (this.mode == 'C') {
                    await this.onInsRevenue();
                    // this.router.navigate(['/prove/list']);
                } else {
                    // await this.onUpdProve();
                    // await this.onComplete();
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
    }

    ShowRevenueCompare() {
        this.IncService.RevenueComparegetByCon("3").then(async res => {
            if (res) {
                debugger
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

    async onInsRevenue() {
        this.preloader.setShowPreloader(true);

        this.oRevenue.RevenueStaff = [];

        if (this.oRevenueSendStaff != null && this.oRevenueSendStaff != undefined) {
            this.oRevenue.RevenueStaff.push(this.oRevenueSendStaff);
        }

        if (this.oRevenueStaff != null && this.oRevenueStaff != undefined) {
            this.oRevenue.RevenueStaff.push(this.oRevenueStaff);
        }

        let isSuccess: boolean = true;

        await this.IncService.RevenueinsAll(this.oRevenue).then(async IsSuccess => {
            if (!IsSuccess) {
                isSuccess = IsSuccess;
                return false;
            }
        }, (error) => { isSuccess = false; console.error(error); return false; });

        if (!isSuccess) return false;

        if (isSuccess) {
            alert(Message.saveComplete);
            // this.oProve = {};
            // this.router.navigate(['/prove/list']);
        } else {
            alert(Message.saveFail);
        }

        this.preloader.setShowPreloader(false);

    }


    // ----- ผู้นำส่ง ---
    async getReveneueStaff() {
        await this.IncService.StaffgetByKeyword("").then(async res => {
            if (res) {
                this.rawStaffSendOptions = res;
            }
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
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
    // ----- End ผู้นำส่ง ---


    // ----- ผู้จัดทำ ---
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
    // ----- End ผู้นำส่ง ---


    // --- เขียนที่ ---
    async getStation() {
        // this.preloader.setShowPreloader(true);
        await this.IncService.getDepartment("").then(async res => {
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
    // ----- End เขียนที่ ---
}
