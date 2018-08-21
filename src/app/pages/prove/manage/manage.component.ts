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
import { ProveScience } from '../proveScience';
import { ProveProduct } from '../proveProduct';
import { Message } from '../../../config/message';
import { ProveDocument } from '../proveDoc';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { toLocalShort, compareDate, setZeroHours, setDateMyDatepicker,getDateMyDatepicker } from '../../../config/dateFormat';
import { IMyDateModel, IMyOptions } from 'mydatepicker-th';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',

})
export class ManageComponent implements OnInit, OnDestroy {
    private sub: any;
    mode: string;
    modal: any;
    param: any;
    programSpect = 'ILG60-05-02-00'

    // --------
    showEditField: any;

    // -- Parameter ---
    LawsuitID: string;
    ArrestCode: string;
    ProveID: string;

    // --- Array ---
    rawOptions = [];
    options = [];
    rawStaffOptions = [];
    Staffoptions = [];
    Scienceoptions = [];
    Deliveryoptions = [];
    UnitOption = [];
    ArrestProduct = [];
    ListProveDoc = [];
    ListProduct = [];

    // ---- Varible ---
    LawsuiltCode: string;
    SectionName: string;
    GuiltBaseName: string;
    SectionNo: string;
    PenaltyDesc: string;
    IndictmentID: string;
    ReportNo: string = "";       // เลขทะเบียนตรวจพิสูจน์  (ไม่รวม /ปี พ.ศ.)
    ProveYear: string;      // ปี พ.ศ.
    ProveDate: any;      // วันที่ตรวจรับ
    ProveTime: string;      // เวลาตรวจรับ
    DeliveryDocNo: string = "";  // เลขที่หนังสือนำส่ง
    DeliveryDate: any;   // วันที่นำส่ง
    DeliveryTime: string;   // เวลานำส่ง
    PosExaminer: string;    // ตำแหน่งผู้ตรวจรับ
    DeptExaminer: string;   // หน่วยงานผู้ตรวจรับ
    PosScience: string;     // ตำแหน่งผู้พิสูจน์
    DeptScience: string;    // หน่วยงานผู้พิสูจน์
    ProveScienceDate: any;   // วันที่พิสูจน์
    ProveScienceTime: string;   // เวลาที่พิสูจน์
    Command: string         // คำสั่ง
    ProveStation: string;   // เขียนที่
    ProveDelivery: string;  // หน่วยงานที่นำส่ง
    ProveStaffName: string; // ผู้ตรวจรับ
    ScienceStaffName: string;   // ผู้พิสูจน์
    StaffID: number;        // รหัสผู้ตรวจรับ
    StaffScienceID: number;   // รหัสผู้ตรวจพิสูจน์

    iPopup: number;
    modePopup: string = 'I';
    ProductID: string;

    // --- Object ---
    oArrest: Arrest;
    oProve: Prove;
    oProveStaff: ProveStaff;
    oProveScienceStaff: ProveStaff;
    oProveScience: ProveScience;
    oProveProduct: ProveProduct;
    oProveDocument: ProveDocument;

    isRequired: boolean | false;

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

        this.active_Route();
        this.navigate_Service();

        await this.getStation();
        await this.getProveStaff();
        await this.getUnit();
        await this.CreateObject();
        await this.CreateProduct();
        await this.CreateScience();
        // this.CreateStaff();
        await this.CreateDocuement();

        this.ArrestCode = this.ArrestCode;
        this.ProveStaffName = "";
        this.ScienceStaffName = "";
        this.ProveStation = "";

        let date = new Date();
        this.ProveYear = (date.getFullYear() + 543).toString();
        this.ProveDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        this.ProveTime = await this.getCurrentTime();
        this.DeliveryDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        this.DeliveryTime = await this.getCurrentTime();
        this.ProveScienceDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        this.ProveScienceTime = await this.getCurrentTime();

        if (this.ProveID != '0') {
            await this.getProveByID();
        }

        await this.getLawsuitByID(this.LawsuitID);

        this.preloader.setShowPreloader(false);
    }

    private active_Route() {
        // this.sub = this.navService.showFieldEdit.subscribe(status => {
        //     if (!status) {
        //         this.navService.setCancelButton(true);
        //         this.navService.setSaveButton(true);
        //         this.navService.setPrintButton(false);
        //         this.navService.setSearchBar(false);
        //         this.navService.setDeleteButton(false);
        //         this.navService.setEditButton(false);

        //     } else {
        //         this.navService.setPrintButton(true);
        //         this.navService.setDeleteButton(true);
        //         this.navService.setEditButton(true);
        //         this.navService.setSearchBar(false);
        //         this.navService.setCancelButton(false);
        //         this.navService.setSaveButton(false);
        //     }

        //     this.navService.setNextPageButton(true);
        // });


        this.param = this.activeRoute.params.subscribe(p => {
            this.navService.setPrintButton(true);
            this.navService.setDeleteButton(true);
            this.navService.setEditButton(true);
            this.navService.setSearchBar(false);
            this.navService.setCancelButton(false);
            this.navService.setSaveButton(false);

            this.navService.setNextPageButton(true);

            if (p['code1']) {
                this.LawsuitID = p['code1'];
            }

            if (p['code2']) {
                this.ArrestCode = p['code2'];
            }

            if (p['code3']) {
                this.ProveID = p['code3'];
            }
        });
    }

    private navigate_Service() {
        this.sub = this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p;
        });

        this.sub = this.navService.onSave.subscribe(async status => {
            if (status) {
                debugger
                // set action save = false
                await this.navService.setOnSave(false);

                if (this.ReportNo == "" || this.ProveStaffName == "" || this.ScienceStaffName == "" 
                    || this.ProveStation == "" || this.ProveDate == null || this.DeliveryDate == null) {
                    this.isRequired = true;
                    alert(Message.checkData);

                    // this.showEditField = false;

                    return false;
                }

                if (this.oProve) {
                    if (this.ProveID == '0') {
                        await this.onInsProve();
                        this.router.navigate(['/prove/list']);
                    } else {
                        await this.onUpdProve();
                        await this.onComplete();
                    }
                }
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
                    this.router.navigate(['/prove/list']);
                }
            }
        })
    }

    async onInsProve() {
        this.preloader.setShowPreloader(true);

        this.oProve.DeliveryDocNo = this.DeliveryDocNo;
        // this.oProve.DeliveryDate = this.DeliveryDate + ' ' + this.DeliveryTime;
        this.oProve.ProveReportNo = this.ReportNo + "/" + this.ProveYear;
        // this.oProve.ProveDate = this.ProveDate + ' ' + this.ProveTime;
        this.oProve.IndictmentID = this.IndictmentID;

        this.oProve.ProveStaff = [];

        if (this.oProveStaff != 'nulll' && this.oProveStaff != undefined) {
            this.oProve.ProveStaff.push(this.oProveStaff);
        }

        if (this.oProveScienceStaff != 'nulll' && this.oProveScienceStaff != undefined) {
            this.oProve.ProveStaff.push(this.oProveScienceStaff);
        }

        let isSuccess: boolean = true;

        await this.proveService.insAll(this.oProve).then(async IsSuccess => {
            if (!IsSuccess) {
                isSuccess = IsSuccess;
                return false;
            }
        }, (error) => { isSuccess = false; console.error(error); return false; });

        if (!isSuccess) return false;


        if (this.ListProveDoc.length > 0) {
            this.ListProveDoc.map(async item => {
                item.ReferenceCode = this.oProve.ProveReportNo;

                await this.proveService.DocumentinsAll(item).then(IsSuccess => {
                    if (!IsSuccess) {
                        isSuccess = IsSuccess;
                        return false;
                    }
                }, (error) => { isSuccess = false; console.error(error); return false; });
            });
        }

        if (isSuccess) {
            alert(Message.saveComplete);
            this.oProve = {};
            this.router.navigate(['/prove/list']);
        } else {
            alert(Message.saveFail);
        }

        this.preloader.setShowPreloader(false);

    }

    async onUpdProve() {
        this.preloader.setShowPreloader(true);
        debugger
        this.oProve.DeliveryDocNo = this.DeliveryDocNo;
        this.oProve.DeliveryDate = new Date(getDateMyDatepicker(this.DeliveryDate.date) + ' ' + this.DeliveryTime);
        this.oProve.ProveReportNo = this.ReportNo + "/" + this.ProveYear;
        this.oProve.ProveDate = new Date(getDateMyDatepicker(this.ProveDate.date) + ' ' + this.ProveTime);
        this.oProve.IndictmentID = this.IndictmentID;

        var aIndex;
        aIndex = this.getIndexOf(this.oProve.ProveStaff, "14", "ContributorCode");
        this.oProve.ProveStaff[aIndex] = this.oProveStaff;
        this.oProve.ProveStaff[aIndex].ProveID = this.ProveID;

        var sIndex;
        sIndex = this.getIndexOf(this.oProve.ProveStaff, "15", "ContributorCode");
        this.oProve.ProveStaff[sIndex] = this.oProveScienceStaff;
        this.oProve.ProveStaff[sIndex].ProveID = this.ProveID;

        this.ListProduct = this.oProve.ProveProduct;
        this.oProve.ProveProduct = [];

        if (this.oProve.ProveScience[0].ProveScienceDate == null) {
            this.oProve.ProveScience[0].ProveScienceDate = this.oProve.ProveDate + ".000";
            this.oProve.ProveScience[0].ProveScienceTime = this.oProve.ProveDate.toString().split(" ")[1];
        }
        else {
            this.oProve.ProveScience[0].ProveScienceDate = this.oProve.ProveScience[0].ProveScienceDate + ".000";
        }

        
        let isSuccess: boolean = true;
        // Update Prove
        await this.proveService.ProveupdByCon(this.oProve).then(IsSuccess => {
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

                    await this.proveService.ProveProductinsAll(item).then(IsSuccess => {
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

                    await this.proveService.ProveProductupdByCon(item).then(IsSuccess => {
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
                    await this.proveService.ProveProductupdDelete(item).then(IsSuccess => {
                        if (!IsSuccess) {
                            isSuccess = IsSuccess;
                            return false;
                        }
                    }, (error) => { isSuccess = false; console.error(error); return false; });
                });

        }

        debugger
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
        } else {
            alert(Message.saveFail);
        }

        this.preloader.setShowPreloader(false);
    }

    async onDelete() {
        if (confirm(Message.confirmDeleteProduct)) {
            await this.proveService.ProveupdDelete(this.ProveID).then(IsSuccess => {
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
        this.sub.unsubscribe();
        this.param.unsubscribe();
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

        debugger
        await this.proveService.ProvegetByCon(this.ProveID).then(async res => {
            if (res != null) {
                this.oProve = res;
            }
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });

        this.ListProveDoc = [];

        await this.proveService.DocumentgetByCon(this.oProve.ProveReportNo).then(async doc => {
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

        // this.preloader.setShowPreloader(false);
    }

    async getLawsuitByID(LawsuitID: string) {
        // this.preloader.setShowPreloader(true);

        await this.LawsuitSV.LawsuitegetByCon(LawsuitID).then(async res => {
            // --- รายละเอียดคดี ----

            if (res.IsOutside == "1") {
                this.LawsuiltCode = "น " + res.LawsuitNo;
            }
            else {
                this.LawsuiltCode = res.LawsuitNo;
            }

            this.IndictmentID = res.IndictmentID.toString();

        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });

        await this.getArrestByID(this.ArrestCode);

        // this.preloader.setShowPreloader(false);
    }

    async getArrestByID(ArrestCode: string) {
        // this.preloader.setShowPreloader(true);

        await this.ArrestSV.getByArrestCon(ArrestCode).then(async res => {
            this.oArrest = res;

            this.ArrestProduct = res.ArrestProduct;
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });

        await this.getProveProduct();
        await this.getGuiltBaseByID();

        // this.preloader.setShowPreloader(false);
    }

    getGuiltBaseByID() {
        // this.preloader.setShowPreloader(true);

        var aIndex;
        var arrestIndex;
        if (this.oArrest.ArrestIndictment.length > 0) {
            aIndex = this.getIndexOf(this.oArrest.ArrestIndictment, this.IndictmentID, "IndictmentID");
        }

        if (aIndex != "false") {
            this.LawsuitSV.getGuiltBaseByCon(this.oArrest.ArrestIndictment[aIndex].GuiltBaseID.toString()).then(async res => {
                this.SectionName = res.CompareMasLawSection.SectionName;
                this.GuiltBaseName = res.CompareMasLawGuiltBase.GuiltBaseName;
                this.SectionNo = res.CompareMasLawPenalty.SectionNo.toString();
                this.PenaltyDesc = res.CompareMasLawPenalty.PenaltyDesc;

            }, (err: HttpErrorResponse) => {
                alert(err.message);
            });
        }

        // this.preloader.setShowPreloader(false);
    }

    getIndexOf(arr, val, prop) {
        var l = arr.length,
            k = 0;
        for (k = 0; k < l; k = k + 1) {
            if (arr[k][prop] == val) {
                return k;
            }
        }
        return false;
    }

    getProveProduct() {
        // this.preloader.setShowPreloader(true);

        // ---- กรณีไม่มีเลข ProveID จะ default Product จาก ArrestProduct----
        if (this.ProveID == "0") {
            if (this.oArrest.ArrestProduct.length > 0) {
                this.oProve.ProveProduct = [];
                this.oProve.ProveScience = [];

                this.oProveScience = {
                    ProveScienceID: "",
                    ProveID: "",
                    ProveScienceDate: "",
                    ProveScienceTime: "",
                    RequestNo: "",
                    ReportNo: "",
                    DeliveryDocNo: "",
                    IsActive: 1,
                }

                this.oProve.ProveScience.push(this.oProveScience);

                for (var i = 0; i < this.oArrest.ArrestProduct.length; i += 1) {
                    this.oProveProduct = {
                        ProductID: this.oArrest.ArrestProduct[i].ProductID,
                        ProductType: this.oArrest.ArrestProduct[i].ProductType,
                        ProveID: "",
                        ProductRefID: "",
                        GroupCode: this.oArrest.ArrestProduct[i].GroupCode,
                        IsDomestic: this.oArrest.ArrestProduct[i].IsDomestic,
                        ProductCode: this.oArrest.ArrestProduct[i].ProductCode,
                        BrandCode: this.oArrest.ArrestProduct[i].BrandCode,
                        BrandNameTH: this.oArrest.ArrestProduct[i].BrandNameTH,
                        BrandNameEN: this.oArrest.ArrestProduct[i].BrandNameEN,
                        SubBrandCode: this.oArrest.ArrestProduct[i].SubBrandCode,
                        SubBrandNameTH: this.oArrest.ArrestProduct[i].SubBrandNameTH,
                        SubBrandNameEN: this.oArrest.ArrestProduct[i].SubBrandNameEN,
                        ModelCode: this.oArrest.ArrestProduct[i].ModelCode,
                        ModelName: this.oArrest.ArrestProduct[i].ModelName,
                        FixNo1: this.oArrest.ArrestProduct[i].FixNo1,
                        DegreeCode: this.oArrest.ArrestProduct[i].DegreeCode,
                        Degree: this.oArrest.ArrestProduct[i].Degree,
                        SizeCode: this.oArrest.ArrestProduct[i].SizeCode,
                        Size: this.oArrest.ArrestProduct[i].Size,
                        SizeUnitCode: this.oArrest.ArrestProduct[i].SizeUnitCode,
                        SizeUnitName: this.oArrest.ArrestProduct[i].SizeUnitName,
                        FixNo2: this.oArrest.ArrestProduct[i].FixNo2,
                        SequenceNo: this.oArrest.ArrestProduct[i].SequenceNo,
                        ProductDesc: this.oArrest.ArrestProduct[i].ProductDesc,
                        CarNo: this.oArrest.ArrestProduct[i].CarNo,
                        Qty: this.oArrest.ArrestProduct[i].Qty,
                        QtyUnit: this.oArrest.ArrestProduct[i].QtyUnit,
                        NetVolume: this.oArrest.ArrestProduct[i].NetVolume,
                        NetVolumeUnit: this.oArrest.ArrestProduct[i].NetVolumeUnit,
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
                        ProveResult: "",
                        IsNewItem: true,
                        IsDelItem: false
                    }

                    this.oProve.ProveProduct.push(this.oProveProduct);
                }
            }
        }
        else  // ---- กรณีมีเลข ProveID จะแสดงข้อมูล Product ตาม Prove Product ----
        {
            var PRN = this.oProve.ProveReportNo.split('/');

            if (PRN.length > 1) {
                this.ReportNo = PRN[0];
                this.ProveYear = PRN[1];
            }

            this.ProveStation = this.oProve.ProveStation;
            this.ProveDelivery = this.oProve.DeliveryStation;
            this.DeliveryDocNo = this.oProve.DeliveryDocNo;

            var PDate = this.oProve.ProveDate.toString().split(" ");
            this.ProveDate = setDateMyDatepicker(new Date(PDate[0]));
            this.ProveTime = PDate[1] + ".000";

            var PSDate = this.oProve.DeliveryDate.toString().split(" ");
            this.DeliveryDate = setDateMyDatepicker(new Date(PSDate[0]));
            this.DeliveryTime = PSDate[1] + ".000";

            var PStaff = this.oProve.ProveStaff.filter(f => f.ContributorCode == "14");
            if (PStaff.length > 0) {
                this.ProveStaffName = PStaff[0].TitleName + PStaff[0].FirstName + ' ' + PStaff[0].LastName;
                this.PosExaminer = PStaff[0].PositionName;
                this.DeptExaminer = PStaff[0].DepartmentName;
                this.StaffID = PStaff[0].StaffID;
                this.oProveStaff = PStaff[0];
            }


            var PScienceStaff = this.oProve.ProveStaff.filter(f => f.ContributorCode == "15");
            if (PScienceStaff.length) {
                this.ScienceStaffName = PScienceStaff[0].TitleName + PScienceStaff[0].FirstName + ' ' + PScienceStaff[0].LastName;
                this.PosScience = PScienceStaff[0].PositionName;
                this.DeptScience = PScienceStaff[0].DepartmentName;
                this.StaffScienceID = PScienceStaff[0].StaffID;
                this.oProveScienceStaff = PScienceStaff[0];
            }

            this.oProve.ProveProduct.map(item => {
                item.IsNewItem = false;
                item.IsDelItem = false;
            });

            for (var i = 0; i < this.oProve.ProveProduct.length; i += 1) {
                this.oProve.ProveProduct[i].ProductSeq = i;
            }
        }

        // this.preloader.setShowPreloader(false);
    }

    // --- เขียนที่ ---
    async getStation() {
        // this.preloader.setShowPreloader(true);
        await this.MasterSV.getStation().then(async res => {
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
    // ----- End เขียนที่ ---


    // --- หน่วยงานที่ส่งมอบ ---
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
    // ----- End หน่วยงานที่ส่งมอบ ---


    // --- ผู้ตรวจรับ ---
    async getProveStaff() {
        // this.preloader.setShowPreloader(true);
        await this.MasterSV.getStaff().then(async res => {
            if (res) {
                this.rawStaffOptions = res;
            }
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
        // this.preloader.setShowPreloader(false);
    }

    StaffonAutoChange(value: string) {
        // 
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
            ContributorCode: "14"
        }

        this.PosExaminer = event.PosLevelName;
        this.DeptExaminer = event.OperationDeptName;
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
            ContributorCode: "15"
        }

        this.PosScience = event.PosLevelName;
        this.DeptScience = event.OperationDeptName;
    }
    // ----- End ผู้ตรวจรับ ---




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
    async getUnit() {
        // this.preloader.setShowPreloader(true);
        await this.proveService.getProveProductUnit("").then(async res => {
            if (res) {
                this.UnitOption = res;
            }
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
        // this.preloader.setShowPreloader(false);
    }

    // ----- End Unit -----


    // ----- Popup Product-----
    OpenPopupProduct(i: number) {
        this.oProveProduct = this.oProve.ProveProduct[i];
        this.oProveScience = this.oProve.ProveScience[0];

        this.ProveScienceDate = setDateMyDatepicker(new Date(this.oProveScience.ProveScienceDate));
        this.ProveScienceTime = this.oProveScience.ProveScienceTime;

        this.ProductID = this.oProve.ProveProduct[i].ProductID;
        this.iPopup = i;
        this.modePopup = "U";
    }

    ClosePopupProduct() {
        debugger
        this.oProveProduct.ProductID = this.ProductID;
        this.oProveScience.ProveScienceDate = this.ProveScienceDate + ' ' + this.ProveScienceTime;
        this.oProveScience.ProveScienceTime = this.ProveScienceTime;
        this.oProve.ProveScience[0] = this.oProveScience;


        if (this.modePopup == "I") {
            this.oProveProduct.ReferenceDate = "";
            this.oProveProduct.IsNewItem = true;
            this.oProveProduct.IsDelItem = false;
            this.oProveProduct.ProductSeq = this.oProve.ProveProduct.length;
            this.oProve.ProveProduct.push(this.oProveProduct);
        }
        else if (this.modePopup == 'U') {
            this.oProve.ProveProduct[this.iPopup] = this.oProveProduct;
        }
    }

    AddProduct() {
        this.modePopup = "I";

        this.ProductID = "";

        this.CreateProduct();
    }

    SelecteArrestProduct(event) {

        let aIndex;
        aIndex = this.getIndexOf(this.ArrestProduct, this.ProductID, "ProductID");

        if (aIndex != "false") {
            this.oProveProduct = this.ArrestProduct[aIndex];

            this.oProveProduct.IsNewItem = true;
        }
    }

    private onDeleteProduct(i: number) {
        if (confirm(Message.confirmDeleteProduct)) {
            var aIndex;
            aIndex = this.getIndexOf(this.oProve.ProveProduct, i, "ProductSeq");

            if (this.oProve.ProveProduct[aIndex].IsNewItem == false) {
                this.oProve.ProveProduct[aIndex].IsDelItem = true;
            }
            else {
                this.oProve.ProveProduct.splice(i, 1);
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
            ContributorCode: "14"
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
            ContributorCode: "15"
        }
    }
    // ----- End Clear -----

    // ----- Document -----
    AddDocument() {
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
            let dataSource = reader.result.split(',')[1];
            if (dataSource && dataSource !== undefined) {
                this.ListProveDoc[i].FilePath = `D:\\XCS\\03. Design\\03. Program Spec\\${this.programSpect}`;
                this.ListProveDoc[i].DataSource = "";
                this.ListProveDoc[i].DocumentType = 1;
                this.ListProveDoc[i].DocumentName = fileName;
                this.ListProveDoc[i].IsActive = 1;
            }
        };
    }


    DelDocument(i: number) {
        if (confirm(Message.confirmDeleteProduct)) {
            var aIndex;
            aIndex = this.getIndexOf(this.ListProveDoc, i, "DocumentSeq");

            if (this.ListProveDoc[aIndex].IsNewItem == false) {
                this.ListProveDoc[aIndex].IsDelItem = true;
            }
            else {
                this.ListProveDoc.splice(i, 1);
            }
        }
    }
    // ----- End Document -----
}
