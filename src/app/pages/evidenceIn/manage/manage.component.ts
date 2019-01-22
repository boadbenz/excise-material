import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EvidenceService } from '../evidenceIn.service';
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






    // Staffoptions = [];
    // rawOptions = [];
    // InformTooptions = [];
    // options = [];

    // ListRevenueDetailPaging = [];
    // ListChK = [];
    // RevenueDetailForUDP = [];


    // oRevenueDetail: RevenueDetail;

    // oRevenueStaff: Staff;

    isRequired: boolean | false;


    // ----- Model ------ //
    @ViewChild('printDocModal') printDocModel: ElementRef;

    constructor(
        private activeRoute: ActivatedRoute,
        private ngbModel: NgbModal,
        private navService: NavigationService,
        private EviService: EvidenceService,
        private preloader: PreloaderService,
        private router: Router,
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

        this.EvidenceInCode = "Auto Generate";

        if (this.evitype == "I") {
            await this.getProve();
        }

        if (this.mode === 'R') {
            await this.ShowEvidenceIn();
        } else {
            this.preloader.setShowPreloader(false);
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

        
        */
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
            if (res != null) {
                this.ListEvidenceInItem = [];
                this.oEvidenceIn = res
                this.ListEvidenceInItem = res.EvidenceInItem;

                this.DeliveryNo = res.DeliveryNo
                this.DeliveryDate = setDateMyDatepicker(new Date(res.DeliveryDate));
                if (res.ReturnDate == null || res.ReturnDate == '') { this.ReturnDate = ""; } else { setDateMyDatepicker(new Date(res.ReturnDate)) }
                this.DeliveryTime = res.DeliveryTime;
                this.Remark = res.Remark;

                var sTemp = res.EvidenceInStaff.filter(f => f.ContributorID == "13");
                if (sTemp.length > 0) {
                    this.StaffSendName = sTemp[0].TitleName + sTemp[0].FirstName + ' ' + sTemp[0].LastName;
                    this.PosStaffSend = sTemp[0].PositionName;
                    this.DeptStaffSend = sTemp[0].OfficeName;
                    this.StaffSendID = sTemp[0].StaffID;
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
                    this.StaffSendID = sTemp[0].StaffID;
                    this.oEviInRecvStaff = sTemp[0];
                }

                this.ListDoc = [];
                this.preloader.setShowPreloader(false);
            } else {
                this.ShowAlertError("พบปัญหาในการติดต่อ Server");
                this.preloader.setShowPreloader(false);
                this.router.navigate(['/evidenceIn/list']);
            }
        }, (err: HttpErrorResponse) => {
            this.ShowAlertError("API EvidenceIngetByCon :: " + err.message);
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


    // **********************************
    // ------------ Document -----------
    // **********************************
    AddDocument() {
        this.oDocument = {};
        this.oDocument.ReferenceCode = this.ProveID;
        this.oDocument.DocumentSeq = this.ListDoc.length;
        this.oDocument.DocumentType = "5";
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
                this.ListDoc[i].DocumentType = 5;
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
