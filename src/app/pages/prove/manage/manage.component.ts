import { Component, OnInit, OnDestroy, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProveService } from '../prove.service';
import { ArrestService } from '../../model/arrest.service';
import { LawsuitService } from '../../model/lawsuit.service';
import { MasterService } from '../../model/master.service';
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
    mode: string;
    modal: any;
    param: any;
    programSpect = 'ILG60-05-02-00'

    // --------
    showEditField: any;
    showScienceField: any;
    ShowDeliveryField: any;
    ShowReceiveField: any;

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
    Staffoptions = [];
    Scienceoptions = [];
    StaffSendoptions = [];
    Deliveryoptions = [];
    Destinationoptions = [];
    Productoptions = [];
    UnitOption = [];
    ListProveDoc = [];
    ListProduct = [];
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



    // **************************************
    // ----- Varible ส่วน “นำส่งของกลาง” -----
    // **************************************
    IsReceive: boolean;             // Checkbox จัดเก็บของกลาง T = 1, F = 0
    DeliverNo: string;              // หนังสือนำส่งเลขที่
    DeliverDate: any;               // วันที่นำส่งของกลาง
    DeliverTime: string;            // เวลานำส่งของกลาง
    StaffSendID: number;            // รหัสผู้นำส่ง
    StaffSendName: string;          // ผู้นำส่ง
    PosStaffSend: string;           // ตำแหน่งผู้นำส่ง
    DeptStaffSend: string;          // หน่วยงานผู้นำส่ง
    DeliverTo: string;              // หน่วยงานที่นำส่ง




    // **************************************
    // ----- Popup -----
    // **************************************
    // IsReferenceVatRate: boolean;    // checkbox ตามมูลค่าร้อยละ
    // IsReferenceVatQty: boolean;     // checkbox ตามปริมาณต่อ
    test: string;

    iPopup: number;
    modePopup: string = 'I';
    ProductID: string;


    // --- Object ---
    oArrest: Arrest;
    oProve: Prove;
    oProveStaff: ProveStaff;
    oProveScienceStaff: ProveStaff;
    oProveStaffSend: ProveStaff;
    oProveScience: ProveScience;
    oProveProduct: ProveProduct;
    oProveDeliverProduct: ProveDeliverProduct;
    oProveDocument: ProveDocument;


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
        private router: Router,
        private preloader: PreloaderService
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        // set true
        this.navService.setNextPageButton(true);


    }

    async ngOnInit() {
        this.preloader.setShowPreloader(true);
        await this.navService.setEditField(true);

        this.active_Route();
        this.navigate_Service();
        this.CreateObject();
        this.CreateProduct();
        this.CreateScience();
        //this.CreateStaff();
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
        this.IsDelivery = false;
        this.IsOutside = false;
        this.IsProdScience = false;
        this.showScienceField = true;
        this.ShowDeliveryField = true;
        this.ShowReceiveField = true;
        // this.IsReferenceVatRate = false;
        // this.IsReferenceVatQty  = false;

        let date = new Date();
        this.ProveYear = (date.getFullYear() + 543).toString();
        this.ProveDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        //this.ProveTime = await this.getCurrentTime();
        this.DeliveryDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        //this.DeliveryTime = await this.getCurrentTime();
        //this.ProveScienceTime = await this.getCurrentTime();

        // if (this.ProveID != '0') {
        //     await this.getProveByID();
        // }

        debugger
        await this.ProveArrestgetByCon();
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
            this.ShowDeliveryField = p;
        });

        this.onSaveSubscribe = this.navService.onSave.subscribe(async status => {
            if (status) {
                // set action save = false
                await this.navService.setOnSave(false);

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
                    alert(Message.checkData);

                    return false;
                }


                if (this.lsProveProduct.length > 0) {
                    // *******************************
                    // ----- ส่วน “พิสูจน์ของกลาง” -----
                    // *******************************
                    // คลิกเลือก “ส่งพิสูจน์ทางวิทยาศาสตร์”
                    if (this.IsProveScience) {
                        if (this.DeliveryDocNo == ""        // เลขที่หนังสือนำส่ง
                            || this.ProveDate == null
                            || this.ProveScienceDate == null     // วันที่นำส่ง || this.ProveScienceTime == "" || this.ProveScienceTime == undefined
                            || this.ScienceStaffName == ""       // ผู้พิสูจน์
                        // || this.Command == ""                // คำสั่ง
                        ) {
                            this.isRequired = true;
                            alert(Message.checkData);

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
                            alert(Message.checkData);

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
                        alert(Message.checkData);

                        return false;
                    }
                }

                if (this.mode === 'C') {
                    await this.onInsProve();
                } else if (this.mode === 'R') {
                    await this.onUpdProve();
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
                if (confirm(Message.confirmAction)) {
                    // await this.navService.setOnCancel(false);
                    // this.router.navigate(['/prove/list']);
                    await this.navService.setOnSave(false);
                }
            }
        })
    }

    SetData() {
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

        if (this.oProveStaffSend != null && this.oProveStaffSend != undefined) {
            this.oProve.ProveStaff.push(this.oProveStaffSend);
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
                ReportNo: this.RequestNo,
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
                DeliverNo: this.DeliverNo,
                DeliverDate: cDateDeliver,
                // DeliverTime: this.DeliverTime,
                DeliverTime: "",
                DeliverTo: this.DeliverTo,
                IsReceive: "1",
                IsActive: 1,
            }
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
                            return false;
                        }

                        ProveScienceID = sRes.ProveScienceID;
                    }, (error) => { console.error(error); return false; });
                }

                if (this.lsProveProduct.length > 0) {
                    this.lsProveProduct.map(async item => {
                        item.ProveID = res.ProveID;

                        if (item.IsProdScience == true) {
                            item.ProveScienceID = ProveScienceID;
                        }

                        await this.proveService.ProveProductinsAll(item).then(async pRes => {
                            debugger
                            if (!pRes.IsSuccess) {
                                isSuccess = pRes.IsSuccess;
                                return false;
                            }
                        }, (error) => { console.error(error); return false; });
                    });
                }

                
                if (this.IsReceive) {
                    this.oProveDeliverProduct.ProveID = res.ProveID;

                    await this.proveService.ProveDeliverProductinsAll(this.oProveDeliverProduct).then(async dRes => {
                        if (!dRes.IsSuccess) {
                            isSuccess = dRes.IsSuccess;
                            return false;
                        }
                    }, (error) => { console.error(error); return false; });
                }

                // if (this.ListProveDoc.length > 0) {
                //     this.ListProveDoc.map(async item => {
                //         item.ReferenceCode = this.oProve.ProveReportNo;

                //         await this.proveService.MasDocumentMaininsAll(item).then(IsSuccess => {
                //             if (!IsSuccess) {
                //                 isSuccess = IsSuccess;
                //                 return false;
                //             }
                //         }, (error) => { isSuccess = false; console.error(error); return false; });
                //     });
                // }


                if (isSuccess) {
                    alert(Message.saveComplete);
                    //this.oRevenue = {};
                    this.onComplete();
                    this.preloader.setShowPreloader(false);
                    this.router.navigate([`/prove/manage/R/${this.ProveID}/${this.IndictmentID}`]);
                }
            }
            else {
                alert(Message.saveFail);
            }
        }, (error) => { console.error(error); return false; });
    }

    async onUpdProve() {
        this.preloader.setShowPreloader(true);
        let DDate, cDateDelivery, PDate, cProveDate;

        DDate = this.DeliveryDate.date;
        if (DDate != undefined) {
            cDateDelivery = DDate.year + '-' + DDate.month + '-' + DDate.day + ' ' + this.DeliveryTime;
        }

        PDate = this.ProveDate.date;
        if (PDate != undefined) {
            cProveDate = PDate.year + '-' + PDate.month + '-' + PDate.day + ' ' + this.ProveTime;
        }

        this.oProve.DeliveryDocNo = this.DeliveryDocNo;
        this.oProve.DeliveryDate = cDateDelivery;
        this.oProve.ProveReportNo = this.ReportNo + "/" + this.ProveYear;
        this.oProve.ProveDate = cProveDate;
        this.oProve.IndictmentID = this.IndictmentID;
        this.oProve.Command = this.Command;

        // var aIndex;
        // aIndex = this.getIndexOf(this.oProve.ProveStaff, "14", "ContributorCode");
        // if (aIndex != -1) {
        //     this.oProve.ProveStaff[aIndex] = this.oProveStaff;
        //     this.oProve.ProveStaff[aIndex].ProveID = this.ProveID;
        // }


        // var sIndex;
        // sIndex = this.getIndexOf(this.oProve.ProveStaff, "15", "ContributorCode");
        // if (sIndex != -1) {
        //     this.oProve.ProveStaff[sIndex] = this.oProveScienceStaff;
        //     this.oProve.ProveStaff[sIndex].ProveID = this.ProveID;
        // }

        this.oProve.ProveStaff = [];

        if (this.oProveStaff != 'nulll' && this.oProveStaff != undefined) {
            this.oProve.ProveStaff.push(this.oProveStaff);
            this.oProve.ProveStaff[this.oProve.ProveStaff.length - 1].ProveID = this.ProveID;
        }

        if (this.oProveScienceStaff != 'nulll' && this.oProveScienceStaff != undefined) {
            this.oProve.ProveStaff.push(this.oProveScienceStaff);
            this.oProve.ProveStaff[this.oProve.ProveStaff.length - 1].ProveID = this.ProveID;
        }

        this.ListProduct = this.lsProveProduct;
        this.lsProveProduct = [];

        if (this.oProve.ProveScience.length > 0) {
            if (this.oProve.ProveScience[0].ProveScienceDate == null) {
                this.oProve.ProveScience[0].ProveScienceDate = cProveDate;
                this.oProve.ProveScience[0].ProveScienceTime = this.ProveTime;
            }
        }


        // -----------------------------------------------------------
        //                       Call API Update
        // -----------------------------------------------------------

        debugger
        let isSuccess: boolean = true;
        // Update Prove
        await this.proveService.ProveupdByCon(this.oProve).then(async IsSuccess => {
            if (!IsSuccess) {
                isSuccess = IsSuccess;
                return false;
            }
        }, (error) => { isSuccess = false; console.error(error); return false; });

        if (!isSuccess) return false;


        if (this.ListProduct.length > 0) {
            // New Product
            this.ListProduct.filter(item => item.IsNewItem === true)
                .map(async item => {
                    item.ProveID = this.ProveID;
                    item.ReferenceDate = this.oProve.ProveDate + ".000";

                    await this.proveService.ProveProductinsAll(item).then(async IsSuccess => {
                        if (!IsSuccess) {
                            isSuccess = IsSuccess;
                            return false;
                        }
                    }, (error) => { isSuccess = false; console.error(error); return false; });
                });

            if (!isSuccess) return false;


            // Update Product
            this.ListProduct.filter(item => item.IsNewItem === false)
                .map(async item => {
                    item.ReferenceDate = this.oProve.ProveDate + ".000";

                    await this.proveService.ProveProductupdByCon(item).then(async IsSuccess => {
                        if (!IsSuccess) {
                            isSuccess = IsSuccess;
                            return false;
                        }
                    }, (error) => { isSuccess = false; console.error(error); return false; });
                });

            if (!isSuccess) return false;


            // Delete Product
            this.ListProduct.filter(item => item.IsDelItem === true)
                .map(async item => {
                    await this.proveService.ProveProductupdDelete(item).then(async IsSuccess => {
                        if (!IsSuccess) {
                            isSuccess = IsSuccess;
                            return false;
                        }
                    }, (error) => { isSuccess = false; console.error(error); return false; });
                });

            if (!isSuccess) return false;

        }

        if (this.ListProveDoc.length > 0) {
            // New Document
            this.ListProveDoc.filter(item => item.IsNewItem === true)
                .map(async item => {

                    item.ReferenceCode = this.oProve.ProveReportNo;

                    await this.proveService.DocumentinsAll(item).then(IsSuccess => {
                        if (!IsSuccess) {
                            isSuccess = IsSuccess;
                            return false;
                        }
                    }, (error) => { isSuccess = false; console.error(error); return false; });
                });

            if (!isSuccess) return false;


            // Edit Document
            this.ListProveDoc.filter(item => item.IsNewItem === false)
                .map(async item => {

                    item.ReferenceCode = this.oProve.ProveReportNo;

                    await this.proveService.DocumentupdByCon(item).then(IsSuccess => {
                        if (!IsSuccess) {
                            isSuccess = IsSuccess;
                            return false;
                        }
                    }, (error) => { isSuccess = false; console.error(error); return false; });
                });

            if (!isSuccess) return false;


            // Del Document
            this.ListProveDoc.filter(item => item.IsDelItem === true)
                .map(async item => {
                    await this.proveService.DocumentupdDelete(item).then(IsSuccess => {
                        if (!IsSuccess) {
                            isSuccess = IsSuccess;
                            return false;
                        }
                    }, (error) => { isSuccess = false; console.error(error); return false; });
                });

            if (!isSuccess) return false;
        }


        if (isSuccess) {
            alert(Message.saveComplete);
            this.lsProveProduct = this.ListProduct;
            this.onComplete();
        } else {
            alert(Message.saveFail);
        }

        this.preloader.setShowPreloader(false);
    }

    onDelete() {
        if (confirm(Message.confirmDeleteProduct)) {
            this.proveService.ProveupdDelete(this.ProveID).then(async IsSuccess => {
                if (IsSuccess) {
                    this.oProve = {};
                    alert(Message.saveComplete);
                    this.router.navigate(['/prove/list']);
                } else {
                    alert(Message.saveFail);
                }
            }, (error) => { console.error(error); return false; });
        }
    }

    ngOnDestroy(): void {
        this.onCancelSubscribe.unsubscribe();
        this.onSaveSubscribe.unsubscribe();
        this.onDeleSubscribe.unsubscribe();
        this.onPrintSubscribe.unsubscribe();
    }

    onComplete() {
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditButton(true);
        this.navService.setSearchBar(false);
        this.navService.setCancelButton(false);
        this.navService.setSaveButton(false);

        this.showEditField = true;
        this.showScienceField = false;
        this.ShowDeliveryField = false;
        this.ShowReceiveField = false;
    }
    // openSuspect(e) {
    //     this.modal = this.suspectModalService.open(e, { size: 'lg', centered: true });
    // }


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

    // CreateStaff()
    // {
    //     this.oProveStaff = {};

    //     this.oProveStaff = {
    //         ProgramCode: "XCS-60",
    //         ProcessCode: "XCS-60-05",
    //         LawsuitID: this.LawsuitID,
    //         StaffCode: "-",
    //         TitleName: "",
    //         FirstName: "",
    //         LastName: "",
    //         PositionCode: "",
    //         PositionName: "",
    //         PosLevel: "",
    //         PosLevelName: "",
    //         DepartmentCode: "",
    //         DepartmentName: "",
    //         DepartmentLevel: "",
    //         OfficeCode: "",
    //         OfficeName: "",
    //         OfficeShortName: "",
    //         ContributorCode: "14"
    //     }

    //     this.oProveScienceStaff = {};

    //     this.oProveScienceStaff = {
    //         ProgramCode: "XCS-60",
    //         ProcessCode: "XCS-60-05",
    //         LawsuitID: this.LawsuitID,
    //         StaffCode: "-",
    //         TitleName: "-",
    //         FirstName: "-",
    //         LastName: "-",
    //         PositionCode: "",
    //         PositionName: "",
    //         PosLevel: "",
    //         PosLevelName: "",
    //         DepartmentCode: "",
    //         DepartmentName: "",
    //         DepartmentLevel: "",
    //         OfficeCode: "",
    //         OfficeName: "",
    //         OfficeShortName: "",
    //         ContributorCode: "15"
    //     }
    // }

    CreateDocuement() {
        this.oProveDocument = {};

        this.oProveDocument = {
            DocumentID: "",
            ReferenceCode: "",
            FilePath: "",
            DataSource: "",
            DocumentType: "",
            DocumentName: "",
            IsActive: "1"
        }
    }

    async getProveByID() {
        // this.preloader.setShowPreloader(true);
        await this.proveService.ProvegetByCon(this.ProveID).then(async res => {
            if (res != null) {

                this.oProve = res;

                var PRN = this.oProve.ProveReportNo.split('/');

                if (PRN.length > 1) {
                    this.DeliveryDocNo = PRN[0];
                    this.ProveYear = PRN[1];
                }

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
                    this.DeptExaminer = PStaff[0].DepartmentName;
                    this.StaffID = PStaff[0].StaffID;
                    this.oProveStaff = PStaff[0];
                }


                var PScienceStaff = this.oProve.ProveStaff.filter(f => f.ContributorID == "15");
                if (PScienceStaff.length) {
                    this.ScienceStaffName = PScienceStaff[0].TitleName + PScienceStaff[0].FirstName + ' ' + PScienceStaff[0].LastName;
                    this.PosScience = PScienceStaff[0].PositionName;
                    this.DeptScience = PScienceStaff[0].DepartmentName;
                    this.StaffScienceID = PScienceStaff[0].StaffID;
                    this.oProveScienceStaff = PScienceStaff[0];
                }


                var PSendStaff = this.oProve.ProveStaff.filter(f => f.ContributorID == "13");
                if (PSendStaff.length) {
                    this.StaffSendName = PSendStaff[0].TitleName + PSendStaff[0].FirstName + ' ' + PSendStaff[0].LastName;
                    this.PosStaffSend = PSendStaff[0].PositionName;
                    this.DeptStaffSend = PSendStaff[0].DepartmentName;
                    this.StaffSendID = PSendStaff[0].StaffID;
                    this.oProveStaffSend = PSendStaff[0];
                }

                this.oProve.ProveStaff = [];

                this.lsProveProduct = res.ProveProduct;
                this.lsProveProduct.map(item => {
                    item.IsNewItem = false;
                    item.IsDelItem = false;

                    item.Remarks = `${item.Remarks == null || item.Remarks == "null" ? '' : item.Remarks}`;
                    item.ProveScienceResult = `${item.ProveScienceResult == null ? '' : item.ProveScienceResult}`;
                    item.ProveResult = `${item.ProveResult == null ? '' : item.ProveResult}`;
                    item.VatProve = (+item.VatProve).toFixed(4);
                });

                // for (var i = 0; i < this.lsProveProduct.length; i += 1) {
                //     this.lsProveProduct[i].ProductSeq = i;
                // }

                if (this.oProve.ProveScience.length > 0) {
                    this.oProve.ProveScience.map(item => {
                        item.DeliveryDocNo = `${item.DeliveryDocNo == null ? '' : item.DeliveryDocNo}`;
                        item.ProveScienceDate = `${item.ProveScienceDate == null ? '' : item.ProveScienceDate}`;
                        item.RequestNo = `${item.RequestNo == null ? '' : item.RequestNo}`;
                        item.ReportNo = `${item.ReportNo == null ? '' : item.ReportNo}`;
                    });

                    this.IsProveScience = true;
                    this.ScienceDeliveryDocNo = this.oProve.ProveScience[0].DeliveryDocNo;
                    this.RequestNo = this.oProve.ProveScience[0].RequestNo;
                    this.ReportNo = this.oProve.ProveScience[0].ReportNo;
                    this.oProveScience = this.oProve.ProveScience[0];
                }



                // -------------- Document -------------------------

                this.ListProveDoc = [];

                this.proveService.DocumentgetByCon(this.oProve.ProveReportNo).then(async doc => {
                    if (doc) {
                        this.ListProveDoc.push(doc);

                        for (var i = 0; i < this.ListProveDoc.length; i += 1) {
                            this.ListProveDoc[i].DocumentSeq = i;
                            this.ListProveDoc[i].IsNewItem = false;
                            this.ListProveDoc[i].IsDelItem = false;
                        }
                    }
                }, (err: HttpErrorResponse) => {
                    alert(err.message);
                });

                this.preloader.setShowPreloader(false);
            }
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });

    }

    async ProveArrestgetByCon() {
        debugger
        await this.proveService.LawsuitArrestgetByCon(this.IndictmentID).then(async lRes => {
            if (lRes.length > 0) {
                this.ArrestCode = lRes[0].ArrestCode;
                this.LawsuiltCode = lRes[0].LawsuitArrestIndicment[0].Lawsuit[0].LawsuitNo;
                this.GuiltBaseID = lRes[0].LawsuitArrestIndicment[0].LawsuitLawGuiltbase[0].LawsuitLawSubSectionRule[0].LawsuitLawSubSection[0].SubSectionType;
                this.GuiltBaseName = lRes[0].LawsuitArrestIndicment[0].LawsuitLawGuiltbase[0].GuiltBaseName;
                this.SectionNo = lRes[0].LawsuitArrestIndicment[0].LawsuitLawGuiltbase[0].LawsuitLawSubSectionRule[0].SectionNo;
                this.PenaltyDesc = lRes[0].LawsuitArrestIndicment[0].LawsuitLawGuiltbase[0].LawsuitLawSubSectionRule[0].LawsuitLawSection[0].LawsuitLawPenalty[0].PenaltyDesc;

                await this.proveService.ArrestIndictmentProductgetByIndictmentID(this.IndictmentID).then(async res => {
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
                });
            }
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
        debugger
        // ---- กรณีไม่มีเลข ProveID จะ default Product จาก ArrestProduct----
        if (this.ProveID == "0") {
            if (this.ArrestProduct.length > 0) {
                this.lsProveProduct = [];

                this.lsProveProduct = this.ArrestProduct;
                this.lsProveProduct.map(async item => {
                    item.IsProdScience = false;
                });

                this.oProveProduct = {};
                this.preloader.setShowPreloader(false);
            }
        }
        else {
            this.getProveByID();
        }
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
            debugger
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
        // this.oProve.DeliveryStationCode = event.OfficeCode;
        // this.oProve.DeliveryStation = event.OfficeName;
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
        debugger
        if (value == '') {
            this.Staffoptions = [];
            this.ClearStaffData();
        } else {
            if (this.rawStaffOptions.length == 0) {
                this.getProveStaff();
            }
            this.Staffoptions = this.rawStaffOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1);

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

            this.Scienceoptions = this.rawStaffOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1);
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

            this.StaffSendoptions = this.rawStaffOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1);
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
    // ----- End ผู้นำส่งของกลาง ---


    // --- Product ---
    async getProduct() {
        await this.MasterSV.getProduct().then(res => {
            if (res) {
                this.Productoptions = res;
            }

        }, (err: HttpErrorResponse) => {
            //alert(err.message);
        });
    }

    onAutoProductChange(value: string) {
        // 
        if (value == '') {
            this.Productoptions = [];

            // this.oProve.ProveStationCode = "";
            // this.oProve.ProveStation = "";
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
        // this.oProve.ProveStationCode = event.OfficeCode;
        // this.oProve.ProveStation = event.OfficeName;
    }
    // ----- End Product ---


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
        // this.preloader.setShowPreloader(true);
        this.proveService.getProveProductUnit('').then(async res => {
            if (res) {
                this.UnitOption = res;
            }
        }, (err: HttpErrorResponse) => {
            //alert(err.message);
        });
        // this.preloader.setShowPreloader(false);
    }

    // ----- End Unit -----


    // ----- Popup Product-----
    OpenPopupProduct(i: number) {
        this.oProveProduct = {};

        this.oProveProduct = Object.create(this.lsProveProduct[i]);
        this.ProductID = this.lsProveProduct[i].ProductID;
        this.iPopup = i;
        this.modePopup = "U";
        this.isPopupRequired = false;
    }

    ClosePopupProduct() {
        // if (this.oProveProduct.IsReferenceVatRate == true) {
        //     if (this.oProveProduct.ReferenceVatRate == "" || this.oProveProduct.ReferenceVatRate == undefined
        //         || this.oProveProduct.ReferenceRetailPrice == "" || this.oProveProduct.ReferenceRetailPrice == undefined
        //         || this.oProveProduct.ReferenceRetailUnit == "" || this.oProveProduct.ReferenceRetailUnit == undefined
        //         || this.oProveProduct.RetailPrice == "" || this.oProveProduct.RetailPrice == undefined
        //         || this.oProveProduct.RetailUnit == "" || this.oProveProduct.RetailUnit == undefined
        //         || this.oProveProduct.VatProve == "" || this.oProveProduct.VatProve == undefined
        //     ) {
        //         this.isPopupRequired = true;
        //         alert(Message.checkData);

        //         this.modal = this.modal.open(;
        //         //return false;
        //     }
        // } 

        this.oProveProduct.ProductID = this.ProductID;
        this.lsProveProduct[this.iPopup] = this.oProveProduct;

        if (this.oProveProduct.IsProdScience == true) {
            this.IsProveScience = true;
            this.showScienceField = false;
        }
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
            debugger
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
        this.oProveDocument.ReferenceCode = "";
        this.oProveDocument.DocumentSeq = this.ListProveDoc.length;
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
            // let dataSource = reader.result.split(',')[1];
            // if (dataSource && dataSource !== undefined) {
            //     this.ListProveDoc[i].FilePath = `D:\\XCS\\03. Design\\03. Program Spec\\${this.programSpect}`;
            //     this.ListProveDoc[i].DataSource = "";
            //     this.ListProveDoc[i].DocumentType = 1;
            //     this.ListProveDoc[i].DocumentName = fileName;
            //     this.ListProveDoc[i].IsActive = 1;
            // }
        };
    }


    DelDocument(i: number) {
        if (confirm(Message.confirmDeleteProduct)) {
            var aIndex;
            aIndex = this.getIndexOf(this.ListProveDoc, i, "DocumentSeq");

            if (aIndex != -1) {
                if (this.ListProveDoc[aIndex].IsNewItem == false) {
                    this.ListProveDoc[aIndex].IsDelItem = true;
                }
                else {
                    this.ListProveDoc.splice(i, 1);
                }
            }

        }
    }
    // ----- End Document -----

    changeProveScience() {
        if (this.IsProveScience) {
            this.showScienceField = true;
            this.ProveScienceDate = "";

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
            this.DeliverDate = "";
        }
        else {
            this.ShowReceiveField = false;
            this.DeliverDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        }
    }

    changeDelivery() {
        if (this.IsDelivery) {
            this.ShowDeliveryField = true;
        }
        else {
            this.ShowDeliveryField = false;
        }
    }

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
        this.oProveProduct.VatProve = (+this.oProveProduct.VatProve).toFixed(4);
    }
}
