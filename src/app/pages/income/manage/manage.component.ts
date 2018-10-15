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

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit, OnDestroy {
    private sub: any;
    private onSaveSubscribe: any;
    private onEditSubscribe: any;
    private onDeleSubscribe: any;
    private onPrintSubscribe: any;
    private onNextPageSubscribe: any;
    private onCancelSubscribe: any;

    mode: string;
    modal: any;
    showEditField: any;
    selectAllChb: any;
    paginage = pagination;

    RevenueID: string;
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
    StaffDeptCode: string;   // รหัสแผนกผู้จัดทำ
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
    InformTooptions = [];
    options = [];
    ListRevenueDetail = [];
    ListRevenueDetailPaging = [];
    ListChK = [];
    RevenueDetailForUDP = [];

    oRevenue: Revenue;
    oRevenueDetail: RevenueDetail;
    oRevenueSendStaff: Staff;
    oRevenueStaff: Staff;

    isRequired: boolean | false;


    // ----- Model ------ //
    @ViewChild('printDocModal') printDocModel: ElementRef;

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

        this.RevenueStatus = 1;
        this.RevenueNo = "";
        this.RevenueStation == "";
        this.StaffSendName == "";
        this.StaffName == "";
        this.InformTo = "";
        this.StaffID = "";
        this.StaffSendID = "";
        this.RevenueTime = this.getCurrentTime();
        this.RevenueDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        this.RevenueCode = "Auto Generate";

        await this.CreateObject();
        await this.getReveneueStaff();
        await this.getStation();

        if (this.mode === 'R') {
            await this.ShowRevenue();
        } else {
            this.preloader.setShowPreloader(false);
        }

        this.paginage.TotalItems = this.ListRevenueDetail.length;
        this.ListRevenueDetailPaging = this.ListRevenueDetail.slice(0, this.paginage.RowsPerPageOptions[0]);

        this.CheckCompareReceive();

    }

    private active_Route() {
        this.sub = this.activeRoute.params.subscribe(p => {
            this.mode = p['mode'];
            //alert(this.mode);
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
                    this.RevenueID = p['code'];
                }
            }
        });
    }

    private navigate_Service() {
        
        this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p;
        });

        this.onEditSubscribe = this.navService.onEdit.subscribe(async status => {
            if (this.RevenueStatus == 2) {
                alert("ไม่สามารถแก้ไขรายการได้");
    
                this.navService.setSaveButton(false);
                this.navService.setCancelButton(false);
                // set true
                this.navService.setPrintButton(true);
                this.navService.setEditButton(true);
                this.navService.setDeleteButton(true);
                this.navService.setEditField(true);
            }
        });

        this.onSaveSubscribe = this.navService.onSave.subscribe(async status => {
            //alert(status);
            if (status) {
                debugger
                // set action save = false
                await this.navService.setOnSave(false);

                if (this.RevenueNo == "" || this.RevenueStation == "" || this.RevenueStation == undefined
                    || this.StaffSendName == "" || this.StaffSendName == undefined
                    || this.StaffName == "" || this.StaffName == undefined
                    || this.PosSend == "" || this.PosSend == undefined
                    || this.DeptSend == "" || this.DeptSend == undefined
                    || this.PosStaff == "" || this.PosStaff == undefined
                    || this.DeptStaff == "" || this.DeptStaff == undefined
                    || this.RevenueDate == null) {
                    this.isRequired = true;
                    alert(Message.checkData);

                    return false;
                }

                if (+this.MistreatNo < 1) {
                    alert("กรุณำเลือกรายการที่ต้องการนำส่งเงิน");

                    return false;
                }

                if (this.mode === 'C') {
                    //alert("mode C");
                    await this.onInsRevenue();
                } else if (this.mode === 'R') {
                    //alert("mode U");
                    await this.onUdpRevenue();
                }
            }
        });

        this.onDeleSubscribe = this.navService.onDelete.subscribe(async status => {
            if (status) {
                await this.navService.setOnDelete(false);
                this.onDelete();
            }
        });

        this.onPrintSubscribe = this.navService.onPrint.subscribe(async status => {
            if (status) {
                await this.navService.setOnPrint(false);
                this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
            }
        })

        this.onCancelSubscribe = this.navService.onCancel.subscribe(async status => {
            if (status) {
                this.navService.setOnCancel(false);

                if (confirm(Message.confirmAction)) {
                    if (this.mode === 'C') {
                        this.router.navigate(['/income/list']);
                    } else if (this.mode === 'R') {
                        // set false
                        this.navService.setSaveButton(false);
                        this.navService.setCancelButton(false);
                        // set true
                        this.navService.setPrintButton(true);
                        this.navService.setEditButton(true);
                        this.navService.setDeleteButton(true);
                        this.navService.setEditField(true);

                        await this.ShowRevenue();
                    }
                }
                else {
                    this.navService.setSaveButton(true);
                    this.navService.setCancelButton(true);

                    this.navService.setPrintButton(false);
                    this.navService.setEditButton(false);
                    this.navService.setDeleteButton(false);
                    this.navService.setEditField(false);
                }
            }
        })
    }

    ngOnDestroy(): void {
        this.onCancelSubscribe.unsubscribe();
        this.onEditSubscribe.unsubscribe();
        this.onSaveSubscribe.unsubscribe();
        this.onDeleSubscribe.unsubscribe();
        this.onPrintSubscribe.unsubscribe();
    }

    onDelete() {
        if (this.RevenueStatus == 1) {
            if (confirm(Message.confirmAction)) {
                this.IncService.RevenueupdDelete(this.RevenueID).then(async IsSuccess => {
                    if (IsSuccess) {
                        this.ListRevenueDetail.filter(item => (item.IsCheck === true))
                            .map(async item => {
                                await this.IncService.RevenueCompareDetailReceiptupdDelete(item.CompareReceiptID.toString()).then(async item => {
                                    if (IsSuccess) {
                                        this.oRevenue = {};
                                        alert(Message.saveComplete);
                                        this.router.navigate(['/income/list']);
                                    }
                                }, (error) => { console.error(error); return false; });
                            });
                    } else {
                        alert(Message.saveFail);
                    }
                }, (error) => { console.error(error); return false; });
            }
        }
        else if (this.RevenueStatus == 2) {
            alert(Message.cannotDelete);
        }

    }

    ShowRevenue() {
        this.IncService.getByCon(this.RevenueID).then(async res => {
            if (res != null) {
                // if (res[0].RevenueDetail.length > 0) {
                //     this.ReceiptBookNo = res[0].RevenueDetail[0].ReceiptBookNo;
                // }
                // else {
                //     this.ReceiptBookNo = "";
                // }

                this.oRevenue.RevenueID = res[0].RevenueID;
                this.oRevenue.RevenueCode = res[0].RevenueCode;
                this.oRevenue.StationCode = res[0].StationCode;
                this.oRevenue.StationName = res[0].StationName;

                this.RevenueCode = res[0].RevenueCode;
                this.RevenueStation = res[0].StationName;
                this.RevenueNo = res[0].RevenueNo;
                this.InformTo = res[0].InformTo;
                this.RevenueStatus = res[0].RevenueStatus;

                var RDate = res[0].RevenueDate.toString().split(" ");
                this.RevenueDate = setDateMyDatepicker(new Date(RDate[0]));
                this.RevenueTime = res[0].RevenueTime;

                var SStaff = res[0].RevenueStaff.filter(f => f.ContributorID == "20");
                if (SStaff.length > 0) {
                    this.StaffSendName = SStaff[0].TitleName + SStaff[0].FirstName + ' ' + SStaff[0].LastName;
                    this.PosSend = SStaff[0].PositionName;
                    this.DeptSend = SStaff[0].OfficeName;
                    this.StaffSendID = SStaff[0].StaffID;
                    this.oRevenueSendStaff = SStaff[0];
                }

                var Staff = res[0].RevenueStaff.filter(f => f.ContributorID == "36");
                if (Staff.length) {
                    this.StaffName = Staff[0].TitleName + Staff[0].FirstName + ' ' + Staff[0].LastName;
                    this.PosStaff = Staff[0].PositionName;
                    this.DeptStaff = Staff[0].OfficeName;
                    this.StaffID = Staff[0].StaffID;
                    this.StaffDeptCode = Staff[0].OfficeCode;
                    this.oRevenueStaff = Staff[0];
                }

                await this.ShowRevenueCompare();

                debugger
                if (res[0].RevenueDetail.length > 0) {
                    for (var a = 0; a < res[0].RevenueDetail.length; a += 1) {
                        await this.IncService.RevenueComparegetByCompareReceiptID(res[0].RevenueDetail[a].CompareReceiptID).then(async item => {
                            if (item.length > 0) {
                                for (var j = 0; j < item.length; j += 1) {
                                    if (item[j].RevenueCompareDetail.length > 0) {
                                        for (var i = 0; i < item[j].RevenueCompareDetail.length; i += 1) {
                                            try {
                                                if (item[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt.length > 0) {
                                                    for (var k = 0; k < item[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt.length; k += 1) {
                                                        this.oRevenueDetail = {
                                                            RevenueDetailID: res[0].RevenueDetail[a].RevenueDetailID,
                                                            ReceiptBookNo: item[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].ReceiptBookNo,
                                                            ReceiptNo: item[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].ReceiptNo,
                                                            RevenueStatus: "1",
                                                            RevenueID: this.oRevenue.RevenueID,
                                                            CompareReceiptID: item[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].CompareReceiptID,
                                                            CompareID: item[j].CompareID,
                                                            CompareCode: item[j].CompareCode,
                                                            LawBreaker: item[j].RevenueCompareDetail[i].LawbreakerTitleName + item[j].RevenueCompareDetail[i].LawbreakerFirstName + " " + item[j].RevenueCompareDetail[i].LawbreakerLastName,
                                                            StaffReceip: item[j].RevenueCompareStaff[i].TitleName + item[j].RevenueCompareStaff[i].FirstName + " " + item[j].RevenueCompareStaff[i].LastName,
                                                            PaymentDate: toLocalShort(item[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].PaymentDate),
                                                            TotalFine: +`${item[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k] == null ? 0 : item[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].TotalFine}`,
                                                            BribeMoney: +`${item[j].RevenueCompareDetail[i].BribeMoney == null ? 0 : item[0].RevenueCompareDetail[i].BribeMoney}`,
                                                            TreasuryMoney: +`${item[j].RevenueCompareDetail[i].TreasuryMoney == null ? 0 : item[0].RevenueCompareDetail[i].TreasuryMoney}`,
                                                            RewardMoney: +`${item[j].RevenueCompareDetail[i].RewardMoney == null ? 0 : item[0].RevenueCompareDetail[i].RewardMoney}`,
                                                            IsCheck: true,
                                                            IsNewItem: false,
                                                            IsDelItem: false
                                                        }

                                                        this.ListRevenueDetail.push(this.oRevenueDetail);
                                                    }
                                                }
                                            } catch{ }
                                        }
                                    }

                                }
                            }

                            // set total record
                            this.paginage.TotalItems = this.ListRevenueDetail.length;
                            this.ListRevenueDetailPaging = this.ListRevenueDetail.slice(0, this.paginage.RowsPerPageOptions[0]);
                            this.preloader.setShowPreloader(false);
                        }, (err: HttpErrorResponse) => {
                            alert(err.message);
                        });
                    }

                    // set total record
                    this.paginage.TotalItems = this.ListRevenueDetail.length;
                    this.ListRevenueDetailPaging = this.ListRevenueDetail.slice(0, this.paginage.RowsPerPageOptions[0]);

                    this.checkIfAllChbSelected();
                }
            }
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }

    async ShowRevenueCompare() {
        this.ListRevenueDetail = [];

        let DRate, cDateRevenue;
        DRate = this.RevenueDate.date;

        if (DRate != undefined) {
            cDateRevenue = new Date(`${DRate.year}-${DRate.month}-${DRate.day}`);
        }

        await this.IncService.RevenueComparegetByCon(setZeroHours(cDateRevenue), this.StaffDeptCode).then(async res => {
            if (res.length > 0) {
                for (var j = 0; j < res.length; j += 1) {
                    if (res[j].RevenueCompareDetail.length > 0) {
                        for (var i = 0; i < res[j].RevenueCompareDetail.length; i += 1) {
                            try {
                                if (res[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt.length > 0) {
                                    for (var k = 0; k < res[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt.length; k += 1) {
                                        this.oRevenueDetail = {
                                            RevenueDetailID: "",
                                            ReceiptBookNo: res[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].ReceiptBookNo,
                                            ReceiptNo: res[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].ReceiptNo,
                                            RevenueStatus: "1",
                                            RevenueID: "",
                                            CompareReceiptID: res[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].CompareReceiptID,
                                            CompareID: res[j].CompareID,
                                            CompareCode: res[j].CompareCode,
                                            LawBreaker: res[j].RevenueCompareDetail[i].LawbreakerTitleName + res[j].RevenueCompareDetail[i].LawbreakerFirstName + " " + res[j].RevenueCompareDetail[i].LawbreakerLastName,
                                            StaffReceip: res[j].RevenueCompareStaff[i].TitleName + res[j].RevenueCompareStaff[i].FirstName + " " + res[j].RevenueCompareStaff[i].LastName,
                                            PaymentDate: toLocalShort(res[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].PaymentDate),
                                            TotalFine: +`${res[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k] == null ? 0 : res[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].TotalFine}`,
                                            BribeMoney: +`${res[j].RevenueCompareDetail[i].BribeMoney == null ? 0 : res[0].RevenueCompareDetail[i].BribeMoney}`,
                                            TreasuryMoney: +`${res[j].RevenueCompareDetail[i].TreasuryMoney == null ? 0 : res[0].RevenueCompareDetail[i].TreasuryMoney}`,
                                            RewardMoney: +`${res[j].RevenueCompareDetail[i].RewardMoney == null ? 0 : res[0].RevenueCompareDetail[i].RewardMoney}`,
                                            IsCheck: false,
                                            IsNewItem: true,
                                            IsDelItem: false
                                        }

                                        this.ListRevenueDetail.push(this.oRevenueDetail);
                                    }
                                }
                            } catch{ }
                        }
                    }

                }


            }

            // set total record
            this.paginage.TotalItems = this.ListRevenueDetail.length;
            this.ListRevenueDetailPaging = this.ListRevenueDetail.slice(0, this.paginage.RowsPerPageOptions[0]);

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
            RevenueOneStaff: "",
            RevenueDetail: [],
            RevenueStaff: []
        }
    }

    async onInsRevenue() {
        this.preloader.setShowPreloader(true);

        let DRate, cDateRevenue;
        DRate = this.RevenueDate.date;

        if (DRate != undefined) {
            cDateRevenue = new Date(`${DRate.year}-${DRate.month}-${DRate.day}`);
        }

        debugger
        this.oRevenue.RevenueID = "";
        this.oRevenue.RevenueNo = this.RevenueNo;
        this.oRevenue.RevenueDate = setZeroHours(cDateRevenue);
        this.oRevenue.RevenueTime = this.RevenueTime;
        this.oRevenue.InformTo = this.InformTo;
        this.oRevenue.RevenueStatus = this.RevenueStatus.toString();
        this.oRevenue.ResultCount = this.MistreatNo.toString();

        this.oRevenue.RevenueStaff = [];

        if (this.oRevenueSendStaff != null && this.oRevenueSendStaff != undefined) {
            this.oRevenue.RevenueStaff.push(this.oRevenueSendStaff);
        }

        if (this.oRevenueStaff != null && this.oRevenueStaff != undefined) {
            this.oRevenue.RevenueStaff.push(this.oRevenueStaff);
        }

        this.oRevenue.RevenueDetail = this.ListRevenueDetailPaging.filter(item => item.IsCheck === true);

        await this.IncService.TransactionRunninggetByCon("ops_revenue", this.StaffDeptCode).then(async item => {
            if (item.length == 0) {
                this.IncService.TransactionRunninginsAll(this.StaffDeptCode, "ops_revenue", "LC").then(async res => {
                    if (res.IsSuccess) {
                        this.RevenueCode = "LC" + this.oRevenueStaff.OfficeCode + (this.RevenueDate.date.year + 543).toString().substring(4, 2) + "00001";
                        this.oRevenue.RevenueCode = this.RevenueCode;

                        this.InsRevenue();
                    }

                    this.preloader.setShowPreloader(false);
                }, (error) => { console.error(error); return false; });
            }
            else {
                await this.IncService.TransactionRunningupdByCon(item[0].RunningID).then(async res => {
                    if (res.IsSuccess) {
                        var pad = "00000"
                        var RunningNo = pad.substring(0, pad.length - item[0].RunningNo.toString().length) + (+item[0].RunningNo + 1);

                        this.RevenueCode = "LC" + this.oRevenueStaff.OfficeCode + (this.RevenueDate.date.year + 543).toString().substring(4, 2) + RunningNo;
                        this.oRevenue.RevenueCode = this.RevenueCode;

                        this.InsRevenue();
                    }
                }, (error) => { console.error(error); return false; });
            }




        }, (error) => { console.error(error); return false; });
    }

    async onUdpRevenue() {
        this.preloader.setShowPreloader(true);

        let DRate, cDateRevenue;
        DRate = this.RevenueDate.date;

        if (DRate != undefined) {
            cDateRevenue = new Date(`${DRate.year}-${DRate.month}-${DRate.day}`);
        }


        this.oRevenue.RevenueNo = this.RevenueNo;
        this.oRevenue.RevenueDate = setZeroHours(cDateRevenue);
        this.oRevenue.RevenueTime = this.RevenueTime;
        this.oRevenue.RevenueCode = this.RevenueCode;
        this.oRevenue.InformTo = this.InformTo;
        this.oRevenue.RevenueStatus = this.RevenueStatus.toString();
        this.oRevenue.ResultCount = this.MistreatNo.toString();

        this.oRevenue.RevenueStaff = [];

        if (this.oRevenueSendStaff != null && this.oRevenueSendStaff != undefined) {
            this.oRevenue.RevenueStaff.push(this.oRevenueSendStaff);
        }

        if (this.oRevenueStaff != null && this.oRevenueStaff != undefined) {
            this.oRevenue.RevenueStaff.push(this.oRevenueStaff);
        }

        this.RevenueDetailForUDP = this.ListRevenueDetail;
        this.oRevenue.RevenueDetail = [];
        debugger

        // -----------------------------------------------------------
        //                       Call API Update
        // -----------------------------------------------------------

        let isSuccess: boolean = true;

        await this.IncService.RevenueUdp(this.oRevenue).then(async IsSuccess => {
            if (!IsSuccess) {
                isSuccess = IsSuccess;
                return false;
            }
        }, (error) => { isSuccess = false; console.error(error); return false; });

        if (!isSuccess) return false;

        if (this.RevenueDetailForUDP.length > 0) {
            // New Product
            this.RevenueDetailForUDP.filter(item => (item.IsNewItem === true && item.IsCheck === true))
                .map(async item => {
                    item.IsNewItem = false;
                    item.RevenueID = this.RevenueID;

                    await this.IncService.RevenueDetailinsAll(item).then(async IsSuccess => {
                        if (!IsSuccess) {
                            isSuccess = IsSuccess;
                            return false;
                        } else {
                            await this.IncService.RevenueCompareDetailReceiptupdByCon(item.CompareReceiptID.toString()).then(async item => {
                                if (!IsSuccess) {
                                    isSuccess = IsSuccess;
                                    return false;
                                }
                            }, (error) => { isSuccess = false; console.error(error); return false; });
                        }
                    }, (error) => { isSuccess = false; console.error(error); return false; });
                });

            if (!isSuccess) return false;


            // Delete Product
            this.RevenueDetailForUDP.filter(item => item.IsCheck === false)
                .map(async item => {
                    item.IsNewItem = true;
                    item.IsDelItem = false;
                    await this.IncService.RevenueDetailupdDelete(item.RevenueDetailID).then(async IsSuccess => {
                        if (!IsSuccess) {
                            isSuccess = IsSuccess;
                            return false;
                        } else {
                            await this.IncService.RevenueCompareDetailReceiptupdDelete(item.CompareReceiptID.toString()).then(async item => {
                                if (!IsSuccess) {
                                    isSuccess = IsSuccess;
                                    return false;
                                }
                            }, (error) => { isSuccess = false; console.error(error); return false; });
                        }
                    }, (error) => { isSuccess = false; console.error(error); return false; });
                });

            if (!isSuccess) return false;

        }

        if (isSuccess) {
            //alert("Update");
            alert(Message.saveComplete);
            this.onComplete();
            this.preloader.setShowPreloader(false);
        } else {
            alert(Message.saveFail);
        }
    }

    InsRevenue() {
        this.IncService.RevenueinsAll(this.oRevenue).then(async item => {
            if (item.IsSuccess) {
                this.RevenueID = item.RevenueID;
                this.oRevenue.RevenueDetail.map(async item => {
                    await this.IncService.RevenueCompareDetailReceiptupdByCon(item.CompareReceiptID.toString()).then(async item => {
                        if (item.IsSuccess) {
                            //alert("Insert");
                            alert(Message.saveComplete);
                            this.oRevenue = {};
                            this.onComplete();
                            debugger
                            //this.router.navigate(['/income/manage']);
                            this.router.navigate([`/income/manage/R/${this.RevenueID}`]);
                        }

                        this.preloader.setShowPreloader(false);
                    }, (error) => { console.error(error); return false; });
                });
            } else {
                alert(Message.saveFail);
            }
        }, (error) => { console.error(error); return false; });
    }

    // ----- ผู้นำส่ง ---
    async getReveneueStaff() {
        await this.IncService.StaffgetByKeyword().then(async res => {
            if (res) {
                this.rawStaffSendOptions = res;
            }
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }

    StaffSendonAutoChange(value: string) {
        this.ClearStaffSendData();

        if (value == '') {
            this.StaffSendoptions = [];
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
            RevenueID: this.RevenueID,
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

        this.PosSend = event.OperationPosName;
        this.DeptSend = event.OfficeName;
    }

    ClearStaffSendData() {
        this.PosSend = "";
        this.DeptSend = "";

        this.oRevenueSendStaff = {
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            StaffID: this.StaffSendID,
            RevenueID: this.RevenueID,
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
            ContributorID: "20",
            IsActive: "1"
        }
    }
    // ----- End ผู้นำส่ง ---


    // ----- ผู้จัดทำ ---
    StaffonAutoChange(value: string) {
        this.ClearStaffData();

        if (value == '') {
            this.Staffoptions = [];
        } else {
            if (this.rawStaffSendOptions.length == 0) {
                this.getReveneueStaff();
            }
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
            RevenueID: this.RevenueID,
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
            ContributorID: "36",
            IsActive: "1"
        }

        this.PosStaff = event.OperationPosName;
        this.DeptStaff = event.OfficeName;
        this.StaffDeptCode = event.OfficeCode;

        this.ShowRevenueCompare();
    }

    ClearStaffData() {
        this.PosStaff = "";
        this.DeptStaff = "";

        this.oRevenueStaff = {
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            StaffID: this.StaffID,
            RevenueID: this.RevenueID,
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
            ContributorID: "36",
            IsActive: "1"
        }
    }
    // ----- End ผู้จัดทำ ---

    // ----- เรียน ---
    InformToonAutoChange(value: string) {
        if (value == '') {
            this.InformTooptions = [];
        } else {
            if (this.rawStaffSendOptions.length == 0) {
                this.getReveneueStaff();
            }
            this.InformTooptions = this.rawStaffSendOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    InformToonAutoFocus(value: string) {
        if (value == '') {
            this.InformTooptions = [];
        }
    }

    // ----- End เรียน ---


    // --- เขียนที่ ---
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

    onAutoChange(value: string) {
        if (value == '') {
            this.options = [];
            this.oRevenue.StationCode = "";
            this.oRevenue.StationName = "";
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
        this.oRevenue.StationCode = event.OfficeCode;
        this.oRevenue.StationName = event.OfficeName;
    }
    // ----- End เขียนที่ ---

    getCurrentDate() {
        let date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toISOString().substring(0, 10);
    }

    getCurrentTime() {
        let date = new Date();
        // 
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
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
        debugger
        let CompareFine: number = 0, BribeMoney: number = 0, RewardMoney: number = 0, TreasuryMoney: number = 0;
        let MistreatNoList = [];
        this.ListRevenueDetail.filter(item => item.IsCheck === true)
            .map(async item => {
                CompareFine += +item.TotalFine;
                BribeMoney += +item.BribeMoney;
                RewardMoney += +item.RewardMoney;
                TreasuryMoney += +item.TreasuryMoney;

                MistreatNoList.push(item.CompareID)
            });

        var MistreatNoUnique = Array.from(new Set(MistreatNoList));

        this.MistreatNo = MistreatNoUnique.length;
        // this.CompareFine = (BribeMoney + RewardMoney + TreasuryMoney).toLocaleString("en");
        this.CompareFine = CompareFine.toLocaleString("en");
        this.BribeMoney = BribeMoney.toLocaleString("en");
        this.RewardMoney = RewardMoney.toLocaleString("en");
        this.TreasuryMoney = TreasuryMoney.toLocaleString("en");
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

    CheckCompareReceive() {
        this.ListChK = [];

        for (var i = 0; i < this.ListRevenueDetailPaging.length; i += 1) {
            if (this.ListRevenueDetailPaging[i].IsCheck) {
                this.ListChK.push(true);
            }
            else {
                this.ListChK.push(false);
            }
        }
    }

}
