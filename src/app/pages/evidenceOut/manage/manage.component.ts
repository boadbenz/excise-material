import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { EvidenceOutService } from '../evidenceOut.service';
import { EvidenceService } from '../../evidenceIn/evidenceIn.service'
import { HttpErrorResponse } from '@angular/common/http';
import { EvidenceOut, EvidenceOutStaff, Document, EvidenceOutItem, EvidenceOutStockBalance } from '../evidenceOut';
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
import { MasterService } from '../../model/master.service';
import { Evidence_In, EvidenceInStaff, EvidenceStockBalance, EvidenceInItem } from '../../evidenceIn/evidenceIn';
declare var $: any;

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
    showEditByEvidencIn: any;
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
    WarehouseID: string;        // รหัสคลังต้นทาง กรณีโอนย้ายของกลาง
    WarehouseName: string;      // ชื่อคลังต้นทาง กรณีโอนย้ายของกลาง
    WarehouseDestID: string;        // รหัสคลังปลายทาง กรณีโอนย้ายของกลาง
    WarehouseDestName: string;      // ชื่อคลังปลายทาง กรณีโอนย้ายของกลาง
    OfficeDestCode: string;     // รหัสหน่วยงานปลายทาง กรณีโอนย้ายของกลาง
    OfficeDestName: string;
    ApproveNo: string;          // เลขที่หนังสืออนุมัติ กรณีโอนย้ายของกลาง
    EvidenceOutCode: string;    // เลขที่จำหน่ายของกลาง / เลขที่คืน / เลขที่นำออก
    EvidenceOutDate: any;       // วันที่จำหน่าย
    EvidenceOutTime: string;    // เวลาที่จำหน่าย
    EvidenceOutType: string;    // ประเภทการจำหน่ายของกลาง 0 = คืนภายใน, 1 = คืนภายนอก, 2 = ทำลาย, 3 = ขาย, 4 = ยืม, 5 = เข้าพิพิธภัณฑ์, 6 = ใช้ในราชการ, 7 = บริจาค, 8 = โอนย้าย
    DestinationCode: string;    // รหัสหน่วยงานที่ Login
    EvidenceInType: string;     // ประเภทการตรวจรับ
    Textsearch: string;
    EviCode: string;
    EvidenceInID: string;       // รหัสการตรวจรับของกลาง กรณีโอนย้าย


    StaffRequestID: string;     // รหัสผู้ขอ / ผู้เสนอ
    StaffRequestoptions = [];   // ผู้ขอ / ผู้เสนอ
    StaffApproveID: string;     // รหัสผู้อนุมัติ
    StaffApproveoptions = [];   // ผู้อนุมัติ
    StaffEvidenceID: string;    // รหัสผู้จำหน่าย
    StaffEvidenceoptions = [];  // ผู้จำหน่าย
    StaffReceiveID: string;    // รหัสผู้รับบริจาค
    StaffReceiveoptions = [];  // ผู้รับบริจาค
    rawStaffOptions = [];       // ผู้ขอ / ผู้เสนอ
    rawWarehouseOptions = [];   // Warehouse
    Warehouseoptions = [];
    rawWarehouseDestOptions = [];
    WarehouseDestoptions = [];
    ListDoc = [];
    ListEvidenceOutItem = [];   // List Product EvidenceOut
    UnitOption = [];            // unit
    rawProductOptions = [];
    Productoptions = [];
    rawProductList = [];
    ProductList = [];
    rawStationOptions = [];
    StationOptions = [];


    oEviOutStaffRequest: EvidenceOutStaff;
    oEviOutStaffApprove: EvidenceOutStaff;
    oEviOutStaffEvidence: EvidenceOutStaff;
    oEviOutStaffReceive: EvidenceOutStaff;
    oEvidenceOutItem: EvidenceOutItem;
    oEvidenceOut: EvidenceOut;
    oStockBalance: EvidenceOutStockBalance;
    oEvidenceIn: Evidence_In;
    oEviInStaff: EvidenceInStaff;
    oEviInRecvStaff: EvidenceInStaff;
    oEvidenceInItem: EvidenceInItem;
    oEvidenceStockBalance: EvidenceStockBalance;
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
        private EviService: EvidenceService,
        private proveService: ProveService,
        private MasService: MasterService,
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
        await this.getUnit();
        await this.getStation();

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
        this.WarehouseID = "";
        this.DestinationCode = localStorage.getItem("officeCode");
        this.showEditByEvidencIn = false;

        await this.getWarehouse();

        if (this.mode == "R") {          
            await this.ShowEvidenceOut();
            await this.getProduct();
        } else {
            this.preloader.setShowPreloader(false);
        }
    }

    ngOnDestroy(): void {
        this.onCancelSubscribe.unsubscribe();
        //this.onEditSubscribe.unsubscribe();
        this.onSaveSubscribe.unsubscribe();
        this.onDeleSubscribe.unsubscribe();
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

                    if (p['code']) {
                        this.EvidenceOutID = p['code'];
                    }
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
                            this.EvidenceInType = "0";
                            this.EviCode = "RT";
                            break;
                        case '11E':
                            data.urls[1].title = "ค้นหารายการคืนของกลาง";
                            data.urls[2].title = "จัดการข้อมูลรายการคืนของกลาง จากหน่วยงานภายนอก";
                            data.codePage = "ILG60-11-03-00-00";
                            this.EvidenceOutType = "0"
                            this.EvidenceInType = "1";
                            this.EviCode = "RT";
                            break;
                        case '12':
                            data.urls[1].title = "ค้นหารายการจัดเก็บเข้าพิพิธภัณฑ์";
                            data.urls[2].title = "จัดการข้อมูลรายการจัดเก็บเข้าพิพิธภัณฑ์";
                            data.codePage = "ILG60-12-02-00-00";
                            this.EvidenceOutType = "4"
                            this.EvidenceInType = "0";
                            this.EviCode = "MU";
                            break;
                        case '13':
                            data.urls[1].title = "ค้นหารายการขายทอดตลาด";
                            data.urls[2].title = "จัดการข้อมูลรายการขายทอดตลาด";
                            data.codePage = "ILG60-13-02-00-00";
                            this.EvidenceOutType = "2"
                            this.EvidenceInType = "0";
                            this.EviCode = "SL";
                            break;
                        case '14':
                            data.urls[1].title = "ค้นหารายการทำลายของกลาง";
                            data.urls[2].title = "จัดการข้อมูลรายการทำลายของกลาง";
                            data.codePage = "ILG60-14-02-00-00";
                            this.EvidenceOutType = "1"
                            this.EvidenceInType = "0";
                            this.EviCode = "DT";
                            break;
                        case '15G':
                            data.urls[1].title = "ค้นหารายการนำของกลางออกจากคลัง";
                            data.urls[2].title = "จัดการข้อมูลรายการนำของกลางออกจากคลังไปใช้ทางราชการ";
                            data.codePage = "ILG60-15-02-00-00";
                            this.EvidenceOutType = "3"
                            this.EvidenceInType = "0";
                            this.EviCode = "BO";
                            break;
                        case '15D':
                            data.urls[1].title = "ค้นหารายการนำของกลางออกจากคลัง";
                            data.urls[2].title = "จัดการข้อมูลรายการนำของกลางออกจากคลังไปบริจาค";
                            data.codePage = "ILG60-15-03-00-00";
                            this.EvidenceOutType = "5"
                            this.EvidenceInType = "0";
                            this.EviCode = "DN";
                            break;
                        case '16':
                            data.urls[1].title = "ค้นหารายการโอนย้ายของกลาง";
                            data.urls[2].title = "จัดการข้อมูลรายการโอนย้ายของกลาง";
                            data.codePage = "ILG60-16-02-00-00";
                            this.EvidenceOutType = "6"
                            this.EvidenceInType = "0";
                            this.EviCode = "TF";
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
                            // || this.ArrestCode == null || this.ArrestCode == undefined
                            // || this.Lawsuit == null || this.Lawsuit == undefined
                        ) {
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
                            || this.ReturnDate == null || this.ReturnDate == undefined
                            || this.Remark == null || this.Remark == undefined
                        ) {
                            flgValidate = true;
                        }
                        break;

                    case '15D':
                        if (this.StaffReceiverName == "" || this.StaffReceiverName == undefined
                            || this.StaffApproveName == "" || this.StaffApproveName == undefined
                            || this.ApproveDate == null || this.ApproveDate == undefined
                            || this.ApproveTime == null || this.ApproveTime == undefined
                            || this.Remark == null || this.Remark == undefined
                        ) {
                            flgValidate = true;
                        }
                        break;

                    case '16':
                        if (this.ApproveNo == "" || this.ApproveNo == undefined
                            || this.StaffApproveName == "" || this.StaffApproveName == undefined
                            || this.ApproveDate == null || this.ApproveDate == undefined
                            || this.ApproveTime == null || this.ApproveTime == undefined
                            || this.OfficeDestName == "" || this.OfficeDestName == undefined
                            || this.WarehouseDestName == "" || this.WarehouseDestName == undefined
                            || this.Remark == null || this.Remark == undefined) {
                            flgValidate = true;
                        }
                        break;
                }

                let listProd = this.ListEvidenceOutItem.filter(f => f.ProductDesc == "" || f.Qty.toString() == "");

                if (this.EvidenceOutNo == "" || this.EvidenceOutNo == undefined
                    || this.EvidenceOutNoDate == null || this.EvidenceOutNoDate == undefined
                    || this.EvidenceOutNoTime == "" || this.EvidenceOutNoTime == undefined
                    || (this.evitype != '11I' && (this.StaffRequestName == "" || this.StaffRequestName == undefined))
                    || this.WarehouseID == "" || this.WarehouseID == "0" || this.WarehouseID == undefined
                    || flgValidate || listProd.length > 0 || this.ListEvidenceOutItem.length == 0) {
                    this.isRequired = true;
                    this.ShowAlertWarning(Message.checkData);

                    return false;
                }

                if (this.mode === 'C') {
                    await this.onInsEvidenceOut();
                } else if (this.mode === 'R') {
                    await this.onUdpEvidenceOut();
                }
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
                            if(this.evitype.length == 3){
                                this.evitype = this.evitype.substring(0, 2);
                            }

                            this.router.navigate([`/evidenceOut/list/${this.evitype}`]);
                        } else if (this.mode === 'R') {
                            // set false
                            this.navService.setSaveButton(false);
                            this.navService.setCancelButton(false);
                            // set true
                            this.navService.setPrintButton(true);
                            this.navService.setEditButton(true);
                            this.navService.setDeleteButton(true);
                            this.navService.setEditField(true);

                            this.ShowEvidenceOut();
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
                })
            }
        });

        this.onDeleSubscribe = this.navService.onDelete.subscribe(async status => {
            if (status) {
                if (this.evitype == "16" && this.oEvidenceIn.IsReceive == "1") {
                    this.ShowAlertWarning("ไม่อนุญาตให้ทำการลบข้อมูลการโอนย้าย เนื่องจากของกลางถูกรตรวจรับของกลางแล้ว !!!");
                    return false;
                }

                await this.navService.setOnDelete(false);
                this.onDelete();
            }
        });

        // this.onEditSubscribe = this.navService.onEdit.subscribe(async status => {
        //     if (this.evitype == "16" && this.oEvidenceIn.IsReceive == "1") {
        //         this.ShowAlertWarning("ไม่อนุญาตให้ทำการแก้ไขข้อมูลการโอนย้าย เนื่องจากของกลางถูกรตรวจรับของกลางแล้ว !!!");
        //         this.onComplete();
        //     }
        // })
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
            ContributorID: "39",
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
            ContributorID: "43",
            IsActive: "1"
        }

        this.StaffEvidenceName = localStorage.getItem("fullName");
        this.PosEvidence = localStorage.getItem("operationPosName");
        this.DeptEvidence = localStorage.getItem("officeShortName");
        this.DeptCodeEvidence = localStorage.getItem("officeCode");

        // ----- ผู้บริจาค -----
        /*
        this.oEviOutStaffReceive = {
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

       this.StaffReceiverName = localStorage.getItem("fullName");
       this.PosReceiver = localStorage.getItem("operationPosName");
       this.DeptReceiver = localStorage.getItem("officeShortName");
       this.DeptCodeReceiver = localStorage.getItem("officeCode");
       */
    }

    ShowEvidenceOut() {
        this.EvidenceOutService.getByCon(this.EvidenceOutID).then(async res => {
            if (res != null && res.IsSuccess != "False") {
                this.ListEvidenceOutItem = [];
                this.oEvidenceOut = res
                this.ListEvidenceOutItem = res.EvidenceOutItem;

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
                this.OfficeDestCode = res.OfficeCode;
                this.WarehouseDestID = res.WarehouseID;
                this.EvidenceInID = res.EvidenceInID;
                if (res.ReturnDate == null || res.ReturnDate == '') { this.ReturnDate = ""; } else { this.ReturnDate = setDateMyDatepicker(new Date(res.ReturnDate)) }
                this.Remark = `${res.Remark == 'null' || res.Remark == null ? '' : res.Remark}`;
                this.ApproveNo = res.ApproveNo;

                let tWarehouse;

                if(this.evitype == "16"){
                    this.EviService.getByCon(this.EvidenceInID, "").then(async resIn => {
                        if (resIn != null && resIn.IsSuccess != "False") {
                            this.oEvidenceIn = resIn[0];

                            var OfficeTemp = this.rawStationOptions.filter(f => f.OfficeCode === this.OfficeDestCode);                            
                            this.OfficeDestName = OfficeTemp[0].OfficeName;
                            await this.getWarehouseDest();

                            tWarehouse = this.rawWarehouseDestOptions.filter(f => f.WarehouseID === this.WarehouseDestID);
                            this.WarehouseDestName = tWarehouse[0].WarehouseName;

                            if(this.oEvidenceIn.IsReceive == "1"){
                                this.showEditByEvidencIn = true;
                            } else {
                                this.showEditByEvidencIn = false;
                            }
                        }
                    }, (err: HttpErrorResponse) => {
                        this.ShowAlertError("API EvidenceIngetByCon :: " + err.message);
                    });
                }
                
                
                var sTemp = res.EvidenceOutStaff.filter(f => f.ContributorID == "39");
                if (sTemp.length > 0) {
                    this.StaffRequestName = `${sTemp[0].TitleName == 'null' || sTemp[0].TitleName == null ? '' : sTemp[0].TitleName}`
                        + `${sTemp[0].FirstName == 'null' || sTemp[0].FirstName == null ? '' : sTemp[0].FirstName}` + ' '
                        + `${sTemp[0].LastName == 'null' || sTemp[0].LastName == null ? '' : sTemp[0].LastName}`;
                    this.PosRequest = sTemp[0].PositionName;
                    this.DeptRequest = sTemp[0].OfficeName;
                    this.StaffRequestID = sTemp[0].EvidenceOutStaffID;
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


                sTemp = res.EvidenceOutStaff.filter(f => f.ContributorID == "44");
                if (sTemp.length > 0) {
                    this.StaffApproveName = `${sTemp[0].TitleName == 'null' || sTemp[0].TitleName == null ? '' : sTemp[0].TitleName}`
                        + `${sTemp[0].FirstName == 'null' || sTemp[0].FirstName == null ? '' : sTemp[0].FirstName}` + ' '
                        + `${sTemp[0].LastName == 'null' || sTemp[0].LastName == null ? '' : sTemp[0].LastName}`;
                    this.PosApprove = sTemp[0].PositionName;
                    this.DeptApprove = sTemp[0].OfficeName;
                    this.StaffApproveID = sTemp[0].EvidenceOutStaffID;
                    this.oEviOutStaffApprove = sTemp[0];
                }


                sTemp = res.EvidenceOutStaff.filter(f => f.ContributorID == "43");
                if (sTemp.length > 0) {
                    this.StaffEvidenceName = `${sTemp[0].TitleName == 'null' || sTemp[0].TitleName == null ? '' : sTemp[0].TitleName}`
                        + `${sTemp[0].FirstName == 'null' || sTemp[0].FirstName == null ? '' : sTemp[0].FirstName}` + ' '
                        + `${sTemp[0].LastName == 'null' || sTemp[0].LastName == null ? '' : sTemp[0].LastName}`;
                    this.PosEvidence = sTemp[0].PositionName;
                    this.DeptEvidence = sTemp[0].OfficeName;
                    this.StaffEvidenceID = sTemp[0].EvidenceOutStaffID;
                    this.oEviOutStaffEvidence = sTemp[0];
                }


                sTemp = res.EvidenceOutStaff.filter(f => f.ContributorID == "45");
                if (sTemp.length > 0) {
                    this.StaffReceiverName = `${sTemp[0].TitleName == 'null' || sTemp[0].TitleName == null ? '' : sTemp[0].TitleName}`
                        + `${sTemp[0].FirstName == 'null' || sTemp[0].FirstName == null ? '' : sTemp[0].FirstName}` + ' '
                        + `${sTemp[0].LastName == 'null' || sTemp[0].LastName == null ? '' : sTemp[0].LastName}`;
                    this.PosReceiver = sTemp[0].PositionName;
                    this.DeptReceiver = sTemp[0].OfficeName;
                    this.StaffReceiveID = sTemp[0].EvidenceOutStaffID;
                    this.oEviOutStaffReceive = sTemp[0];
                }

                // -------------- Product -------------------------
                let t = 0;
                this.oEvidenceOut.EvidenceOutItem.map(item => {
                    let oInItem = res.EvidenceOutItem.filter(f => f.EvidenceOutItemID == item.EvidenceOutItemID)[0].EvidenceOutStockBalance[0].EvidenceOutInItem;
                    item.EvidenceInItemCode = oInItem.EvidenceInItemCode;
                    item.InitBalanceQty = item.EvidenceOutStockBalance[0].BalanceQty + item.Qty;
                    item.BalanceQtyUnit = item.EvidenceOutStockBalance[0].BalanceQtyUnit;
                    item.BalanceQty = item.EvidenceOutStockBalance[0].BalanceQty;
                    item.ProductDesc = oInItem.ProductDesc;
                    item.DeliveryNo = oInItem.DeliveryNo;
                    item.Qty = item.Qty;
                    item.IsNewItem = false;
                    item.IsDelItem = false;
                    item.ProductSeq = t;

                    if (item.EvidenceOutStockBalance.length > 0) {
                        this.WarehouseID = item.EvidenceOutStockBalance[0].WarehouseID;
                    }

                    t += 1;
                });

                tWarehouse = this.rawWarehouseOptions.filter(f => f.WarehouseID == this.oEvidenceOut.EvidenceOutItem[0].EvidenceOutStockBalance[0].WarehouseID);
                this.WarehouseName = tWarehouse[0].WarehouseName;

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

    async onUdpEvidenceOut() {
        this.preloader.setShowPreloader(true);

        await this.setData();

        if (this.evitype == "16") {
            this.oEvidenceOut.EvidenceInID = this.EvidenceInID;
        }

        // -----------------------------------------------------------
        //                       Call API Update
        // -----------------------------------------------------------

        let isSuccess: boolean = true;

        // -----------------------------------------------------------
        //                          Product
        // -----------------------------------------------------------
        if (this.ListEvidenceOutItem.length > 0) {
            this.oEvidenceOut.EvidenceOutItem.map(m => {
                let stock = {
                    "BalanceQty": m.BalanceQty,
                    "StockID": m.StockID
                }

                this.EvidenceOutService.EvidenceOutStockBalanceupdByCon(stock).then(async rt => {
                    if (!rt.IsSuccess) {
                        isSuccess = rt.IsSuccess;
                    }
                }, (error) => { console.error(error); });
            })

            this.ListEvidenceOutItem.map(async item => {
                item.EvidenceOutID = this.oEvidenceOut.EvidenceOutID;
                item.EvidenceOutStockBalance = [];
                item.EvidenceStock = [];
            });

            // New Product
            await this.EvidenceOutService.EvidenceOutIteminsAll(this.ListEvidenceOutItem.filter(item => item.IsNewItem === true)).then(pRes => {
                if (!pRes.isSuccess) {
                    isSuccess = pRes.IsSuccess;
                }
            }, (error) => { console.error(error); });

            // Edit Product
            await this.EvidenceOutService.EvidenceOutItemupdByCon(this.ListEvidenceOutItem.filter(item => item.IsNewItem === false)).then(pRes => {
                if (!pRes.IsSuccess) {
                    isSuccess = pRes.IsSuccess;
                }
            }, (error) => { console.error(error); });


            // Del Product    
            await this.EvidenceOutService.EvidenceOutItemupdDelete(this.ListEvidenceOutItem.filter(item => item.IsDelItem === true)).then(pRes => {
                if (!pRes.IsSuccess) {
                    isSuccess = pRes.IsSuccess;
                }
            }, (error) => { console.error(error); });


            this.ListEvidenceOutItem.map(async item => {
                item.IsNewItem = false;
            });
        }


        // -----------------------------------------------------------
        //                          Evidenct In
        // -----------------------------------------------------------
        if (this.evitype == "16") {
            // New Product
            await this.EviService.EvidenceInIteminsAll(this.oEvidenceIn.EvidenceInItem.filter(item => item.IsNewItem === true)).then(pRes => {
                if (!pRes.IsSuccess) {
                    isSuccess = pRes.IsSuccess;
                }
            }, (error) => { console.error(error); });

            // Edit Product
            await this.EviService.EvidenceInItemupdByCon(this.oEvidenceIn.EvidenceInItem.filter(item => item.IsNewItem === false)).then(pRes => {
                if (!pRes.IsSuccess) {
                    isSuccess = pRes.IsSuccess;
                }
            }, (error) => { console.error(error); });


            // Del Product    
            await this.EviService.EvidenceInItemupdDelete(this.oEvidenceIn.EvidenceInItem.filter(item => item.IsDelItem === true)).then(pRes => {
                if (!pRes.IsSuccess) {
                    isSuccess = pRes.IsSuccess;
                }
            }, (error) => { console.error(error); });

            this.oEvidenceIn.EvidenceInItem = [];

            await this.EviService.EvidenceInupdByCon(this.oEvidenceIn).then(async IsSuccess => {
                if (!IsSuccess) {
                    isSuccess = IsSuccess;
                }
            }, (error) => { isSuccess = false; console.error(error); });
        }

        this.oEvidenceOut.EvidenceOutItem = [];

        await this.EvidenceOutService.EvidenceOutupdByCon(this.oEvidenceOut).then(async IsSuccess => {
            if (!IsSuccess) {
                isSuccess = IsSuccess;
            }

        }, (error) => { isSuccess = false; console.error(error); });

        // -----------------------------------------------------------
        //                   Document
        // -----------------------------------------------------------
        if (this.ListDoc.length > 0) {
            // New Document
            this.ListDoc.filter(item => item.IsNewItem === true)
                .map(async item => {
                    item.ReferenceCode = this.oEvidenceOut.EvidenceOutID;
                    item.IsNewItem = false;

                    await this.proveService.MasDocumentMaininsAll(item).then(pRes => {
                        if (!pRes.IsSuccess) {
                            isSuccess = pRes.IsSuccess;
                        }
                    }, (error) => { console.error(error); });
                });


            // Edit Document
            this.ListDoc.filter(item => item.IsNewItem === false)
                .map(async item => {
                    item.ReferenceCode = this.oEvidenceOut.EvidenceOutID;
                    await this.proveService.MasDocumentMainupdByCon(item).then(pRes => {
                        if (!pRes.IsSuccess) {
                            isSuccess = pRes.IsSuccess;
                        }
                    }, (error) => { console.error(error); });
                });

            // Del Document    
            this.ListDoc.filter(item => item.IsDelItem === true)
                .map(async item => {

                    await this.proveService.MasDocumentMainupdDelete(item.DocumentID).then(pRes => {
                        if (!pRes.IsSuccess) {
                            isSuccess = pRes.IsSuccess;
                        }
                    }, (error) => { console.error(error); });
                });
        }

        if (isSuccess) {
            this.ShowAlertSuccess(Message.saveComplete);
            this.onComplete();
            await this.ShowEvidenceOut();
            this.preloader.setShowPreloader(false);
        } else {
            this.ShowAlertError(Message.saveFail);
            this.preloader.setShowPreloader(false);
        }
    }

    async onDelete() {
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
                let isSuccess: boolean = true;

                this.oEvidenceOut.EvidenceOutItem.map(m => {
                    let stock = {
                        "BalanceQty": m.InitBalanceQty,
                        "StockID": m.StockID
                    }

                    this.EvidenceOutService.EvidenceOutStockBalanceupdByCon(stock).then(async rt => {
                        if (!rt.IsSuccess) {
                            isSuccess = rt.IsSuccess;
                        }
                    }, (error) => { console.error(error); });
                })

                this.EvidenceOutService.EvidenceOutupdDelete(this.EvidenceOutID).then(async rt => {
                    if (!rt.IsSuccess) {
                        isSuccess = rt.IsSuccess;
                    }else {
                        if(this.evitype == "16"){
                            this.EviService.EvidenceInupdDelete(this.oEvidenceIn.EvidenceInID).then(async IsSuccess => {
                                if (!IsSuccess) {
                                    isSuccess = IsSuccess;
                                }
                            }, (error) => { console.error(error); return false; });
                        }
                    }
                }, (error) => { console.error(error); });


                if (isSuccess) {
                    this.oEvidenceOut = {};
                    this.ShowAlertSuccess(Message.saveComplete);
                    this.router.navigate([`/evidenceOut/list/${this.evitype}`]);
                } else {
                    this.ShowAlertError(Message.saveFail);
                }
            }
        })
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
            OfficeCode: this.OfficeDestCode,
            ApproveNo: this.ApproveNo,
            IsActive: "1",
            EvidenceOutItem: [],
            EvidenceOutStaff: []
        };


        if (this.evitype != "11I") {
            this.oEvidenceOut.BookNo = "";
            this.oEvidenceOut.ReceiptNo = "";
            this.oEvidenceOut.PayDate = "";
            this.oEvidenceOut.PayTime = "";
        }

        this.ListEvidenceOutItem.map(async item => {
            var flg = "2";

            if (item.BalanceQty == 0)
                flg = "1";

            this.oStockBalance = {
                StockID: item.StockID,
                WarehouseID: this.WarehouseID,
                EvidenceInItemID: item.EvidenceOutStockBalance[0].EvidenceInItemID,
                BalanceQty: item.BalanceQty,
                IsFinish: flg,
            }

            item.EvidenceOutStockBalance = [];
            item.EvidenceOutStockBalance.push(this.oStockBalance);
        });

        this.oEvidenceOut.EvidenceOutItem = this.ListEvidenceOutItem;
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

        // ผู้บริจาค
        if (this.evitype == "15D") {
            this.oEviOutStaffReceive = {
                EvidenceOutStaffID: this.StaffReceiveID,
                EvidenceOutID: this.EvidenceOutID,
                FirstName: this.StaffReceiverName,
                PositionName: this.PosReceiver,
                OfficeName: this.DeptReceiver,
                ContributorID: "45",
                IsActive: "1"
            }

            this.oEvidenceOut.EvidenceOutStaff.push(this.oEviOutStaffReceive);
        }

        // Module โอนย้าย
        if (this.evitype == "16") {
            this.oEvidenceOut.WarehouseID = this.WarehouseDestID;

            // ****************************************************
            // -------------- Set Data for EvidenceIn -------------
            // ****************************************************
            if (this.mode == "C") {
                this.oEvidenceIn = {
                    EvidenceInID: "",
                    EvidenceInCode: "",
                    ProveID: "",
                    DeliveryNo: this.EvidenceOutNo,
                    DeliveryDate: this.ConvertDateYYYYmmddEvidenceIn(this.EvidenceOutNoDate.date),
                    EvidenceInType: "0",
                    IsActive: 1,
                    IsEdit: 1,
                    EvidenceInStaff: [],
                    EvidenceInItem: []
                }

                await this.setStaffOfEvidenceIn();

                for (let i = 0; i < this.ListEvidenceOutItem.length; i++) {
                    this.oEvidenceStockBalance = {
                        WarehouseID: this.WarehouseDestID,
                        EvidenceInItemID: "",
                        ReceiveQty: this.ListEvidenceOutItem[i].Qty,
                        ReceiveQtyUnit: this.ListEvidenceOutItem[i].QtyUnit,
                        // ReceiveSize: "",
                        // ReceiveSizeUnit: "",
                        // ReceiveNetVolumn: "",
                        // ReceiveNetVolumnUnit: "",
                        BalanceQty: this.ListEvidenceOutItem[i].Qty,
                        BalanceQtyUnit: this.ListEvidenceOutItem[i].QtyUnit,
                        // BalanceSize: "",
                        // BalanceSizeUnit: "",
                        // BalanceNetVolumn: "",
                        // BalanceNetVolumnUnit: "",
                        IsFinish: "2",
                        IsReceive: "0"
                    }

                    this.oEvidenceInItem = {
                        EvidenceInItemID: "",
                        EvidenceInItemCode: "Auto Generate",
                        ProductSeq: i,
                        EvidenceInID: "",
                        GroupCode: this.ListEvidenceOutItem[i].GroupCode,
                        IsDomestic: this.ListEvidenceOutItem[i].IsDomestic,
                        ProductCode: this.ListEvidenceOutItem[i].ProductCode,
                        BrandCode: this.ListEvidenceOutItem[i].BrandCode,
                        BrandNameTH: this.ListEvidenceOutItem[i].BrandNameTH,
                        BrandNameEN: this.ListEvidenceOutItem[i].BrandNameEN,
                        SubBrandCode: this.ListEvidenceOutItem[i].SubBrandCode,
                        SubBrandNameTH: this.ListEvidenceOutItem[i].SubBrandNameTH,
                        SubBrandNameEN: this.ListEvidenceOutItem[i].SubBrandNameEN,
                        ModelCode: this.ListEvidenceOutItem[i].ModelCode,
                        ModelName: this.ListEvidenceOutItem[i].ModelName,
                        FixNo1: this.ListEvidenceOutItem[i].FixNo1,
                        FixNo2: this.ListEvidenceOutItem[i].FixNo2,
                        SequenceNo: this.ListEvidenceOutItem[i].SequenceNo,
                        ProductDesc: this.ListEvidenceOutItem[i].ProductDesc,
                        DeliveryQty: this.ListEvidenceOutItem[i].Qty,
                        DeliveryQtyUnit: this.ListEvidenceOutItem[i].QtyUnit,
                        DeliverySize: this.ListEvidenceOutItem[i].Size,
                        DeliverySizeUnit: this.ListEvidenceOutItem[i].SizeUnitCode,
                        DeliveryNetVolumn: this.ListEvidenceOutItem[i].NetVolumeBalance,
                        DeliveryNetVolumnUnit: this.ListEvidenceOutItem[i].NetVolumeBalanceUnit,
                        DamageQty: "",
                        DamageQtyUnit: "",
                        DamageSize: this.ListEvidenceOutItem[i].Size,
                        DamageSizeUnit: this.ListEvidenceOutItem[i].SizeUnitCode,
                        DamageNetVolumn: "",
                        DamageNetVolumnUnit: "",
                        IsActive: "1",
                        EvidenceStockBalance: []
                    }

                    this.oEvidenceInItem.EvidenceStockBalance.push(this.oEvidenceStockBalance);
                    this.oEvidenceIn.EvidenceInItem.push(this.oEvidenceInItem);
                }
            } else {
                for (let i = 0; i < this.ListEvidenceOutItem.length; i++) {
                    this.oEvidenceIn.EvidenceInItem[i].DeliveryQty = this.ListEvidenceOutItem[i].Qty;
                    this.oEvidenceIn.EvidenceInItem[i].DeliveryQtyUnit = this.ListEvidenceOutItem[i].QtyUnit;
                    // this.oEvidenceIn.EvidenceInItem[i].DeliveryNetVolumn = this.ListEvidenceOutItem[i].NetVolumeBalance;
                    // this.oEvidenceIn.EvidenceInItem[i].DeliveryNetVolumnUnit = this.ListEvidenceOutItem[i].NetVolumeBalanceUnit;

                    this.oEvidenceIn.EvidenceInItem[i].EvidenceStockBalance[0].ReceiveQty = this.ListEvidenceOutItem[i].Qty;
                    this.oEvidenceIn.EvidenceInItem[i].EvidenceStockBalance[0].ReceiveQtyUnit = this.ListEvidenceOutItem[i].QtyUnit;
                    // this.oEvidenceIn.EvidenceInItem[i].EvidenceStockBalance[0].ReceiveNetVolumn = this.ListEvidenceOutItem[i].NetVolumeBalance;
                    // this.oEvidenceIn.EvidenceInItem[i].EvidenceStockBalance[0].ReceiveNetVolumnUnit = this.ListEvidenceOutItem[i].NetVolumeBalanceUnit;
                    this.oEvidenceIn.EvidenceInItem[i].EvidenceStockBalance[0].BalanceQty = this.ListEvidenceOutItem[i].Qty;
                    this.oEvidenceIn.EvidenceInItem[i].EvidenceStockBalance[0].BalanceQtyUnit = this.ListEvidenceOutItem[i].QtyUnit;
                    // this.oEvidenceIn.EvidenceInItem[i].EvidenceStockBalance[0].BalanceNetVolumn = this.ListEvidenceOutItem[i].NetVolumeBalance;
                    // this.oEvidenceIn.EvidenceInItem[i].EvidenceStockBalance[0].BalanceNetVolumnUnit = this.ListEvidenceOutItem[i].NetVolumeBalanceUnit;
                    this.oEvidenceIn.EvidenceInItem[i].EvidenceStockBalance[0].WarehouseID = this.WarehouseDestID;
                    this.oEvidenceIn.EvidenceInItem[i].IsNewItem = this.ListEvidenceOutItem[i].IsNewItem;
                    this.oEvidenceIn.EvidenceInItem[i].IsDelItem = this.ListEvidenceOutItem[i].IsDelItem;
                }

                this.oEvidenceIn.EvidenceInStaff.filter(f => f.ContributorID == "13").map(m => {
                    m.StaffCode = this.oEviOutStaffRequest.StaffCode,
                        m.TitleName = this.oEviOutStaffRequest.TitleName,
                        m.FirstName = this.oEviOutStaffRequest.FirstName,
                        m.LastName = this.oEviOutStaffRequest.LastName,
                        m.PositionCode = this.oEviOutStaffRequest.PositionCode,
                        m.PositionName = this.oEviOutStaffRequest.PositionName,
                        m.PosLevel = this.oEviOutStaffRequest.PosLevel,
                        m.PosLevelName = this.oEviOutStaffRequest.PosLevelName,
                        m.DepartmentCode = this.oEviOutStaffRequest.DepartmentCode,
                        m.DepartmentName = this.oEviOutStaffRequest.DepartmentName,
                        m.DepartmentLevel = this.oEviOutStaffRequest.DepartmentLevel,
                        m.OfficeCode = this.oEviOutStaffRequest.OfficeCode,
                        m.OfficeName = this.oEviOutStaffRequest.OfficeName,
                        m.OfficeShortName = this.oEviOutStaffRequest.OfficeShortName
                })
            }
        }
    }

    async TransactionRunningForIns() {
        await this.RevService.TransactionRunninggetByCon("ops_evidence_out", this.DeptCodeEvidence).then(async item => {
            if (item.length == 0) {
                this.RevService.TransactionRunninginsAll(this.DeptCodeEvidence, "ops_evidence_out", this.EviCode).then(async res => {
                    if (res.IsSuccess) {
                        this.EvidenceOutCode = this.EviCode + this.oEviOutStaffEvidence.OfficeCode + (this.EvidenceOutDate.date.year + 543).toString().substring(4, 2) + "00001";
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

                        this.EvidenceOutCode = this.EviCode + this.oEviOutStaffEvidence.OfficeCode + (this.EvidenceOutDate.date.year + 543).toString().substring(4, 2) + RunningNo;
                        this.oEvidenceOut.EvidenceOutCode = this.EvidenceOutCode;

                        await this.InsEvidenceOut();
                    }
                }, (error) => { console.error(error); return false; });
            }

        }, (error) => { console.error(error); return false; });
    }

    async InsEvidenceOut() {
        var isSuccess = true;

        if (this.evitype == "16") {
            await this.InsEvidenceIn();

            this.oEvidenceOut.EvidenceInID = this.EvidenceInID;
        }

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
                    await this.ShowEvidenceOut();

                    this.preloader.setShowPreloader(false);
                    this.router.navigate([`/evidenceOut/manage/${this.evitype}/R/${this.EvidenceOutID}`]);
                }
            } else {
                this.ShowAlertError(Message.saveFail);
            }
        }, (error) => { console.error(error); return false; });
    }

    async InsEvidenceIn() {
        var isSuccess = true;

        await this.EviService.EvidenceIninsAll(this.oEvidenceIn).then(async item => {
            if (item.IsSuccess) {
                this.oEvidenceIn.EvidenceInID = item.EvidenceInID;
                this.EvidenceInID = item.EvidenceInID;
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

    setStaffOfEvidenceIn() {
        this.oEvidenceIn.EvidenceInStaff = [];

        this.oEviInStaff = {
            EvidenceInStaffID: "",
            EvidenceInID: "",
            StaffCode: this.oEviOutStaffRequest.StaffCode,
            TitleName: this.oEviOutStaffRequest.TitleName,
            FirstName: this.oEviOutStaffRequest.FirstName,
            LastName: this.oEviOutStaffRequest.LastName,
            PositionCode: this.oEviOutStaffRequest.PositionCode,
            PositionName: this.oEviOutStaffRequest.PositionName,
            PosLevel: this.oEviOutStaffRequest.PosLevel,
            PosLevelName: this.oEviOutStaffRequest.PosLevelName,
            DepartmentCode: this.oEviOutStaffRequest.DepartmentCode,
            DepartmentName: this.oEviOutStaffRequest.DepartmentName,
            DepartmentLevel: this.oEviOutStaffRequest.DepartmentLevel,
            OfficeCode: this.oEviOutStaffRequest.OfficeCode,
            OfficeName: this.oEviOutStaffRequest.OfficeName,
            OfficeShortName: this.oEviOutStaffRequest.OfficeShortName,
            ContributorID: "13",
            IsActive: "1"
        }
        this.oEvidenceIn.EvidenceInStaff.push(this.oEviInStaff);

        this.oEviInRecvStaff = {
            EvidenceInStaffID: "",
            EvidenceInID: "",
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
        this.oEvidenceIn.EvidenceInStaff.push(this.oEviInRecvStaff);
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
        return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }) + " น.";
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
            // return setZeroHours(new Date(`${tDate.year}-${tDate.month}-${tDate.day}`));
            return tDate.year + '-' + tDate.month + '-' + tDate.day + ' 00:00:00.0000';
        }

        return "";
    }

    ConvertDateYYYYmmddEvidenceIn(_Date: any) {
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
            ContributorID: "39",
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
            ContributorID: "39",
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

    // *******************************************
    // ------------------ ผู้บรับริจาค -----------------
    // *******************************************
    /*
    StaffReceiveEvidenceonAutoChange(value: string) {
        this.ClearStaffReceiveEvidenceData();

        if (value == '') {
            this.StaffReceiveoptions = [];
        } else {
            if (this.rawStaffOptions.length == 0) {
                this.getEvidenceOutStaff();
            }

            this.StaffReceiveoptions = this.rawStaffOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1 || f.LastName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    StaffReceiveEvidenceonAutoFocus(value: string) {
        if (value == '') {
            this.StaffReceiveoptions = [];
            this.ClearStaffEvidenceData();
        }
    }

    StaffReceiveEvidenceonAutoSelecteWord(event) {
        this.oEviOutStaffReceive = {
            EvidenceOutStaffID: this.StaffReceiveID,
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

        this.PosReceiver = event.OperationPosName;
        this.DeptReceiver = event.OfficeName;
        this.DeptCodeReceiver = event.officeCode;
    }

    ClearStaffReceiveEvidenceData() {
        this.PosReceiver = "";
        this.DeptReceiver = "";

        this.oEviOutStaffReceive = {
            EvidenceOutStaffID: this.StaffReceiveID,
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
    */

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


    // **********************************
    // ------------ คลังจัดเก็บ -----------
    // **********************************
    async getWarehouse() {
        this.preloader.setShowPreloader(true);

        await this.MasService.getWarehourse(this.DestinationCode).then(res => {
            if (res) {
                this.rawWarehouseOptions = res;

                this.preloader.setShowPreloader(false);
            }

        }, (err: HttpErrorResponse) => {
            //alert(err.message);
        });
    }

    WarehouseOnAutoChange(value: string) {
        if (value == '') {
            this.Warehouseoptions = [];

            this.WarehouseID = "";
            this.WarehouseName = "";
        } else {
            this.Warehouseoptions = this.rawWarehouseOptions.filter(f => f.WarehouseName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    WarehouseOnAutoFocus(value: string) {
        if (value == '') {
            this.Warehouseoptions = [];
            this.rawProductList = [];

            this.WarehouseID = "";
            this.WarehouseName = "";
        }
    }

    WarehouseOnAutoSelecteWord(event) {
        this.WarehouseID = event.WarehouseID;
        this.getProduct();
    }

    async chooseFirstWarehouse() {
        this.WarehouseID = this.Warehouseoptions[0].WarehouseID;
        this.WarehouseName = this.Warehouseoptions[0].WarehouseName;

        await this.getProduct();
    }


    // *****************************************
    // ------------ คลังจัดเก็บปลายทาง -----------
    // *****************************************
    async getWarehouseDest() {
        this.preloader.setShowPreloader(true);

       await this.MasService.getWarehourse(this.OfficeDestCode).then(res => {
            if (res) {
                this.rawWarehouseDestOptions = res;

                this.preloader.setShowPreloader(false);
            }

        }, (err: HttpErrorResponse) => {
            //alert(err.message);
        });
    }

    WarehouseDestnAutoChange(value: string) {
        if (value == '') {
            this.WarehouseDestoptions = [];

            this.WarehouseDestID = "";
            this.WarehouseDestName = "";
        } else {
            this.WarehouseDestoptions = this.rawWarehouseDestOptions.filter(f => f.WarehouseName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    WarehouseDestOnAutoFocus(value: string) {
        if (value == '') {
            this.WarehouseDestoptions = [];

            this.WarehouseDestID = "";
            this.WarehouseDestName = "";
        }
    }

    async WarehouseDestOnAutoSelecteWord(event) {
        this.WarehouseDestID = event.WarehouseID;
    }

    chooseFirstWarehouseDest(): void {
        this.WarehouseDestID = this.Warehouseoptions[0].WarehouseID;
        this.WarehouseDestName = this.Warehouseoptions[0].WarehouseName;
    }


    // ******************************************
    // ------------ หน่วยงานปลายทาง ------------
    // ******************************************
    getStation() {
        this.MasService.getStation().then(res => {
            if (res) {
                this.rawStationOptions = res;
            }

        }, (err: HttpErrorResponse) => {
            //alert(err.message);
        });
    }

    OfficeDestOnAutoChange(value: string) {
        if (value == '') {
            this.StationOptions = [];

            this.OfficeDestCode = "";
        } else {
            this.StationOptions = this.rawStationOptions.filter(f => f.OfficeName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    OfficeDestOnAutoFocus(value: string) {
        if (value == '') {
            this.StationOptions = [];
        }
    }

    async OfficeDestOnAutoSelecteWord(event) {
        this.OfficeDestCode = event.OfficeCode;

        await this.getWarehouseDest();
    }

    async chooseFirstOfficeDest() {
        this.OfficeDestCode = this.StationOptions[0].OfficeCode;

        await this.getWarehouseDest();
    }



    // **********************************
    // -------------- Unit -------------
    // **********************************
    getUnit() {
        this.EviService.getProveProductUnit('').then(async res => {
            if (res) {
                this.UnitOption = res;
            }
        }, (err: HttpErrorResponse) => { });
    }


    // **********************************
    // ------------ Product -----------
    // **********************************
    AddProduct() {
        this.oEvidenceOutItem = {
            EvidenceOutID: "",
            ProductSeq: this.ListEvidenceOutItem.length,
            EvidenceOutItemID: "",
            DeliveryNo: "",
            EvidenceInItemCode: "",
            ProductDesc: "",
            StockID: "",
            NetVolumn: "",
            NetVolumnUnit: "",
            Qty: "",
            QtyUnit: "",
            Size: "",
            SizeUnit: "",
            ReceiveQty: "",
            ReceiveQtyUnit: "",
            InitBalanceQty: "",
            BalanceQty: "",
            BalanceQtyUnit: "",
            IsActive: "1",
            IsReturn: "1",
            IsNewItem: true,
            IsDelItem: false,
            EvidenceOutStockBalance: []
        };

        this.ListEvidenceOutItem.push(this.oEvidenceOutItem);
    }

    getProduct() {
        this.preloader.setShowPreloader(true);
        this.rawProductList = [];

        this.EvidenceOutService.getProduct(this.WarehouseID, this.EvidenceInType).then(async res => {
            this.rawProductList = [];

            if (res.length > 0) {
                this.rawProductOptions = res;
                
                this.rawProductOptions.map(f => {
                    f.EvidenceOutInItem.forEach(element => {
                        var item = {
                            LawsuitNo: f.EvidenceOutProve.EvidenceOutLawsuit.LawsuitNo,
                            DeliveryNo: f.DeliveryNo,
                            EvidenceInItemCode: element.EvidenceInItemCode,
                            ProductDesc: element.ProductDesc,
                            GroupCode: element.GroupCode,
                            IsDomestic: element.IsDomestic,
                            ProductCode: element.ProductCode,
                            BrandCode: element.BrandCode,
                            BrandNameTH: element.BrandNameTH,
                            BrandNameEN: element.BrandNameEN,
                            SubBrandCode: element.SubBrandCode,
                            SubBrandNameTH:  element.SubBrandNameTH,
                            SubBrandNameEN: element.SubBrandNameEN,
                            ModelCode: element.ModelCode,
                            ModelName: element.ModelName,
                            FixNo1: element.FixNo1,
                            DegreeCode: element.DegreeCode,
                            Degree: element.Degree,
                            FixNo2: element.FixNo2,
                            SequenceNo: element.SequenceNo,
                            ReceiveQty: element.EvidenceOutStockBalance[0].ReceiveQty,
                            ReceiveQtyUnit: element.EvidenceOutStockBalance[0].ReceiveQtyUnit,
                            BalanceQty: element.EvidenceOutStockBalance[0].BalanceQty,
                            BalanceQtyUnit: element.EvidenceOutStockBalance[0].BalanceQtyUnit,
                            ReceiveSize: element.EvidenceOutStockBalance[0].ReceiveSize,
                            ReceiveSizeUnit: element.EvidenceOutStockBalance[0].ReceiveSizeUnit,
                            StockID: element.EvidenceOutStockBalance[0].StockID,

                            IsChecked: false
                        }

                        this.rawProductList.push(item);
                    });
                });

                // set total record
                this.paginage.TotalItems = this.rawProductList.length;
                this.ProductList = this.rawProductList.slice(0, this.paginage.RowsPerPageOptions[0]);
            }

            this.preloader.setShowPreloader(false);
        }, (err: HttpErrorResponse) => {
            this.ShowAlertError("พบปัญหาในการติดต่อ Server");
        });
    }

    ProductonAutoChange(value: string, i: number) {
        if (this.WarehouseID != "" && this.WarehouseID != undefined && this.WarehouseID != "0") {
            if (value == '') {
                this.Productoptions = [];
                this.ClearProduct(i);
            } else {
                if (this.rawProductList.length == 0) {
                    this.getProduct();
                }

                this.Productoptions = this.rawProductList.filter(f => f.EvidenceInItemCode.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10);
            }
        }
    }

    ProductonAutoSelecteWord(event, i) {
        var aIndex;
        aIndex = this.getIndexOf(this.ListEvidenceOutItem, i, "ProductSeq");

        let IsNewItem = this.ListEvidenceOutItem[aIndex].IsNewItem;
        let IsDelItem = this.ListEvidenceOutItem[aIndex].IsDelItem;
        let EviOutID = this.ListEvidenceOutItem[aIndex].EvidenceOutID;
        let ItemID = this.ListEvidenceOutItem[aIndex].EvidenceOutItemID;

        this.ListEvidenceOutItem[aIndex] = {
            StockID: event.StockID,
            EvidenceOutItemID: ItemID,
            EvidenceInItemCode: event.EvidenceInItemCode,
            ProductSeq: aIndex,
            EvidenceOutID: EviOutID,
            ProductDesc: event.ProductDesc,
            GroupCode: event.GroupCode,
            IsDomestic: event.IsDomestic,
            ProductCode: event.ProductCode,
            BrandCode: event.BrandCode,
            BrandNameTH: event.BrandNameTH,
            BrandNameEN: event.BrandNameEN,
            SubBrandCode: event.SubBrandCode,
            SubBrandNameTH: event.SubBrandNameTH,
            SubBrandNameEN: event.SubBrandNameEN,
            ModelCode: event.ModelCode,
            ModelName: event.ModelName,
            FixNo1: event.FixNo1,
            DegreeCode: event.DegreeCode,
            Degree: event.Degree,
            FixNo2: event.FixNo2,
            SequenceNo: event.SequenceNo,
            Size: event.ReceiveSize,
            SizeUnit: event.ReceiveSizeUnit,
            ReceiveQty: event.ReceiveQty,
            ReceiveQtyUnit: event.ReceiveQtyUnit,
            InitBalanceQty: event.BalanceQty,
            BalanceQtyUnit: event.BalanceQtyUnit,
            BalanceQty: event.BalanceQty,
            NetVolumn: "",
            NetVolumnUnit: "",
            Qty: "",
            QtyUnit: event.BalanceQtyUnit,
            IsNewItem: IsNewItem,
            IsDelItem: IsDelItem,
            EvidenceStockBalance: []
        }
    }

    ClearProduct(i: number) {
        var aIndex;
        aIndex = this.getIndexOf(this.ListEvidenceOutItem, i, "ProductSeq");

        let IsNewItem = this.ListEvidenceOutItem[aIndex].IsNewItem;
        let IsDelItem = this.ListEvidenceOutItem[aIndex].IsDelItem;
        let EviOutID = this.ListEvidenceOutItem[aIndex].EvidenceOutID;
        let ItemID = this.ListEvidenceOutItem[aIndex].EvidenceOutItemID;

        this.ListEvidenceOutItem[aIndex] = {
            StockID: "",
            EvidenceOutItemID: ItemID,
            EvidenceInItemCode: "",
            ProductSeq: aIndex,
            EvidenceOutID: EviOutID,
            ProductDesc: "",
            Size: "",
            SizeUnit: "",
            ReceiveQty: "",
            ReceiveQtyUnit: "",
            BalanceQty: "",
            BalanceQtyUnit: "",
            NetVolumn: "",
            NetVolumnUnit: "",
            Qty: "",
            QtyUnit: "",
            IsNewItem: IsNewItem,
            IsDelItem: IsDelItem,
            EvidenceStockBalance: []
        }
    }

    DelProduct(i: number) {
        swal({
            title: '',
            text: Message.confirmDeleteProduct,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.value) {
                var aIndex;
                aIndex = this.getIndexOf(this.ListEvidenceOutItem, i, "ProductSeq");

                if (aIndex != -1) {
                    if (this.ListEvidenceOutItem[aIndex].IsNewItem == false) {
                        this.ListEvidenceOutItem[aIndex].IsDelItem = true;
                    }
                    else {
                        this.ListEvidenceOutItem.splice(aIndex, 1);
                    }
                }
            }
        })
    }

    CalReturn(i: number) {
        var aIndex;
        aIndex = this.getIndexOf(this.ListEvidenceOutItem, i, "ProductSeq");

        this.ListEvidenceOutItem[aIndex].BalanceQty = +`${this.ListEvidenceOutItem[aIndex].InitBalanceQty == "" ? "0" : this.ListEvidenceOutItem[aIndex].InitBalanceQty}` - +`${this.ListEvidenceOutItem[aIndex].Qty == "" ? "0" : this.ListEvidenceOutItem[aIndex].Qty}`;

        if (this.ListEvidenceOutItem[aIndex].BalanceQty < 0) {
            this.ShowAlertWarning("จำนวนคืนต้องไม่มากกว่าจำนวนคงเหลือในสต็อค !!!");
            this.ListEvidenceOutItem[aIndex].Qty = this.ListEvidenceOutItem[aIndex].InitBalanceQty;
            this.ListEvidenceOutItem[aIndex].BalanceQty = this.ListEvidenceOutItem[aIndex].InitBalanceQty;
        }
    }

    async pageChanges(event) {
        this.ProductList = await this.rawProductList.slice(event.startIndex - 1, event.endIndex);
    }

    ClosePopupProduct() {
        let ls = this.ProductList.filter(x => x.IsChecked == true)

        if (ls.length > 0) {
            ls.map(m => {
                this.oEvidenceOutItem = {
                    StockID: m.StockID,
                    EvidenceOutItemID: "",
                    EvidenceInItemCode: m.EvidenceInItemCode,
                    DeliveryNo: m.DeliveryNo,
                    ProductSeq: this.ListEvidenceOutItem.length,
                    EvidenceOutID: "",
                    ProductDesc: m.ProductDesc,
                    Size: m.ReceiveSize,
                    SizeUnit: m.ReceiveSizeUnit,
                    ReceiveQty: m.ReceiveQty,
                    ReceiveQtyUnit: m.ReceiveQtyUnit,
                    InitBalanceQty: m.BalanceQty,
                    BalanceQtyUnit: m.BalanceQtyUnit,
                    BalanceQty: m.BalanceQty,
                    NetVolumn: "",
                    NetVolumnUnit: "",
                    Qty: "",
                    QtyUnit: m.BalanceQtyUnit,
                    IsNewItem: true,
                    IsDelItem: false
                };

                this.ListEvidenceOutItem.push(this.oEvidenceOutItem);
            });
        } else {
            this.ShowAlertWarning("กรุณาเลือกของกลางที่ต้องการเพิ่ม !!!");

            return false;
        }

        $("#ProductPopup .close").click();
    }

    clickSearch() {
        let tempProduct = [];

        if (this.evitype == '11I' && this.Textsearch != "") {
            tempProduct = this.rawProductList.filter(f => f.LawsuitNo.toLowerCase().indexOf(this.Textsearch.toLowerCase()) > -1)
        } else if (this.evitype == '11E' && this.Textsearch != "") {
            tempProduct = this.rawProductList.filter(f => f.DeliveryNo.toLowerCase().indexOf(this.Textsearch.toLowerCase()) > -1)
        } else {
            tempProduct = this.rawProductList;
        }

        // set total record
        this.paginage.TotalItems = tempProduct.length;
        this.ProductList = this.rawProductList.slice(0, this.paginage.RowsPerPageOptions[0]);


    }

    VaridatePopup(){
        if(this.WarehouseID == undefined || this.WarehouseID == ""){
            this.ShowAlertWarning("กรุณาเลือกคลังจัดเก็บ");
        } else {
            $("#ProductPopup").modal('show')
        }
    }
}
