import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { EvidenceOutService } from '../evidenceOut.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EvidenceOut, EvidenceOutStaff, Document } from '../evidenceOut';
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
import { IncomeService } from '../../income/income.service';
import { ProveService } from '../../prove/prove.service';

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
    evitype: any;
    showEditField: any;
    paginage = pagination;
    isRequired: boolean | false;


    EvidenceOutID: string;       // รหัสการคืน
    EvidenceOutNo: string;      // เลขที่หนังสือขอคืน / เลขที่หนังสือแจ้งคืน / เลขที่หนังสือ / เลขที่หนังสืออนุมัติ / เลขที่หนังสือนำส่ง
    EvidenceOutNoDate: any;     // ลงวันที่
    EvidenceOutNoTime: string;  // เวลาลง
    ReturnDate: any;            // วันที่กำหนดคืนของกลาง กรณียืมของกลางออกจากคลัง
    StaffRequestName: string;   // ชื่อผู้ขอรับคืน / ชื่อผู้เสนออนุมัติ / ชื่อผู้ขอนำออก / ชื่อผู้ขอโอนย้าย = 45
    PosRequest: string;         // ตำแหน่งผู้ขอรับคืน / ตำแหน่งผู้เสนอออนุมัติ / ตำแหน่งผู้ขอนำออก / ตำแหน่งผู้ขอโอนย้าย
    DeptRequest: string;        // หน่วยงานผู้ขอรับคืน / หน่วยงานผู้เสนอออนุมัติ / หน่วยงานผู้ขอนำออก / หน่วยงานผู้ขอโอนย้าย
    DeptCodeRequest: string;    // รหัสหน่วยงานผู้ขอรับคืน / รหัสหน่วยงานผู้เสนอออนุมัติ / รหัสหน่วยงานผู้ขอนำออก / รหัสหน่วยงานผู้ขอโอนย้าย
    StaffApproveName: string;   // ชื่อผู้อนุมัติ   / ชื่อผู้พิจารณาเห็นชอบ  = 44
    PosApprove: string;         // ตำแหน่งผู้อนุมัติ / ตำแหน่งผู้พิจารณา
    DeptApprove: string;        // หน่วยงานผู้อนุมัติ / หน่วยงานผู้พิจารณา
    DeptCodeApprove: string;    // รหัสหน่วยงานผู้อนุมัติ / รหัสหน่วยงานผู้พิจารณา
    StaffEvidenceName: string;  // ชื่อผู้จำหน่าย = 43
    PosEvidence: string;        // ตำแหน่งผู้จำหน่าย
    DeptEvidence: string;       // หน่วยงานผู้จำหน่าย
    DeptCodeEvidence: string;   // รหัสหน่วยงานผู้จำหน่าย
    StaffReceiverName: string;  // ชื่อผู้รับบริจาค = 
    PosReceiver: string;        // ตำแหน่งผู้รับบริจาค
    DeptReceiver: string;       // หน่วยงานผู้รับบริจาค
    DeptCodeReceiver: string;   // รหัสหน่วยงานผู้รับบริจาค
    BookNo: string;             // ใบเสร็จรับเงินภาษีเล่มที่ กรณีคืนของกลางเท่านั้น
    ReceiptNo: string;          // ใบเสร็จรับเงินภาษีเลขที่ กรณีคืนของกลางเท่านั้น
    PayDate: any;               // วันที่ชำระภาษี กรณีคืนของกลางเท่านั้น
    PayTime: string;            // เวลาที่ชำระภาษี กรณีคืนของกลางเท่านั้น
    ApproveDate: any;           // วันที่อนุมัติ / วันที่พิจารณา
    ApproveTime: string;        // เวลาอนุมัติ / เวลาพิจารณา
    ArrestCode: string;         // เลขที่ใบงาน
    Lawsuit: string;            // เลขที่คดี, หน่วยงาน
    Remark: string;             // เหตุผลในการนำออก
    WarehouseID: string;        // รหัสคลังปลายทาง กรณีโอนย้ายของกลาง
    WarehouseName: string;      // ชื่อคลังปลายทาง กรณีโอนย้ายของกลาง
    ApproveNo: string;          // เลขที่หนังสืออนุมัติ กรณีโอนย้ายของกลาง
    EvidenceOutCode: string;    // เลขที่จำหน่ายของกลาง / เลขที่คืน / เลขที่นำออก
    EvidenceOutDate: any;       // วันที่จำหน่าย
    EvidenceOutTime: string;    // เวลาที่จำหน่าย
    EvidenceOutType: string;    // ประเภทการจำหน่ายของกลาง 0 = คืนภายใน, 1 = คืนภายนอก, 2 = ทำลาย, 3 = ขาย, 4 = ยืม, 5 = เข้าพิพิธภัณฑ์, 6 = ใช้ในราชการ, 7 = บริจาค, 8 = โอนย้าย


    StaffRequestID: string;     // รหัสผู้ขอ / ผู้เสนอ
    StaffRequestoptions = [];   // ผู้ขอ / ผู้เสนอ
    StaffApproveID: string;     // รหัสผู้อนุมัติ
    StaffApproveoptions = [];   // ผู้อนุมัติ
    StaffEvidenceID: string;    // รหัสผู้จำหน่าย
    StaffEvidenceoptions = [];  // ผู้จำหน่าย
    rawStaffOptions = [];       // ผู้ขอ / ผู้เสนอ
    ListDoc = [];


    oEviOutStaffRequest: EvidenceOutStaff;
    oEviOutStaffApprove: EvidenceOutStaff;
    oEviOutStaffEvidence: EvidenceOutStaff;
    oEvidenceOut: EvidenceOut;
    oDocument: Document;

    // ----- Model ------ //
    @ViewChild('printDocModal') printDocModel: ElementRef;

    constructor(
        private activeRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private ngbModel: NgbModal,
        private navService: NavigationService,
        private RevService: IncomeService,
        private EvidenceOutService: EvidenceOutService,
        private proveService: ProveService,
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
        this.preloader.setShowPreloader(true);
        this.active_Route();
        this.navigate_Service();
        await this.getEvidenceOutStaff();

        this.EvidenceOutNoDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        this.ReturnDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        this.PayDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        this.ApproveDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        this.EvidenceOutDate = setDateMyDatepicker(new Date(this.getCurrentDate()));

        this.EvidenceOutNoTime = this.getCurrentTime();
        this.PayTime = this.getCurrentTime();
        this.ApproveTime = this.getCurrentTime();
        this.EvidenceOutTime = this.getCurrentTime();

        this.EvidenceOutCode = "Auto Generate";
        this.WarehouseID = "1";

        if (this.mode == "R") {
            await this.ShowEvidenceOut();
        } else {
            this.preloader.setShowPreloader(false);
        }
    }

    ngOnDestroy(): void {
        // this.onCancelSubscribe.unsubscribe();
        // this.onEditSubscribe.unsubscribe();
        this.onSaveSubscribe.unsubscribe();
        // this.onDeleSubscribe.unsubscribe();
        this.onPrintSubscribe.unsubscribe();
    }


    private active_Route() {
        this.sub = this.activeRoute.params.subscribe(p => {
            this.mode = p['mode'];
            this.evitype = p['type'];

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
                        case '11I':
                            data.urls[1].title = "ค้นหารายการคืนของกลาง";
                            data.urls[2].title = "จัดการข้อมูลรายการคืนของกลาง จากหน่วยงานภายใน";
                            data.codePage = "ILG60-11-02-00-00";
                            this.EvidenceOutType = "0"
                            break;
                        case '11E':
                            data.urls[1].title = "ค้นหารายการคืนของกลาง";
                            data.urls[2].title = "จัดการข้อมูลรายการคืนของกลาง จากหน่วยงานภายนอก";
                            data.codePage = "ILG60-11-02-00-00";
                            this.EvidenceOutType = "1"
                            break;
                        case '12':
                            data.urls[1].title = "ค้นหารายการจัดเก็บเข้าพิพิธภัณฑ์";
                            data.urls[2].title = "จัดการข้อมูลรายการจัดเก็บเข้าพิพิธภัณฑ์";
                            data.codePage = "ILG60-12-02-00-00";
                            this.EvidenceOutType = "5"
                            break;
                        case '13':
                            data.urls[1].title = "ค้นหารายการขายของกลาง";
                            data.urls[2].title = "จัดการข้อมูลรายการขายของกลาง";
                            data.codePage = "ILG60-13-02-00-00";
                            this.EvidenceOutType = "3"
                            break;
                        case '14':
                            data.urls[1].title = "ค้นหารายการทำลายของกลาง";
                            data.urls[2].title = "จัดการข้อมูลรายการทำลายของกลาง";
                            data.codePage = "ILG60-14-02-00-00";
                            this.EvidenceOutType = "2"
                            break;
                        case '15G':
                            data.urls[1].title = "ค้นหารายการนำของกลางออกจากคลัง";
                            data.urls[2].title = "จัดการข้อมูลรายการนำของกลางออกจากคลังไปใช้ทางราชการ";
                            data.codePage = "ILG60-15-02-00-00";
                            this.EvidenceOutType = "6"
                        case '15D':
                            data.urls[1].title = "ค้นหารายการนำของกลางออกจากคลัง";
                            data.urls[2].title = "จัดการข้อมูลรายการนำของกลางออกจากคลังไปบริจาค";
                            data.codePage = "ILG60-15-02-00-00";
                            this.EvidenceOutType = "7"
                            break;
                        case '16':
                            data.urls[1].title = "ค้นหารายการโอนย้ายของกลาง";
                            data.urls[2].title = "จัดการข้อมูลรายการโอนย้ายของกลาง";
                            data.codePage = "ILG60-16-02-00-00";
                            this.EvidenceOutType = "8"
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
        });

        this.onSaveSubscribe = this.navService.onSave.subscribe(async status => {
            if (status) {
                // set action save = false
                await this.navService.setOnSave(false);

                var flgValidate = false;

                switch (this.evitype) {
                    case '11I':
                        if (this.BookNo == "" || this.BookNo == undefined
                            || this.ReceiptNo == "" || this.ReceiptNo == undefined
                            || this.PayDate == "" || this.PayDate == undefined
                            || this.PayTime == "" || this.PayTime == undefined
                            || this.StaffApproveName == "" || this.StaffApproveName == undefined
                            || this.ArrestCode == null || this.ArrestCode == undefined
                            || this.Lawsuit == null || this.Lawsuit == undefined) {
                            flgValidate = true;
                        }
                        break;

                    case '12':
                    case '13':
                    case '14':
                        if (this.StaffApproveName == "" || this.StaffApproveName == undefined
                            || this.ApproveDate == null || this.ApproveDate == undefined
                            || this.ApproveTime == null || this.ApproveTime == undefined) {
                            flgValidate = true;
                        }
                        break;

                    case '15G':
                        if (this.StaffApproveName == "" || this.StaffApproveName == undefined
                            || this.ApproveDate == null || this.ApproveDate == undefined
                            || this.ApproveTime == null || this.ApproveTime == undefined
                            || this.ReturnDate == null || this.ReturnDate == undefined) {
                            flgValidate = true;
                        }
                        break;

                    case '15D':
                        if (this.StaffReceiverName == "" || this.StaffReceiverName == undefined
                            || this.StaffApproveName == "" || this.StaffApproveName == undefined
                            || this.ApproveDate == null || this.ApproveDate == undefined
                            || this.ApproveTime == null || this.ApproveTime == undefined) {
                            flgValidate = true;
                        }
                        break;

                    case '16':
                        if (this.ApproveNo == "" || this.ApproveNo == undefined
                            || this.StaffApproveName == "" || this.StaffApproveName == undefined
                            || this.ApproveDate == null || this.ApproveDate == undefined
                            || this.ApproveTime == null || this.ApproveTime == undefined) {
                            flgValidate = true;
                        }
                        break;
                }

                if (this.EvidenceOutNo == "" || this.EvidenceOutNo == undefined
                    || this.EvidenceOutNoDate == null || this.EvidenceOutNoDate == undefined
                    || this.EvidenceOutNoTime == "" || this.EvidenceOutNoTime == undefined
                    || (this.evitype != '11I' && (this.StaffRequestName == "" || this.StaffRequestName == undefined))
                    || this.WarehouseID == "" || this.WarehouseID == "0" || this.WarehouseID == undefined
                    || flgValidate) {
                    this.isRequired = true;
                    this.ShowAlertWarning(Message.checkData);

                    return false;
                }

                if (this.mode === 'C') {
                    await this.onInsEvidenceOut();
                } else if (this.mode === 'R') {
                    // if (this.OldWarehouseID == this.WarehouseID) {
                    //     await this.onUdpEvidenceIn();
                    // } else {
                    //     this.onUdpEvidenceIn();
                    // }

                }
            }
        });
    }

    LoadDataFromLocalStorage() {
        let tempUser = this.rawStaffOptions.filter(f => f.StaffCode == localStorage.getItem("staffCode"));

        // ----- ผู้ขอ / ผู้เสนอ -----
        this.oEviOutStaffRequest = {
            EvidenceOutStaffID: "",
            EvidenceOutID: "",
            StaffCode: localStorage.getItem("staffCode"),
            TitleName: tempUser[0].TitleName,
            FirstName: tempUser[0].FirstName,
            LastName: tempUser[0].LastName,
            PositionCode: tempUser[0].OperationPosCode,
            PositionName: localStorage.getItem("operationPosName"),
            PosLevel: tempUser[0].PosLevel,
            PosLevelName: tempUser[0].PosLevelName,
            DepartmentCode: tempUser[0].OperationDeptCode,
            DepartmentName: tempUser[0].OperationDeptName,
            DepartmentLevel: tempUser[0].DeptLevel,
            OfficeCode: localStorage.getItem("officeCode"),
            OfficeName: tempUser[0].OfficeName,
            OfficeShortName: localStorage.getItem("officeShortName"),
            ContributorID: "45",
            IsActive: "1"
        }

        this.StaffRequestName = localStorage.getItem("fullName");
        this.PosRequest = localStorage.getItem("operationPosName");
        this.DeptRequest = localStorage.getItem("officeShortName");


        // ----- ผู้อนุมัติ -----
        this.oEviOutStaffApprove = {
            EvidenceOutStaffID: "",
            EvidenceOutID: "",
            StaffCode: localStorage.getItem("staffCode"),
            TitleName: tempUser[0].TitleName,
            FirstName: tempUser[0].FirstName,
            LastName: tempUser[0].LastName,
            PositionCode: tempUser[0].OperationPosCode,
            PositionName: localStorage.getItem("operationPosName"),
            PosLevel: tempUser[0].PosLevel,
            PosLevelName: tempUser[0].PosLevelName,
            DepartmentCode: tempUser[0].OperationDeptCode,
            DepartmentName: tempUser[0].OperationDeptName,
            DepartmentLevel: tempUser[0].DeptLevel,
            OfficeCode: localStorage.getItem("officeCode"),
            OfficeName: tempUser[0].OfficeName,
            OfficeShortName: localStorage.getItem("officeShortName"),
            ContributorID: "44",
            IsActive: "1"
        }

        this.StaffApproveName = localStorage.getItem("fullName");
        this.PosApprove = localStorage.getItem("operationPosName");
        this.DeptApprove = localStorage.getItem("officeShortName");
        this.DeptCodeApprove = localStorage.getItem("officeCode");


        // ----- ผู้จำหน่าย -----
        this.oEviOutStaffEvidence = {
            EvidenceOutStaffID: "",
            EvidenceOutID: "",
            StaffCode: localStorage.getItem("staffCode"),
            TitleName: tempUser[0].TitleName,
            FirstName: tempUser[0].FirstName,
            LastName: tempUser[0].LastName,
            PositionCode: tempUser[0].OperationPosCode,
            PositionName: localStorage.getItem("operationPosName"),
            PosLevel: tempUser[0].PosLevel,
            PosLevelName: tempUser[0].PosLevelName,
            DepartmentCode: tempUser[0].OperationDeptCode,
            DepartmentName: tempUser[0].OperationDeptName,
            DepartmentLevel: tempUser[0].DeptLevel,
            OfficeCode: localStorage.getItem("officeCode"),
            OfficeName: tempUser[0].OfficeName,
            OfficeShortName: localStorage.getItem("officeShortName"),
            ContributorID: "44",
            IsActive: "1"
        }

        this.StaffEvidenceName = localStorage.getItem("fullName");
        this.PosEvidence = localStorage.getItem("operationPosName");
        this.DeptEvidence = localStorage.getItem("officeShortName");
        this.DeptCodeEvidence = localStorage.getItem("officeCode");
    }

    ShowEvidenceOut() {
        this.EvidenceOutService.getByCon(this.EvidenceOutID).then(async res => {
            if (res != null && res.IsSuccess != "False") {
                // this.ListEvidenceInItem = [];
                this.oEvidenceOut = res
                // this.ListEvidenceInItem = res.EvidenceInItem;

                this.EvidenceOutCode = res.EvidenceOutCode;
                this.EvidenceOutDate = setDateMyDatepicker(new Date(res.EvidenceOutDate));
                this.EvidenceOutTime = res.EvidenceOutTime;
                this.EvidenceOutNo = res.EvidenceOutNo;
                this.EvidenceOutNoDate = setDateMyDatepicker(new Date(res.EvidenceOutNoDate));
                this.EvidenceOutNoTime = res.EvidenceOutNoTime;
                this.BookNo = res.BookNo;
                this.ReceiptNo = res.ReceiptNo;
                this.PayDate = setDateMyDatepicker(new Date(res.PayDate));
                this.PayTime = res.PayTime;
                this.ApproveDate = setDateMyDatepicker(new Date(res.ApproveDate));
                this.ApproveTime = res.ApproveTime;
                if (res.ReturnDate == null || res.ReturnDate == '') { this.ReturnDate = ""; } else { this.ReturnDate = setDateMyDatepicker(new Date(res.ReturnDate)) }
                this.Remark = res.Remark;
                this.ApproveNo = res.ApproveNo
                

                var sTemp = res.EvidenceInStaff.filter(f => f.ContributorID == "45");
                if (sTemp.length > 0) {
                    this.StaffRequestName = `${sTemp[0].TitleName == 'null' || sTemp[0].TitleName == null ? '' : sTemp[0].TitleName}`
                        + `${sTemp[0].FirstName == 'null' || sTemp[0].FirstName == null ? '' : sTemp[0].FirstName}` + ' '
                        + `${sTemp[0].LastName == 'null' || sTemp[0].LastName == null ? '' : sTemp[0].LastName}`;
                    this.PosRequest = sTemp[0].PositionName;
                    this.DeptRequest = sTemp[0].OfficeName;
                    this.StaffRequestID = sTemp[0].EvidenceInStaffID;
                    this.oEviOutStaffRequest = sTemp[0];
                }

                if (res.EvidenceOutCode) {
                    this.EvidenceOutCode = res.EvidenceOutCode;
                } else {
                    this.EvidenceOutCode = "Auto Generate";
                }

                if (res.EvidenceOutDate) {
                    this.EvidenceOutDate = setDateMyDatepicker(new Date(res.EvidenceOutDate));
                    this.EvidenceOutTime = res.EvidenceOutTime;
                } else {
                    this.EvidenceOutDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
                    this.EvidenceOutTime = this.getCurrentTime();
                }

                
                sTemp = res.EvidenceInStaff.filter(f => f.ContributorID == "44");
                if (sTemp.length > 0) {
                    this.StaffApproveName = `${sTemp[0].TitleName == 'null' || sTemp[0].TitleName == null ? '' : sTemp[0].TitleName}`
                        + `${sTemp[0].FirstName == 'null' || sTemp[0].FirstName == null ? '' : sTemp[0].FirstName}` + ' '
                        + `${sTemp[0].LastName == 'null' || sTemp[0].LastName == null ? '' : sTemp[0].LastName}`;
                    this.PosApprove = sTemp[0].PositionName;
                    this.DeptApprove = sTemp[0].OfficeName;
                    this.StaffApproveID = sTemp[0].EvidenceInStaffID;
                    this.oEviOutStaffApprove = sTemp[0];
                }


                sTemp = res.EvidenceInStaff.filter(f => f.ContributorID == "43");
                if (sTemp.length > 0) {
                    this.StaffEvidenceName = `${sTemp[0].TitleName == 'null' || sTemp[0].TitleName == null ? '' : sTemp[0].TitleName}`
                        + `${sTemp[0].FirstName == 'null' || sTemp[0].FirstName == null ? '' : sTemp[0].FirstName}` + ' '
                        + `${sTemp[0].LastName == 'null' || sTemp[0].LastName == null ? '' : sTemp[0].LastName}`;
                    this.PosEvidence = sTemp[0].PositionName;
                    this.DeptEvidence = sTemp[0].OfficeName;
                    this.StaffEvidenceID = sTemp[0].EvidenceInStaffID;
                    this.oEviOutStaffEvidence = sTemp[0];
                }

                // -------------- Product -------------------------
                // let t = 0;
                // this.oEvidenceIn.EvidenceInItem.map(item => {
                //     item.ReceiveQty = item.EvidenceStockBalance[0].ReceiveQty;
                //     item.ReceiveNetVolumn = item.EvidenceStockBalance[0].ReceiveNetVolumn;
                //     item.IsNewItem = false;
                //     item.IsDelItem = false;
                //     item.ProductSeq = t;

                //     if (item.EvidenceStockBalance.length > 0) {
                //         this.WarehouseID = item.EvidenceStockBalance[0].WarehouseID;
                //         this.OldWarehouseID = item.EvidenceStockBalance[0].WarehouseID;
                //     }

                //     t += 1;
                // });

                // -------------- Document -------------------------

                this.ListDoc = [];

                this.proveService.MasDocumentMaingetAll(this.oEvidenceOut.EvidenceOutID, "9").then(async doc => {
                    if (doc.length > 0) {
                        this.ListDoc = doc;

                        for (var i = 0; i < this.ListDoc.length; i += 1) {
                            this.ListDoc[i].DocumentSeq = i;
                            this.ListDoc[i].IsNewItem = false;
                            this.ListDoc[i].IsDelItem = false;
                        }
                    }
                }, (err: HttpErrorResponse) => {
                    this.ShowAlertError(err.message);
                });

                this.preloader.setShowPreloader(false);
            } else {
                this.ShowAlertError("พบปัญหาที่ API EvidenceOutgetByCon");
                this.preloader.setShowPreloader(false);
                this.router.navigate(['/evidenceOut/list']);
            }
        }, (err: HttpErrorResponse) => {
            this.ShowAlertError("API EvidenceIngetByCon :: " + err.message);
        });
    }

    async onInsEvidenceOut() {
        this.preloader.setShowPreloader(true);
        await this.setData();
        await this.TransactionRunningForIns();
    }

    async setData() {
        this.oEvidenceOut = {
            EvidenceOutID: this.EvidenceOutID,
            EvidenceOutCode: this.EvidenceOutCode,
            EvidenceOutDate: this.ConvertDateYYYYmmdd(this.EvidenceOutDate.date),
            EvidenceOutTime: this.EvidenceOutTime,
            EvidenceOutType: this.EvidenceOutType,
            EvidenceOutNo: this.EvidenceOutNo,
            EvidenceOutNoDate: this.ConvertDateYYYYmmdd(this.EvidenceOutNoDate.date),
            EvidenceOutNoTime: this.EvidenceOutNoTime,
            BookNo: this.BookNo,
            ReceiptNo: this.ReceiptNo,
            PayDate: this.ConvertDateYYYYmmdd(this.PayDate.date),
            PayTime: this.PayTime,
            ApproveDate: this.ConvertDateYYYYmmdd(this.ApproveDate.date),
            ApproveTime: this.ApproveTime,
            ReturnDate: this.ConvertDateYYYYmmdd(this.ReturnDate.date),
            Remark: this.Remark,
            WarehouseID: this.WarehouseID,
            ApproveNo: this.ApproveNo,
            IsActive: "1",
            EvidenceOutItem: [],
            EvidenceOutStaff: []
        };


        if(this.evitype != "11I"){
            this.oEvidenceOut.BookNo = null;
            this.oEvidenceOut.ReceiptNo = null;
            this.oEvidenceOut.PayDate = null;
            this.oEvidenceOut.PayTime = null;
        }


        // this.ListEvidenceInItem.map(async item => {
        //     item.DamageQtyUnit = item.DeliveryQtyUnit;
        //     item.DamageNetVolumnUnit = item.DeliveryNetVolumnUnit;
            

        //     this.oStockBalance = {
        //         StockID: item.EvidenceStockBalance[0].StockID,
        //         WarehouseID: this.WarehouseID,
        //         EvidenceInItemID: item.EvidenceInItemID,
        //         ReceiveQty: item.ReceiveQty,
        //         ReceiveQtyUnit: item.DeliveryQtyUnit,
        //         ReceiveSize: item.DeliverySize,
        //         ReceiveSizeUnit: item.DeliverySizeUnit,
        //         ReceiveNetVolumn: item.ReceiveNetVolumn,
        //         ReceiveNetVolumnUnit: item.DeliveryQtyUnit,
        //         BalanceQty: item.ReceiveQty,
        //         BalanceQtyUnit: item.DeliveryQtyUnit,
        //         BalanceSize: item.DeliverySize,
        //         BalanceSizeUnit: item.DeliverySizeUnit,
        //         BalanceNetVolumn: item.ReceiveNetVolumn,
        //         BalanceNetVolumnUnit: item.ReceiveNetVolumn,
        //         IsFinish: "2",
        //         IsReceive: "1"
        //     }

        //     item.EvidenceStockBalance = [];
        //     item.EvidenceStockBalance.push(this.oStockBalance);
        // });

        //await this.generateItemCode();

        // this.oEvidenceIn.EvidenceInItem = this.ListEvidenceInItem;
        this.oEvidenceOut.EvidenceOutStaff = [];

        // ผู้ขอ, ผู้เสนอ
        if (this.evitype != "11I"
            && this.oEviOutStaffRequest != null 
            && this.oEviOutStaffRequest != undefined) {
            this.oEvidenceOut.EvidenceOutStaff.push(this.oEviOutStaffRequest);
        }

        // ผู้อนุมัติ, ผู้พิจารณา
        if (this.evitype != "11E"
            && this.oEviOutStaffApprove != null 
            && this.oEviOutStaffApprove != undefined) {
            this.oEvidenceOut.EvidenceOutStaff.push(this.oEviOutStaffApprove);
        }

        // ผู้จำหน่าย
        if (this.oEviOutStaffEvidence != null && this.oEviOutStaffEvidence != undefined) {
            this.oEvidenceOut.EvidenceOutStaff.push(this.oEviOutStaffEvidence);
        }
    }

    async TransactionRunningForIns() {
        await this.RevService.TransactionRunninggetByCon("ops_evidence_out", this.DeptCodeEvidence).then(async item => {
            if (item.length == 0) {
                this.RevService.TransactionRunninginsAll(this.DeptCodeEvidence, "ops_evidence_in", "RC").then(async res => {
                    if (res.IsSuccess) {
                        this.EvidenceOutCode = "RC" + this.oEviOutStaffEvidence.OfficeCode + (this.EvidenceOutDate.date.year + 543).toString().substring(4, 2) + "00001";
                        this.oEvidenceOut.EvidenceOutCode = this.EvidenceOutCode;

                        await this.InsEvidenceOut();
                    }
                }, (error) => { console.error(error); return false; });
            }
            else {
                await this.RevService.TransactionRunningupdByCon(item[0].RunningID).then(async res => {
                    if (res.IsSuccess) {
                        var pad = "00000"
                        var RunningNo = pad.substring(0, pad.length - item[0].RunningNo.toString().length) + (+item[0].RunningNo + 1);

                        this.EvidenceOutCode = "RC" + this.oEviOutStaffEvidence.OfficeCode + (this.EvidenceOutDate.date.year + 543).toString().substring(4, 2) + RunningNo;
                        this.oEvidenceOut.EvidenceOutCode = this.EvidenceOutCode;

                        await this.InsEvidenceOut();
                    }
                }, (error) => { console.error(error); return false; });
            }

        }, (error) => { console.error(error); return false; });
    }

    InsEvidenceOut() {
        var isSuccess = true;

        this.EvidenceOutService.EvidenceOutinsAll(this.oEvidenceOut).then(async item => {
            if (item.IsSuccess) {
                this.EvidenceOutID = item.EvidenceOutID;
                this.oEvidenceOut.EvidenceOutID = item.EvidenceOutID;

                if (this.ListDoc.length > 0) {
                    this.ListDoc.map(async item => {
                        item.ReferenceCode = this.EvidenceOutID;

                        await this.proveService.MasDocumentMaininsAll(item).then(IsSuccess => {
                            if (!IsSuccess) {
                                isSuccess = IsSuccess;
                                return false;
                            }
                        }, (error) => { isSuccess = false; console.error(error); return false; });
                    });
                }

                if (isSuccess) {
                    this.ShowAlertSuccess(Message.saveComplete);
                    this.onComplete();
                    this.WarehouseID = "1";
                    await this.ShowEvidenceOut();

                    this.preloader.setShowPreloader(false);
                    this.router.navigate([`/evidenceOut/manage/${this.evitype}/R/${this.EvidenceOutID}`]);
                }
            } else {
                this.ShowAlertError(Message.saveFail);
            }
        }, (error) => { console.error(error); return false; });
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


    // ***********************************************
    // ------------ DateTime & All Function ----------
    // ***********************************************
    getCurrentDate() {
        let date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toISOString().substring(0, 10);
    }

    getCurrentTime() {
        let date = new Date();
        return date.getHours() + ":" + date.getMinutes();
    }

    getIndexOf(arr, val, prop) {
        var l = arr.length,
            k = 0;
        for (k = 0; k < l; k = k + 1) {
            if (arr[k][prop] == val) {
                return k;
            }
        }
        return -1;
    }

    ConvertDateYYYYmmdd(_Date: any) {
        let tDate = _Date;

        if (tDate != undefined) {
            return setZeroHours(new Date(`${tDate.year}-${tDate.month}-${tDate.day}`));
        }

        return "";
    }


    // *******************************************
    // -------------- ผู้ขอ หรือ ผู้เสนอ -------------
    // *******************************************
    async getEvidenceOutStaff() {
        await this.EvidenceOutService.StaffgetByKeyword().then(async res => {
            if (res) {
                this.rawStaffOptions = res;
                this.LoadDataFromLocalStorage();
            }
        }, (err: HttpErrorResponse) => {
            this.ShowAlertError("พบปัญหาในการติดต่อ Server");
        });
    }

    StaffRequestonAutoChange(value: string) {
        this.ClearStaffRequestData();

        if (value == '') {
            this.StaffRequestoptions = [];
        } else {
            if (this.rawStaffOptions.length == 0) {
                this.getEvidenceOutStaff();
            }

            this.StaffRequestoptions = this.rawStaffOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1 || f.LastName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    StaffRequestonAutoFocus(value: string) {
        if (value == '') {
            this.StaffRequestoptions = [];
            this.ClearStaffRequestData();
        }
    }

    StaffRequestonAutoSelecteWord(event) {
        this.oEviOutStaffRequest = {
            EvidenceOutStaffID: this.StaffRequestID,
            EvidenceOutID: this.EvidenceOutID,
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
            ContributorID: "45",
            IsActive: "1"
        }

        this.PosRequest = event.OperationPosName;
        this.DeptRequest = event.OfficeName;
        this.DeptCodeRequest = event.officeCode;
    }

    ClearStaffRequestData() {
        this.PosRequest = "";
        this.DeptRequest = "";

        this.oEviOutStaffRequest = {
            EvidenceOutStaffID: this.StaffRequestID,
            EvidenceOutID: this.EvidenceOutID,
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
            ContributorID: "45",
            IsActive: "1"
        }
    }


    // *******************************************
    // ------------------ ผู้อนุมัติ -----------------
    // *******************************************
    StaffApproveonAutoChange(value: string) {
        this.ClearStaffApproveData();

        if (value == '') {
            this.StaffApproveoptions = [];
        } else {
            if (this.rawStaffOptions.length == 0) {
                this.getEvidenceOutStaff();
            }

            this.StaffApproveoptions = this.rawStaffOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1 || f.LastName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    StaffApproveonAutoFocus(value: string) {
        if (value == '') {
            this.StaffApproveoptions = [];
            this.ClearStaffApproveData();
        }
    }

    StaffApproveonAutoSelecteWord(event) {
        this.oEviOutStaffApprove = {
            EvidenceOutStaffID: this.StaffApproveID,
            EvidenceOutID: this.EvidenceOutID,
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
            ContributorID: "44",
            IsActive: "1"
        }

        this.PosApprove = event.OperationPosName;
        this.DeptApprove = event.OfficeName;
        this.DeptCodeApprove = event.officeCode;
    }

    ClearStaffApproveData() {
        this.PosApprove = "";
        this.DeptApprove = "";

        this.oEviOutStaffApprove = {
            EvidenceOutStaffID: this.StaffApproveID,
            EvidenceOutID: this.EvidenceOutID,
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
            ContributorID: "44",
            IsActive: "1"
        }
    }


    // *******************************************
    // ------------------ ผู้จำหน่าย -----------------
    // *******************************************
    StaffEvidenceonAutoChange(value: string) {
        this.ClearStaffEvidenceData();

        if (value == '') {
            this.StaffEvidenceoptions = [];
        } else {
            if (this.rawStaffOptions.length == 0) {
                this.getEvidenceOutStaff();
            }

            this.StaffEvidenceoptions = this.rawStaffOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1 || f.LastName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    StaffEvidenceonAutoFocus(value: string) {
        if (value == '') {
            this.StaffEvidenceoptions = [];
            this.ClearStaffEvidenceData();
        }
    }

    StaffEvidenceonAutoSelecteWord(event) {
        this.oEviOutStaffEvidence = {
            EvidenceOutStaffID: this.StaffEvidenceID,
            EvidenceOutID: this.EvidenceOutID,
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
            ContributorID: "43",
            IsActive: "1"
        }

        this.PosEvidence = event.OperationPosName;
        this.DeptEvidence = event.OfficeName;
        this.DeptCodeEvidence = event.officeCode;
    }

    ClearStaffEvidenceData() {
        this.PosEvidence = "";
        this.DeptEvidence = "";

        this.oEviOutStaffEvidence = {
            EvidenceOutStaffID: this.StaffEvidenceID,
            EvidenceOutID: this.EvidenceOutID,
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
            ContributorID: "43",
            IsActive: "1"
        }
    }

    // **********************************
    // ------------ Document -----------
    // **********************************
    AddDocument() {
        this.oDocument = {};
        this.oDocument.ReferenceCode = this.EvidenceOutID;
        this.oDocument.DocumentSeq = this.ListDoc.length;
        this.oDocument.DocumentType = "9";
        this.oDocument.IsNewItem = true;
        this.oDocument.IsDelItem = false;

        this.ListDoc.push(this.oDocument);
    }

    changeComunicateFile(e: any, i: number) {
        let reader = new FileReader();
        let file = e.target.files[0];
        let fileName: string = file.name;
        let fileType: string = file.type;

        reader.readAsDataURL(file);
        reader.onload = () => {
            let dataSource = reader.result.split(',')[1];
            if (dataSource && dataSource !== undefined) {
                this.ListDoc[i].FilePath = e.target.value;
                this.ListDoc[i].DataSource = "";
                this.ListDoc[i].DocumentType = 9;
                this.ListDoc[i].DocumentName = fileName;
                this.ListDoc[i].IsActive = 1;
            }
        };
    }


    DelDocument(i: number) {
        swal({
            title: '',
            text: Message.confirmDeleteDoc,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.value) {
                var aIndex;
                aIndex = this.getIndexOf(this.ListDoc, i, "DocumentSeq");

                if (aIndex != -1) {
                    if (this.ListDoc[aIndex].IsNewItem == false) {
                        this.ListDoc[aIndex].IsDelItem = true;
                    }
                    else {
                        this.ListDoc.splice(aIndex, 1);
                    }
                }
            }
        })
    }
}
