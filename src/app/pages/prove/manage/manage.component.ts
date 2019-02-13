import { Component, OnInit, OnDestroy, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProveService } from '../prove.service';
import { ArrestService } from '../../model/arrest.service';
import { LawsuitService } from '../../model/lawsuit.service';
import { IncomeService } from '../../income/income.service';
import { MasterService } from '../../model/master.service';
import { Evidence_In, Document, EvidenceInStaff, EvidenceInItem, EvidenceStockBalance } from '../../evidenceIn/evidenceIn';
import { EvidenceService } from '../../evidenceIn/evidenceIn.service';
import { Arrest } from '../../model/arrest';
import { Prove } from '../prove';
import { MatAutocomplete } from '@angular/material';
import { ProveStaff } from '../proveStaff';
import { ProveScience, ProveDeliverProduct } from '../proveScience';
import { ProveProduct } from '../proveProduct';
import { Message } from '../../../config/message';
import { ProveDocument } from '../proveDoc';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { toLocalShort, compareDate, setZeroHours, setDateMyDatepicker, getDateMyDatepicker } from '../../../config/dateFormat';
import { IMyDateModel, IMyOptions } from 'mydatepicker-th';
import swal from 'sweetalert2'
import { async } from '../../../../../node_modules/@types/q';

declare var $: any;

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',

})
export class ManageComponent implements OnInit, OnDestroy {
    private sub: any;
    private onSaveSubscribe: any;
    private onCancelSubscribe: any;
    private onDeleSubscribe: any;
    private onPrintSubscribe: any;
    private onNextPageSubscribe: any;
    mode: string;
    modal: any;
    param: any;
    programSpect = 'ILG60-05-02-00'

    // --------
    showEditField: any;
    showScienceField: any;
    //ShowDeliveryField: any;
    ShowReceiveField: any;
    ShowNextPage: any;

    // -- Parameter ---
    LawsuitID: string;
    ProveID: string;
    isRequired: boolean | false;
    isPopupRequired: boolean | false;

    // --- Array ---
    rawOptions = [];
    options = [];
    rawStaffOptions = [];
    rawProductOptions = [];
    rawWarehouseOptions = [];
    Staffoptions = [];
    Scienceoptions = [];
    StaffSendoptions = [];
    Deliveryoptions = [];
    Destinationoptions = [];
    Warehouseoptions = [];
    Productoptions = [];
    UnitOption = [];
    ListProveDoc = [];
    lsProveProduct = [];    // List for ins
    lsProveScience = [];    // List for ins
    lsProveDeliver = [];    // List for ins



    // **************************************
    // ----- Varible ส่วน “พิสูจน์ของกลาง” -----
    // **************************************
    ArrestCode: string;             // เลขที่ใบงาน
    LawsuiltCode: string;           // เลขที่คดีรับคำกล่าวโทษ
    GuiltBaseID: string;            // ฐานความผิดมาตรา
    GuiltBaseName: string;          // ฐานความผิด
    SectionNo: string;              // บทกำหนดโทษ
    PenaltyDesc: string;            // อัตราโทษ
    IndictmentID: string;           // รหัสฐานความผิด (Parameter)
    ArrestProduct = [];             // ข้อมูลรายการสินค้า



    // **************************************
    // ----- Varible ส่วน “ตรวจรับของกลาง” -----
    // **************************************
    IsDelivery: boolean;            // Checkbox ตรวจรับของกลาง  T = 1, F = 0
    IsOutside: boolean;             // Checkbox ตรวจพิสูจน์นอกที่ทำการ T = 1, F = 0
    DeliveryDocNo: string = "";     // เลขทะเบียนตรวจพิสูจน์  (ไม่รวม /ปี พ.ศ.)
    ProveYear: string;              // ปี พ.ศ.
    ProveStation: string;           // เขียนที่
    DeliveryDate: any;              // วันที่ตรวจรับ (Ins API : Prove)
    DeliveryTime: string;           // เวลาตรวจรับ (Ins API : Prove)
    DeliveryStation: string;        // หน่วยงานที่นำส่ง
    ProveStaffName: string;         // ผู้ตรวจรับ
    StaffID: number;                // รหัสผู้ตรวจรับ  
    PosExaminer: string;            // ตำแหน่งผู้ตรวจรับ
    DeptExaminer: string;           // หน่วยงานผู้ตรวจรับ



    // **************************************
    // ----- Varible ส่วน “พิสูจน์ของกลาง” -----
    // **************************************
    IsProveScience: boolean;        // Checkbox ตรวจพิสูจน์ทางวิทยาศาสตร์ T = 1, F = 0
    IsProdScience: boolean;         // Checkbox ตรวจพิสูจน์ทางวิทยาศาสตร์ของ Product T = 1, F = 0
    ScienceDeliveryDocNo: string = "";     // เลขที่หนังสือนำส่ง
    ProveScienceDate: any;          // วันที่นำส่ง (Ins API : ProveScience)
    ProveScienceTime: string;       // เวลาที่นำส่ง (Ins API : ProveScience)
    RequestNo: string;              // เลขที่คำขอ
    ReportNo: string;               // เลขที่รายงานผล
    ProveDate: any;                 // วันที่พิสูจน์  (Ins API : Prove)
    ProveTime: string;              // เวลาที่พิสูจน์ (Ins API : Prove)
    StaffScienceID: number;         // รหัสผู้ตรวจพิสูจน์
    ScienceStaffName: string;       // ผู้พิสูจน์
    PosScience: string;             // ตำแหน่งผู้พิสูจน์
    DeptScience: string;            // หน่วยงานผู้พิสูจน์
    Command: string                 // คำสั่ง
    SummaryProveResult: string;     // สรุปผลการตรวจพิสูจน์


    // **************************************
    // ----- Varible ส่วน “นำส่งของกลาง” -----
    // **************************************
    IsReceive: boolean;             // Checkbox จัดเก็บของกลาง T = 1, F = 0
    IsEvidence: boolean;            // มีข้อมูล Evidence หรือไม่
    IsEvidenceReceive: boolean;     // สถานะการรับเข้าของกลางจาก module Evidence
    DeliverNo: string;              // หนังสือนำส่งเลขที่
    DeliverNoYear: string;            // ปีหนังสือนำส่งเลขที่
    DeliverDate: any;               // วันที่นำส่งของกลาง
    DeliverTime: string;            // เวลานำส่งของกลาง
    StaffSendID: number;            // รหัสผู้นำส่ง
    StaffSendName: string;          // ผู้นำส่ง
    PosStaffSend: string;           // ตำแหน่งผู้นำส่ง
    DeptStaffSend: string;          // หน่วยงานผู้นำส่ง
    DestinationCode: string;        // รหัสน่วยงานที่นำส่ง
    DeliverTo: string;              // หน่วยงานที่นำส่ง
    WarehouseName: string;          // ชื่อคลังจัดเก็บ




    // **************************************
    // ----- Popup -----
    // **************************************
    // IsReferenceVatRate: boolean;    // checkbox ตามมูลค่าร้อยละ
    // IsReferenceVatQty: boolean;     // checkbox ตามปริมาณต่อ

    iPopup: number;
    modePopup: string = 'I';
    ProductID: string;


    // **************************************
    // ----- Popup -----
    // **************************************
    WarehouseID: string;
    EvidenceInID: string;

    // --- Object ---
    oArrest: Arrest;
    oProve: Prove;
    oProveStaff: ProveStaff;
    oProveScienceStaff: ProveStaff;
    oProveStaffSend: ProveStaff;
    oProveScience: ProveScience;
    oProveProduct: ProveProduct;
    oTempProduct: ProveProduct;
    oProveDeliverProduct: ProveDeliverProduct;
    oProveDocument: ProveDocument;
    oEvidenceIn: Evidence_In;
    oEviInStaff: EvidenceInStaff;
    oEviInRecvStaff: EvidenceInStaff;
    oEvidenceInItem: EvidenceInItem;
    oEvidenceStockBalance: EvidenceStockBalance;

    // ----- Model ------ //
    @ViewChild('printDocModal') printDocModel: ElementRef;

    constructor(
        private navService: NavigationService,
        private ngbModel: NgbModal,
        private activeRoute: ActivatedRoute,
        private proveService: ProveService,
        private ArrestSV: ArrestService,
        private LawsuitSV: LawsuitService,
        private MasterSV: MasterService,
        private EviInSV: EvidenceService,
        private RevService: IncomeService,
        private router: Router,
        private preloader: PreloaderService
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
    }

    async ngOnInit() {
        this.preloader.setShowPreloader(true);
        await this.navService.setEditField(true);

        this.active_Route();
        this.navigate_Service();
        this.CreateObject();
        this.CreateProduct();
        this.CreateScience();
        this.CreateStaff();
        this.CreateScienceStaff();
        this.CreateStaffSend();
        this.CreateDocuement();
        this.getUnit();
        await this.getStation();
        await this.getProveStaff();
        await this.getProduct();

        this.ArrestCode = this.ArrestCode;
        this.ProveStaffName = "";
        this.ScienceStaffName = "";
        this.ProveStation = "";
        this.IsProveScience = false;
        this.IsReceive = false;
        this.IsDelivery = true;
        this.IsOutside = false;
        this.IsProdScience = false;
        this.showScienceField = true;
        this.ShowReceiveField = true;
        this.IsEvidence = false;
        this.IsEvidenceReceive = false;

        let date = new Date();
        this.ProveYear = (date.getFullYear() + 543).toString();
        this.ProveDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        //this.ProveTime = await this.getCurrentTime();
        this.DeliveryDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        //this.DeliveryTime = await this.getCurrentTime();
        //this.ProveScienceTime = await this.getCurrentTime();

        this.WarehouseID = "1";

        await this.ProveArrestgetByCon();
        // this.preloader.setShowPreloader(false);
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
            } else if (p['mode'] === 'R') {
                // set false
                this.navService.setSaveButton(false);
                this.navService.setCancelButton(false);
                // set true
                this.navService.setPrintButton(true);
                this.navService.setEditButton(true);
                this.navService.setDeleteButton(true);
                this.navService.setEditField(true);
            }

            if (p['code1']) {
                this.ProveID = p['code1'];
            }

            if (p['code2']) {
                this.IndictmentID = p['code2'];
            }
        });
    }

    private navigate_Service() {
        this.sub = this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p;
            //this.ShowDeliveryField = p;
            this.checkNextPage();
        });

        this.onSaveSubscribe = this.navService.onSave.subscribe(async status => {
            if (status) {
                // set action save = false
                await this.navService.setOnSave(false);

                if (this.IsDelivery == false) {
                    this.ShowAlertWarning(Message.checkDelivery);

                    //alert(Message.checkDelivery);

                    return false;
                }
                else {
                    // *******************************
                    // ----- ส่วน “ตรวจรับของกลาง” -----
                    // *******************************
                    if (this.DeliveryDocNo == "" || this.ProveYear == ""         // ทะเบียนตรวจพิสูจน์
                        || this.oProve.ProveStationCode == "" || this.oProve.ProveStationCode == undefined    // เขียนที่
                        || this.DeliveryDate == null     // วันที่ตรวจรับ || this.DeliveryTime == "" || this.DeliveryTime == undefined
                        || this.oProve.DeliveryStationCode == "" || this.oProve.DeliveryStationCode == undefined  // หน่วยงานนำส่ง
                        || this.ProveStaffName == ""   // ผู้ตรวจรับ
                    ) {
                        this.isRequired = true;
                        this.ShowAlertWarning(Message.checkData);
                        //alert(Message.checkData);

                        return false;
                    }


                    if (this.lsProveProduct.length > 0) {
                        // *******************************
                        // ----- ส่วน “พิสูจน์ของกลาง” -----
                        // *******************************
                        // คลิกเลือก “ส่งพิสูจน์ทางวิทยาศาสตร์”
                        if (this.IsProveScience) {
                            if (this.ScienceDeliveryDocNo == ""        // เลขที่หนังสือนำส่ง
                                || this.ProveDate == null
                                || this.ProveScienceDate == null     // วันที่นำส่ง || this.ProveScienceTime == "" || this.ProveScienceTime == undefined
                                || this.ScienceStaffName == ""       // ผู้พิสูจน์
                                // || this.Command == ""                // คำสั่ง
                            ) {
                                this.isRequired = true;
                                this.ShowAlertWarning(Message.checkData);
                                //alert(Message.checkData);

                                return false;
                            }
                        }
                        // ไม่เลือก “ส่งพิสูจน์ทางวิทยาศาสตร์”
                        else {
                            if (this.ProveDate == null    // วันที่นำส่ง  || this.ProveScienceTime == "" || this.ProveScienceTime == undefined
                                || this.ScienceStaffName == ""      // รหัผู้พิสูจน์
                                //|| this.Command == ""               // คำสั่ง
                            ) {
                                this.isRequired = true;
                                this.ShowAlertWarning(Message.checkData);
                                //alert(Message.checkData);

                                return false;
                            }
                        }
                    }


                    // *******************************
                    // ----- ส่วน “นำส่งของกลาง” -----
                    // *******************************
                    // คลิกเลือก “จัดเก็บของกลาง”
                    if (this.IsReceive) {
                        if (this.DeliverNo == ""        // หนังสือนำส่งเลขที่
                            || this.DeliverDate == null    // วันที่นำส่ง  || this.DeliverTime == "" || this.DeliverTime == undefined
                            || this.DeliverTo == "" || this.DeliverTo == undefined      // หน่วยงานปลายทาง
                            || this.StaffSendName == ""   // ผู้นำส่ง
                        ) {
                            this.isRequired = true;
                            this.ShowAlertWarning(Message.checkData);
                            //alert(Message.checkData);

                            return false;
                        }
                    }
                }


                if (this.mode === 'C') {
                    await this.onInsProve();
                } else if (this.mode === 'R') {
                    await this.onUpdProve();
                }

                this.checkNextPage();
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
                            this.router.navigate(['/prove/list']);
                        } else if (this.mode === 'R') {
                            // set false
                            this.navService.setSaveButton(false);
                            this.navService.setCancelButton(false);
                            // set true
                            this.navService.setPrintButton(true);
                            this.navService.setEditButton(true);
                            this.navService.setDeleteButton(true);
                            this.navService.setEditField(true);

                            this.ProveArrestgetByCon();
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

        this.onNextPageSubscribe = this.navService.onNextPage.subscribe(async status => {
            if (status) {
                await this.navService.setOnNextPage(false);
                this.router.navigate(['/fine/manage/C/0/' + this.IndictmentID + '/' + this.ArrestCode]);
            }
        })
    }

    async SetData() {
        let DDate, cDateDelivery, PDate, cProveDate;

        DDate = this.DeliveryDate.date;
        if (DDate != undefined) {
            cDateDelivery = DDate.year + '-' + DDate.month + '-' + DDate.day + ' 00:00:00.0000';
        }

        PDate = this.ProveDate.date;
        if (PDate != undefined) {
            cProveDate = PDate.year + '-' + PDate.month + '-' + PDate.day + ' 00:00:00.0000';
        }

        this.oProve.DeliveryDate = cDateDelivery;
        this.oProve.ProveReportNo = this.DeliveryDocNo + "/" + this.ProveYear;
        this.oProve.DeliveryDocNo = this.DeliverNo + "/" + this.DeliverNoYear;
        this.oProve.ProveDate = cProveDate;
        this.oProve.IndictmentID = this.IndictmentID;
        this.oProve.Command = this.Command;
        this.oProve.IsOutside = +this.IsOutside;
        this.oProve.IsActive = 1;
        this.oProve.Delivery = +this.IsDelivery;

        if (this.oProveStaff != null && this.oProveStaff != undefined) {
            this.oProve.ProveStaff.push(this.oProveStaff);
        }

        if (this.oProveScienceStaff != null && this.oProveScienceStaff != undefined) {
            this.oProve.ProveStaff.push(this.oProveScienceStaff);
        }

        if (this.IsProveScience) {
            // Set Data Science to Ins
            let SDate, cDateProveScience;

            SDate = this.ProveScienceDate.date;
            if (SDate != undefined) {
                cDateProveScience = SDate.year + '-' + SDate.month + '-' + SDate.day;
            }

            this.oProveScience = {
                ProveScienceID: "",
                ProveID: "",
                ProveScienceDate: cDateProveScience,
                // ProveScienceTime: this.ProveScienceTime,
                ProveScienceTime: "",
                RequestNo: this.RequestNo,
                ReportNo: this.ReportNo,
                IsActive: 1,
                DeliveryDocNo: this.ScienceDeliveryDocNo,
                IsProveScience: "1"
            }
        }

        if (this.IsReceive) {
            // Set Data Science to Ins
            let DlvDate, cDateDeliver;

            DlvDate = this.DeliverDate.date;
            if (DlvDate != undefined) {
                cDateDeliver = DlvDate.year + '-' + DlvDate.month + '-' + DlvDate.day;
            }

            this.oProveDeliverProduct = {
                DeliverID: "",
                ProveID: "",
                DeliverNo: this.DeliverNo + "/" + this.DeliverNoYear,
                DeliverDate: cDateDeliver,
                // DeliverTime: this.DeliverTime,
                DeliverTime: "",
                DeliverTo: this.DeliverTo,
                IsReceive: "1",
                IsActive: 1,
            }


            // **************************************************
            // -------------- Set Data for Evidence -------------
            // **************************************************
            if (this.IsEvidence == false) {
                this.oEvidenceIn = {
                    EvidenceInID: "",
                    EvidenceInCode: "",
                    ProveID: this.ProveID,
                    DeliveryNo: this.DeliverNo + "/" + this.DeliverNoYear,
                    DeliveryDate: this.ConvertDateYYYYmmdd(this.DeliverDate.date),
                    EvidenceInType: "0",
                    IsActive: 1,
                    IsEdit: 1,
                    EvidenceInStaff: [],
                    EvidenceInItem: []
                }

                await this.setStaffOfEvidence();

                for (let i = 0; i < this.lsProveProduct.length; i++) {
                    this.oEvidenceStockBalance = {
                        WarehouseID: this.WarehouseID,
                        EvidenceInItemID: "",
                        ReceiveQty: this.lsProveProduct[i].QtyBalance,
                        ReceiveQtyUnit: this.lsProveProduct[i].QtyBalanceUnit,
                        ReceiveSize: this.lsProveProduct[i].Size,
                        ReceiveSizeUnit: this.lsProveProduct[i].SizeUnitCode,
                        ReceiveNetVolumn: this.lsProveProduct[i].NetVolumeBalance,
                        ReceiveNetVolumnUnit: this.lsProveProduct[i].NetVolumeBalanceUnit,
                        BalanceQty: this.lsProveProduct[i].QtyBalance,
                        BalanceQtyUnit: this.lsProveProduct[i].QtyBalanceUnit,
                        BalanceSize: this.lsProveProduct[i].Size,
                        BalanceSizeUnit: this.lsProveProduct[i].SizeUnitCode,
                        BalanceNetVolumn: this.lsProveProduct[i].NetVolumeBalance,
                        BalanceNetVolumnUnit: this.lsProveProduct[i].NetVolumeBalanceUnit,
                        IsFinish: "2",
                        IsReceive: "0"
                    }

                    this.oEvidenceInItem = {
                        EvidenceInItemID: "",
                        EvidenceInItemCode: "",
                        ProductSeq: i,
                        EvidenceInID: "",
                        GroupCode: this.lsProveProduct[i].GroupCode,
                        IsDomestic: this.lsProveProduct[i].IsDomestic,
                        ProductCode: this.lsProveProduct[i].ProductCode,
                        BrandCode: this.lsProveProduct[i].BrandCode,
                        BrandNameTH: this.lsProveProduct[i].BrandNameTH,
                        BrandNameEN: this.lsProveProduct[i].BrandNameEN,
                        SubBrandCode: this.lsProveProduct[i].SubBrandCode,
                        SubBrandNameTH: this.lsProveProduct[i].SubBrandNameTH,
                        SubBrandNameEN: this.lsProveProduct[i].SubBrandNameEN,
                        ModelCode: this.lsProveProduct[i].ModelCode,
                        ModelName: this.lsProveProduct[i].ModelName,
                        FixNo1: this.lsProveProduct[i].FixNo1,
                        FixNo2: this.lsProveProduct[i].FixNo2,
                        SequenceNo: this.lsProveProduct[i].SequenceNo,
                        ProductDesc: this.lsProveProduct[i].ProductDesc,
                        DeliveryQty: this.lsProveProduct[i].QtyBalance,
                        DeliveryQtyUnit: this.lsProveProduct[i].QtyBalanceUnit,
                        DeliverySize: this.lsProveProduct[i].Size,
                        DeliverySizeUnit: this.lsProveProduct[i].SizeUnitCode,
                        DeliveryNetVolumn: this.lsProveProduct[i].NetVolumeBalance,
                        DeliveryNetVolumnUnit: this.lsProveProduct[i].NetVolumeBalanceUnit,
                        DamageQty: "",
                        DamageQtyUnit: "",
                        DamageSize: this.lsProveProduct[i].Size,
                        DamageSizeUnit: this.lsProveProduct[i].SizeUnitCode,
                        DamageNetVolumn: "",
                        DamageNetVolumnUnit: "",
                        IsActive: "",
                        EvidenceStockBalance: []
                    }

                    this.oEvidenceInItem.EvidenceStockBalance.push(this.oEvidenceStockBalance);
                    this.oEvidenceIn.EvidenceInItem.push(this.oEvidenceInItem);
                }
            } else {
                await this.setStaffOfEvidence();

                for (let i = 0; i < this.lsProveProduct.length; i++) {
                    this.oEvidenceIn.EvidenceInItem[i].DeliveryQty = this.lsProveProduct[i].QtyBalance;
                    this.oEvidenceIn.EvidenceInItem[i].DeliveryQtyUnit = this.lsProveProduct[i].QtyBalanceUnit;
                    this.oEvidenceIn.EvidenceInItem[i].DeliveryNetVolumn = this.lsProveProduct[i].NetVolumeBalance;
                    this.oEvidenceIn.EvidenceInItem[i].DeliveryNetVolumnUnit = this.lsProveProduct[i].NetVolumeBalanceUnit;

                    this.oEvidenceIn.EvidenceInItem[i].EvidenceStockBalance[0].ReceiveQty = this.lsProveProduct[i].QtyBalance;
                    this.oEvidenceIn.EvidenceInItem[i].EvidenceStockBalance[0].ReceiveQtyUnit = this.lsProveProduct[i].QtyBalanceUnit;
                    this.oEvidenceIn.EvidenceInItem[i].EvidenceStockBalance[0].ReceiveNetVolumn = this.lsProveProduct[i].NetVolumeBalance;
                    this.oEvidenceIn.EvidenceInItem[i].EvidenceStockBalance[0].ReceiveNetVolumnUnit = this.lsProveProduct[i].NetVolumeBalanceUnit;
                    this.oEvidenceIn.EvidenceInItem[i].EvidenceStockBalance[0].BalanceQty = this.lsProveProduct[i].QtyBalance;
                    this.oEvidenceIn.EvidenceInItem[i].EvidenceStockBalance[0].BalanceQtyUnit = this.lsProveProduct[i].QtyBalanceUnit;
                    this.oEvidenceIn.EvidenceInItem[i].EvidenceStockBalance[0].BalanceNetVolumn = this.lsProveProduct[i].NetVolumeBalance;
                    this.oEvidenceIn.EvidenceInItem[i].EvidenceStockBalance[0].BalanceNetVolumnUnit = this.lsProveProduct[i].NetVolumeBalanceUnit;
                }
            }
        } else {
            this.DeliverDate = "";
            this.DeliverNo = "";
            this.DeliverTo = "";
            this.DeliverNoYear = "";
            this.DeliverDate = setDateMyDatepicker(new Date(this.getCurrentDate()));

            let tempUser = this.rawStaffOptions.filter(f => f.StaffCode == localStorage.getItem("staffCode"));

            // ----- ผู้นำส่ง -----
            this.oProveStaffSend = {
                StaffID: this.StaffSendID,
                ProveID: this.ProveID,
                ProgramCode: "XCS-60",
                ProcessCode: "XCS-60-05",
                LawsuitID: this.LawsuitID,
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
                ContributorID: "13"
            }

            this.StaffSendName = localStorage.getItem("fullName");
            this.PosStaffSend = localStorage.getItem("operationPosName");
            this.DeptStaffSend = localStorage.getItem("officeShortName");
        }

        if (this.oProveStaffSend != null && this.oProveStaffSend != undefined) {
            this.oProve.ProveStaff.push(this.oProveStaffSend);
        }
    }


    async onInsProve() {
        this.preloader.setShowPreloader(true);

        this.SetData();
        var isSuccess = true;
        await this.proveService.insAll(this.oProve).then(async res => {
            if (res.IsSuccess) {
                this.ProveID = res.ProveID;
                var ProveScienceID = "";

                // คลิกเลือก “ส่งพิสูจน์ทางวิทยาศาสตร์”
                if (this.IsProveScience) {
                    this.oProveScience.ProveID = res.ProveID;
                    await this.proveService.ProveScienceinsAll(this.oProveScience).then(async sRes => {
                        if (!sRes.IsSuccess) {
                            isSuccess = sRes.IsSuccess;
                        }

                        ProveScienceID = sRes.ProveScienceID;
                    }, (error) => { isSuccess = false; console.error(error); });
                }

                if (this.lsProveProduct.length > 0) {
                    this.lsProveProduct.map(async item => {
                        item.ProveID = res.ProveID;

                        if (item.IsProdScience == true) {
                            item.ProveScienceID = ProveScienceID;
                            item.IsProveScience = "1";
                        }
                        else {
                            item.ProveScienceID = null;
                            item.IsProveScience = "0";
                        }

                        item.ReferenceDate = "";
                        item.VatProve = item.VatProve.replace(',', '');

                        await this.proveService.ProveProductinsAll(item).then(async pRes => {

                            if (!pRes.IsSuccess) {
                                isSuccess = pRes.IsSuccess;
                            }
                        }, (error) => { isSuccess = false; console.error(error); });
                    });
                }


                if (this.IsReceive) {
                    this.oProveDeliverProduct.ProveID = res.ProveID;
                    this.oProveDeliverProduct.IsReceive = "1";

                    await this.proveService.ProveDeliverProductinsAll(this.oProveDeliverProduct).then(async dRes => {
                        if (!dRes.IsSuccess) {
                            isSuccess = dRes.IsSuccess;
                        } else {
                            this.oEvidenceIn.ProveID = this.ProveID;

                            await this.InsEvidence();
                        }
                    }, (error) => { isSuccess = false; console.error(error); });
                }

                if (this.ListProveDoc.length > 0) {
                    this.ListProveDoc.map(async item => {
                        item.ReferenceCode = this.oProve.ProveID;

                        await this.proveService.MasDocumentMaininsAll(item).then(IsSuccess => {
                            if (!IsSuccess) {
                                isSuccess = IsSuccess;
                            }
                        }, (error) => { isSuccess = false; console.error(error); });
                    });
                }


                if (isSuccess) {
                    this.ShowAlertSuccess(Message.saveComplete);
                    //alert(Message.saveComplete);
                    this.onComplete();
                    this.getProveByID();
                    this.preloader.setShowPreloader(false);
                    this.router.navigate([`/prove/manage/R/${this.ProveID}/${this.IndictmentID}`]);
                }
            }
            else {
                this.ShowAlertError(Message.saveFail);
                //alert(Message.saveFail);
            }
        }, (error) => { console.error(error); return false; });
    }

    async onUpdProve() {
        this.preloader.setShowPreloader(true);
        this.SetData();
        let isSuccess: boolean = true;

        // -----------------------------------------------------------
        //                  แก้ไขข้อมูลพิสูจน์ของกลาง
        // -----------------------------------------------------------
        var ProveScienceID = "";

        // มีข้อมูลพิสูจน์ของกลาง
        if (this.oProve.ProveScience.length > 0) {
            ProveScienceID = this.oProve.ProveScience[0].ProveScienceID;
            this.oProveScience.ProveID = this.ProveID;
            this.oProveScience.ProveScienceID = this.oProve.ProveScience[0].ProveScienceID;

            // คลิกเลือก “ส่งพิสูจน์ทางวิทยาศาสตร์”
            if (this.IsProveScience) {
                await this.proveService.ProveScienceupdByCon(this.oProveScience).then(async sRes => {
                    if (!sRes.IsSuccess) {
                        isSuccess = sRes.IsSuccess;
                        return false;
                    }
                }, (error) => { console.error(error); return false; });
            }
            // ถ้าติ๊กออกให้ลบข้อมูล “ส่งพิสูจน์ทางวิทยาศาสตร์”
            else {
                await this.proveService.ProveScienceupdDelete(this.oProveScience.ProveScienceID).then(async sRes => {
                    if (!sRes.IsSuccess) {
                        isSuccess = sRes.IsSuccess;
                        return false;
                    }
                }, (error) => { console.error(error); return false; });
            }
        }
        else {
            // คลิกเลือก “ส่งพิสูจน์ทางวิทยาศาสตร์”
            if (this.IsProveScience) {
                this.oProveScience.ProveID = this.ProveID;

                await this.proveService.ProveScienceinsAll(this.oProveScience).then(async sRes => {
                    if (!sRes.IsSuccess) {
                        isSuccess = sRes.IsSuccess;
                        return false;
                    }

                    ProveScienceID = sRes.ProveScienceID;
                }, (error) => { console.error(error); return false; });
            }
        }



        // -----------------------------------------------------------
        //                  แก้ไขข้อมูลของกลาง
        // -----------------------------------------------------------
        if (this.lsProveProduct.length > 0) {
            this.lsProveProduct.map(async item => {
                if (item.IsProdScience == true) {
                    item.ProveScienceID = ProveScienceID;
                    item.IsProveScience = "1";
                }
                else {
                    item.ProveScienceID = null;
                    item.IsProveScience = "0";
                }

                item.ReferenceDate = "";
                item.VatProve = item.VatProve.replace(',', '');

                await this.proveService.ProveProductupdByCon(item).then(async pRes => {
                    if (!pRes.IsSuccess) {
                        isSuccess = pRes.IsSuccess;
                        return false;
                    }
                }, (error) => { console.error(error); return false; });
            });
        }




        // -----------------------------------------------------------
        //                  แก้ไขข้อมูลนำส่งของกลาง
        // -----------------------------------------------------------
        if (this.oProve.ProveDeliverProduct != undefined && this.oProve.ProveDeliverProduct.length > 0) {
            this.oProveDeliverProduct.ProveID = this.ProveID;
            this.oProveDeliverProduct.DeliverID = this.oProve.ProveDeliverProduct[0].DeliverID;

            if (this.IsReceive) {
                this.oProveDeliverProduct.IsActive = 1;

                if (this.IsEvidence) {
                    await this.EviInSV.EvidenceInupdByCon(this.oEvidenceIn).then(async IsSuccess => {
                        if (!IsSuccess) {
                            isSuccess = IsSuccess;
                        } else {
                            await this.EviInSV.EvidenceInItemupdByCon(this.oEvidenceIn.EvidenceInItem).then(pRes => {
                                if (!pRes.IsSuccess) {
                                    isSuccess = pRes.IsSuccess;
                                }
                            }, (error) => { console.error(error); });
                        }
                    }, (error) => { isSuccess = false; console.error(error); });
                }
            }
            else {
                this.oProveDeliverProduct.IsActive = 0;

                await this.EviInSV.EvidenceInupdDelete(this.oEvidenceIn.EvidenceInID).then(async IsSuccess => {
                    if (IsSuccess) {
                        this.oEvidenceIn = {};
                    } else {
                        isSuccess = IsSuccess;
                    }
                }, (error) => { console.error(error); });
            }

            await this.proveService.ProveDeliverProductupdByCon(this.oProveDeliverProduct).then(async sRes => {
                if (!sRes.IsSuccess) {
                    isSuccess = sRes.IsSuccess;
                }
            }, (error) => { console.error(error); });
        }
        else {
            // คลิกเลือก “ส่งของกลาง”
            if (this.IsReceive) {
                this.oProveDeliverProduct.ProveID = this.ProveID;

                await this.proveService.ProveDeliverProductinsAll(this.oProveDeliverProduct).then(async sRes => {
                    if (!sRes.IsSuccess) {
                        isSuccess = sRes.IsSuccess;
                    } else {
                        await this.InsEvidence();
                        this.IsEvidence = true;
                    }
                }, (error) => { console.error(error); });
            }
        }



        // -----------------------------------------------------------
        //                   Update Prove
        // -----------------------------------------------------------
        this.oProve.ProveScience = [];
        this.oProve.ProveProduct = [];
        this.oProve.ProveDeliverProduct = [];

        await this.proveService.ProveupdByCon(this.oProve).then(async pRes => {
            if (!pRes.IsSuccess) {
                isSuccess = pRes.IsSuccess;
                return false;
            }
        }, (error) => { console.error(error); return false; });


        // -----------------------------------------------------------
        //                   Document
        // -----------------------------------------------------------
        if (this.ListProveDoc.length > 0) {
            // New Document
            this.ListProveDoc.filter(item => item.IsNewItem === true)
                .map(async item => {
                    item.ReferenceCode = this.oProve.ProveID;
                    item.IsNewItem = false;

                    await this.proveService.MasDocumentMaininsAll(item).then(pRes => {
                        if (!pRes.IsSuccess) {
                            isSuccess = pRes.IsSuccess;
                            return false;
                        }
                    }, (error) => { console.error(error); return false; });
                });


            // Edit Document
            this.ListProveDoc.filter(item => item.IsNewItem === false)
                .map(async item => {
                    item.ReferenceCode = this.oProve.ProveID;
                    await this.proveService.MasDocumentMainupdByCon(item).then(pRes => {
                        if (!pRes.IsSuccess) {
                            isSuccess = pRes.IsSuccess;
                            return false;
                        }
                    }, (error) => { console.error(error); return false; });
                });

            // Del Document    
            this.ListProveDoc.filter(item => item.IsDelItem === true)
                .map(async item => {

                    await this.proveService.MasDocumentMainupdDelete(item.DocumentID).then(pRes => {
                        if (!pRes.IsSuccess) {
                            isSuccess = pRes.IsSuccess;
                            return false;
                        }
                    }, (error) => { console.error(error); return false; });
                });
        }


        if (isSuccess) {
            this.ShowAlertSuccess(Message.saveComplete);
            //alert(Message.saveComplete);
            this.onComplete();
            this.getProveByID();
            this.preloader.setShowPreloader(false);
        } else {
            this.ShowAlertError(Message.saveFail);
            //alert(Message.saveFail);
            this.preloader.setShowPreloader(false);
        }
    }

    async InsEvidence() {
        await this.generateItemCode();
        await this.InsEvidenceInExternal();
    }

    async generateItemCode() {
        for (let i = 0; i < this.oEvidenceIn.EvidenceInItem.length; i++) {
            await this.EviInSV.TransactionRunningItemgetByCon("IN", this.oEvidenceIn.EvidenceInItem[i].GroupCode, this.WarehouseID).then(async item => {
                let date = new Date();

                if (item.length == 0) {
                    await this.EviInSV.TransactionRunningIteminsAll((date.getFullYear() + 543).toString().substring(2), date.getMonth(), "IN", this.oEvidenceIn.EvidenceInItem[i].GroupCode,
                        this.WarehouseID, "00001").then(res => {
                            if (res.IsSuccess) {
                                this.oEvidenceIn.EvidenceInItem[i].EvidenceInItemCode = "IN" + ("000".substring(0, 3 - this.WarehouseID.length) + this.WarehouseID)
                                    + ("0000".substring(0, 4 - this.oEvidenceIn.EvidenceInItem[i].GroupCode.length) + this.oEvidenceIn.EvidenceInItem[i].GroupCode) + (date.getFullYear() + 543).toString().substring(2) + "00001";
                            }
                        }, (error) => { console.error(error); return false; });
                }
                else {
                    await this.EviInSV.TransactionRunningItemupdByCon(item[0].RunningID).then(async res => {
                        if (res.IsSuccess) {
                            var pad = "00000"
                            var RunningNo = pad.substring(0, pad.length - item[0].RunningNo.toString().length) + (+item[0].RunningNo + 1);

                            this.oEvidenceIn.EvidenceInItem[i].EvidenceInItemCode = item[0].RunningPrefix + ("000".substring(0, 3 - item[0].RunningWarehouseID.toString().length) + item[0].RunningWarehouseID)
                                + ("0000".substring(0, 4 - item[0].RunningGroupCode.toString().length) + item[0].RunningGroupCode) + item[0].RunningYear + RunningNo;
                        }
                    }, (error) => { console.error(error); return false; });
                }
            }, (error) => { console.error(error); return false; });
        }
    }

    async InsEvidenceInExternal() {
        var isSuccess = true;

        this.EviInSV.EvidenceIninsAll(this.oEvidenceIn).then(async item => {
            if (item.IsSuccess) {
                this.oEvidenceIn.EvidenceInID = item.EvidenceInID;
                this.EvidenceInID = item.EvidenceInID;
            } else {
                this.ShowAlertError(Message.saveFail);
            }
        }, (error) => { console.error(error); return false; });
    }

    setStaffOfEvidence() {
        this.oEvidenceIn.EvidenceInStaff = [];

        this.oEviInStaff = {
            EvidenceInStaffID: "",
            EvidenceInID: "",
            StaffCode: this.oProveStaffSend.StaffCode,
            TitleName: this.oProveStaffSend.TitleName,
            FirstName: this.oProveStaffSend.FirstName,
            LastName: this.oProveStaffSend.LastName,
            PositionCode: this.oProveStaffSend.PositionCode,
            PositionName: this.oProveStaffSend.PositionName,
            PosLevel: this.oProveStaffSend.PosLevel,
            PosLevelName: this.oProveStaffSend.PosLevelName,
            DepartmentCode: this.oProveStaffSend.DepartmentCode,
            DepartmentName: this.oProveStaffSend.DepartmentName,
            DepartmentLevel: this.oProveStaffSend.DepartmentLevel,
            OfficeCode: this.oProveStaffSend.OfficeCode,
            OfficeName: this.oProveStaffSend.OfficeName,
            OfficeShortName: this.oProveStaffSend.OfficeShortName,
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
                let isSuccess: boolean = true;

                this.proveService.ProveupdDelete(this.ProveID).then(async IsSuccess => {
                    if (IsSuccess) {
                        if (this.IsReceive) {
                            this.EviInSV.EvidenceInupdDelete(this.oEvidenceIn.EvidenceInID).then(async IsSuccess => {
                                if (!IsSuccess) {
                                    isSuccess = IsSuccess;
                                }
                            }, (error) => { console.error(error); return false; });
                        }
                    } else {
                        isSuccess = IsSuccess;
                    }
                }, (error) => { console.error(error); return false; });

                if (isSuccess) {
                    this.ShowAlertSuccess(Message.saveComplete);
                    //alert(Message.saveComplete);
                    this.router.navigate(['/prove/list']);
                } else {
                    this.ShowAlertError(Message.saveFail);
                    //alert(Message.saveFail);
                }
            }
        })
    }

    ngOnDestroy(): void {
        this.onCancelSubscribe.unsubscribe();
        this.onSaveSubscribe.unsubscribe();
        this.onDeleSubscribe.unsubscribe();
        this.onPrintSubscribe.unsubscribe();
        this.onNextPageSubscribe.unsubscribe();
    }

    onComplete() {
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditButton(true);
        this.navService.setSearchBar(false);
        this.navService.setCancelButton(false);
        this.navService.setSaveButton(false);

        this.showEditField = true;
        this.showScienceField = true;
        //this.ShowDeliveryField = true;
        this.ShowReceiveField = true;
    }
    // openSuspect(e) {
    //     this.modal = this.suspectModalService.open(e, { size: 'lg', centered: true });
    // }

    ConvertDateYYYYmmdd(_Date: any) {
        let tDate = _Date;

        if (tDate != undefined) {
            return setZeroHours(new Date(`${tDate.year}-${tDate.month}-${tDate.day}`));
        }

        return "";
    }

    CreateObject() {
        this.oProve = {
            ProveID: "",
            DeliveryDocNo: "",
            DeliveryDate: null,
            ProveReportNo: "",
            ProveDate: null,
            ProveStationCode: "",
            ProveStation: "",
            IndictmentID: "",
            DeliveryStationCode: "",
            DeliveryStation: "",
            IsActive: 1,
            ProveProduct: [],
            ProveStaff: [],
            ProveScience: []
        }
    }

    CreateProduct() {
        this.oProveProduct = {};

        this.oProveProduct = {
            ProductID: "",
            ProductType: "",
            ProveID: "",
            ProductRefID: "",
            GroupCode: "",
            IsDomestic: "",
            ProductCode: "",
            BrandCode: "",
            BrandNameTH: "",
            BrandNameEN: "",
            SubBrandCode: "",
            SubBrandNameTH: "",
            SubBrandNameEN: "",
            ModelCode: "",
            ModelName: "",
            FixNo1: "",
            DegreeCode: "",
            Degree: "",
            SizeCode: "",
            Size: "",
            SizeUnitCode: "",
            SizeUnitName: "",
            FixNo2: "",
            SequenceNo: "",
            ProductDesc: "",
            CarNo: "",
            Qty: "",
            QtyUnit: "",
            NetVolume: "",
            NetVolumeUnit: "",
            ProveScienceID: "",
            ProveScienceResult: "",
            IsActive: "1",
            ReferenceRetailPrice: "",
            ReferenceVatRate: "",
            ReferenceVatQty: "",
            ReferenceRetailUnit: "",
            ReferenceVatValue: "",
            ReferenceVatUnit: "",
            ReferenceDate: "",
            IsStatusExhibit: "",
            Remarks: "",
            IsReferenceVatRate: false,
            IsReferenceVatQty: false,
            IsProdScience: false,
            IsNewItem: false,
            IsDelItem: false
        }
    }

    CreateScience() {
        this.oProveScience = {};

        this.oProveScience = {
            ProveScienceID: "",
            ProveID: "",
            ProveScienceDate: "",
            ProveScienceTime: "",
            RequestNo: "",
            ReportNo: "",
            IsProveScience: "",
            DeliveryDocNo: "",
            IsActive: 1,
        }
    }

    CreateDocuement() {
        this.oProveDocument = {};

        this.oProveDocument = {
            DocumentID: "",
            ReferenceCode: "",
            FilePath: "",
            DataSource: "",
            DocumentType: "",
            DocumentName: "",
            IsActive: "1",
            IsNewItem: true,
            IsDelItem: false
        }
    }

    // ผู้ตรวจรับ
    CreateStaff() {
        this.oProveStaff = {
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            StaffID: this.StaffID,
            LawsuitID: this.LawsuitID,
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
            ContributorID: "14"
        }
    }

    // ผู้พิสูจน์
    CreateScienceStaff() {
        this.oProveScienceStaff = {
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            StaffID: this.StaffID,
            LawsuitID: this.LawsuitID,
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
            ContributorID: "15"
        }
    }

    // ผู้นำส่งของกลาง
    CreateStaffSend() {
        this.oProveStaffSend = {
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            StaffID: this.StaffID,
            LawsuitID: this.LawsuitID,
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
            ContributorID: "13"
        }
    }

    checkNextPage() {
        if (this.ShowNextPage == true && this.showEditField == true) {
            this.navService.setNextPageButton(true);
        } else {
            this.navService.setNextPageButton(false);
        }
    }

    async getProveByID() {
        this.preloader.setShowPreloader(true);
        await this.proveService.ProvegetByCon(this.ProveID).then(async res => {
            if (res != null) {

                this.oProve = res;

                var PRN = this.oProve.ProveReportNo.split('/');

                if (PRN.length > 1) {
                    this.DeliveryDocNo = PRN[0];
                    this.ProveYear = PRN[1];
                }


                if (this.oProve.IsOutside == 1) {
                    this.IsOutside = true;
                }
                else {
                    this.IsOutside = false;
                }

                this.IsDelivery = true;
                // this.ShowDeliveryField = true;
                this.ProveStation = `${this.oProve.ProveStation == 'null' ? '' : this.oProve.ProveStation}`;
                this.Command = `${this.oProve.Command == 'null' ? '' : this.oProve.Command}`;
                this.DeliveryStation = res.DeliveryStation;


                var PDate = this.oProve.ProveDate.toString().split(" ");
                this.ProveDate = setDateMyDatepicker(new Date(PDate[0]));
                //this.ProveTime = PDate[1] + ".000";

                var PSDate = this.oProve.DeliveryDate.toString().split(" ");
                this.DeliveryDate = setDateMyDatepicker(new Date(PSDate[0]));
                //this.DeliveryTime = PSDate[1] + ".000";

                var PStaff = this.oProve.ProveStaff.filter(f => f.ContributorID == "14");
                if (PStaff.length > 0) {
                    this.ProveStaffName = PStaff[0].TitleName + PStaff[0].FirstName + ' ' + PStaff[0].LastName;
                    this.PosExaminer = PStaff[0].PositionName;
                    this.DeptExaminer = PStaff[0].OfficeName;
                    this.StaffID = PStaff[0].StaffID;
                    this.oProveStaff = PStaff[0];
                }


                var PScienceStaff = this.oProve.ProveStaff.filter(f => f.ContributorID == "15");
                if (PScienceStaff.length > 0) {
                    this.ScienceStaffName = `${PScienceStaff[0].TitleName == 'null' || PScienceStaff[0].TitleName == null ? '' : PScienceStaff[0].TitleName}`
                        + `${PScienceStaff[0].FirstName == 'null' || PScienceStaff[0].FirstName == null ? '' : PScienceStaff[0].FirstName}` + ' '
                        + `${PScienceStaff[0].LastName == 'null' || PScienceStaff[0].LastName == null ? '' : PScienceStaff[0].LastName}`;

                    this.PosScience = PScienceStaff[0].PositionName;
                    this.DeptScience = PScienceStaff[0].OfficeName;
                    this.StaffScienceID = PScienceStaff[0].StaffID;
                    this.oProveScienceStaff = PScienceStaff[0];
                }


                var PSendStaff = this.oProve.ProveStaff.filter(f => f.ContributorID == "13");
                if (PSendStaff.length > 0 && PSendStaff[0].FirstName != null && PSendStaff[0].FirstName != 'null' && PSendStaff[0].FirstName != "") {
                    this.StaffSendName = `${PSendStaff[0].TitleName == null || PSendStaff[0].TitleName == 'null' ? '' : PSendStaff[0].TitleName}` + `${PSendStaff[0].FirstName == null || PSendStaff[0].FirstName == 'null' ? '' : PSendStaff[0].FirstName}` + ' ' + `${PSendStaff[0].LastName == null || PSendStaff[0].LastName == 'null' ? '' : PSendStaff[0].LastName}`;
                    this.PosStaffSend = `${PSendStaff[0].PositionName == null || PSendStaff[0].PositionName == 'null' ? '' : PSendStaff[0].PositionName}`;
                    this.DeptStaffSend = `${PSendStaff[0].OfficeName == null || PSendStaff[0].OfficeName == 'null' ? '' : PSendStaff[0].OfficeName}`;
                    this.StaffSendID = PSendStaff[0].StaffID;
                    this.oProveStaffSend = PSendStaff[0];
                }

                this.oProve.ProveStaff = [];

                this.lsProveProduct = res.ProveProduct;
                this.SummaryProveResult = "";

                let pIndex = 0;
                this.lsProveProduct.map(item => {
                    // item.IsNewItem = false;
                    // item.IsDelItem = false;
                    pIndex += 1;

                    item.Remarks = `${item.Remarks == null || item.Remarks == "null" ? '' : item.Remarks}`;
                    item.ProveScienceResult = `${item.ProveScienceResult == null ? '' : item.ProveScienceResult}`;
                    item.ProveResult = `${item.ProveResult == null || item.ProveResult == undefined ? 'ของกลางลำดับที่ ' + pIndex : item.ProveResult}`;
                    item.VatProve = (+item.VatProve).toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 });;

                    if (item.ProveScienceID == '0') {
                        item.IsProdScience = false;
                    }
                    else {
                        item.IsProdScience = true;
                    }

                    if (item.ProveResult != "") {
                        this.SummaryProveResult += item.ProveResult + "\n";
                    }
                });

                // for (var i = 0; i < this.lsProveProduct.length; i += 1) {
                //     this.lsProveProduct[i].ProductSeq = i;
                // }

                if (this.oProve.ProveScience.length > 0) {
                    this.oProve.ProveScience.map(item => {
                        item.DeliveryDocNo = `${item.DeliveryDocNo == null ? '' : item.DeliveryDocNo}`;
                        item.ProveScienceDate = `${item.ProveScienceDate == null ? '' : item.ProveScienceDate}`;
                        item.RequestNo = `${item.RequestNo == null || item.RequestNo == 'null' ? '' : item.RequestNo}`;
                        item.ReportNo = `${item.ReportNo == null || item.ReportNo == 'null' ? '' : item.ReportNo}`;
                    });

                    this.IsProveScience = true;
                    this.showScienceField = true;
                    this.ScienceDeliveryDocNo = this.oProve.ProveScience[0].DeliveryDocNo;
                    this.RequestNo = this.oProve.ProveScience[0].RequestNo;
                    this.ReportNo = this.oProve.ProveScience[0].ReportNo;
                    this.oProveScience = this.oProve.ProveScience[0];

                    var ScDate = this.oProve.ProveScience[0].ProveScienceDate.toString().split(" ");
                    this.ProveScienceDate = setDateMyDatepicker(new Date(ScDate[0]));
                }


                if (this.oProve.ProveDeliverProduct.length > 0) {
                    this.oProve.ProveDeliverProduct.map(item => {
                        item.DeliverNo = `${item.DeliverNo == null ? '' : item.DeliverNo}`;
                        item.DeliverDate = `${item.DeliverDate == null ? '' : item.DeliverDate}`;
                        item.DeliverTo = `${item.DeliverTo == null ? '' : item.DeliverTo}`;
                    });

                    if (this.oProve.ProveDeliverProduct[0].IsReceive == "1") {
                        this.IsReceive = true;

                        this.EviInSV.getByCon(this.EvidenceInID, this.oProve.ProveID).then(async res => {
                            if (res != null && res.IsSuccess != "False") {
                                this.oEvidenceIn = res[0]
                                this.IsEvidence = true;
                                if (this.oEvidenceIn.IsReceive == "1") { this.IsEvidenceReceive = true; } else { this.IsEvidenceReceive == false }
                            }
                        }, (err: HttpErrorResponse) => {
                            this.ShowAlertError("API EvidenceIngetByCon :: " + err.message);
                        });
                    } else {
                        this.IsReceive = false;
                    }

                    this.ShowReceiveField = false;

                    var DelvNo = this.oProve.ProveDeliverProduct[0].DeliverNo.split('/');

                    if (DelvNo.length > 1) {
                        this.DeliverNo = DelvNo[0];
                        this.DeliverNoYear = DelvNo[1];
                    }

                    //this.DeliverNo = this.oProve.ProveDeliverProduct[0].DeliverNo;
                    this.DeliverTo = this.oProve.ProveDeliverProduct[0].DeliverTo;
                    this.oProveDeliverProduct = this.oProve.ProveDeliverProduct[0];

                    var DvDate = this.oProve.ProveDeliverProduct[0].DeliverDate.toString().split(" ");
                    this.DeliverDate = setDateMyDatepicker(new Date(DvDate[0]));
                } else {
                    this.IsEvidence = false;
                    // this.changeDataReceive();
                }

                // -------------- Document -------------------------

                this.ListProveDoc = [];

                this.proveService.MasDocumentMaingetAll(this.oProve.ProveID, "5").then(async doc => {
                    if (doc.length > 0) {
                        this.ListProveDoc = doc;

                        for (var i = 0; i < this.ListProveDoc.length; i += 1) {
                            this.ListProveDoc[i].DocumentSeq = i;
                            this.ListProveDoc[i].IsNewItem = false;
                            this.ListProveDoc[i].IsDelItem = false;
                        }
                    }
                }, (err: HttpErrorResponse) => {
                    this.ShowAlertError(err.message);
                    //alert(err.message);
                });

                this.checkNextPage();

                this.preloader.setShowPreloader(false);
            }
        }, (err: HttpErrorResponse) => {
            this.ShowAlertError("API ProvegetByCon Error !!");
            this.preloader.setShowPreloader(false);
        });

    }

    async ProveArrestgetByCon() {
        await this.proveService.LawsuitArrestgetByCon(this.IndictmentID).then(async lRes => {
            if (lRes.length > 0) {
                this.ArrestCode = lRes[0].ArrestCode;
                this.LawsuiltCode = lRes[0].LawsuitArrestIndicment[0].Lawsuit[0].LawsuitNo;
                this.GuiltBaseID = lRes[0].LawsuitArrestIndicment[0].LawsuitLawGuiltbase[0].LawsuitLawSubSectionRule[0].LawsuitLawSubSection[0].SubSectionType;
                this.GuiltBaseName = lRes[0].LawsuitArrestIndicment[0].LawsuitLawGuiltbase[0].GuiltBaseName;
                this.SectionNo = lRes[0].LawsuitArrestIndicment[0].LawsuitLawGuiltbase[0].LawsuitLawSubSectionRule[0].SectionNo;
                this.PenaltyDesc = lRes[0].LawsuitArrestIndicment[0].LawsuitLawGuiltbase[0].LawsuitLawSubSectionRule[0].LawsuitLawSection[0].LawsuitLawPenalty[0].PenaltyDesc;

                this.navService.setInnerTextNextPageButton('งานเปรียบเทียบปรับ');
                this.navService.setNextPageButton(false);

                if (lRes[0].LawsuitArrestIndicment[0].LawsuitArrestIndicmentDetail.length > 0) {
                    for (var i = 0; i < lRes[0].LawsuitArrestIndicment[0].LawsuitArrestIndicmentDetail.length; i += 1) {
                        if (lRes[0].LawsuitArrestIndicment[0].LawsuitArrestIndicmentDetail[i].LawsuitType == "1") {
                            this.ShowNextPage = true;
                            break;
                        }
                    }
                }

                this.ArrestProduct = [];

                await this.proveService.ArrestIndictmentProductgetByIndictmentID(this.IndictmentID).then(async res => {
                    if (res.IsSuccess != "False") {
                        if (res.length > 0) {
                            for (var i = 0; i < res.length; i += 1) {
                                this.oProveProduct = {
                                    ProductID: "",
                                    ProductType: res[i].ProductType,
                                    ProveID: "",
                                    ProductRefID: res[i].ProductID,
                                    GroupCode: res[i].ProductGroupCode,
                                    IsDomestic: res[i].ProductIsDomestic,
                                    ProductCode: res[i].ProductCode,
                                    BrandCode: res[i].ProductBrandCode,
                                    BrandNameTH: res[i].ProductBrandNameTH,
                                    BrandNameEN: res[i].ProductBrandNameEN,
                                    SubBrandCode: res[i].ProductSubBrandCode,
                                    SubBrandNameTH: res[i].ProductSubBrandNameTH,
                                    SubBrandNameEN: res[i].ProductSubBrandNameEN,
                                    ModelCode: res[i].ProductModelCode,
                                    ModelName: res[i].ProductModelName,
                                    FixNo1: res[i].ProductFixNo1,
                                    DegreeCode: res[i].ProductDegreeCode,
                                    Degree: res[i].ProductDegree,
                                    SizeCode: res[i].ProductSizeCode,
                                    Size: res[i].IndictmentProductSize,
                                    SizeUnitCode: res[i].ProductSizeUnitCode,
                                    SizeUnitName: res[i].IndictmentProductSizeUnit,
                                    FixNo2: res[i].ProductFixNo2,
                                    SequenceNo: res[i].ProductSequenceNo,
                                    ProductDesc: res[i].ProductDesc,
                                    CarNo: res[i].ProductCarNo,
                                    Qty: res[i].IndictmentProductQty,
                                    QtyUnit: res[i].IndictmentProductQtyUnit,
                                    QtyBalance: res[i].IndictmentProductQty,
                                    QtyBalanceUnit: res[i].IndictmentProductQtyUnit,
                                    NetVolume: res[i].IndictmentProductVolume,
                                    NetVolumeUnit: res[i].IndictmentProductVolumeUnit,
                                    NetVolumeBalance: res[i].IndictmentProductVolume,
                                    NetVolumeBalanceUnit: res[i].IndictmentProductVolumeUnit,
                                    IsProveScience: "",
                                    ProveScienceID: "",
                                    ProveScienceResult: "",
                                    ReferenceRetailPrice: "",
                                    ReferenceRetailUnit: "",
                                    ReferenceVatRate: "",
                                    ReferenceVatQty: "",
                                    ReferenceVatValue: "",
                                    ReferenceVatUnit: "",
                                    ReferenceDate: "",
                                    RetailPrice: "",
                                    RetailUnit: "",
                                    VatValue: "",
                                    VatUnit: "",
                                    VatProve: "",
                                    ProveResult: "",
                                    Remarks: "",
                                    IsStatusExhibit: "",
                                    IsActive: "1",
                                    DeliverID: "",
                                    IsReferenceVatRate: false,
                                    IsReferenceVatQty: false,
                                    IsProdScience: false,
                                    IsNewItem: true,
                                    IsDelItem: false
                                }

                                this.ArrestProduct.push(this.oProveProduct);
                            }

                            this.getProveProduct();
                        }
                    }
                    else {
                        this.ShowAlertError("API ArrestIndictmentProductgetByIndictmentID :: Response Error !!");
                        this.preloader.setShowPreloader(false);
                    }
                }, (err: HttpErrorResponse) => {
                    this.ShowAlertError("API ArrestIndictmentProductgetByIndictmentID Error !!");
                    this.preloader.setShowPreloader(false);
                });
            }
        }, (err: HttpErrorResponse) => {
            this.ShowAlertError("API LawsuitArrestgetByCon Error !!");
            this.preloader.setShowPreloader(false);
        });

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

    async getProveProduct() {

        // ---- กรณีไม่มีเลข ProveID จะ default Product จาก ArrestProduct----
        if (this.ProveID == "0") {
            if (this.ArrestProduct.length > 0) {
                this.lsProveProduct = [];

                this.lsProveProduct = this.ArrestProduct;
                this.lsProveProduct.map(async item => {
                    item.IsProdScience = false;
                });

                // this.ShowDeliveryField = true;
                this.oProveProduct = {};
                this.preloader.setShowPreloader(false);

                this.LoadDataFromLocalStorage()
            }
        }
        else {
            this.getProveByID();
        }
    }

    LoadDataFromLocalStorage() {
        this.oProve.ProveStationCode = localStorage.getItem("officeCode");
        this.oProve.ProveStation = localStorage.getItem("officeShortName");
        this.ProveStation = localStorage.getItem("officeShortName");

        let tempUser = this.rawStaffOptions.filter(f => f.StaffCode == localStorage.getItem("staffCode"));

        // ----- ผู้ตรวจรับ -----
        this.oProveStaff = {
            StaffID: 0,
            ProveID: "",
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            LawsuitID: this.LawsuitID,
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
            ContributorID: "14"
        }

        this.ProveStaffName = localStorage.getItem("fullName");
        this.PosExaminer = localStorage.getItem("operationPosName");
        this.DeptExaminer = localStorage.getItem("officeShortName");


        // ----- ผู้พิสูจน์ -----
        this.oProveScienceStaff = {
            StaffID: 0,
            ProveID: "",
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            LawsuitID: this.LawsuitID,
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
            ContributorID: "15"
        }

        this.ScienceStaffName = localStorage.getItem("fullName");
        this.PosScience = localStorage.getItem("operationPosName");
        this.DeptScience = localStorage.getItem("officeShortName");


        // ----- ผู้นำส่ง -----
        this.oProveStaffSend = {
            StaffID: 0,
            ProveID: "",
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            LawsuitID: this.LawsuitID,
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
            ContributorID: "13"
        }

        this.StaffSendName = localStorage.getItem("fullName");
        this.PosStaffSend = localStorage.getItem("operationPosName");
        this.DeptStaffSend = localStorage.getItem("officeShortName");
    }



    // --- เขียนที่ ---
    async getStation() {
        await this.MasterSV.getStation().then(res => {
            if (res) {
                this.rawOptions = res;
            }

        }, (err: HttpErrorResponse) => {
            //alert(err.message);
        });
    }

    onAutoChange(value: string) {
        // 
        if (value == '') {
            this.options = [];

            this.oProve.ProveStationCode = "";
            this.oProve.ProveStation = "";
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
        this.oProve.ProveStationCode = event.OfficeCode;
        this.oProve.ProveStation = event.OfficeName;
    }

    chooseFirstProveStation(): void {
        this.ProveStation = this.options[0].OfficeName;
        this.oProve.ProveStationCode = this.options[0].OfficeCode;
        this.oProve.ProveStation = this.options[0].OfficeName;
    }
    // ----- End เขียนที่ ---


    // --- หน่วยงานที่นำส่ง ---
    DeliveryOnAutoChange(value: string) {
        if (value == '') {
            this.Deliveryoptions = [];

            this.oProve.DeliveryStationCode = "";
            this.oProve.DeliveryStation = "";
        } else {

            this.Deliveryoptions = this.rawOptions.filter(f => f.OfficeName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    DeliveryOnAutoFocus(value: string) {
        if (value == '') {
            this.Deliveryoptions = [];
        }
    }

    DeliveryOnAutoSelecteWord(event) {
        this.oProve.DeliveryStationCode = event.OfficeCode;
        this.oProve.DeliveryStation = event.OfficeName;
    }

    chooseFirstDelivery(): void {
        this.DeliveryStation = this.Deliveryoptions[0].OfficeName;
        this.oProve.DeliveryStationCode = this.Deliveryoptions[0].OfficeCode;
        this.oProve.DeliveryStation = this.Deliveryoptions[0].OfficeName;
    }

    // ----- End หน่วยงานที่นำส่ง ---


    // --- หน่วยงานที่นำส่ง ---
    DestinationOnAutoChange(value: string) {
        if (value == '') {
            this.Destinationoptions = [];

            // this.oProve.DeliveryStationCode = "";
            // this.oProve.DeliveryStation = "";
        } else {
            this.Destinationoptions = this.rawOptions.filter(f => f.OfficeName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    DestinationOnAutoFocus(value: string) {
        if (value == '') {
            this.Destinationoptions = [];
        }
    }

    DestinationOnAutoSelecteWord(event) {
       this.DestinationCode = event.OfficeCode;
       this.getWarehouse();
    }

    chooseFirstDestination(): void {
        this.DeliverTo = this.Destinationoptions[0].OfficeName;
    }
    // ----- End หน่วยงานที่นำส่ง ---


    // --- ผู้ตรวจรับ ---
    async getProveStaff() {
        await this.MasterSV.getStaff().then(async res => {
            if (res) {
                this.rawStaffOptions = res;
            }
        }, (err: HttpErrorResponse) => {
            // alert(err.message);
        });
    }

    StaffonAutoChange(value: string) {
        if (value == '') {
            this.Staffoptions = [];
            this.ClearStaffData();
        } else {
            if (this.rawStaffOptions.length == 0) {
                this.getProveStaff();
            }
            this.Staffoptions = this.rawStaffOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1 || f.LastName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    StaffonAutoFocus(value: string) {
        if (value == '') {
            this.Staffoptions = [];
            this.ClearStaffData();
        }
    }

    StaffonAutoSelecteWord(event) {
        this.oProveStaff = {
            StaffID: this.StaffID,
            ProveID: this.ProveID,
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            LawsuitID: this.LawsuitID,
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
            ContributorID: "14"
        }

        this.PosExaminer = event.OperationPosName;
        this.DeptExaminer = event.OfficeName;
    }

    chooseFirstStaff(): void {
        this.oProveStaff = {
            StaffID: this.StaffID,
            ProveID: this.ProveID,
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            LawsuitID: this.LawsuitID,
            StaffCode: this.Staffoptions[0].StaffCode,
            TitleName: this.Staffoptions[0].TitleName,
            FirstName: this.Staffoptions[0].FirstName,
            LastName: this.Staffoptions[0].LastName,
            PositionCode: this.Staffoptions[0].OperationPosCode,
            PositionName: this.Staffoptions[0].OperationPosName,
            PosLevel: this.Staffoptions[0].PosLevel,
            PosLevelName: this.Staffoptions[0].PosLevelName,
            DepartmentCode: this.Staffoptions[0].OperationDeptCode,
            DepartmentName: this.Staffoptions[0].OperationDeptName,
            DepartmentLevel: this.Staffoptions[0].DeptLevel,
            OfficeCode: this.Staffoptions[0].OfficeCode,
            OfficeName: this.Staffoptions[0].OfficeName,
            OfficeShortName: this.Staffoptions[0].OfficeShortName,
            ContributorID: "14"
        }

        this.ProveStaffName = this.Staffoptions[0].TitleName + this.Staffoptions[0].FirstName + ' ' + this.Staffoptions[0].LastName;
        this.PosExaminer = this.Staffoptions[0].OperationPosName;
        this.DeptExaminer = this.Staffoptions[0].OfficeName;
    }
    // ----- End ผู้ตรวจรับ ---


    // --- ผู้พิสูจน์ ---
    ScienceStaffonAutoChange(value: string) {
        // 
        if (value == '') {
            this.Scienceoptions = [];
            this.ClearStaffScience();
        } else {
            if (this.rawStaffOptions.length == 0) {
                this.getProveStaff();
            }

            this.Scienceoptions = this.rawStaffOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1 || f.LastName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    ScienceStaffonAutoFocus(value: string) {
        if (value == '') {
            this.Scienceoptions = [];
            this.ClearStaffScience();
        }
    }

    ScienceStaffonAutoSelecteWord(event) {
        this.oProveScienceStaff = {
            StaffID: this.StaffScienceID,
            ProveID: this.ProveID,
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            LawsuitID: this.LawsuitID,
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
            ContributorID: "15"
        }

        this.PosScience = event.OperationPosName;
        this.DeptScience = event.OfficeName;
    }

    chooseFirstScienceStaff(): void {
        this.oProveScienceStaff = {
            StaffID: this.StaffID,
            ProveID: this.ProveID,
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            LawsuitID: this.LawsuitID,
            StaffCode: this.Scienceoptions[0].StaffCode,
            TitleName: this.Scienceoptions[0].TitleName,
            FirstName: this.Scienceoptions[0].FirstName,
            LastName: this.Scienceoptions[0].LastName,
            PositionCode: this.Scienceoptions[0].OperationPosCode,
            PositionName: this.Scienceoptions[0].OperationPosName,
            PosLevel: this.Scienceoptions[0].PosLevel,
            PosLevelName: this.Scienceoptions[0].PosLevelName,
            DepartmentCode: this.Scienceoptions[0].OperationDeptCode,
            DepartmentName: this.Scienceoptions[0].OperationDeptName,
            DepartmentLevel: this.Scienceoptions[0].DeptLevel,
            OfficeCode: this.Scienceoptions[0].OfficeCode,
            OfficeName: this.Scienceoptions[0].OfficeName,
            OfficeShortName: this.Scienceoptions[0].OfficeShortName,
            ContributorID: "15"
        }

        this.ScienceStaffName = `${this.Scienceoptions[0].TitleName == 'null' || this.Scienceoptions[0].TitleName == null ? '' : this.Scienceoptions[0].TitleName}`
            + `${this.Scienceoptions[0].FirstName == 'null' || this.Scienceoptions[0].FirstName == null ? '' : this.Scienceoptions[0].FirstName}` + ' '
            + `${this.Scienceoptions[0].LastName == 'null' || this.Scienceoptions[0].LastName == null ? '' : this.Scienceoptions[0].LastName}`;
        this.PosScience = this.Scienceoptions[0].OperationPosName;
        this.DeptScience = this.Scienceoptions[0].OfficeName;
    }
    // ----- End ผู้ตรวจพิสูจน์ ---


    // --- ผู้นำส่งของกลาง ---
    StaffSendonAutoChange(value: string) {
        // 
        if (value == '') {
            this.StaffSendoptions = [];
            this.ClearStaffSend();
        } else {
            if (this.rawStaffOptions.length == 0) {
                this.getProveStaff();
            }

            this.StaffSendoptions = this.rawStaffOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1 || f.LastName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    StaffSendonAutoFocus(value: string) {
        if (value == '') {
            this.StaffSendoptions = [];
            this.ClearStaffSend();
        }
    }

    StaffSendonAutoSelecteWord(event) {
        this.oProveStaffSend = {
            StaffID: this.StaffSendID,
            ProveID: this.ProveID,
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            LawsuitID: this.LawsuitID,
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
            ContributorID: "13"
        }

        this.PosStaffSend = event.OperationPosName;
        this.DeptStaffSend = event.OfficeName;
    }

    chooseFirstStaffSend(): void {
        this.oProveStaffSend = {
            StaffID: this.StaffID,
            ProveID: this.ProveID,
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            LawsuitID: this.LawsuitID,
            StaffCode: this.StaffSendoptions[0].StaffCode,
            TitleName: this.StaffSendoptions[0].TitleName,
            FirstName: this.StaffSendoptions[0].FirstName,
            LastName: this.StaffSendoptions[0].LastName,
            PositionCode: this.StaffSendoptions[0].OperationPosCode,
            PositionName: this.StaffSendoptions[0].OperationPosName,
            PosLevel: this.StaffSendoptions[0].PosLevel,
            PosLevelName: this.StaffSendoptions[0].PosLevelName,
            DepartmentCode: this.StaffSendoptions[0].OperationDeptCode,
            DepartmentName: this.StaffSendoptions[0].OperationDeptName,
            DepartmentLevel: this.StaffSendoptions[0].DeptLevel,
            OfficeCode: this.StaffSendoptions[0].OfficeCode,
            OfficeName: this.StaffSendoptions[0].OfficeName,
            OfficeShortName: this.StaffSendoptions[0].OfficeShortName,
            ContributorID: "13"
        }

        this.StaffSendName = this.StaffSendoptions[0].TitleName + this.StaffSendoptions[0].FirstName + ' ' + this.StaffSendoptions[0].LastName;
        this.PosStaffSend = this.StaffSendoptions[0].OperationPosName;
        this.DeptStaffSend = this.StaffSendoptions[0].OfficeName;
    }
    // ----- End ผู้นำส่งของกลาง ---


    // --- Product ---
    async getProduct() {
        await this.MasterSV.getProduct().then(res => {
            if (res) {
                this.rawProductOptions = res;
            }

        }, (err: HttpErrorResponse) => {
            //alert(err.message);
        });
    }

    onAutoProductChange(value: string) {
        // 
        if (value == '') {
            this.Productoptions = [];

            this.oTempProduct = {};
            this.oTempProduct = {
                ProductID: this.oProveProduct.ProductID,
                ProductType: "",
                ProveID: this.ProveID,
                ProductRefID: "",
                GroupCode: "",
                IsDomestic: "",
                ProductCode: "",
                BrandCode: "",
                BrandNameTH: "",
                BrandNameEN: "",
                SubBrandCode: "",
                SubBrandNameTH: "",
                SubBrandNameEN: "",
                ModelCode: "",
                ModelName: "",
                FixNo1: "",
                DegreeCode: "",
                Degree: "",
                SizeCode: "",
                Size: "",
                SizeUnitCode: "",
                SizeUnitName: "",
                FixNo2: "",
                SequenceNo: "",
                ProductDesc: "",
                CarNo: "",
                Qty: this.oProveProduct.Qty,
                QtyUnit: this.oProveProduct.QtyUnit,
                QtyBalance: this.oProveProduct.QtyBalance,
                QtyBalanceUnit: this.oProveProduct.QtyBalanceUnit,
                NetVolume: this.oProveProduct.NetVolume,
                NetVolumeUnit: this.oProveProduct.NetVolumeUnit,
                NetVolumeBalance: this.oProveProduct.NetVolumeBalance,
                NetVolumeBalanceUnit: this.oProveProduct.NetVolumeBalanceUnit,
                IsProveScience: this.oProveProduct.IsProveScience,
                ProveScienceID: this.oProveProduct.ProveScienceID,
                ProveScienceResult: this.oProveProduct.ProveScienceResult,
                ReferenceRetailPrice: this.oProveProduct.ReferenceRetailPrice,
                ReferenceRetailUnit: this.oProveProduct.ReferenceRetailUnit,
                ReferenceVatRate: this.oProveProduct.ReferenceVatRate,
                ReferenceVatQty: this.oProveProduct.ReferenceVatQty,
                ReferenceVatValue: this.oProveProduct.ReferenceVatValue,
                ReferenceVatUnit: this.oProveProduct.ReferenceVatUnit,
                ReferenceDate: "",
                RetailPrice: this.oProveProduct.RetailPrice,
                RetailUnit: this.oProveProduct.RetailUnit,
                VatValue: this.oProveProduct.VatValue,
                VatUnit: this.oProveProduct.VatUnit,
                VatProve: this.oProveProduct.VatProve,
                ProveResult: this.oProveProduct.ProveResult,
                Remarks: this.oProveProduct.Remarks,
                IsStatusExhibit: this.oProveProduct.IsStatusExhibit,
                IsActive: this.oProveProduct.IsActive,
                IsReferenceVatRate: this.oProveProduct.IsReferenceVatRate,
                IsReferenceVatQty: this.oProveProduct.IsReferenceVatQty,
                IsProdScience: this.oProveProduct.IsProdScience
            }

            this.oProveProduct = this.oTempProduct;
        } else {
            this.Productoptions = this.rawProductOptions.filter(f => f.ProductDesc.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    onAutoProductFocus(value: string) {
        if (value == '') {
            this.Productoptions = [];
        }
    }

    onAutoProductSelecteWord(event) {
        this.oTempProduct = {};

        this.oTempProduct = {
            ProductID: this.oProveProduct.ProductID,
            ProductType: event.ProductType,
            ProveID: this.ProveID,
            ProductRefID: event.ProductID,
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
            SizeCode: event.SizeCode,
            Size: event.Size,
            SizeUnitCode: event.SizeUnitCode,
            SizeUnitName: event.SizeUnitName,
            FixNo2: event.FixNo2,
            SequenceNo: event.SequenceNo,
            ProductDesc: event.ProductDesc,
            CarNo: event.CarNo,
            Qty: this.oProveProduct.Qty,
            QtyUnit: this.oProveProduct.QtyUnit,
            QtyBalance: this.oProveProduct.QtyBalance,
            QtyBalanceUnit: this.oProveProduct.QtyBalanceUnit,
            NetVolume: this.oProveProduct.NetVolume,
            NetVolumeUnit: this.oProveProduct.NetVolumeUnit,
            NetVolumeBalance: this.oProveProduct.NetVolumeBalance,
            NetVolumeBalanceUnit: this.oProveProduct.NetVolumeBalanceUnit,
            IsProveScience: this.oProveProduct.IsProveScience,
            ProveScienceID: this.oProveProduct.ProveScienceID,
            ProveScienceResult: this.oProveProduct.ProveScienceResult,
            ReferenceRetailPrice: this.oProveProduct.ReferenceRetailPrice,
            ReferenceRetailUnit: this.oProveProduct.ReferenceRetailUnit,
            ReferenceVatRate: this.oProveProduct.ReferenceVatRate,
            ReferenceVatQty: this.oProveProduct.ReferenceVatQty,
            ReferenceVatValue: this.oProveProduct.ReferenceVatValue,
            ReferenceVatUnit: this.oProveProduct.ReferenceVatUnit,
            ReferenceDate: "",
            RetailPrice: this.oProveProduct.RetailPrice,
            RetailUnit: this.oProveProduct.RetailUnit,
            VatValue: this.oProveProduct.VatValue,
            VatUnit: this.oProveProduct.VatUnit,
            VatProve: this.oProveProduct.VatProve,
            ProveResult: this.oProveProduct.ProveResult,
            Remarks: this.oProveProduct.Remarks,
            IsStatusExhibit: this.oProveProduct.IsStatusExhibit,
            IsActive: this.oProveProduct.IsActive,
            IsReferenceVatRate: this.oProveProduct.IsReferenceVatRate,
            IsReferenceVatQty: this.oProveProduct.IsReferenceVatQty,
            IsProdScience: this.oProveProduct.IsProdScience
        }

        this.oProveProduct = this.oTempProduct;
    }

    chooseFirstProduct(): void {
        this.oTempProduct = {};

        this.oTempProduct = {
            ProductID: this.oProveProduct.ProductID,
            ProductType: this.Productoptions[0].ProductType,
            ProveID: this.ProveID,
            ProductRefID: this.Productoptions[0].ProductID,
            GroupCode: this.Productoptions[0].GroupCode,
            IsDomestic: this.Productoptions[0].IsDomestic,
            ProductCode: this.Productoptions[0].ProductCode,
            BrandCode: this.Productoptions[0].BrandCode,
            BrandNameTH: this.Productoptions[0].BrandNameTH,
            BrandNameEN: this.Productoptions[0].BrandNameEN,
            SubBrandCode: this.Productoptions[0].SubBrandCode,
            SubBrandNameTH: this.Productoptions[0].SubBrandNameTH,
            SubBrandNameEN: this.Productoptions[0].SubBrandNameEN,
            ModelCode: this.Productoptions[0].ModelCode,
            ModelName: this.Productoptions[0].ModelName,
            FixNo1: this.Productoptions[0].FixNo1,
            DegreeCode: this.Productoptions[0].DegreeCode,
            Degree: this.Productoptions[0].Degree,
            SizeCode: this.Productoptions[0].SizeCode,
            Size: this.Productoptions[0].Size,
            SizeUnitCode: this.Productoptions[0].SizeUnitCode,
            SizeUnitName: this.Productoptions[0].SizeUnitName,
            FixNo2: this.Productoptions[0].FixNo2,
            SequenceNo: this.Productoptions[0].SequenceNo,
            ProductDesc: this.Productoptions[0].ProductDesc,
            CarNo: this.Productoptions[0].CarNo,
            Qty: this.oProveProduct.Qty,
            QtyUnit: this.oProveProduct.QtyUnit,
            QtyBalance: this.oProveProduct.QtyBalance,
            QtyBalanceUnit: this.oProveProduct.QtyBalanceUnit,
            NetVolume: this.oProveProduct.NetVolume,
            NetVolumeUnit: this.oProveProduct.NetVolumeUnit,
            NetVolumeBalance: this.oProveProduct.NetVolumeBalance,
            NetVolumeBalanceUnit: this.oProveProduct.NetVolumeBalanceUnit,
            IsProveScience: this.oProveProduct.IsProveScience,
            ProveScienceID: this.oProveProduct.ProveScienceID,
            ProveScienceResult: this.oProveProduct.ProveScienceResult,
            ReferenceRetailPrice: this.oProveProduct.ReferenceRetailPrice,
            ReferenceRetailUnit: this.oProveProduct.ReferenceRetailUnit,
            ReferenceVatRate: this.oProveProduct.ReferenceVatRate,
            ReferenceVatQty: this.oProveProduct.ReferenceVatQty,
            ReferenceVatValue: this.oProveProduct.ReferenceVatValue,
            ReferenceVatUnit: this.oProveProduct.ReferenceVatUnit,
            ReferenceDate: "",
            RetailPrice: this.oProveProduct.RetailPrice,
            RetailUnit: this.oProveProduct.RetailUnit,
            VatValue: this.oProveProduct.VatValue,
            VatUnit: this.oProveProduct.VatUnit,
            VatProve: this.oProveProduct.VatProve,
            ProveResult: this.oProveProduct.ProveResult,
            Remarks: this.oProveProduct.Remarks,
            IsStatusExhibit: this.oProveProduct.IsStatusExhibit,
            IsActive: this.oProveProduct.IsActive,
            IsReferenceVatRate: this.oProveProduct.IsReferenceVatRate,
            IsReferenceVatQty: this.oProveProduct.IsReferenceVatQty,
            IsProdScience: this.oProveProduct.IsProdScience
        }

        this.oProveProduct = this.oTempProduct;
    }
    // ----- End Product ---


    // --- คลังจัดเก็บ ---
    async getWarehouse() {
        this.preloader.setShowPreloader(true);

        this.DestinationCode = "030700";
        await this.MasterSV.getWarehourse(this.DestinationCode).then(res => {
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

            // this.oProve.DeliveryStationCode = "";
            // this.oProve.DeliveryStation = "";
        } else {
            this.Warehouseoptions = this.rawWarehouseOptions.filter(f => f.WarehouseName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    WarehouseOnAutoFocus(value: string) {
        if (value == '') {
            this.Warehouseoptions = [];
        }
    }

    WarehouseOnAutoSelecteWord(event) {
        // this.oProve.DeliveryStationCode = event.OfficeCode;
        // this.oProve.DeliveryStation = event.OfficeName;
    }

    chooseFirstWarehouse(): void {
        this.WarehouseName = this.Warehouseoptions[0].WarehouseName;
    }
    // ----- End หน่วยงานที่นำส่ง ---


    // ----- DateTime -----
    getCurrentDate() {
        let date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toISOString().substring(0, 10);
    }

    getCurrentTime() {
        let date = new Date();
        // 
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
    }
    // ----- End DateTime -----


    // ----- Unit -----
    getUnit() {
        this.proveService.getProveProductUnit('').then(async res => {
            if (res) {
                this.UnitOption = res;
            }
        }, (err: HttpErrorResponse) => { });
    }

    // ----- End Unit -----


    // ----- Popup Product-----
    OpenPopupProduct(i: number) {
        this.oProveProduct = {};

        Object.assign(this.oProveProduct, this.lsProveProduct[i]);
        this.oProveProduct.NetVolume = this.oProveProduct.NetVolume;
        this.oProveProduct.NetVolumeBalance = this.oProveProduct.NetVolumeBalance;
        this.ProductID = this.lsProveProduct[i].ProductID;
        this.iPopup = i;
        this.modePopup = "U";
        this.isPopupRequired = false;
    }

    ClosePopupProduct() {
        if (this.oProveProduct.ProductDesc == "" || this.oProveProduct.ProductDesc == undefined
            || this.oProveProduct.Qty == "" || this.oProveProduct.Qty == undefined
            || this.oProveProduct.NetVolume == "" || this.oProveProduct.NetVolume == undefined
            || this.oProveProduct.VatProve == "" || this.oProveProduct.VatProve == undefined
            || this.oProveProduct.QtyBalance == "" || this.oProveProduct.QtyBalance == undefined
            || this.oProveProduct.NetVolumeBalance == "" || this.oProveProduct.NetVolumeBalance == undefined
            || this.oProveProduct.ProveResult == "" || this.oProveProduct.ProveResult == undefined
        ) {
            this.isPopupRequired = true;
            this.ShowAlertWarning(Message.checkData);
            //alert(Message.checkData);

            return false;
        }

        this.oProveProduct.ProductID = this.ProductID;
        this.lsProveProduct[this.iPopup] = this.oProveProduct;

        if (this.oProveProduct.IsProdScience == true) {
            this.IsProveScience = true;
            this.showScienceField = false;
        }

        this.SummaryProveResult = "";

        this.lsProveProduct.map(item => {
            item.ProveResult = `${item.ProveResult == null || item.ProveResult == undefined ? '' : item.ProveResult}`;

            if (item.ProveResult != "") {
                this.SummaryProveResult += item.ProveResult + "\n";
            }
        });

        $("#SciencePopup .close").click();
    }

    CancelPopupProduct() {
        this.oProveProduct = {};
    }

    AddProduct() {
        this.modePopup = "I";

        this.ProductID = "";

        this.CreateProduct();
    }

    SelecteArrestProduct(event) {

        let aIndex;
        aIndex = this.getIndexOf(this.ArrestProduct, this.ProductID, "ProductID");

        if (aIndex != -1) {
            this.oProveProduct = this.ArrestProduct[aIndex];

            this.oProveProduct.IsNewItem = true;
        }
    }

    private onDeleteProduct(i: number) {
        if (confirm(Message.confirmDeleteProduct)) {

            var aIndex;
            aIndex = this.getIndexOf(this.lsProveProduct, i, "ProductSeq");

            if (aIndex != -1) {
                if (this.lsProveProduct[aIndex].IsNewItem == false) {
                    this.lsProveProduct[aIndex].IsDelItem = true;
                }
                else {
                    this.lsProveProduct.splice(i, 1);
                }
            }

        }
    }
    // ----- End Popup Product -----


    // ----- Clear -----
    ClearStaffData() {
        this.PosExaminer = "";
        this.DeptExaminer = "";

        this.oProveStaff = {
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            StaffID: this.StaffID,
            LawsuitID: this.LawsuitID,
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
            ContributorID: "14"
        }
    }

    ClearStaffScience() {
        this.PosScience = "";
        this.DeptScience = "";

        this.oProveScienceStaff = {
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            StaffID: this.StaffScienceID,
            LawsuitID: this.LawsuitID,
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
            ContributorID: "15"
        }
    }

    ClearStaffSend() {
        this.PosStaffSend = "";
        this.DeptStaffSend = "";

        this.oProveStaffSend = {
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            StaffID: this.StaffSendID,
            LawsuitID: this.LawsuitID,
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
            ContributorID: "13"
        }
    }

    // ----- End Clear -----

    // ----- Document -----
    AddDocument() {
        this.oProveDocument = {};
        this.oProveDocument.ReferenceCode = this.ProveID;
        this.oProveDocument.DocumentSeq = this.ListProveDoc.length;
        this.oProveDocument.DocumentType = "5";
        this.oProveDocument.IsNewItem = true;
        this.oProveDocument.IsDelItem = false;

        this.ListProveDoc.push(this.oProveDocument);
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
                //this.ListProveDoc[i].FilePath = `D:\\XCS\\03. Design\\03. Program Spec\\${this.programSpect}`;
                this.ListProveDoc[i].FilePath = e.target.value;
                this.ListProveDoc[i].DataSource = "";
                this.ListProveDoc[i].DocumentType = 5;
                this.ListProveDoc[i].DocumentName = fileName;
                this.ListProveDoc[i].IsActive = 1;
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
                aIndex = this.getIndexOf(this.ListProveDoc, i, "DocumentSeq");

                if (aIndex != -1) {
                    if (this.ListProveDoc[aIndex].IsNewItem == false) {
                        this.ListProveDoc[aIndex].IsDelItem = true;
                    }
                    else {
                        this.ListProveDoc.splice(aIndex, 1);
                    }
                }
            }
        })
    }
    // ----- End Document -----

    changeProveScience() {
        if (this.IsProveScience) {
            this.showScienceField = true;
            this.ProveScienceDate = "";
            this.ScienceDeliveryDocNo = "";
            this.RequestNo = "";
            this.ReportNo = "";

            for (var i = 0; i < this.lsProveProduct.length; i += 1) {
                this.lsProveProduct[i].IsProdScience = false;
            }
        }
        else {
            this.showScienceField = false;
            this.ProveScienceDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        }
    }

    changeReceive() {
        if (this.IsReceive) {
            this.ShowReceiveField = true;
        }
        else {
            this.ShowReceiveField = false;
            //this.DeliverDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        }
    }

    changeDataReceive() {
        this.DeliverDate = "";
        this.DeliverNo = "";
        this.StaffSendName = "";
        this.PosStaffSend = "";
        this.DeptStaffSend = "";
        this.DeliverTo = "";
        this.DeliverNoYear = "";
        this.DeliverDate = setDateMyDatepicker(new Date(this.getCurrentDate()));

        this.oProveStaffSend = {
            ProveID: this.ProveID,
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            StaffID: this.StaffSendID,
            LawsuitID: this.LawsuitID,
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
            ContributorID: "13"
        };
    }

    // changeDelivery() {
    //     if (this.IsDelivery) {
    //         this.ShowDeliveryField = true;
    //     }
    //     else {
    //         this.ShowDeliveryField = false;
    //     }
    // }

    CalVatProve() {
        var paraVatProve = (((+this.oProveProduct.RetailPrice * +this.oProveProduct.ReferenceVatRate) / 100) * +this.oProveProduct.Qty).toString();
        var paraVatQty = +this.oProveProduct.ReferenceVatValue * +this.oProveProduct.NetVolume;
        this.oProveProduct.VatProve = (+paraVatProve + +paraVatQty).toFixed(4);
    }

    // Text Change ราคาขายปลีกแนะนำ
    onKeyReferenceRetailPrice(value: string) {
        this.oProveProduct.RetailPrice = this.oProveProduct.ReferenceRetailPrice;
        this.CalVatProve();
    }

    // Selected ราคาขายปลีกแนะนำ
    changeReferenceRetailUnit() {
        this.oProveProduct.RetailUnit = this.oProveProduct.ReferenceRetailUnit;
    }

    // คลิกเลือก "ตามปริมาณต่อ"
    ClickReferenceVatRate() {
        if (this.oProveProduct.IsReferenceVatRate == false) {
            this.oProveProduct.ReferenceVatRate = "";
            this.oProveProduct.ReferenceRetailPrice = "";
            this.oProveProduct.RetailPrice = "";
            this.oProveProduct.ReferenceRetailUnit = "";
            this.oProveProduct.RetailUnit = "";

            this.CalVatProve();
        }
    }

    // คลิกเลือก "ตามมูลค่าร้อยละ"
    ClickReferenceVatQty() {
        if (this.oProveProduct.IsReferenceVatQty == false) {
            this.oProveProduct.ReferenceVatQty = "";
            this.oProveProduct.ReferenceVatUnit = "";
            this.oProveProduct.ReferenceVatValue = "";

            this.CalVatProve();
        }
    }

    VatProveFormat() {

        this.oProveProduct.VatProve = (+this.oProveProduct.VatProve.replace(',', '')).toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 });
    }

    varidateQtyBalance() {
        if (this.oProveProduct.QtyBalance > this.oProveProduct.Qty) {
            this.ShowAlertWarning("จำนวนของกลางที่เหลือจากการพิสูจน์ต้องไม่เกินจำนวนของกลางที่ตรวจพิสูจน์ !");
            //alert("จำนวนของกลางที่เหลือจากการพิสูจน์ต้องไม่เกินจำนวนของการส่งพิสูจน์ทางเคมีหรือวิทยาศาสตร์ !!!")
            this.oProveProduct.QtyBalance = this.oProveProduct.Qty;
        }
    }

    varidateNetVolumeBalance() {
        if (this.oProveProduct.NetVolumeBalance > this.oProveProduct.NetVolume) {
            this.ShowAlertWarning("ปริมาณสุทธิของของกลางที่เหลือจากการพิสูจน์ ต้องไม่เกินปริมาณสุทธิของของกลางที่ตรวจพิสูจน์");
            //alert("ปริมาณสุทธิของของกลางที่เหลือจากการพิสูจน์ต้องไม่เกินปริมาณสุทธิของการส่งพิสูจน์ทางเคมีหรือวิทยาศาสตร์ !!!")
            this.oProveProduct.NetVolumeBalance = this.oProveProduct.NetVolume;
        }
    }

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

    VaridateNumber(event) {

        let e = <KeyboardEvent>event;
        if (e.keyCode > 31 && ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 44 && e.keyCode != 46)) {
            return false;
        }
        return true;
    }
}
