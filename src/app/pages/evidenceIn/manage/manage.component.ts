import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EvidenceService } from '../evidenceIn.service';
import { IncomeService } from '../../income/income.service';
import { ProveService } from '../../prove/prove.service';
import { MasterService } from '../../model/master.service';
import { Evidence_In, Document, EvidenceInStaff, EvidenceInItem, EvidenceStockBalance } from '../evidenceIn';
import { MatAutocomplete } from '@angular/material';
import * as formatDate from '../../../config/dateFormat';
import { Message } from '../../../config/message';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { toLocalShort, compareDate, setZeroHours, setDateMyDatepicker, getDateMyDatepicker } from '../../../config/dateFormat';
import { IMyDateModel, IMyOptions } from 'mydatepicker-th';
import swal from 'sweetalert2';
import { pagination } from '../../../config/pagination';
import { async } from '../../../../../node_modules/@types/q';
import { EvidenceOutService } from '../../evidenceOut/evidenceOut.service';


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
    ListEvidenceInItem = [];
    rawUnitOptions = [];
    UnitOption = [];
    ListDoc = [];
    rawProductOptions = [];
    Productoptions = [];
    // rawProdbyWarehourseOptions = [];
    // ProdbyWarehourseoptions = [];
    rawWarehouseOptions = [];
    Warehouseoptions = [];


    oEviInSendStaff: EvidenceInStaff;
    oEviInRecvStaff: EvidenceInStaff;
    oEvidenceIn: Evidence_In;
    oDocument: Document;
    oEvidenceInItem: EvidenceInItem;
    oStockBalance: EvidenceStockBalance;

    EvidenceInID: string;   // รหัสรับของกลาง
    EvidenceInCode: string; // เลขที่รับของกลาง
    StaffSendID: string;    // รหัสผู้นำส่ง
    StaffSendName: string;  // ชื่อผู้นำส่ง
    PosStaffSend: string;   // ตำแหน่งผู้นำส่ง
    DeptStaffSend: string;  // แผนกผู้นำส่ง
    StaffRecvID: string;    // รหัสผู้นำส่ง
    StaffRecvName: string;  // ชื่อผู้รับของกลาง
    PosStaffRecv: string;   // ตำแหน่งผู้รับของกลาง
    DeptStaffRecv: string;  // แผนกผู้รับของกลาง
    DeptStaffRecvCode: string;  // รหัสแผนกผู้รับของกลาง
    DeliveryDate: any;      // วันที่นำส่ง
    DeliveryTime: any;      // เวลาที่นำส่ง
    ReturnDate: any;        // วันที่รับคืน
    EvidenceInDate: any;    // วันที่รับของกลาง
    EvidenceInTime: any;    // เวลาที่รับของกลาง
    DeliveryNo: string;     // เลขที่นำส่ง
    Remark: string;         // เหตุผลในการนำส่ง
    EvidenceInType: string; // ประเภทการรับของกลาง
    WarehouseID: string;    // รหัสคลังจัดเก็บ
    WarehouseName: string;  // คลังจัดเก็บ


    // -------- ตรวจรัยจากหน่วยงานภายใน -------
    ArrestCode: string;     // เลขที่ใบงาน
    OccurrenceDate: string; // วันที่จับกุม
    OccurrenceTime: string; // เวลาที่จับกุม
    Accuser: string;        // ผู้กล่าวหา
    AccuserPositionName: string;    // ตำแหน่งผู้กล่าวหา
    AccuserOfficeShortName: string; // หน่วยงานผู้กล่าวหา
    AccuserStation: string; // สถานที่จับกุม
    LawsuitNo: string;      // เลขที่คดีรับคำกล่าวโทษ
    LawsuitDate: string;    // วันที่รับคดี
    LawsuitTime: string;    // เวลาที่รับคดี
    SubSectionType: string;    // ฐานความผิดมาตรา
    GuiltBaseName: string;  // ฐานความผิด
    SectionNo: string;      // บทกำหนดโทษ
    PenaltyDesc: string;    // อัตราโทษ
    DeliverNo: string;      // เลขที่หนังสือนำส่ง
    DeliverDate: string;    // วันที่นำส่ง
    DeliverTime: string;    // เวลาที่นำส่ง
    Receiveuser: string;    // ผู้นำส่ง
    ReceiverPositionName: string;   // ตำแหน่งผู้นำส่ง
    ReceiverOfficeShortName: string;    // หน่วยงานผู้นำส่ง
    DestinationCode: string;    // รหัสหน่วยงานที่ Login

    isRequired: boolean | false;


    // ----- Model ------ //
    @ViewChild('printDocModal') printDocModel: ElementRef;

    constructor(
        private activeRoute: ActivatedRoute,
        private ngbModel: NgbModal,
        private navService: NavigationService,
        private EviService: EvidenceService,
        private RevService: IncomeService,
        private MasService: MasterService,
        private preloader: PreloaderService,
        private proveService: ProveService,
        private EvidenceOutService: EvidenceOutService,
        private router: Router
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setNextPageButton(false);
    }

    async ngOnInit() {
        localStorage.setItem('programcode','ILG60-10-00');
        this.preloader.setShowPreloader(true);

        this.oEvidenceIn = {
            IsEdit: 1
        }

        this.active_Route();
        this.navigate_Service();
        this.getUnit();
        await this.getEvidenceInStaff();

        this.DeliveryDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        this.ReturnDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        this.EvidenceInDate = setDateMyDatepicker(new Date(this.getCurrentDate()));

        this.DeliveryTime = this.getCurrentTime();
        this.EvidenceInTime = this.getCurrentTime();
        this.EvidenceInCode = "Auto Generate";

        //this.DestinationCode = "030700";
        this.DestinationCode = localStorage.getItem("officeCode");
        this.getWarehouse();

        if (this.evitype == "I") {
            await this.getProve();
        } else if (this.evitype == "E") {
            await this.getMasProduct();
        } else if (this.evitype == "G") {
            await this.getEvidenceInOutgetByWarehouseID();
        }

        if (this.mode == "R") {
            await this.ShowEvidenceIn();
        } else {
            this.preloader.setShowPreloader(false);
        }
    }

    ngOnDestroy(): void {
        this.onCancelSubscribe.unsubscribe();
        this.onSaveSubscribe.unsubscribe();
        this.onDeleSubscribe.unsubscribe();
        this.onPrintSubscribe.unsubscribe();
        this.onEditSubscribe.unsubscribe();
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
                    this.navService.setNextPageButton(false);
                    // set true
                    this.navService.setSaveButton(true);
                    this.navService.setCancelButton(true);
                    break;

                case 'R':
                    // set false
                    this.navService.setSaveButton(false);
                    this.navService.setCancelButton(false);
                    this.navService.setNextPageButton(false);
                    // set true
                    this.navService.setPrintButton(true);
                    this.navService.setEditButton(true);
                    this.navService.setDeleteButton(true);
                    this.navService.setEditField(true);

                    if (p['code']) {
                        this.EvidenceInID = p['code'];
                    }
                    break;
            }

            this.activeRoute.data.subscribe(
                (data) => {
                    switch (this.evitype) {
                        case 'I':
                            data.urls[2].title = "จัดการข้อมูลรายการตรวจรับของกลางจากหน่วยงานภายใน";
                            data.codePage = "ILG60-10-02-00-00";
                            this.EvidenceInType = "0";
                            break;
                        case 'E':
                            data.urls[2].title = "จัดการข้อมูลรายการตรวจรับของกลางจากหน่วยงานภายนอก";
                            data.codePage = "ILG60-10-03-00-00";
                            this.EvidenceInType = "1";
                            break;
                        case 'G':
                            data.urls[2].title = "จัดการข้อมูลรายการตรวจรับของกลางที่นำออกจากคลังไปใช้ในราชการ";
                            data.codePage = "ILG60-10-04-00-00";
                            this.EvidenceInType = "2";
                            break;
                    }

                }
            );
        });
    }

    private navigate_Service() {

        this.navService.showFieldEdit.subscribe(async p => {
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

                let listProd = this.ListEvidenceInItem.filter(f => f.EvidenceInItemCode == "" || f.ProductDesc == ""
                    || f.DeliveryQty.toString() == "" || f.DamageQty.toString() == "" || f.DeliveryQtyUnit == ""
                    || (this.evitype != "G" && (f.DeliveryNetVolumn.toString() == "" || f.DamageNetVolumn.toString() == "" || f.DeliveryNetVolumnUnit == ""))
                );

                if (this.DeliveryNo == "" || this.DeliveryNo == undefined
                    || this.DeliveryDate == null || this.DeliveryDate == undefined
                    || (this.evitype == "E" && (this.DeliveryTime == "" || this.DeliveryTime == undefined))
                    || (this.evitype == "E" && (this.ReturnDate == null || this.ReturnDate == undefined))
                    || this.StaffSendName == "" || this.StaffSendName == undefined
                    || (this.evitype == "E" &&
                        (this.PosStaffSend == "" || this.PosStaffSend == undefined || this.DeptStaffSend == "" || this.DeptStaffSend == undefined))
                    || this.EvidenceInCode == "" || this.EvidenceInCode == undefined
                    || this.EvidenceInDate == null || this.EvidenceInDate == undefined
                    || this.EvidenceInTime == "" || this.EvidenceInTime == undefined
                    || this.StaffRecvName == "" || this.StaffRecvName == undefined
                    || this.WarehouseID == "" || this.WarehouseID == undefined || this.WarehouseID == "0"
                    || (this.evitype == "E" && (this.Remark == "" || this.Remark == undefined))
                    || listProd.length > 0) {
                    this.isRequired = true;
                    this.ShowAlertWarning(Message.checkData);

                    return false;
                }

                if (this.mode === 'C') {
                    await this.onInsEvidenceIn();
                } else if (this.mode === 'R') {
                    await this.onUdpEvidenceIn();
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
                            this.router.navigate(['/evidenceIn/list']);
                        } else if (this.mode === 'R') {
                            if (this.oEvidenceIn.IsReceive == "0") {
                                this.router.navigate(['/evidenceIn/list']);
                            } else {
                                // set false
                                this.navService.setSaveButton(false);
                                this.navService.setCancelButton(false);
                                // set true
                                this.navService.setPrintButton(true);
                                this.navService.setEditButton(true);
                                this.navService.setDeleteButton(true);
                                this.navService.setEditField(true);

                                this.ShowEvidenceIn();
                            }
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
                await this.navService.setOnDelete(false);
                this.onDelete();
            }
        });

        this.onEditSubscribe = this.navService.onEdit.subscribe(async status => {
            if (this.oEvidenceIn.IsEdit == 0) {
                this.ShowAlertWarning("ไม่อนุญาตให้ทำการแก้ไขข้อมูลการจัดเก็บของกลาง !!!");
                this.onComplete();
            }
        })
    }

    LoadDataFromLocalStorage() {
        let tempUser = this.rawStaffSendOptions.filter(f => f.StaffCode == localStorage.getItem("staffCode"));

        // ----- ผู้นำส่ง -----
        this.oEviInSendStaff = {
            EvidenceInStaffID: "",
            EvidenceInID: "",
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
            ContributorID: "13",
            IsActive: "1"
        }

        this.StaffSendName = localStorage.getItem("fullName");
        this.PosStaffSend = localStorage.getItem("operationPosName");
        this.DeptStaffSend = localStorage.getItem("officeShortName");


        // ----- ผู้ตรวจรับของกลาง -----
        this.oEviInRecvStaff = {
            EvidenceInStaffID: "",
            EvidenceInID: "",
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
            ContributorID: "42",
            IsActive: "1"
        }

        this.StaffRecvName = localStorage.getItem("fullName");
        this.PosStaffRecv = localStorage.getItem("operationPosName");
        this.DeptStaffRecv = localStorage.getItem("officeShortName");
        this.DeptStaffRecvCode = localStorage.getItem("officeCode");
    }

    async getProve() {
        await this.EviService.EvidenceInArrestgetByProveID(this.ProveID).then(async res => {
            if (res.length > 0) {
                this.ArrestCode = res[0].ArrestCode;

                let temp = res[0].OccurrenceDate.toString().split(" ");
                this.OccurrenceDate = setDateMyDatepicker(new Date(temp[0]));
                this.OccurrenceTime = res[0].OccurrenceTime;
                this.Accuser = res[0].AccuserTitleName + res[0].AccuserFirstName + " " + res[0].AccuserLastName;
                this.AccuserPositionName = res[0].AccuserPositionName;
                this.AccuserOfficeShortName = res[0].AccuserOfficeShortName;
                this.AccuserStation = res[0].SubDistrict + " " + res[0].District + " " + res[0].Province;

                if (res[0].LawsuitIsOutside == "0") {
                    this.LawsuitNo = res[0].LawsuitNo;
                } else {
                    this.LawsuitNo = "น. " + res[0].LawsuitNo;
                }

                temp = res[0].LawsuitDate.toString().split(" ");
                this.LawsuitDate = setDateMyDatepicker(new Date(temp[0]));
                this.LawsuitTime = res[0].LawsuitTime;
                this.SubSectionType = res[0].SubSectionType;
                this.GuiltBaseName = res[0].GuiltBaseName;
                this.SectionNo = res[0].SectionNo;
                this.PenaltyDesc = res[0].PenaltyDesc;
                this.DeliverNo = res[0].DeliverNo;

                temp = res[0].DeliverDate.toString().split(" ");
                this.DeliverDate = setDateMyDatepicker(new Date(temp[0]));
                this.DeliverTime = res[0].DeliverTime;
                this.Receiveuser = res[0].ReceiverTitleName + res[0].ReceiverFirstName + " " + res[0].ReceiverLastName;
                this.ReceiverPositionName = res[0].ReceiverPositionName;
                this.ReceiverOfficeShortName = res[0].ReceiverOfficeShortName;
            }
            this.preloader.setShowPreloader(false);
        }, (err: HttpErrorResponse) => {
            this.ShowAlertError("พบปัญหาในการติดต่อ Server");
        });
    }

    ShowEvidenceIn() {
        this.EviService.getByCon(this.EvidenceInID, this.ProveID).then(async res => {
            if (res != null && res.IsSuccess != "False") {
                if (res[0].IsReceive == "0") {
                    this.navService.setPrintButton(false);
                    this.navService.setEditButton(false);
                    this.navService.setDeleteButton(false);
                    this.navService.setSaveButton(true);
                    this.navService.setCancelButton(true);
                    this.navService.setEditField(false);
                } else {
                    this.navService.setPrintButton(true);
                    this.navService.setEditButton(true);
                    this.navService.setDeleteButton(true);
                    this.navService.setSaveButton(false);
                    this.navService.setCancelButton(false);
                }

                this.ListEvidenceInItem = [];
                this.oEvidenceIn = res[0];
                this.ListEvidenceInItem = this.oEvidenceIn.EvidenceInItem;

                this.DeliveryNo = this.oEvidenceIn.DeliveryNo
                this.DeliveryDate = setDateMyDatepicker(new Date(this.oEvidenceIn.DeliveryDate));
                if (this.oEvidenceIn.ReturnDate == null || this.oEvidenceIn.ReturnDate == '') { this.ReturnDate = ""; } else { this.ReturnDate = setDateMyDatepicker(new Date(this.oEvidenceIn.ReturnDate)) }

                this.DeliveryTime = this.oEvidenceIn.DeliveryTime;
                this.Remark = this.oEvidenceIn.Remark;

                var sTemp = this.oEvidenceIn.EvidenceInStaff.filter(f => f.ContributorID == "13");
                if (sTemp.length > 0) {
                    this.StaffSendName = `${sTemp[0].TitleName == 'null' || sTemp[0].TitleName == null ? '' : sTemp[0].TitleName}`
                        + `${sTemp[0].FirstName == 'null' || sTemp[0].FirstName == null ? '' : sTemp[0].FirstName}` + ' '
                        + `${sTemp[0].LastName == 'null' || sTemp[0].LastName == null ? '' : sTemp[0].LastName}`;
                    this.PosStaffSend = sTemp[0].PositionName;
                    this.DeptStaffSend = sTemp[0].OfficeName;
                    this.StaffSendID = sTemp[0].EvidenceInStaffID;
                    this.oEviInSendStaff = sTemp[0];
                }

                if (this.oEvidenceIn.EvidenceInCode) {
                    this.EvidenceInCode = this.oEvidenceIn.EvidenceInCode;
                } else {
                    this.EvidenceInCode = "Auto Generate";
                }

                if (this.oEvidenceIn.EvidenceInDate) {
                    this.EvidenceInDate = setDateMyDatepicker(new Date(this.oEvidenceIn.EvidenceInDate));
                    this.EvidenceInTime = this.oEvidenceIn.EvidenceInTime;
                } else {
                    this.EvidenceInDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
                    this.EvidenceInTime = this.getCurrentTime();
                }



                sTemp = this.oEvidenceIn.EvidenceInStaff.filter(f => f.ContributorID == "42");
                if (sTemp.length > 0 && sTemp[0].FirstName != 'null' && sTemp[0].FirstName != null && sTemp[0] != "") {
                    this.StaffRecvName = `${sTemp[0].TitleName == 'null' || sTemp[0].TitleName == null ? '' : sTemp[0].TitleName}`
                        + `${sTemp[0].FirstName == 'null' || sTemp[0].FirstName == null ? '' : sTemp[0].FirstName}` + ' '
                        + `${sTemp[0].LastName == 'null' || sTemp[0].LastName == null ? '' : sTemp[0].LastName}`;
                    this.PosStaffRecv = sTemp[0].PositionName;
                    this.DeptStaffRecv = sTemp[0].OfficeName;
                    this.StaffRecvID = sTemp[0].EvidenceInStaffID;
                    this.oEviInRecvStaff = sTemp[0];
                } else {
                    if (sTemp.length > 0) {
                        this.StaffRecvID = sTemp[0].EvidenceInStaffID;
                        this.oEviInRecvStaff.EvidenceInStaffID = sTemp[0].EvidenceInStaffID;
                    }
                }

                var tWarehouse = this.rawWarehouseOptions.filter(f => f.WarehouseID == this.oEvidenceIn.EvidenceInItem[0].EvidenceStockBalance[0].WarehouseID);
                this.WarehouseID = tWarehouse[0].WarehouseID;
                this.WarehouseName = tWarehouse[0].WarehouseName;

                // -------------- Product -------------------------
                let t = 0;
                this.oEvidenceIn.EvidenceInItem.map(item => {
                    item.ReceiveQty = item.EvidenceStockBalance[0].ReceiveQty;
                    item.ReceiveNetVolumn = item.EvidenceStockBalance[0].ReceiveNetVolumn;
                    item.IsNewItem = false;
                    item.IsDelItem = false;
                    item.ProductSeq = t;

                    if (item.EvidenceStockBalance.length > 0) {
                        this.WarehouseID = item.EvidenceStockBalance[0].WarehouseID;
                    }

                    t += 1;
                });


                // -------------- Document -------------------------

                this.ListDoc = [];

                this.proveService.MasDocumentMaingetAll(this.oEvidenceIn.EvidenceInID, "9").then(async doc => {
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
                this.ShowAlertError("พบปัญหาที่ API EvidenceIngetByCon");
                this.preloader.setShowPreloader(false);
                this.router.navigate(['/evidenceIn/list']);
            }
        }, (err: HttpErrorResponse) => {
            this.ShowAlertError("API EvidenceIngetByCon :: " + err.message);
        });
    }

    async onInsEvidenceIn() {
        this.preloader.setShowPreloader(true);
        await this.setData();
        await this.TransactionRunningForIns();
    }

    async TransactionRunningForIns() {
        await this.RevService.TransactionRunninggetByCon("ops_evidence_in", this.DeptStaffRecvCode).then(async item => {
            if (item.length == 0) {
                this.RevService.TransactionRunninginsAll(this.DeptStaffRecvCode, "ops_evidence_in", "RC").then(async res => {
                    if (res.IsSuccess) {
                        this.EvidenceInCode = "RC" + this.oEviInRecvStaff.OfficeCode + (this.EvidenceInDate.date.year + 543).toString().substring(4, 2) + "00001";
                        this.oEvidenceIn.EvidenceInCode = this.EvidenceInCode;

                        if (this.evitype != "I") {
                            await this.InsEvidenceInExternal();
                        }
                    }
                }, (error) => { console.error(error); return false; });
            }
            else {
                await this.RevService.TransactionRunningupdByCon(item[0].RunningID).then(async res => {
                    if (res.IsSuccess) {
                        var pad = "00000"
                        var RunningNo = pad.substring(0, pad.length - item[0].RunningNo.toString().length) + (+item[0].RunningNo + 1);

                        this.EvidenceInCode = "RC" + this.oEviInRecvStaff.OfficeCode + (this.EvidenceInDate.date.year + 543).toString().substring(4, 2) + RunningNo;
                        this.oEvidenceIn.EvidenceInCode = this.EvidenceInCode;

                        if (this.evitype != "I") {
                            await this.InsEvidenceInExternal();
                        }
                    }
                }, (error) => { console.error(error); return false; });
            }

        }, (error) => { console.error(error); return false; });
    }

    InsEvidenceInExternal() {
        var isSuccess = true;

        this.EviService.EvidenceIninsAll(this.oEvidenceIn).then(async item => {
            if (item.IsSuccess) {
                this.EvidenceInID = item.EvidenceInID;
                this.oEvidenceIn.EvidenceInID = item.EvidenceInID;

                if (this.ListDoc.length > 0) {
                    this.ListDoc.map(async item => {
                        item.ReferenceCode = this.EvidenceInID;

                        await this.proveService.MasDocumentMaininsAll(item).then(IsSuccess => {
                            if (!IsSuccess) {
                                isSuccess = IsSuccess;
                                return false;
                            }
                        }, (error) => { isSuccess = false; console.error(error); return false; });
                    });
                }

                // กรณีรับเข้าของกลางที่นำออกไปใช้ในราชการ
                if (this.evitype == "G") {
                    await this.EviService.EvidenceInOutItemupdIsReturn(this.ListEvidenceInItem).then(async pRes => {
                        if (!pRes.IsSuccess) {
                            isSuccess = pRes.IsSuccess;
                        }
                    }, (error) => { console.error(error); });
                }

                if (isSuccess) {
                    this.ShowAlertSuccess(Message.saveComplete);
                    this.onComplete();
                    this.WarehouseID = "1";
                    await this.ShowEvidenceIn();

                    this.preloader.setShowPreloader(false);
                    this.router.navigate([`/evidenceIn/manage/${this.evitype}/R/${this.EvidenceInID}/${this.ProveID}`]);
                }
            } else {
                this.ShowAlertError(Message.saveFail);
            }
        }, (error) => { console.error(error); return false; });
    }

    // async InsEvidenceInGovernment() {
    //     var isSuccess = true;

    //     await this.EviService.EvidenceInOutItemupdIsReturn(this.ListEvidenceInItem).then(async pRes => {
    //         if (!pRes.IsSuccess) {
    //             isSuccess = pRes.IsSuccess;
    //         }
    //     }, (error) => { console.error(error); });

    //     await this.ListEvidenceInItem.map(async f => {
    //         f.EvidenceStockBalance.map(async m => {
    //             let stock = {
    //                 "StockID": m.StockID,
    //                 "BalanceQty": +m.BalanceQty + +f.ReceiveQty,
    //             }

    //             await this.EvidenceOutService.EvidenceOutStockBalanceupdByCon(stock).then(async pRes => {
    //                 if (!pRes.IsSuccess) {
    //                     isSuccess = pRes.IsSuccess;
    //                 }
    //             }, (error) => { console.error(error); });
    //         })

    //         f.EvidenceStockBalance = [];
    //     })

    //     await this.EviService.EvidenceIninsAll(this.oEvidenceIn).then(async item => {
    //         if (item.IsSuccess) {
    //             this.EvidenceInID = item.EvidenceInID;
    //             this.oEvidenceIn.EvidenceInID = item.EvidenceInID;

    //             if (this.ListDoc.length > 0) {
    //                 this.ListDoc.map(async item => {
    //                     item.ReferenceCode = this.EvidenceInID;

    //                     await this.proveService.MasDocumentMaininsAll(item).then(IsSuccess => {
    //                         if (!IsSuccess) {
    //                             isSuccess = IsSuccess;
    //                             return false;
    //                         }
    //                     }, (error) => { isSuccess = false; console.error(error); return false; });
    //                 });
    //             }

    //             if (isSuccess) {
    //                 this.ShowAlertSuccess(Message.saveComplete);
    //                 this.onComplete();
    //                 this.WarehouseID = "1";
    //                 await this.ShowEvidenceIn();

    //                 this.preloader.setShowPreloader(false);
    //                 this.router.navigate([`/evidenceIn/manage/${this.evitype}/R/${this.EvidenceInID}/${this.ProveID}`]);
    //             }
    //         } else {
    //             this.ShowAlertError(Message.saveFail);
    //         }
    //     }, (error) => { console.error(error); return false; });
    // }

    async onUdpEvidenceIn() {
        this.preloader.setShowPreloader(true);

        await this.setData();

        if (this.EvidenceInCode == "Auto Generate") {
            await this.TransactionRunningForIns();
        }
        await this.UpdEvidenceInExternal();
    }

    async UpdEvidenceInExternal() {
        // -----------------------------------------------------------
        //                       Call API Update
        // -----------------------------------------------------------

        let isSuccess: boolean = true;

        // -----------------------------------------------------------
        //                          Product
        // -----------------------------------------------------------
        if (this.ListEvidenceInItem.length > 0) {
            this.ListEvidenceInItem.map(async item => {
                item.EvidenceInID = this.oEvidenceIn.EvidenceInID;
            });

            // New Product
            await this.EviService.EvidenceInIteminsAll(this.ListEvidenceInItem.filter(item => item.IsNewItem === true)).then(pRes => {
                if (!pRes.IsSuccess) {
                    isSuccess = pRes.IsSuccess;
                }
            }, (error) => { console.error(error); });

            // Edit Product
            await this.EviService.EvidenceInItemupdByCon(this.ListEvidenceInItem.filter(item => item.IsNewItem === false)).then(pRes => {
                if (!pRes.IsSuccess) {
                    isSuccess = pRes.IsSuccess;
                }
            }, (error) => { console.error(error); });


            // Del Product    
            await this.EviService.EvidenceInItemupdDelete(this.ListEvidenceInItem.filter(item => item.IsDelItem === true)).then(pRes => {
                if (!pRes.IsSuccess) {
                    isSuccess = pRes.IsSuccess;
                }
            }, (error) => { console.error(error); });


            this.ListEvidenceInItem.map(async item => {
                item.IsNewItem = false;
            });
        }


        // -----------------------------------------------------------
        //                          Evidenct In
        // -----------------------------------------------------------
        this.oEvidenceIn.EvidenceInItem = [];

        await this.EviService.EvidenceInupdByCon(this.oEvidenceIn).then(async IsSuccess => {
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
                    item.ReferenceCode = this.oEvidenceIn.EvidenceInID;
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
                    item.ReferenceCode = this.oEvidenceIn.EvidenceInID;
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
            await this.ShowEvidenceIn();
            this.preloader.setShowPreloader(false);
        } else {
            this.ShowAlertError(Message.saveFail);
            this.preloader.setShowPreloader(false);
        }
    }

    async UpdEvidenceInGovernment() {

    }

    onDelete() {
        if (this.oEvidenceIn.IsEdit != 0) {
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
                    if (this.evitype == "E") {
                        this.EviService.EvidenceInupdDelete(this.EvidenceInID).then(async IsSuccess => {
                            if (IsSuccess) {
                                this.oEvidenceIn = {};
                                this.ShowAlertSuccess(Message.saveComplete);
                                this.router.navigate(['/evidenceIn/list']);
                            } else {
                                this.ShowAlertError(Message.saveFail);
                            }
                        }, (error) => { console.error(error); return false; });
                    } else {
                        this.oEvidenceIn.EvidenceInCode = null;
                        this.oEvidenceIn.EvidenceInDate = null;
                        this.oEvidenceIn.EvidenceInTime = null;
                        this.oEvidenceIn.IsReceive = "0";
                        this.oEvidenceIn.ReturnDate = null;
                        this.oEvidenceIn.Remark = null;

                        this.ClearStaffRecvData();
                        this.oEvidenceIn.EvidenceInStaff = [];
                        this.oEvidenceIn.EvidenceInStaff.push(this.oEviInSendStaff);
                        this.oEvidenceIn.EvidenceInStaff.push(this.oEviInRecvStaff);

                        this.oEvidenceIn.EvidenceInItem.map(f => {
                            f.DamageQty = "0";
                            f.DamageNetVolumn = "0";

                            f.EvidenceStockBalance.map(item => {
                                item.ReceiveQty = f.DeliveryQty;
                                item.ReceiveNetVolumn = f.DeliveryNetVolumn;
                                item.BalanceQty = f.DeliveryQty;
                                item.BalanceNetVolumn = f.DeliveryNetVolumn;
                                item.IsReceive = "0";
                            })
                        });

                        this.EviService.EvidenceInItemupdByCon(this.oEvidenceIn.EvidenceInItem).then(async pRes => {
                            if (pRes.IsSuccess) {

                                await this.EviService.EvidenceInupdByCon(this.oEvidenceIn).then(async IsSuccess => {
                                    if (IsSuccess) {
                                        this.oEvidenceIn = {};
                                        this.ShowAlertSuccess(Message.saveComplete);
                                        this.router.navigate(['/evidenceIn/list']);
                                    } else {
                                        this.ShowAlertError(Message.saveFail);
                                    }
                                }, (error) => { console.error(error); });

                            }
                        }, (error) => { console.error(error); });
                    }
                }
            })
        } else {
            this.ShowAlertWarning("ไม่อนุญาตให้ทำการลบข้อมูลการจัดเก็บ !!!");
        }
    }

    async setData() {
        this.oEvidenceIn = {
            ProveID: this.ProveID,
            EvidenceInID: this.EvidenceInID,
            EvidenceInCode: this.EvidenceInCode,
            EvidenceInDate: this.ConvertDateYYYYmmdd(this.EvidenceInDate.date),
            EvidenceInTime: this.EvidenceInTime,
            IsReceive: "1",
            DeliveryNo: this.DeliveryNo,
            DeliveryDate: this.ConvertDateYYYYmmdd(this.DeliveryDate.date),
            DeliveryTime: this.DeliveryTime,
            EvidenceInType: this.EvidenceInType,
            Remark: this.Remark,
            ReturnDate: this.ConvertDateYYYYmmdd(this.ReturnDate.date),
            IsActive: 1,
            IsEdit: 1
        };



        this.ListEvidenceInItem.map(async item => {
            item.DamageQtyUnit = item.DeliveryQtyUnit;
            item.DamageNetVolumnUnit = item.DeliveryNetVolumnUnit;

            var tStockID = "";
            if (item.EvidenceStockBalance.length > 0) {
                tStockID = item.EvidenceStockBalance[0].StockID;
            }

            this.oStockBalance = {
                StockID: tStockID,
                WarehouseID: this.WarehouseID,
                EvidenceInItemID: item.EvidenceInItemID,
                ReceiveQty: item.ReceiveQty,
                ReceiveQtyUnit: item.DeliveryQtyUnit,
                ReceiveSize: item.DeliverySize,
                ReceiveSizeUnit: item.DeliverySizeUnit,
                ReceiveNetVolumn: item.ReceiveNetVolumn,
                ReceiveNetVolumnUnit: item.DeliveryQtyUnit,
                BalanceQty: item.ReceiveQty,
                BalanceQtyUnit: item.DeliveryQtyUnit,
                BalanceSize: item.DeliverySize,
                BalanceSizeUnit: item.DeliverySizeUnit,
                BalanceNetVolumn: item.ReceiveNetVolumn,
                BalanceNetVolumnUnit: item.DeliveryQtyUnit,
                IsFinish: "2",
                IsReceive: "1"
            }

            item.EvidenceStockBalance = [];
            item.EvidenceStockBalance.push(this.oStockBalance);
        });

        if (this.evitype != "G") {
            await this.generateItemCode();
        }


        this.oEvidenceIn.EvidenceInItem = this.ListEvidenceInItem;
        this.oEvidenceIn.EvidenceInStaff = [];

        // ผู้นำส่ง
        if (this.evitype != "E") {
            if (this.oEviInSendStaff != null && this.oEviInSendStaff != undefined) {
                this.oEvidenceIn.EvidenceInStaff.push(this.oEviInSendStaff);
            }
        } else {
            this.oEviInSendStaff = {
                EvidenceInStaffID: this.StaffSendID,
                EvidenceInID: this.EvidenceInID,
                FirstName: this.StaffSendName,
                PositionName: this.PosStaffSend,
                OfficeName: this.DeptStaffSend,
                ContributorID: "13",
                IsActive: "1"
            }

            this.oEvidenceIn.EvidenceInStaff.push(this.oEviInSendStaff);
        }


        // ผู้รับของกลาง
        if (this.oEviInRecvStaff != null && this.oEviInRecvStaff != undefined) {
            this.oEvidenceIn.EvidenceInStaff.push(this.oEviInRecvStaff);
        }
    }

    async generateItemCode() {
        for (let i = 0; i < this.ListEvidenceInItem.length; i++) {
            if (this.ListEvidenceInItem[i].IsNewItem == true || this.ListEvidenceInItem[i].EvidenceInItemCode === "Auto Generate") {
                await this.EviService.TransactionRunningItemgetByCon("IN", this.ListEvidenceInItem[i].GroupCode, this.WarehouseID).then(async item => {
                    let date = new Date();

                    if (item.length == 0) {
                        await this.EviService.TransactionRunningIteminsAll((date.getFullYear() + 543).toString().substring(2), date.getMonth(), "IN", this.ListEvidenceInItem[i].GroupCode,
                            this.WarehouseID, "00001").then(res => {
                                if (res.IsSuccess) {
                                    this.ListEvidenceInItem[i].EvidenceInItemCode = "IN" + ("000".substring(0, 3 - this.WarehouseID.length) + this.WarehouseID)
                                        + ("0000".substring(0, 4 - this.ListEvidenceInItem[i].GroupCode.length) + this.ListEvidenceInItem[i].GroupCode) + (date.getFullYear() + 543).toString().substring(2) + "00001";
                                }
                            }, (error) => { console.error(error); return false; });
                    }
                    else {
                        await this.EviService.TransactionRunningItemupdByCon(item[0].RunningID).then(async res => {
                            if (res.IsSuccess) {
                                var pad = "00000"
                                var RunningNo = pad.substring(0, pad.length - item[0].RunningNo.toString().length) + (+item[0].RunningNo + 1);

                                this.ListEvidenceInItem[i].EvidenceInItemCode = item[0].RunningPrefix + ("000".substring(0, 3 - item[0].RunningWarehouseID.toString().length) + item[0].RunningWarehouseID)
                                    + ("0000".substring(0, 4 - item[0].RunningGroupCode.toString().length) + item[0].RunningGroupCode) + item[0].RunningYear + RunningNo;
                            }
                        }, (error) => { console.error(error); return false; });
                    }
                }, (error) => { console.error(error); return false; });
            }
        }
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
            EvidenceInStaffID: this.StaffSendID,
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
        this.DeptStaffRecvCode = event.officeCode;
    }

    ClearStaffSendData() {
        this.PosStaffSend = "";
        this.DeptStaffSend = "";

        this.oEviInSendStaff = {
            EvidenceInStaffID: this.StaffSendID,
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
            EvidenceInStaffID: this.StaffRecvID,
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
            EvidenceInStaffID: this.StaffRecvID,
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


    // --- คลังจัดเก็บ ---
    async getWarehouse() {
        this.preloader.setShowPreloader(true);

        await this.MasService.getWarehourse(this.DestinationCode).then(res => {
            if (res) {
                this.rawWarehouseOptions = res;

                if (this.rawWarehouseOptions.length == 0) {
                    this.ShowAlertWarning("ไม่พบคลังจัดเก็บของหน่วยงาน " + localStorage.getItem("officeShortName"));
                }

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

            this.WarehouseID = "";
            this.WarehouseName = "";
        }
    }

    WarehouseOnAutoSelecteWord(event) {
        this.WarehouseID = event.WarehouseID;

        if (this.evitype == "G") {
            this.getEvidenceInOutgetByWarehouseID();
        }
    }

    chooseFirstWarehouse(): void {
        this.WarehouseID = this.Warehouseoptions[0].WarehouseID;
        this.WarehouseName = this.Warehouseoptions[0].WarehouseName;
    }
    // ----- End คลังจัดเก็บ ---

    // **********************************
    // ----------- Unit ----------
    // **********************************
    getUnit() {
        this.EviService.getProveProductUnit('').then(async res => {
            if (res) {
                this.rawUnitOptions = res;
            }
        }, (err: HttpErrorResponse) => { });
    }

    UnitOnAutoChange(value: string) {
        if (value == '') {
            this.UnitOption = [];
        } else {
            this.UnitOption = this.rawUnitOptions.filter(f => f.DutyCode.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    UnitOnAutoFocus(value: string) {
        if (value == '') {
            this.UnitOption = [];
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
            return setZeroHours(new Date(`${tDate.year}-${tDate.month}-${tDate.day}`));
        }

        return "";
    }


    // **********************************
    // ------------ Document -----------
    // **********************************
    AddDocument() {
        this.oDocument = {};
        this.oDocument.ReferenceCode = this.EvidenceInID;
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
    // ------------ Product -----------
    // **********************************
    AddProduct() {
        this.oEvidenceInItem = {
            EvidenceInItemCode: "Auto Generate",
            ProductSeq: this.ListEvidenceInItem.length,
            EvidenceInID: "",
            ProductDesc: "",
            DeliveryQty: "",
            DeliveryQtyUnit: "",
            DeliveryNetVolumn: "",
            DamageQty: "",
            DamageQtyUnit: "",
            DamageNetVolumn: "",
            Remark: "",
            IsNewItem: true,
            IsDelItem: false,
            EvidenceStockBalance: []
        };
        this.ListEvidenceInItem.push(this.oEvidenceInItem);

        if (this.evitype == 'G') {
            this.ListEvidenceInItem.map(f => {
                f.EvidenceInItemCode = "";
            })
        }
    }

    async getMasProduct() {
        await this.MasService.getProduct().then(async res => {
            if (res) {
                this.rawProductOptions = res;
            }

            this.preloader.setShowPreloader(false);
        }, (err: HttpErrorResponse) => {
            this.ShowAlertError("พบปัญหาในการติดต่อ Server");
        });
    }

    ProductonAutoChange(value: string, i: number) {
        if (value == '') {
            this.Productoptions = [];
            this.ClearProduct(i);
        } else {
            if (this.rawProductOptions.length == 0) {
                this.getMasProduct();
            }

            this.Productoptions = this.rawProductOptions.filter(f => f.ProductDesc.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10);
        }
    }

    ProductonAutoFocus(value: string) {
        if (value == '') {
            this.Productoptions = [];
        }
    }

    ProductonAutoSelecteWord(event, i) {
        var aIndex;
        aIndex = this.getIndexOf(this.ListEvidenceInItem, i, "ProductSeq");

        let IsNewItem = this.ListEvidenceInItem[aIndex].IsNewItem;
        let IsDelItem = this.ListEvidenceInItem[aIndex].IsDelItem;
        let ItemID = this.ListEvidenceInItem[aIndex].EvidenceInItemID;
        let ItemCode = this.ListEvidenceInItem[aIndex].EvidenceInItemCode;
        let EviInID = this.ListEvidenceInItem[aIndex].EvidenceInID;

        this.ListEvidenceInItem[aIndex] = {
            EvidenceInItemID: ItemID,
            EvidenceInItemCode: ItemCode,
            EvidenceOutItemID: "",
            ProductSeq: aIndex,
            EvidenceInID: EviInID,
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
            FixNo2: event.FixNo2,
            SequenceNo: event.SequenceNo,
            ProductDesc: event.ProductDesc,
            DeliveryQty: "",
            DeliveryQtyUnit: "",
            DeliverySize: event.size,
            DeliverySizeUnit: event.SizeUnitCode,
            DeliveryNetVolumn: "",
            DeliveryNetVolumnUnit: "",
            DamageQty: "",
            DamageQtyUnit: "",
            DamageSize: event.size,
            DamageSizeUnit: event.SizeUnitCode,
            DamageNetVolumn: "",
            DamageNetVolumnUnit: "",
            ReceiveQty: "",
            ReceiveNetVolumn: "",
            IsActive: "",
            IsNewItem: IsNewItem,
            IsDelItem: IsDelItem,
            EvidenceStockBalance: []
        }

        if (this.evitype == "G") {
            this.ListEvidenceInItem[aIndex].EvidenceInItemCode = event.EvidenceInItemCode;
            this.ListEvidenceInItem[aIndex].DeliveryQty = event.DeliveryQty;
            this.ListEvidenceInItem[aIndex].DeliveryQtyUnit = event.DeliveryQtyUnit;
            this.ListEvidenceInItem[aIndex].ReceiveQty = event.DeliveryQty;
            this.ListEvidenceInItem[aIndex].DamageQtyUnit = event.DeliveryQty;
            this.ListEvidenceInItem[aIndex].EvidenceOutItemID = event.EvidenceOutItemID;

            this.oStockBalance = {
                StockID: event.StockID,
                WarehouseID: this.WarehouseID,
                EvidenceInItemID: event.EvidenceOutItemID,
                BalanceQty: event.BalanceQty
            }

            this.ListEvidenceInItem[aIndex].EvidenceStockBalance = [];
            this.ListEvidenceInItem[aIndex].EvidenceStockBalance.push(this.oStockBalance);
        }
    }

    ClearProduct(i: number) {
        var aIndex;
        aIndex = this.getIndexOf(this.ListEvidenceInItem, i, "ProductSeq");

        let IsNewItem = this.ListEvidenceInItem[aIndex].IsNewItem;
        let IsDelItem = this.ListEvidenceInItem[aIndex].IsDelItem;
        let ItemCode = this.ListEvidenceInItem[aIndex].EvidenceInItemCode;
        let EviInID = this.ListEvidenceInItem[aIndex].EvidenceInID;
        let ItemID = this.ListEvidenceInItem[aIndex].EvidenceInItemID;

        this.ListEvidenceInItem[aIndex] = {
            EvidenceInItemID: ItemID,
            EvidenceInItemCode: ItemCode,
            ProductSeq: aIndex,
            EvidenceInID: EviInID,
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
            FixNo2: "",
            SequenceNo: "",
            ProductDesc: "",
            DeliveryQty: "",
            DeliveryQtyUnit: "",
            DeliverySize: "",
            DeliverySizeUnit: "",
            DeliveryNetVolumn: "",
            DeliveryNetVolumnUnit: "",
            DamageQty: "",
            DamageQtyUnit: "",
            DamageSize: "",
            DamageSizeUnit: "",
            DamageNetVolumn: "",
            DamageNetVolumnUnit: "",
            ReceiveQty: "",
            ReceiveNetVolumn: "",
            IsActive: "",
            IsNewItem: IsNewItem,
            IsDelItem: IsDelItem,
            EvidenceStockBalance: []
        }
    }

    CalReceive(i: number) {
        var aIndex;
        aIndex = this.getIndexOf(this.ListEvidenceInItem, i, "ProductSeq");

        this.ListEvidenceInItem[aIndex].ReceiveQty = +`${this.ListEvidenceInItem[aIndex].DeliveryQty == "" ? "0" : this.ListEvidenceInItem[aIndex].DeliveryQty}` - +`${this.ListEvidenceInItem[aIndex].DamageQty == "" ? "0" : this.ListEvidenceInItem[aIndex].DamageQty}`;

        if (this.ListEvidenceInItem[aIndex].ReceiveQty < 0) {
            this.ShowAlertWarning("จำนวนชำรุดต้องไม่มากกว่าจำนวนส่ง !!!");
            this.ListEvidenceInItem[aIndex].DamageQty = this.ListEvidenceInItem[aIndex].DeliveryQty;
            this.ListEvidenceInItem[aIndex].ReceiveQty = 0;
        }
    }

    CalReceiveNetVolumn(i: number) {
        var aIndex;
        aIndex = this.getIndexOf(this.ListEvidenceInItem, i, "ProductSeq");

        this.ListEvidenceInItem[aIndex].ReceiveNetVolumn = +`${this.ListEvidenceInItem[aIndex].DeliveryNetVolumn == "" ? "0" : this.ListEvidenceInItem[aIndex].DeliveryNetVolumn}` - +`${this.ListEvidenceInItem[aIndex].DamageNetVolumn == "" ? "0" : this.ListEvidenceInItem[aIndex].DamageNetVolumn}`;

        if (this.ListEvidenceInItem[aIndex].ReceiveNetVolumn < 0) {
            this.ShowAlertWarning("ปริมาณชำรุดต้องไม่มากกว่าปริมาณส่ง !!!");
            this.ListEvidenceInItem[aIndex].DamageNetVolumn = this.ListEvidenceInItem[aIndex].DeliveryNetVolumn;
            this.ListEvidenceInItem[aIndex].ReceiveNetVolumn = 0;
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
                aIndex = this.getIndexOf(this.ListEvidenceInItem, i, "ProductSeq");

                if (aIndex != -1) {
                    if (this.ListEvidenceInItem[aIndex].IsNewItem == false) {
                        this.ListEvidenceInItem[aIndex].IsDelItem = true;
                    }
                    else {
                        this.ListEvidenceInItem.splice(aIndex, 1);
                    }
                }
            }
        })
    }


    // **********************************************
    // ------------ Product by Warehourse -----------
    // **********************************************

    getEvidenceInOutgetByWarehouseID() {
        this.preloader.setShowPreloader(true);
        this.EviService.getEvidenceInOutgetByWarehouseID(this.WarehouseID).then(async res => {
            this.preloader.setShowPreloader(false);
            if (res) {
                this.rawProductOptions = [];

                res.map(f => {
                    f.EvidenceInOutItem.map(p => {

                        let lsProd = {
                            BrandCode: p.BrandCode,
                            BrandNameEN: p.BrandNameEN,
                            BrandNameTH: p.BrandNameTH,
                            CarNo: p.CarNo,
                            Degree: p.Degree,
                            DegreeCode: p.DegreeCode,
                            EvidenceInID: p.EvidenceInID,
                            EvidenceInItemCode: p.EvidenceInItemCode,
                            EvidenceInItemID: p.EvidenceInItemID,
                            EvidenceOutID: p.EvidenceOutID,
                            EvidenceOutItemID: p.EvidenceOutItemID,
                            FixNo1: p.FixNo1,
                            FixNo2: p.FixNo2,
                            GroupCode: p.GroupCode,
                            IsDomestic: p.IsDomestic,
                            ModelCode: p.ModelCode,
                            ModelName: p.ModelName,
                            ProductCode: p.ProductCode,
                            ProductDesc: p.ProductDesc,
                            Size: p.Size,
                            SizeUnit: p.SizeUnit,
                            StockID: p.StockID,
                            SubBrandCode: p.SubBrandCode,
                            SubBrandNameEN: p.SubBrandNameEN,
                            SubBrandNameTH: p.SubBrandNameTH,
                            DeliveryQty: p.Qty,
                            DeliveryQtyUnit: p.QtyUnit
                        };

                        this.rawProductOptions.push(lsProd);
                    })
                })
            }
        }, (err: HttpErrorResponse) => {
            this.ShowAlertError("พบปัญหาในการติดต่อ Server");
        });
    }

    // ******************************************
    // ------------ EvidenceInItemCode ----------
    // ******************************************
    EviItemCodeonAutoChange(value: string, i: number) {
        if (value == '') {
            this.Productoptions = [];
            this.ClearProduct(i);
        } else {
            if (this.rawProductOptions.length == 0) {
                this.getEvidenceInOutgetByWarehouseID();
            }

            this.Productoptions = this.rawProductOptions.filter(f => f.EvidenceInItemCode.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10);
        }
    }
}
