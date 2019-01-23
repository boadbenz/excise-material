import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EvidenceService } from '../evidenceIn.service';
import { IncomeService } from '../../income/income.service';
import { ProveService } from '../../prove/prove.service'
import { Evidence_In, Document, EvidenceInStaff } from '../evidenceIn';
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

    oEviInSendStaff: EvidenceInStaff;
    oEviInRecvStaff: EvidenceInStaff;
    oEvidenceIn: Evidence_In;
    oDocument: Document;

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


    isRequired: boolean | false;


    // ----- Model ------ //
    @ViewChild('printDocModal') printDocModel: ElementRef;

    constructor(
        private activeRoute: ActivatedRoute,
        private ngbModel: NgbModal,
        private navService: NavigationService,
        private EviService: EvidenceService,
        private RevService: IncomeService,
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
        }

        if (this.mode === 'R') {
            await this.ShowEvidenceIn();
        } else {
            this.preloader.setShowPreloader(false);
        }

        this.EvidenceInCode = "Auto Generate";

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
                    this.StaffSendName = sTemp[0].TitleName + sTemp[0].FirstName + ' ' + sTemp[0].LastName;
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
                    this.StaffRecvName = sTemp[0].TitleName + sTemp[0].FirstName + ' ' + sTemp[0].LastName;
                    this.PosStaffRecv = sTemp[0].PositionName;
                    this.DeptStaffRecv = sTemp[0].OfficeName;
                    this.StaffRecvID = sTemp[0].EvidenceInStaffID;
                    this.oEviInRecvStaff = sTemp[0];
                }

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
        this.setData();

        await this.RevService.TransactionRunninggetByCon("ops_evidence_in", this.DeptStaffRecvCode).then(async item => {
            if (item.length == 0) {
                this.RevService.TransactionRunninginsAll(this.DeptStaffRecvCode, "ops_evidence_in", "RC").then(async res => {
                    if (res.IsSuccess) {
                        this.EvidenceInCode = "RC" + this.oEviInRecvStaff.OfficeCode + (this.EvidenceInDate.date.year + 543).toString().substring(4, 2) + "00001";
                        this.oEvidenceIn.EvidenceInCode = this.EvidenceInCode;

                        this.InsEvidenceIn();
                    }

                    this.preloader.setShowPreloader(false);
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

    setData() {
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

        this.oEvidenceIn.EvidenceInItem = [];
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
}
