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
import { SidebarService } from '../../../shared/sidebar/sidebar.component';
//#endregion

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit, OnDestroy {
<<<<<<< HEAD

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
    
    oldCompareRecId = [];
    
=======
>>>>>>> Kat_Dev
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
    
    paginage = pagination;

<<<<<<< HEAD
    revenueCmp = [];
    

    revenueID: string;

    

    
    
=======
    RevenueID: string;
    RevenueCode: string;    // เลขที่นำส่งเงิน
    RevenueNo: string;  // เลขที่หนังสือนำส่ง
    InformTo: string;       // เรียน
>>>>>>> Kat_Dev
    StaffSendID: string;    // รหัสผู้นำส่ง
    
    
    
    StaffID: string;        // รหัสผู้จัดทำ
<<<<<<< HEAD
    
    
    
    DeptStaffCode: string;
    
    
    
    
   
    
    
    
=======
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
>>>>>>> Kat_Dev



    StaffSendoptions = [];
    rawStaffSendOptions = [];
    Staffoptions = [];
    rawOptions = [];
<<<<<<< HEAD
    informOptions = [];
=======
    InformTooptions = [];
>>>>>>> Kat_Dev
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

    //#endregion

    //#region "Ng"

    constructor(
        private activeRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private ngbModel: NgbModal,
        private navService: NavigationService,
        private IncService: IncomeService,
        private preloader: PreloaderService,
        private router: Router,
        private sidebarService: SidebarService
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setNextPageButton(false);
    }

    async ngOnInit() {
        this.sidebarService.setVersion('Revenue 0.0.0.2');

        this.preloader.setShowPreloader(true);

        
        this.active_Route();
        this.navigate_Service();

<<<<<<< HEAD
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
=======
        this.RevenueStatus = 0;
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
>>>>>>> Kat_Dev

        if (this.mode === 'R') {
            await this.ShowRevenue();
        } else {
            this.preloader.setShowPreloader(false);
        }

        this.paginage.TotalItems = this.ListRevenueDetail.length;
        this.ListRevenueDetailPaging = this.ListRevenueDetail.slice(0, this.paginage.RowsPerPageOptions[0]);

        this.CheckCompareReceive();
<<<<<<< HEAD
        
        
        this.preloader.setShowPreloader(false);
    }

=======

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

>>>>>>> Kat_Dev
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
    
    //#endregion
    
    //#region "Events"

    chkAll_onChange() {
        for (var i = 0; i < this.revenueCmpList.length; i++) {
            this.revenueCmpList[i].IsCheck = this.chkAll_Value;
        }

<<<<<<< HEAD
        this.RevenueSummary();
    }

    chkDetail_onChange() {
        //alert("test");

        this.chkAll_Value = this.revenueCmpList.every(function (item: any) {
            return item.IsCheck == true;
        });

        this.RevenueSummary(); 
    }

    

        //#region " ผู้จัดทำ "

    txtStaffName_onInput(value: string) {
        if (value == '') {
            //alert(this.revenueCmpList.length);

            this.Staffoptions = [];
            this.ClearStaffData();

            this.txtPosStaff_Value = "";
            this.txtDeptStaff_Value = "";
            this.DeptStaffCode = "";
        } else {
            //alert(this.revenueCmpList.length);

            this.Staffoptions = this.rawStaffSendOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
=======
    ShowRevenue() {
        this.IncService.getByCon(this.RevenueID).then(async res => {
            if (res.length > 0 && res != null) {
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
                this.preloader.setShowPreloader(true);
                if (res[0].RevenueDetail.length > 0) {
                    for (var a = 0; a < res[0].RevenueDetail.length; a += 1) {
                        await this.IncService.RevenueComparegetByCompareReceiptID(res[0].RevenueDetail[a].CompareReceiptID).then(async item => {
                            this.preloader.setShowPreloader(false);
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
            }else{
                alert("พบปัญหาในการติดต่อ Server");
                this.preloader.setShowPreloader(false);
                this.router.navigate(['/income/list']);
            }
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }

    async ShowRevenueCompare() {
        if(this.RevenueDate != null && this.RevenueDate != "")
        {
            this.preloader.setShowPreloader(true);
            let DRate, cDateRevenue;
            DRate = this.RevenueDate.date;
    
            if (DRate != undefined) {
                cDateRevenue = new Date(`${DRate.year}-${DRate.month}-${DRate.day}`);
            }
            
            await this.IncService.RevenueComparegetByCon(setZeroHours(cDateRevenue), this.StaffDeptCode).then(async res => {
                this.preloader.setShowPreloader(false);
                this.ListRevenueDetail = [];
                this.ListRevenueDetailPaging = [];
    
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
    
                    // set total record
                    this.paginage.TotalItems = this.ListRevenueDetail.length;
                    this.ListRevenueDetailPaging = this.ListRevenueDetail.slice(0, this.paginage.RowsPerPageOptions[0]);
                }
                else{
                    this.ListRevenueDetail = [];
                    this.ListRevenueDetailPaging = [];
                }
                
    
            }, (err: HttpErrorResponse) => {
                alert(err.message);
            });
        }
        else{
            alert("กรุณาระบุวันที่นำส่ง");
            this.ListRevenueDetailPaging = [];
        }       
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
        this.RevenueStatus = 1;
        this.oRevenue.RevenueStatus = "1";
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
>>>>>>> Kat_Dev
    }

    txtStaffName_onFocus(value: string) {
        if (value == '') {
            this.Staffoptions = [];
            this.ClearStaffData();

<<<<<<< HEAD
            this.txtPosStaff_Value = "";
            this.txtDeptStaff_Value = "";
            this.DeptStaffCode = "";
=======
        if (DRate != undefined) {
            cDateRevenue = new Date(`${DRate.year}-${DRate.month}-${DRate.day}`);
>>>>>>> Kat_Dev
        }
    }

<<<<<<< HEAD
    txtStaffName_onClick(event) {
=======

        this.oRevenue.RevenueNo = this.RevenueNo;
        this.oRevenue.RevenueDate = setZeroHours(cDateRevenue);
        this.oRevenue.RevenueTime = this.RevenueTime;
        this.oRevenue.RevenueCode = this.RevenueCode;
        this.oRevenue.InformTo = this.InformTo;
        this.oRevenue.RevenueStatus = this.RevenueStatus.toString();
        this.oRevenue.ResultCount = this.MistreatNo.toString();
>>>>>>> Kat_Dev

        //alert(this.revenueCmpList.length);

        console.log(this.txtRevenueDate_Value);

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

<<<<<<< HEAD
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
=======
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
>>>>>>> Kat_Dev

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

<<<<<<< HEAD
        this.txtPosSend_Value = event.PosLevelName;
        this.txtDeptSend_Value = event.OfficeName;
=======
        this.PosSend = event.OperationPosName;
        this.DeptSend = event.OfficeName;
>>>>>>> Kat_Dev
    }

        //#endregion

<<<<<<< HEAD
        //#region " เรียน "

    txtInformTo_onInput(value: string) {        
        if (value == '') {
            this.informOptions = [];
        } else {
            this.informOptions = this.rawStaffSendOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1);
=======
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
>>>>>>> Kat_Dev
        }
    }

        //#endregion

<<<<<<< HEAD
        //#region " เขียนที่ "

    txtRevenueStation_onFocus(value: string) {
        if (value == '') {
            this.options = [];

            this.oRevenue.StationCode = "";
            this.oRevenue.StationName = "";
=======
    // ----- ผู้จัดทำ ---
    StaffonAutoChange(value: string) {
        this.ClearStaffData();

        if (value == '') {
            this.Staffoptions = [];
            this.ListRevenueDetailPaging = [];
        } else {
            if (this.rawStaffSendOptions.length == 0) {
                this.getReveneueStaff();
            }
            this.Staffoptions = this.rawStaffSendOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1);
>>>>>>> Kat_Dev
        }
    }

    txtRevenueStation_onClick(event) {
        this.oRevenue.StationCode = event.OfficeCode;
        this.oRevenue.StationName = event.OfficeName;
    }

    txtRevenueStation_onInput(value: string) {
        if (value == '') {
<<<<<<< HEAD
            this.options = [];

            this.oRevenue.StationCode = "";
            this.oRevenue.StationName = "";
        } else {
            this.options = this.rawStaffSendOptions.filter(f => f.OfficeName.toLowerCase().indexOf(value.toLowerCase()) > -1);
=======
            this.Staffoptions = [];
            this.ListRevenueDetailPaging = [];
            this.ClearStaffData();
>>>>>>> Kat_Dev
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
                    if (this.mode === 'C') {
                        alert("ไม่พบข้อมูล");
                    }
                }
                //console.log(res);

                await res.map((item) => {

                    item.IsCheck = false;

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

                    
        
                })

                //this.revenueCmp = res;
                //alert(this.revenueCmpList.length);
                //res.push({"IsCheck":false,"CompareCode":"111"});
                //res.push({"IsCheck":true,"CompareCode":"222"});

                this.revenueCmp = this.revenueCmpList.concat(res);


                //this.paginage.TotalItems = this.revenueCmp.length;
                //this.revenueCmpList = this.revenueCmp.slice(0, this.paginage.RowsPerPageOptions[0]);
                this.revenueCmpList = this.revenueCmp;

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

                    console.log(SStaff[0]);

                    this.DeptStaffCode = SStaff[0].DepartmentCode;
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
                    console.log(res[0].RevenueDetail);

                    //for (var i = 0; i < this.ListRevenueDetail.length; i += 1) {
                        var tmp = [];
                        for (var j = 0; j < res[0].RevenueDetail.length; j += 1) {

                            //alert(res[0].RevenueDetail.CompareReceiptID);
                            this.oldCompareRecId.push(res[0].RevenueDetail[j].CompareReceiptID);
                            let tmp_rev_id = res[0].RevenueDetail[j].RevenueDetailID;
                            
                            await this.IncService.getRevenueComparegetByCompareReceiptID(res[0].RevenueDetail[j].CompareReceiptID).then(async res => {
                                var o = new Object();
                                o["CompareCode"] = res[0].CompareCode;
                                //o.ReceiptNo = "111";
                                o["LawBreaker"] = "111";
                                o["StaffReceip"] = "111";
                                //o.PaymentDate = "111";
                                //o.TotalFine = "111";
                                //o.BribeMoney = "111";
                                //o.TreasuryMoney = "111";
                                //o.RewardMoney = "111";

                                o["IsCheck"] = true;

                                console.log(res[0]);
                                o["RevenueDetailID"] = tmp_rev_id;

                                o["TreasuryMoney"] = res[0].RevenueCompareDetail[0].TreasuryMoney;
                                o["BribeMoney"] = res[0].RevenueCompareDetail[0].BribeMoney;
                                o["RewardMoney"] = res[0].RevenueCompareDetail[0].RewardMoney;
                                o["TotalFine"] = res[0].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].TotalFine;
                                o["ReceiptNo"] = res[0].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].ReceiptNo;

                                o["TreasuryMoney"] = parseFloat(o["TreasuryMoney"]).toLocaleString(undefined, {minimumFractionDigits: 2});
                                o["BribeMoney"] = parseFloat(o["BribeMoney"]).toLocaleString(undefined, {minimumFractionDigits: 2});
                                o["RewardMoney"] = parseFloat(o["RewardMoney"]).toLocaleString(undefined, {minimumFractionDigits: 2});
                                o["TotalFine"] = parseFloat(o["TotalFine"]).toLocaleString(undefined, {minimumFractionDigits: 2});

                                o["CompareReceiptID"] = res[0].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].CompareReceiptID;

                                o["PaymentDate"] = toLocalShort(res[0].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].PaymentDate);


                                //let tmp = res[0].RevenueCompareDetail[0].RevenueArrestIndicmentDetail[0].RevenueArrestLawbreaker.filter(i => i.IsActive === '1');

                                o["LawBreaker"] = res[0].RevenueCompareDetail[0].LawbreakerTitleName+res[0].RevenueCompareDetail[0].LawbreakerFirstName+' '+res[0].RevenueCompareDetail[0].LawbreakerLastName;

                                let tmp2 = res[0].RevenueCompareStaff.filter(i => i.ContributorID === 19);

                                //alert(tmp.length);

                                o["StaffReceip"] = tmp2[0].TitleName+tmp2[0].FirstName+' '+tmp2[0].LastName;

                                

                                tmp.push(o);
                            });

                        }
                    //}

                    this.revenueCmpList = tmp;

                    await this.getRevenueComparegetByCon();

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
<<<<<<< HEAD
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
            ContributorID: "20",
            IsActive: "1"
        }
=======
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
>>>>>>> Kat_Dev
    }

    ClearStaffData() {
        this.txtPosStaff_Value = "";
        this.txtDeptStaff_Value = "";

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
<<<<<<< HEAD
            ContributorID: "34",
            IsActive: "1"
        }
    }
=======
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
>>>>>>> Kat_Dev

    

    

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

<<<<<<< HEAD
    

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
=======
    onAutoChange(value: string) {
        if (value == '') {
            this.options = [];
            this.oRevenue.StationCode = "";
            this.oRevenue.StationName = "";
        } else {
            this.options = this.rawOptions.filter(f => f.OfficeName.toLowerCase().indexOf(value.toLowerCase()) > -1);
>>>>>>> Kat_Dev
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

<<<<<<< HEAD
        this.oRevenue.RevenueStaff = [];
=======
    onAutoSelecteWord(event) {
        this.oRevenue.StationCode = event.OfficeCode;
        this.oRevenue.StationName = event.OfficeName;
    }
    // ----- End เขียนที่ ---
>>>>>>> Kat_Dev

        if (this.oRevenueSendStaff != null && this.oRevenueSendStaff != undefined) {
            this.oRevenue.RevenueStaff.push(this.oRevenueSendStaff);
        }

<<<<<<< HEAD
        if (this.oRevenueStaff != null && this.oRevenueStaff != undefined) {
            this.oRevenue.RevenueStaff.push(this.oRevenueStaff);
        }

        //this.oRevenue.RevenueDetail = this.ListRevenueDetailPaging.filter(item => item.IsCheck === true);

        //RevenueCompareDetailReceiptupdByCon
        

        this.oRevenue.RevenueDetail = [];
        
=======
    getCurrentTime() {
        let date = new Date();
        // 
       // return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
       return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
>>>>>>> Kat_Dev

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

<<<<<<< HEAD
        // console.log(this.oldCompareRecId);

        // return "";

        this.preloader.setShowPreloader(true);

        let DRate, cDateRevenue;
        DRate = this.txtRevenueDate_Value.date;

        if (DRate != undefined) {
            cDateRevenue = DRate.year + '-' + DRate.month + '-' + DRate.day + ' ' + this.txtRevenueTime_Value;
        }

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

        //this.oRevenue.RevenueDetail = this.ListRevenueDetail.filter(item => item.IsCheck === true);
        //debugger

        this.oRevenue.RevenueDetail = [];

        let toDel = [];
        let toAdd = [];
        let now = [];

        for (var i = 0; i < this.revenueCmpList.length; i += 1) {
            if(this.revenueCmpList[i].IsCheck){               
                //this.oldCompareRecId;
                now.push(this.revenueCmpList[i].CompareReceiptID);
            }
        }
        
        for (var i = 0; i < this.oldCompareRecId.length; i += 1) {
            if(!now.includes(this.oldCompareRecId[i])){
                toDel.push(this.oldCompareRecId[i]);
            }     
        }

        for (var i = 0; i < now.length; i += 1) {
            if(!toDel.includes(now[i]) && !this.oldCompareRecId.includes(now[i])){
                toAdd.push(now[i]);
            }
        }

        console.log(this.oldCompareRecId);
        console.log(now);
        console.log(toDel);
        console.log(toAdd);

        for (var i = 0; i < toAdd.length; i += 1) {
            for (var j = 0; j < this.revenueCmpList.length; j += 1) {
                if(this.revenueCmpList[j].CompareReceiptID == toAdd[i]){
                    console.log(this.revenueCmpList[j]);

                    this.IncService.RevenueDetailinsAll(this.revenueCmpList[j].CompareCode,this.revenueCmpList[j].ReceiptNo,
                                            "1",this.revenueID,toAdd[i],"1");

                    this.IncService.RevenueCompareDetailReceiptupdByCon(toAdd[i]);
                }
            }
        }

        for (var i = 0; i < toDel.length; i += 1) {
            for (var j = 0; j < this.revenueCmpList.length; j += 1) {
                //console.log(this.revenueCmpList[j]);

                if(this.revenueCmpList[j].CompareReceiptID == toDel[i]){
                    console.log(this.revenueCmpList[j]);

                    this.IncService.RevenueDetailupdDelete(this.revenueCmpList[j].RevenueDetailID);
                    this.IncService.RevenueCompareDetailReceiptupdDelete(toDel[i]);
                }
            }
        }

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
=======

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

                MistreatNoList.push(item.CompareCode)
            });

        var MistreatNoUnique = Array.from(new Set(MistreatNoList));

        this.MistreatNo = MistreatNoUnique.length;
        // this.CompareFine = (BribeMoney + RewardMoney + TreasuryMoney).toLocaleString("en");
        this.CompareFine = CompareFine.toLocaleString("en");
        this.BribeMoney = BribeMoney.toLocaleString("en");
        this.RewardMoney = RewardMoney.toLocaleString("en");
        this.TreasuryMoney = TreasuryMoney.toLocaleString("en");
>>>>>>> Kat_Dev
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

<<<<<<< HEAD
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
=======
    CheckCompareReceive() {
        this.ListChK = [];

        for (var i = 0; i < this.ListRevenueDetailPaging.length; i += 1) {
            if (this.ListRevenueDetailPaging[i].IsCheck) {
                this.ListChK.push(true);
            }
            else {
                this.ListChK.push(false);
>>>>>>> Kat_Dev
            }
        });

        this.sub = this.navService.onDelete.subscribe(async status => {
            if (status) {
                await this.navService.setOnDelete(false);
                this.onDelete();
            }
        });

        this.sub = this.navService.onPrint.subscribe(async status => {
            if (status) {
                await this.navService.setOnPrint(false);
                this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
            }
        })

        this.sub = this.navService.onCancel.subscribe(async status => {
            if (status) {
                if (confirm(Message.confirmAction)) {
                    await this.navService.setOnCancel(false);
                    this.router.navigate(['/income/list']);
                }
            }
        })
    }

<<<<<<< HEAD
    //#endregion

=======
>>>>>>> Kat_Dev
}
