import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { EvidenceService } from '../evidenceIn.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Evidence_In } from '../evidenceIn';
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
import swal from 'sweetalert2';

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
    ProveID: any;
    evitype: any;
    showEditField: any;
    selectAllChb: any;

    paginage = pagination;

    rawStaffSendOptions = [];
    StaffSendoptions = [];
    StaffRecvoptions = [];

    oEviInSendStaff: Staff;
    oEviInRecvStaff: Staff;

    EvidenceInID: string;   // รหัสรับของกลาง
    EvidenceInCode: string; // เลขที่รับของกลาง
    StaffSendID: string;    // รหัสผู้นำส่ง
    StaffSendName: string;  // ชื่อผู้นำส่ง
    PosStaffSend: string;   // ตำแหน่งผู้นำส่ง
    DeptStaffSend: string;  // แผนกผู้นำส่ง
    StaffRecvName: string;  // ชื่อผู้รับของกลาง
    PosStaffRecv: string;   // ตำแหน่งผู้รับของกลาง
    DeptStaffRecv: string;  // แผนกผู้รับของกลาง
    DeliveryDate: any;      // วันที่นำส่ง
    DeliveryTime: any;      // เวลาที่นำส่ง
    ReturnDate: any;        // วันที่รับคืน
    EvidenceInDate: any;    // วันที่รับของกลาง
    EvidenceInTime: any;    // เวลาที่รับของกลาง
    DeliveryNo: string;     // เลขที่นำส่ง
    Remark: string;         // เหตุผลในการนำส่ง


    // -------- ตรวจรัยจากหน่วยงานภายใน -------
    ArrestCode: string;     // เลขที่ใบงาน
    DeliverNo: string;      // เลขที่หนังสือนำส่ง
    DeliverDate: string;    // วันที่นำส่ง
    DeliverTime: string;    // เวลาที่นำส่ง
    GuiltBaseID: string;    // ฐานความผิดมาตรา
    GuiltBaseName: string;  // ฐานความผิด
    SectionNo: string;      // บทกำหนดโทษ
    PenaltyDesc: string;    // อัตราโทษ
    LawsuitNo: string;      // เลขที่คดีรับคำกล่าวโทษ








    
    RevenueCode: string;    // เลขที่นำส่งเงิน
    RevenueNo: string;  // เลขที่หนังสือนำส่ง
    RevenueNoYear: string;  // ปีเลขที่หนังสือนำส่ง
    InformTo: string;       // เรียน
    
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



    
    
    Staffoptions = [];
    rawOptions = [];
    InformTooptions = [];
    options = [];
    ListRevenueDetail = [];
    ListRevenueDetailPaging = [];
    ListChK = [];
    RevenueDetailForUDP = [];

    // oRevenue: Evidence_In;
    // oRevenueDetail: RevenueDetail;
    
    oRevenueStaff: Staff;

    isRequired: boolean | false;


    // ----- Model ------ //
    @ViewChild('printDocModal') printDocModel: ElementRef;

    constructor(
        private activeRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private ngbModel: NgbModal,
        private navService: NavigationService,
        private EviService: EvidenceService,
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
        // this.preloader.setShowPreloader(true);

        this.active_Route();
        this.navigate_Service();
        await this.getEvidenceInStaff();

        this.DeliveryDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        this.ReturnDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        this.EvidenceInDate = setDateMyDatepicker(new Date(this.getCurrentDate()));

        this.DeliveryTime = this.getCurrentTime();
        this.EvidenceInTime = this.getCurrentTime();

        this.EvidenceInCode = "Auto Generate";

        if(this.evitype == "I"){
            await this.getProve();
        }

        /*this.RevenueStatus = 0;
        this.RevenueNo = "";
        this.RevenueStation == "";
        this.StaffSendName == "";
        this.StaffName == "";
        this.InformTo = "";
        this.StaffID = "";
        this.StaffSendID = "";
        
        this.RevenueCode = "Auto Generate";

        await this.CreateObject();
        
        await this.getStation();

        if (this.mode === 'R') {
            await this.ShowRevenue();
        } else {
            this.preloader.setShowPreloader(false);
        }

        this.paginage.TotalItems = this.ListRevenueDetail.length;
        this.ListRevenueDetailPaging = this.ListRevenueDetail.slice(0, this.paginage.RowsPerPageOptions[0]);

        this.CheckCompareReceive();
*/
    }

    ngOnDestroy(): void {
        // this.onCancelSubscribe.unsubscribe();
        // this.onEditSubscribe.unsubscribe();
        // this.onSaveSubscribe.unsubscribe();
        // this.onDeleSubscribe.unsubscribe();
        this.onPrintSubscribe.unsubscribe();
    }


    private active_Route() {
        this.sub = this.activeRoute.params.subscribe(p => {
            this.mode = p['mode'];
            this.evitype = p['type'];
            this.ProveID = p['proveid'];

            switch (this.mode) {
                case 'C':
                    // set false
                    this.navService.setPrintButton(false);
                    this.navService.setEditButton(false);
                    this.navService.setDeleteButton(false);
                    this.navService.setEditField(false);
                    // set true
                    this.navService.setSaveButton(true);
                    this.navService.setCancelButton(true);
                    break;

                case 'R':
                    // set false
                    this.navService.setSaveButton(false);
                    this.navService.setCancelButton(false);
                    // set true
                    this.navService.setPrintButton(true);
                    this.navService.setEditButton(true);
                    this.navService.setDeleteButton(true);
                    this.navService.setEditField(true);

                    // if (p['code']) {
                    //     this.RevenueID = p['code'];
                    // }
                    break;
            }

            this.activeRoute.data.subscribe(
                (data) => {
                    switch (this.evitype) {
                        case 'I':
                            data.urls[2].title = "จัดการข้อมูลรายการตรวจรับของกลางจากหน่วยงานภายใน";
                            break;
                        case 'E':
                            data.urls[2].title = "จัดการข้อมูลรายการตรวจรับของกลางจากหน่วยงานภายนอก";
                            break;
                        case 'G':
                            data.urls[2].title = "จัดการข้อมูลรายการตรวจรับของกลางที่นำออกจากคลังไปใช้ในราชการ";
                            break;
                    }

                }
            );
        });
    }

    private navigate_Service() {

        this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p;
        });

        this.onPrintSubscribe = this.navService.onPrint.subscribe(async status => {
            if (status) {
                await this.navService.setOnPrint(false);
                this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
            }
        })

        /*this.onEditSubscribe = this.navService.onEdit.subscribe(async status => {
            if (this.RevenueStatus == 2) {
                //alert("ไม่สามารถแก้ไขรายการได้");
                this.ShowAlertWarning("ไม่สามารถแก้ไขรายการได้");
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
                    this.ShowAlertWarning(Message.checkData);
                    //alert(Message.checkData);

                    return false;
                }

                if (+this.MistreatNo < 1) {
                    this.ShowAlertWarning("กรุณำเลือกรายการที่ต้องการนำส่งเงิน");
                   // alert("กรุณำเลือกรายการที่ต้องการนำส่งเงิน");

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

        this.onCancelSubscribe = this.navService.onCancel.subscribe(async status => {
            if (status) {
                this.navService.setOnCancel(false);

                swal({
                    title: '',
                    text: Message.confirmAction,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ยืนยัน',
                    cancelButtonText: 'ยกเลิก'
                }).then((result) => {
                    if (result.value) {
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
    
                            this.ShowRevenue();
                        }
                    }
                    else{
                        this.navService.setSaveButton(true);
                        this.navService.setCancelButton(true);
    
                        this.navService.setPrintButton(false);
                        this.navService.setEditButton(false);
                        this.navService.setDeleteButton(false);
                        this.navService.setEditField(false);
                    }
                })
            }
        })
        */
    }

    LoadDataFromLocalStorage() {
        let tempUser = this.rawStaffSendOptions.filter(f => f.StaffCode == localStorage.getItem("staffCode"));

        // ----- ผู้นำส่ง -----
        this.oEviInSendStaff = {
            StaffID: "",
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-10",
            EvidenceInID: "",
            StaffCode: localStorage.getItem("staffCode"),
            TitleName: tempUser[0].TitleName,
            FirstName: tempUser[0].FirstName,
            LastName: tempUser[0].LastName,
            PositionCode: tempUser[0].OperationPosCode,
            PosLevel: tempUser[0].PosLevel,
            PosLevelName: tempUser[0].PosLevelName,
            DepartmentCode: tempUser[0].OperationDeptCode,
            DepartmentName: tempUser[0].OperationDeptName,
            DepartmentLevel: tempUser[0].DeptLevel,
            OfficeCode: localStorage.getItem("officeCode"),
            OfficeName: tempUser[0].OfficeName,
            OfficeShortName: localStorage.getItem("officeShortName"),
            ContributorID: "13",
            IsActive: "1"
        }

        this.StaffSendName = localStorage.getItem("fullName");
        this.PosStaffSend = localStorage.getItem("operationPosName");
        this.DeptStaffSend = localStorage.getItem("officeShortName");


        // ----- ผู้ตรวจรับของกลาง -----
        this.oEviInRecvStaff = {
            StaffID: "",
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-10",
            EvidenceInID: "",
            StaffCode: localStorage.getItem("staffCode"),
            TitleName: tempUser[0].TitleName,
            FirstName: tempUser[0].FirstName,
            LastName: tempUser[0].LastName,
            PositionCode: tempUser[0].OperationPosCode,
            PosLevel: tempUser[0].PosLevel,
            PosLevelName: tempUser[0].PosLevelName,
            DepartmentCode: tempUser[0].OperationDeptCode,
            DepartmentName: tempUser[0].OperationDeptName,
            DepartmentLevel: tempUser[0].DeptLevel,
            OfficeCode: localStorage.getItem("officeCode"),
            OfficeName: tempUser[0].OfficeName,
            OfficeShortName: localStorage.getItem("officeShortName"),
            ContributorID: "42",
            IsActive: "1"
        }

        this.StaffRecvName = localStorage.getItem("fullName");
        this.PosStaffRecv = localStorage.getItem("operationPosName");
        this.DeptStaffRecv = localStorage.getItem("officeShortName");
    }

    async getProve() {
        await this.EviService.EvidenceInArrestgetByProveID(this.ProveID).then(async res => {
            if (res.length > 0) {
                this.ArrestCode = res[0].ArrestCode;
                this.DeliverNo = res[0].DeliverNo;

                let temp = res[0].DeliverDate.toString().split(" ");
                this.DeliverDate = setDateMyDatepicker(new Date(temp[0]));

                this.DeliverTime = res[0].DeliverTime;
                this.GuiltBaseID = res[0].GuiltBaseID;
                this.GuiltBaseName = res[0].GuiltBaseName;
                this.SectionNo = res[0].SectionNo;
                this.PenaltyDesc = res[0].PenaltyDesc;
                this.LawsuitNo = res[0].LawsuitNo;
                
            }
        }, (err: HttpErrorResponse) => {
            this.ShowAlertError("พบปัญหาในการติดต่อ Server");
        });
    }

    // **********************************
    // -------------- ผู้นำส่ง -------------
    // **********************************
    async getEvidenceInStaff() {
        await this.EviService.StaffgetByKeyword().then(async res => {
            if (res) {
                this.rawStaffSendOptions = res;
                this.LoadDataFromLocalStorage();
            }
        }, (err: HttpErrorResponse) => {
            this.ShowAlertError("พบปัญหาในการติดต่อ Server");
        });
    }

    StaffSendonAutoChange(value: string) {
        this.ClearStaffSendData();

        if (value == '') {
            this.StaffSendoptions = [];
        } else {
            if (this.rawStaffSendOptions.length == 0) {
                this.getEvidenceInStaff();
            }

            this.StaffSendoptions = this.rawStaffSendOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1 || f.LastName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    StaffSendonAutoFocus(value: string) {
        if (value == '') {
            this.StaffSendoptions = [];
            this.ClearStaffSendData();
        }
    }

    StaffSendonAutoSelecteWord(event) {
        this.oEviInSendStaff = {
            StaffID: this.StaffSendID,
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-10",
            EvidenceInID: this.EvidenceInID,
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
            ContributorID: "13",
            IsActive: "1"
        }

        this.PosStaffSend = event.OperationPosName;
        this.DeptStaffSend = event.OfficeName;
    }

    ClearStaffSendData() {
        this.PosStaffSend = "";
        this.DeptStaffSend = "";

        this.oEviInSendStaff = {
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-10",
            StaffID: this.StaffSendID,
            EvidenceInID: this.EvidenceInID,
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
            ContributorID: "13",
            IsActive: "1"
        }
    }


    // **********************************
    // ----------- ผู้รับของกลาง ----------
    // **********************************
    StaffRecvonAutoChange(value: string) {
        this.ClearStaffRecvData();

        if (value == '') {
            this.StaffRecvoptions = [];
        } else {
            if (this.rawStaffSendOptions.length == 0) {
                this.getEvidenceInStaff();
            }

            this.StaffRecvoptions = this.rawStaffSendOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1 || f.LastName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    StaffRecvonAutoFocus(value: string) {
        if (value == '') {
            this.StaffRecvoptions = [];
            this.ClearStaffRecvData();
        }
    }

    StaffRecvonAutoSelecteWord(event) {
        this.oEviInRecvStaff = {
            StaffID: this.StaffSendID,
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-10",
            EvidenceInID: this.EvidenceInID,
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
            ContributorID: "42",
            IsActive: "1"
        }

        this.PosStaffRecv = event.OperationPosName;
        this.DeptStaffRecv = event.OfficeName;
    }

    ClearStaffRecvData() {
        this.PosStaffRecv = "";
        this.DeptStaffRecv = "";

        this.oEviInRecvStaff = {
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-10",
            StaffID: this.StaffSendID,
            EvidenceInID: this.EvidenceInID,
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
            ContributorID: "42",
            IsActive: "1"
        }
    }


    // **********************************
    // -------------- Alert -------------
    // **********************************
    ShowAlertWarning(alertText: string) {
        swal({
            title: '',
            text: alertText,
            type: 'warning',
            confirmButtonText: 'ตกลง'
        });
    }

    ShowAlertSuccess(alertText: string) {
        swal({
            title: '',
            text: alertText,
            type: 'success',
            confirmButtonText: 'ตกลง'
        });
    }

    ShowAlertError(alertText: string) {
        swal({
            title: '',
            text: alertText,
            type: 'error',
            confirmButtonText: 'ตกลง'
        });
    }


    // **********************************
    // ------------ DateTime -----------
    // **********************************
    getCurrentDate() {
        let date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toISOString().substring(0, 10);
    }

    getCurrentTime() {
        let date = new Date();
        return date.getHours() + ":" + date.getMinutes();
    }


    /*
        onDelete() {
            swal({
                title: '',
                text: Message.confirmAction,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ยืนยัน',
                cancelButtonText: 'ยกเลิก'
            }).then((result) => {
                if (result.value) {
                    if (this.RevenueStatus == 1) {
                        if (confirm(Message.confirmAction)) {
                            this.IncService.RevenueupdDelete(this.RevenueID).then(async IsSuccess => {
                                if (IsSuccess) {
                                    var isSuccess = true;
                                    this.ListRevenueDetail.filter(item => (item.IsCheck === true))
                                        .map(async item => {
                                            await this.IncService.RevenueCompareDetailReceiptupdDelete(item.CompareReceiptID.toString()).then(async item => {
                                                if (!item.IsSuccess) {
                                                    isSuccess = item.IsSuccess;
                                                    return false;
                                                }
                                            }, (error) => { console.error(error); return false; });
                                        });
            
                                    if (isSuccess) {
                                        this.oRevenue = {};
                                        this.ShowAlertSuccess(Message.saveComplete);
                                       // alert(Message.saveComplete);
                                        this.router.navigate(['/income/list']);
                                    }
                                } else {
                                    this.ShowAlertError(Message.saveFail);
                                    //alert(Message.saveFail);
                                }
                            }, (error) => { console.error(error); return false; });
                        }
                    }
                    else if (this.RevenueStatus == 2) {
                        this.ShowAlertWarning(Message.cannotDelete);
                        //alert(Message.cannotDelete);
                    }
                }
            })
        }
    
        ShowRevenue() {
            this.IncService.getByCon(this.RevenueID).then(async res => {
                if (res.length > 0 && res != null) {
                    // if (res[0].RevenueDetail.length > 0) {
                    //     this.ReceiptBookNo = res[0].RevenueDetail[0].ReceiptBookNo;
                    // }
                    // else {
                    //     this.ReceiptBookNo = "";
                    // }
                    this.ListRevenueDetail = [];
                    this.oRevenue.RevenueID = res[0].RevenueID;
                    this.oRevenue.RevenueCode = res[0].RevenueCode;
                    this.oRevenue.StationCode = res[0].StationCode;
                    this.oRevenue.StationName = res[0].StationName;
    
                    this.RevenueCode = res[0].RevenueCode;
                    this.RevenueStation = res[0].StationName;
    
                    var RN = res[0].RevenueNo.split('/');
    
                    if (RN.length > 1) {
                        this.RevenueNo = RN[0];
                        this.RevenueNoYear = RN[1];
                    }
    
                    //this.RevenueNo = res[0].RevenueNo;
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
                                                                RevenueIndex: "1",
                                                                RevenueDetailID: res[0].RevenueDetail[a].RevenueDetailID,
                                                                ReceiptBookNo: item[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].ReceiptBookNo,
                                                                ReceiptNo: item[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].ReceiptNo,
                                                                RevenueStatus: "1",
                                                                RevenueID: this.oRevenue.RevenueID,
                                                                CompareReceiptID: item[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].CompareReceiptID,
                                                                CompareID: item[j].CompareID,
                                                                CompareCode: item[j].CompareCode,
                                                                LawBreaker: `${item[j].RevenueCompareDetail[i].LawbreakerTitleName == 'null' || item[j].RevenueCompareDetail[i].LawbreakerTitleName == null ? '' : item[j].RevenueCompareDetail[i].LawbreakerTitleName}` + item[j].RevenueCompareDetail[i].LawbreakerFirstName,
                                                                SurnameLawBreaker: item[j].RevenueCompareDetail[i].LawbreakerLastName,
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
    
                                this.preloader.setShowPreloader(false);
                            }, (err: HttpErrorResponse) => {
                                this.ShowAlertError(err.message);
                                //alert(err.message);
                            });
                        }
    
                        // set total record
                        this.paginage.TotalItems = this.ListRevenueDetail.length;
                        this.ListRevenueDetailPaging = this.ListRevenueDetail.slice(0, this.paginage.RowsPerPageOptions[0]);
    
                        var rIndex = 1;
    
                        for(var a = 0; a < this.ListRevenueDetailPaging.length; a++){
                            if(a != 0) {
                                if(this.ListRevenueDetailPaging[a-1].CompareCode == this.ListRevenueDetailPaging[a].CompareCode){
                                    this.ListRevenueDetailPaging[a].CompareCode = "";
                                    this.ListRevenueDetailPaging[a].RevenueIndex = "";
                                }
                                else{
                                    rIndex += 1;
                                    this.ListRevenueDetailPaging[a].RevenueIndex = rIndex;
                                }  
                            }
                            else{
                                this.ListRevenueDetailPaging[a].RevenueIndex = 1;
                            }
    
                            //    this.ListRevenueDetailPaging[a].TotalFine = this.ListRevenueDetailPaging[a].TotalFine.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2});
                            //    this.ListRevenueDetailPaging[a].BribeMoney = this.ListRevenueDetailPaging[a].BribeMoney.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})
                            //    this.ListRevenueDetailPaging[a].TreasuryMoney = this.ListRevenueDetailPaging[a].TreasuryMoney.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})
                            //    this.ListRevenueDetailPaging[a].RewardMoney = this.ListRevenueDetailPaging[a].RewardMoney.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})
                        }
    
                        this.checkIfAllChbSelected();
                    }
                } else {
                    this.ShowAlertError("พบปัญหาในการติดต่อ Server");
                    //alert("พบปัญหาในการติดต่อ Server");
                    this.preloader.setShowPreloader(false);
                    this.router.navigate(['/income/list']);
                }
            }, (err: HttpErrorResponse) => {
                this.ShowAlertError("API RevenuegetByCon :: " + err.message);
                //alert(err.message);
            });
        }
    
        async ShowRevenueCompare() {
            if (this.RevenueDate != null && this.RevenueDate != "") {
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
                    else {
                        this.ListRevenueDetail = [];
                        this.ListRevenueDetailPaging = [];
                    }
    
    
                }, (err: HttpErrorResponse) => {
                    this.ShowAlertError("API RevenueComparegetByCon :: " + err.message);
                    //alert(err.message);
                });
            }
            else {
                this.ShowAlertWarning("กรุณาระบุวันที่นำส่ง");
                //alert("กรุณาระบุวันที่นำส่ง");
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
            this.oRevenue.RevenueNo = this.RevenueNo + "/" + this.RevenueNoYear;
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
        }
    
        async onUdpRevenue() {
            this.preloader.setShowPreloader(true);
    
            let DRate, cDateRevenue;
            DRate = this.RevenueDate.date;
    
            if (DRate != undefined) {
                cDateRevenue = new Date(`${DRate.year}-${DRate.month}-${DRate.day}`);
            }
    
            this.oRevenue.RevenueNo = this.RevenueNo + "/" + this.RevenueNoYear;
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
                this.ShowAlertSuccess(Message.saveComplete);
                //alert(Message.saveComplete);
                this.onComplete();
                this.preloader.setShowPreloader(false);
            } else {
                this.ShowAlertError(Message.saveFail);
                //alert(Message.saveFail);
                this.preloader.setShowPreloader(false);
            }
        }
    
        InsRevenue() {
            this.IncService.RevenueinsAll(this.oRevenue).then(async item => {
                if (item.IsSuccess) {
                    this.RevenueID = item.RevenueID;
                    var isSuccess = true;
                    this.oRevenue.RevenueDetail.map(async item => {
                        await this.IncService.RevenueCompareDetailReceiptupdByCon(item.CompareReceiptID.toString()).then(async item => {
                            if (!item.IsSuccess) {
                                isSuccess = item.IsSuccess;
                                return false;
                            }
    
                            this.preloader.setShowPreloader(false);
                        }, (error) => { console.error(error); return false; });
                    });
    
                    if (isSuccess) {
                        //alert("Insert");
                        this.ShowAlertSuccess(Message.saveComplete);
                        //alert(Message.saveComplete);
                        this.oRevenue = {};
                        this.onComplete();
                        debugger
                        //this.router.navigate(['/income/manage']);
                        this.router.navigate([`/income/manage/R/${this.RevenueID}`]);
                    }
                } else {
                    this.ShowAlertError(Message.saveFail);
                    //alert(Message.saveFail);
                }
            }, (error) => { console.error(error); return false; });
        }
    
        
    
    
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
                this.Staffoptions = this.rawStaffSendOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1 || f.LastName.toLowerCase().indexOf(value.toLowerCase()) > -1);
            }
        }
    
        StaffonAutoFocus(value: string) {
            if (value == '') {
                this.Staffoptions = [];
                this.ListRevenueDetailPaging = [];
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
                this.InformTooptions = this.rawStaffSendOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1 || f.LastName.toLowerCase().indexOf(value.toLowerCase()) > -1);
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
                this.ShowAlertError("พบปัญหาในการติดต่อ Server");
                //alert("พบปัญหาในการติดต่อ Server");
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
                    CompareFine += item.TotalFine;
                    BribeMoney += item.BribeMoney;
                    RewardMoney += item.RewardMoney;
                    TreasuryMoney += item.TreasuryMoney;
    
                    MistreatNoList.push(item.CompareCode);
                });
    
            var MistreatNoUnique = Array.from(new Set(MistreatNoList));
    
            this.MistreatNo = MistreatNoUnique.length;
            // this.CompareFine = (BribeMoney + RewardMoney + TreasuryMoney).toLocaleString("en");
            this.CompareFine = CompareFine.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2});
            this.BribeMoney = BribeMoney.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2});
            this.RewardMoney = RewardMoney.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2});
            this.TreasuryMoney = TreasuryMoney.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2});
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
    
        */
}
