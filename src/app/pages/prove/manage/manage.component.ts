import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit, OnDestroy {
    private sub: any;
    viewMode: any;
    mode: string;
    modal: any;
    param: any;

    // --------
    showEditField: any;

    // -- Parameter ---
    LawsuitID: string;
    ArrestCode: string;
    ProveID: string;

    // --- Autocomplate ---
    rawOptions = [];
    options = [];

    rawStaffOptions = [];
    Staffoptions = [];

    // ---- Varible ---
    LawsuiltCode: string;
    SectionName: string;
    GuiltBaseName: string;
    SectionNo: string;
    PenaltyDesc: string;
    IndictmentID: number;
    ReportNo: string;
    ProveYear: string;
    ProveDate: Date;
    ProveTime: string;

    // --- Object ---
    oArrest: Arrest;
    oProve: Prove;
    oProveStaff: ProveStaff;
    ListProveStaff = [];




    // ----- Model ------ //
    // @Input() suspectComponent: SuspectModalComponent;

    constructor(
        private navService: NavigationService,
        private ngbModel: NgbModal,
        private activeRoute: ActivatedRoute,
        private proveService: ProveService,
        private ArrestSV: ArrestService,
        private LawsuitSV: LawsuitService,
        private MasterSV: MasterService
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        // set true
        this.navService.setNextPageButton(true);
    }

    ngOnInit() {
        this.active_Route();
        this.navigate_Service();
        this.CreateObject();

        this.getStation();
        this.getProveStaff();

        this.ArrestCode = this.ArrestCode;
        this.getLawsuitByID(this.LawsuitID);

        let date = new Date();
        this.ProveYear = (date.getFullYear() + 543).toString();
        this.ProveDate = date;
    }

    private active_Route() {
        this.sub = this.navService.showFieldEdit.subscribe(status => {
            this.viewMode = status;
            if (!this.viewMode) {
                this.navService.setCancelButton(true);
                this.navService.setSaveButton(true);
                this.navService.setPrintButton(false);
                this.navService.setSearchBar(false);
                this.navService.setDeleteButton(false);
                this.navService.setEditButton(false);

            } else {
                this.navService.setPrintButton(true);
                this.navService.setDeleteButton(true);
                this.navService.setEditButton(true);
                this.navService.setSearchBar(false);
                this.navService.setCancelButton(false);
                this.navService.setSaveButton(false);
            }


            this.navService.setNextPageButton(true);
        });


        this.param = this.activeRoute.params.subscribe(p => {
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
                // set action save = false
                await this.navService.setOnSave(false);
                debugger
                if (this.ProveID == '0') {
                  this.onInsProve();

                } else {
                //   this.onUpdCompare();
                //   this.onComplete();
                }
            }
        });

        // this.sub = this.navService.onDelete.subscribe(async status => {
        //     if (status) {
        //         await this.navService.setOnDelete(false);
        //         this.onDelete();
        //     }
        // });

        // this.sub = this.navService.onPrint.subscribe(async status => {
        //   if (status) {
        //     await this.navService.setOnPrint(false);
        //     this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
        //   }
        // })

        this.sub = this.navService.onCancel.subscribe(async status => {
            if (status) {
                await this.navService.setOnCancel(true);
                await this.navService.setEditButton(true);
                await this.navService.setPrintButton(true);
                await this.navService.setDeleteButton(true);
                // set true
                await this.navService.setSaveButton(false);
                await this.navService.setCancelButton(false);
            }
        })
    }

    onInsProve()
    {
        debugger
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    // openSuspect(e) {
    //     this.modal = this.suspectModalService.open(e, { size: 'lg', centered: true });
    // }


    CreateObject()
    {
        this.oProve = {
            ProveID: "",
            DeliveryDocNo: "",
            DeliveryDate: "",
            ProveReportNo: "",
            ProveDate:"",
            ProveStationCode: "",
            ProveStation: "",
            IndictmentID: "",
            IsActive: 1,
            ProveStaff: []
        }
    }

    getLawsuitByID(LawsuitID: string) {
        this.LawsuitSV.LawsuitegetByCon(LawsuitID).then(async res => {
            // --- รายละเอียดคดี ----

            if (res.IsOutside == "1") {
                this.LawsuiltCode = "น " + res.LawsuitNo;
            }
            else {
                this.LawsuiltCode = res.LawsuitNo;
            }

            this.IndictmentID = res.IndictmentID;

            this.getArrestByID(this.ArrestCode)

        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }

    getArrestByID(ArrestCode: string) {
        this.ArrestSV.getByArrestCon(ArrestCode).then(async res => {
            this.oArrest = res;

            debugger
            this.getGuiltBaseByID();

        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }

    getGuiltBaseByID() {
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
    }

    getIndexOf(arr, val, prop) {
        var l = arr.length,
            k = 0;
        for (k = 0; k < l; k = k + 1) {
            if (arr[k][prop] === val) {
                return k;
            }
        }
        return false;
    }

    // --- เขียนที่ ---
    getStation() {
        this.MasterSV.getStation().then(async res => {
            if (res) {
                this.rawOptions = res;
            }
            debugger
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }

    onAutoChange(value: string) {
        debugger
        if (value == '') {
            this.options = [];
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


    // --- ผู้ตรวจรับ ---
    getProveStaff() {
        this.MasterSV.getStaff().then(async res => {
            debugger

            if (res) {
                this.rawStaffOptions = res;
            }
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }

    StaffonAutoChange(value: string) {
        debugger
        if (value == '') {
            this.Staffoptions = [];
        } else {

            this.Staffoptions = this.rawStaffOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    StaffonAutoFocus(value: string) {
        if (value == '') {
            this.Staffoptions = [];
        }
    }

    StaffonAutoSelecteWord(event) {
        this.ListProveStaff = [];

        this.oProveStaff = {
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
            ContributorCode: ""
        }

        this.ListProveStaff.push(this.oProveStaff);
        this.oProve.ProveStaff = this.ListProveStaff;
        
    }
    // ----- End ผู้ตรวจรับ ---
}
