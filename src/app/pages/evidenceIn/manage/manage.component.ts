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
    UnitOption = [];
    ListDoc = [];
    rawProductOptions = [];
    Productoptions = [];
    rawProdbyWarehourseOptions = [];
    ProdbyWarehourseoptions = [];

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
        this.getUnit();
        await this.getEvidenceInStaff();

        this.DeliveryDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        this.ReturnDate = setDateMyDatepicker(new Date(this.getCurrentDate()));
        this.EvidenceInDate = setDateMyDatepicker(new Date(this.getCurrentDate()));

        this.DeliveryTime = this.getCurrentTime();
        this.EvidenceInTime = this.getCurrentTime();

        if (this.evitype == "I") {
            await this.getProve();
        } else if (this.evitype == "E") {
            await this.getMasProduct();
        } else {
            //await this.getEvidenceInOutgetByWarehouseID();
        }

        if (this.mode === 'R') {
            await this.ShowEvidenceIn();
        } else {
            this.preloader.setShowPreloader(false);
        }

        this.EvidenceInCode = "Auto Generate";
        this.WarehouseID = "1";

        /*this.RevenueStatus = 0;
        this.RevenueNo = "";
        this.RevenueStation == "";
        this.StaffSendName == "";
        this.StaffName == "";
        this.InformTo = "";
        this.StaffID = "";
        this.StaffSendID = "";
        
        this.paginage.TotalItems = this.ListRevenueDetail.length;
        this.ListRevenueDetailPaging = this.ListRevenueDetail.slice(0, this.paginage.RowsPerPageOptions[0]);
*/
    }

    ngOnDestroy(): void {
        this.onCancelSubscribe.unsubscribe();
        // this.onEditSubscribe.unsubscribe();
        this.onSaveSubscribe.unsubscribe();
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
                            this.EvidenceInType = "0";
                            break;
                        case 'E':
                            data.urls[2].title = "จัดการข้อมูลรายการตรวจรับของกลางจากหน่วยงานภายนอก";
                            this.EvidenceInType = "1";
                            break;
                        case 'G':
                            data.urls[2].title = "จัดการข้อมูลรายการตรวจรับของกลางที่นำออกจากคลังไปใช้ในราชการ";
                            this.EvidenceInType = "2";
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

                if (this.DeliveryNo == "" || this.DeliveryNo == undefined
                    || this.DeliveryDate == null || this.DeliveryDate == undefined
                    || this.DeliveryTime == "" || this.DeliveryTime == undefined
                    || this.ReturnDate == null || this.ReturnDate == undefined
                    || this.StaffSendName == "" || this.StaffSendName == undefined
                    || this.EvidenceInCode == "" || this.EvidenceInCode == undefined
                    || this.EvidenceInDate == null || this.EvidenceInDate == undefined
                    || this.EvidenceInTime == "" || this.EvidenceInTime == undefined
                    || this.StaffRecvName == "" || this.StaffRecvName == undefined) {
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
        }, (err: HttpErrorResponse) => {
            this.ShowAlertError("พบปัญหาในการติดต่อ Server");
        });
    }

    ShowEvidenceIn() {
        this.EviService.getByCon(this.EvidenceInID).then(async res => {
            if (res != null && res.IsSuccess != "False") {
                this.ListEvidenceInItem = [];
                this.oEvidenceIn = res
                this.ListEvidenceInItem = res.EvidenceInItem;

                this.DeliveryNo = res.DeliveryNo
                this.DeliveryDate = setDateMyDatepicker(new Date(res.DeliveryDate));
                if (res.ReturnDate == null || res.ReturnDate == '') { this.ReturnDate = ""; } else { this.ReturnDate = setDateMyDatepicker(new Date(res.ReturnDate)) }
                this.DeliveryTime = res.DeliveryTime;
                this.Remark = res.Remark;

                var sTemp = res.EvidenceInStaff.filter(f => f.ContributorID == "13");
                if (sTemp.length > 0) {
                    this.StaffSendName = `${sTemp[0].TitleName == 'null' || sTemp[0].TitleName == null ? '' : sTemp[0].TitleName}`
                        + `${sTemp[0].FirstName == 'null' || sTemp[0].FirstName == null ? '' : sTemp[0].FirstName}` + ' '
                        + `${sTemp[0].LastName == 'null' || sTemp[0].LastName == null ? '' : sTemp[0].LastName}`;
                    this.PosStaffSend = sTemp[0].PositionName;
                    this.DeptStaffSend = sTemp[0].OfficeName;
                    this.StaffSendID = sTemp[0].EvidenceInStaffID;
                    this.oEviInSendStaff = sTemp[0];
                }

                this.EvidenceInCode = res.EvidenceInCode;
                this.EvidenceInDate = setDateMyDatepicker(new Date(res.EvidenceInDate));
                this.EvidenceInTime = res.EvidenceInTime;

                sTemp = res.EvidenceInStaff.filter(f => f.ContributorID == "42");
                if (sTemp.length > 0) {
                    this.StaffRecvName = `${sTemp[0].TitleName == 'null' || sTemp[0].TitleName == null ? '' : sTemp[0].TitleName}`
                        + `${sTemp[0].FirstName == 'null' || sTemp[0].FirstName == null ? '' : sTemp[0].FirstName}` + ' '
                        + `${sTemp[0].LastName == 'null' || sTemp[0].LastName == null ? '' : sTemp[0].LastName}`;
                    this.PosStaffRecv = sTemp[0].PositionName;
                    this.DeptStaffRecv = sTemp[0].OfficeName;
                    this.StaffRecvID = sTemp[0].EvidenceInStaffID;
                    this.oEviInRecvStaff = sTemp[0];
                }

                // -------------- Product -------------------------
                this.oEvidenceIn.EvidenceInItem.map(item => {
                    item.ReceiveQty = item.EvidenceStockBalance[0].ReceiveQty;
                    item.ReceiveNetVolumn = item.EvidenceStockBalance[0].ReceiveNetVolumn;
                    item.IsNewItem = false;
                    item.IsDelItem = false;
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

        await this.RevService.TransactionRunninggetByCon("ops_evidence_in", this.DeptStaffRecvCode).then(async item => {
            if (item.length == 0) {
                this.RevService.TransactionRunninginsAll(this.DeptStaffRecvCode, "ops_evidence_in", "RC").then(async res => {
                    if (res.IsSuccess) {
                        this.EvidenceInCode = "RC" + this.oEviInRecvStaff.OfficeCode + (this.EvidenceInDate.date.year + 543).toString().substring(4, 2) + "00001";
                        this.oEvidenceIn.EvidenceInCode = this.EvidenceInCode;

                        this.InsEvidenceIn();
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

                        this.InsEvidenceIn();
                    }
                }, (error) => { console.error(error); return false; });
            }

        }, (error) => { console.error(error); return false; });
    }

    InsEvidenceIn() {
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

                if (isSuccess) {
                    this.ShowAlertSuccess(Message.saveComplete);
                    this.onComplete();

                    this.oEvidenceIn = {};

                    this.preloader.setShowPreloader(false);
                    this.router.navigate([`/evidenceIn/manage/${this.evitype}/R/${this.EvidenceInID}/${this.ProveID}`]);
                }
            } else {
                this.ShowAlertError(Message.saveFail);
            }
        }, (error) => { console.error(error); return false; });
    }

    async onUdpEvidenceIn() {
        this.preloader.setShowPreloader(true);
        this.setData();


        // -----------------------------------------------------------
        //                       Call API Update
        // -----------------------------------------------------------

        let isSuccess: boolean = true;

        await this.EviService.EvidenceInupdByCon(this.oEvidenceIn).then(async IsSuccess => {
            if (!IsSuccess) {
                isSuccess = IsSuccess;
                return false;
            }
        }, (error) => { isSuccess = false; console.error(error); return false; });

        if (!isSuccess) return false;

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
                            return false;
                        }
                    }, (error) => { console.error(error); return false; });
                });


            // Edit Document
            this.ListDoc.filter(item => item.IsNewItem === false)
                .map(async item => {
                    item.ReferenceCode = this.oEvidenceIn.EvidenceInID;
                    await this.proveService.MasDocumentMainupdByCon(item).then(pRes => {
                        if (!pRes.IsSuccess) {
                            isSuccess = pRes.IsSuccess;
                            return false;
                        }
                    }, (error) => { console.error(error); return false; });
                });

            // Del Document    
            this.ListDoc.filter(item => item.IsDelItem === true)
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
            this.onComplete();
            this.preloader.setShowPreloader(false);
        } else {
            this.ShowAlertError(Message.saveFail);
            this.preloader.setShowPreloader(false);
        }
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
                this.EviService.EvidenceInupdDelete(this.EvidenceInID).then(async IsSuccess => {
                    if (IsSuccess) {
                        this.oEvidenceIn = {};
                        this.ShowAlertSuccess(Message.saveComplete);
                        this.router.navigate(['/evidenceIn/list']);
                    } else {
                        this.ShowAlertError(Message.saveFail);
                    }
                }, (error) => { console.error(error); return false; });
            }
        })
    }

    async setData() {
        this.oEvidenceIn = {
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

            this.oStockBalance = {
                WarehouseID: this.WarehouseID,
                EvidenceInItemID: "",
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
                BalanceNetVolumnUnit: item.ReceiveNetVolumn,
                IsFinish: "2",
                IsReceive: "1"
            }

            item.EvidenceStockBalance.push(this.oStockBalance);
        });

        await this.generateItemCode();

        this.oEvidenceIn.EvidenceInItem = this.ListEvidenceInItem;
        this.oEvidenceIn.EvidenceInStaff = [];

        // ผู้นำส่ง
        if (this.oEviInSendStaff != null && this.oEviInSendStaff != undefined) {
            this.oEvidenceIn.EvidenceInStaff.push(this.oEviInSendStaff);
        }

        // ผู้รับของกลาง
        if (this.oEviInRecvStaff != null && this.oEviInRecvStaff != undefined) {
            this.oEvidenceIn.EvidenceInStaff.push(this.oEviInRecvStaff);
        }
    }

    async generateItemCode() {
        for (let i = 0; i < this.ListEvidenceInItem.length; i++){
            if(this.ListEvidenceInItem[i].IsNewItem == true){
                await this.RevService.TransactionRunningItemgetByCon("IN", this.ListEvidenceInItem[i].GroupCode, this.WarehouseID).then(async item => {
                    let date = new Date();

                    if (item.length == 0) {
                        await this.RevService.TransactionRunningIteminsAll((date.getFullYear() + 543).toString().substring(2), date.getMonth(), "IN", this.ListEvidenceInItem[i].GroupCode,
                            this.WarehouseID, "00001").then(res => {
                                if (res.IsSuccess) {
                                    this.ListEvidenceInItem[i].EvidenceInItemCode = "IN" + ("000".substring(0, 3 - this.WarehouseID.length) + this.WarehouseID)
                                        + ("0000".substring(0, 4 - this.ListEvidenceInItem[i].GroupCode.length) + this.ListEvidenceInItem[i].GroupCode) + (date.getFullYear() + 543).toString().substring(2) + "00001";
                                }
                            }, (error) => { console.error(error); return false; });
                    }
                    else {
                        await this.RevService.TransactionRunningItemupdByCon(item[0].RunningID).then(async res => {
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


    // **********************************
    // ----------- Unit ----------
    // **********************************
    getUnit() {
        this.EviService.getProveProductUnit('').then(async res => {
            if (res) {
                this.UnitOption = res;
            }
        }, (err: HttpErrorResponse) => { });
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
                        this.ListDoc.splice(i, 1);
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
    }

    async getMasProduct() {
        await this.MasService.getProduct().then(async res => {
            if (res) {
                this.rawProductOptions = res;
            }
        }, (err: HttpErrorResponse) => {
            this.ShowAlertError("พบปัญหาในการติดต่อ Server");
        });
    }

    ProductonAutoChange(value: string) {
        if (value == '') {
            this.Productoptions = [];
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
        let IsNewItem = this.ListEvidenceInItem[i].IsNewItem;
        let IsDelItem = this.ListEvidenceInItem[i].IsDelItem;

        this.ListEvidenceInItem[i] = {
            EvidenceInItemCode: "Auto Generate",
            EvidenceInID: "",
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
    }

    CalReceive(i: number) {
        this.ListEvidenceInItem[i].ReceiveQty = +`${this.ListEvidenceInItem[i].DeliveryQty == "" ? "0" : this.ListEvidenceInItem[i].DeliveryQty}` - +`${this.ListEvidenceInItem[i].DamageQty == "" ? "0" : this.ListEvidenceInItem[i].DamageQty}`;

        if (this.ListEvidenceInItem[i].ReceiveQty < 0) {
            this.ShowAlertWarning("จำนวนชำรุดต้องไม่มากกว่าจำนวนส่ง !!!");
            this.ListEvidenceInItem[i].DamageQty = this.ListEvidenceInItem[i].DeliveryQty;
            this.ListEvidenceInItem[i].ReceiveQty = 0;
        }
    }

    CalReceiveNetVolumn(i: number) {
        this.ListEvidenceInItem[i].ReceiveNetVolumn = +`${this.ListEvidenceInItem[i].DeliveryNetVolumn == "" ? "0" : this.ListEvidenceInItem[i].DeliveryNetVolumn}` - +`${this.ListEvidenceInItem[i].DamageNetVolumn == "" ? "0" : this.ListEvidenceInItem[i].DamageNetVolumn}`;

        if (this.ListEvidenceInItem[i].ReceiveNetVolumn < 0) {
            this.ShowAlertWarning("ปริมาณชำรุดต้องไม่มากกว่าปริมาณส่ง !!!");
            this.ListEvidenceInItem[i].DamageNetVolumn = this.ListEvidenceInItem[i].DeliveryNetVolumn;
            this.ListEvidenceInItem[i].ReceiveNetVolumn = 0;
        }
    }


    // **********************************************
    // ------------ Product by Warehourse -----------
    // **********************************************

    TestSearchWarehourse(){
        this.getEvidenceInOutgetByWarehouseID();
    }

    async getEvidenceInOutgetByWarehouseID() {
        await this.RevService.getEvidenceInOutgetByWarehouseID(this.WarehouseID).then(async res => {
            if (res) {
                this.rawProdbyWarehourseOptions = res;
            }
        }, (err: HttpErrorResponse) => {
            this.ShowAlertError("พบปัญหาในการติดต่อ Server");
        });
    }
}
