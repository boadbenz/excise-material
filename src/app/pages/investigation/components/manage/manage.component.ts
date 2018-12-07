import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as fromModels from '../../models';
import * as fromService from '../../services';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import { Message } from 'app/config/message';
import { MyDatePickerOptions, getDateMyDatepicker, compareDate, setDateMyDatepicker, toLocalShort, setZeroHours } from 'app/config/dateFormat';
import { IMyDateModel } from 'mydatepicker-th';
import { Subject } from 'rxjs/Subject';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import swal from 'sweetalert2'


@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit, OnDestroy, AfterViewInit {

    card1 = true;
    card2 = true;

    private destroy$: Subject<boolean> = new Subject<boolean>();

    private obInvest: Observable<fromModels.InvestigateModel>;
    stateInvest: fromModels.InvestigateModel;
    toLocalShort = toLocalShort;

    private mode: string;
    investCode: string;
    StaffId: any;
    modal: any;

    _dateStartFrom: any;
    _dateStartTo: any;
    DateStartTo: any;

    model: any;
    showEditField: any;
    isRequired: boolean;
    investigateForm: FormGroup;

    myDatePickerOptions = MyDatePickerOptions;

    @ViewChild('printDocModal') printDocModel: ElementRef;
    @ViewChild('investigateNo0') investigateNo0: ElementRef;
    @ViewChild('investigateNo1') investigateNo1: ElementRef;

    get InvestigateDetail(): FormArray {
        return this.investigateForm.get('InvestigateDetail') as FormArray;
    }

    getInvestigateDetailStaff(form: any) {
        return form.controls.InvestigateDetailStaff.value;
    }

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private activeRoute: ActivatedRoute,
        private navService: NavigationService,
        private ngbModel: NgbModal,
        private sidebarService: SidebarService,
        private s_invest: fromService.InvestgateService,
        private store: Store<fromStore.AppState>
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);

        this.obInvest = store.select(s => s.invest);
        this.obInvest
            .takeUntil(this.destroy$)
            .subscribe((x: fromModels.InvestigateModel) => this.stateInvest = x)
    }

    ngOnInit() {
        this.sidebarService.setVersion(this.s_invest.version);
        this.active_Route();
        this.navigate_Service();
        this.createForm();
    }

    ngAfterViewInit(): void {
        switch (this.mode) {
            case 'C':
                this.investigateNo1.nativeElement.value = ((new Date).getFullYear() + 543);
                break;
        }
    }

    private createForm() {
        this.investigateForm = this.fb.group({
            InvestigateCode: new FormControl(this.investCode, Validators.required),
            InvestigateNo: new FormControl(null, Validators.required),
            DateStart: new FormControl(null, Validators.required),
            DateEnd: new FormControl(null),
            Subject: new FormControl(null, Validators.required),
            IsActive: new FormControl(1),
            InvestigateDetail: this.fb.array([])
        });
    }

    private active_Route() {
        this.activeRoute.params.takeUntil(this.destroy$).subscribe(p => {
            this.mode = p['mode'];
            this.investCode = p['code'];
            switch (this.mode) {
                case 'C':
                    this.enableBtnModeC();
                    break;
                case 'R':
                    this.enableBtnModeR();
                    break;
            }
            this.pageLoad();
        });
    }

    private enableBtnModeC() {
        // set false
        this.navService.setPrintButton(false);
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setEditField(false);
        this.navService.setPrevPageButton(false);
        this.navService.setNextPageButton(false);
        // set true 
        this.navService.setSaveButton(true);
        this.navService.setCancelButton(true);
    }

    private enableBtnModeR() {
        // set false
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setPrevPageButton(false);
        this.navService.setNextPageButton(false);
        // set true
        this.navService.setPrintButton(true);
        this.navService.setEditButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditField(true);
    }

    private navigate_Service() {
        this.navService.showFieldEdit.takeUntil(this.destroy$).subscribe(p => {
            this.showEditField = p;
        });

        this.navService.onCancel.takeUntil(this.destroy$).subscribe(async status => {
            if (status) {
                await this.navService.setOnCancel(false);
                switch (this.mode) {
                    case 'C':
                        this.router.navigate(['/investigation/list']);
                        break;
                    case 'R':
                        this.investigateForm.reset();
                        this.pageLoad();
                        break;
                }
            }
        })

        this.navService.onSave.takeUntil(this.destroy$).subscribe(async status => {
            if (status) {
                await this.navService.setOnSave(false);
                this.onSave();
            }
        });

        this.navService.onDelete.takeUntil(this.destroy$).subscribe(async status => {
            if (status) {
                await this.navService.setOnDelete(false);
                this.onDelete();
            }
        });

        this.navService.onPrint.takeUntil(this.destroy$).subscribe(async status => {
            if (status) {
                await this.navService.setOnPrint(false);
                this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
            }
        })
    }

    private onSave() {
        let f = this.investigateForm.value;

        if (this.investigateForm.invalid) {
            swal('', Message.checkData, 'warning')
            return;
        }

        if (!this.InvestigateDetail.length) {
            swal('', 'ส่วนรายงานการสืบสวน ต้องมีอย่างน้อย 1 รายการ', 'warning');
            return;
        }

        const dateStart = getDateMyDatepicker(f.DateStart);
        const dateEnd = getDateMyDatepicker(f.DateEnd);
        f.DateStart = setZeroHours(dateStart);
        f.DateEnd = setZeroHours(dateEnd);

        switch (this.mode) {
            case 'R':
                this.updateInvestigate(f);
                break;
        }

    }

    private pageLoad() {
        switch (this.mode) {
            case 'C':
                if (this.stateInvest) {
                    this.pageRefreshInvestigate(this.stateInvest);
                }
                break;

            case 'R':
                this.s_invest.InvestigategetByCon(this.investCode)
                    .takeUntil(this.destroy$)
                    .subscribe((x: fromModels.InvestigateModel) => {
                        if (!this.checkResponse(x)) return;
                        this.pageRefreshInvestigate(x[0]);
                    });
                break;
        }
    }

    private async pageRefreshInvestigate(x: fromModels.InvestigateModel) {
        x.DateStart = setDateMyDatepicker(x.DateStart);
        x.DateEnd = setDateMyDatepicker(x.DateEnd);

        let investDetail = x.InvestigateDetail.filter(x => x.InvestigateDetailID);
        if (!investDetail) return;
        await investDetail.map(id => {
            let staff: fromModels.InvestigateDetailStaff[] = id.InvestigateDetailStaff
                .filter(staff => staff.ContributorID == '2' || staff.ContributorID == '3')
                .map(staff => {
                    switch (parseInt(staff.ContributorID)) {
                        case 2:
                            staff.Investigator = `${staff.TitleName} ${staff.FirstName} ${staff.LastName}`;
                            break;
                        case 3:
                            staff.Commander = `${staff.TitleName} ${staff.FirstName} ${staff.LastName}`;
                            break;
                    }
                    return staff;
                });

            id.InvestigateDetailStaff = staff;
        })
        investDetail.sort((a, b) => { if (a.InvestigateSeq < b.InvestigateSeq) return -1; })
        this.setItemFormArray(investDetail, 'InvestigateDetail')
        this.investigateForm.patchValue(x);
        this.investigateNo0.nativeElement.value = x.InvestigateNo && x.InvestigateNo.split('/')[0];
        this.investigateNo1.nativeElement.value = x.InvestigateNo && x.InvestigateNo.split('/')[1];
    }

    onChangeInvestigateNo() {
        let i0 = this.investigateNo0.nativeElement.value;
        let i1 = this.investigateNo1.nativeElement.value;
        this.investigateForm.patchValue({
            InvestigateNo: `${i0}/${i1}`
        })
    }

    checkResponse(res: any) {
        switch (res.IsSuccess) {
            case 'False':
            case false:
                return false;
            default:
                return true;
        }
    }

    checkIsSuccess(res: any) {
        switch (res.IsSuccess) {
            case 'True':
            case true:
                return true;
            default:
                return false;
        }
    }

    onSDateChange(event: IMyDateModel) {
        this._dateStartFrom = event
        this._dateStartTo = this._dateStartTo || this.investigateForm.value.DateEnd
        this.checkDate();
    }

    onEDateChange(event: IMyDateModel) {
        this._dateStartFrom = this._dateStartFrom || this.investigateForm.value.DateStart
        this._dateStartTo = event
        this.checkDate()
    }

    private checkDate() {
        if (this._dateStartFrom && this._dateStartTo) {
            let sdate = getDateMyDatepicker(this._dateStartFrom);
            let edate = getDateMyDatepicker(this._dateStartTo)

            if (!compareDate(sdate, edate)) {
                swal('', Message.checkDate, 'warning')
                setTimeout(() => {
                    this.investigateForm.patchValue({
                        DateEnd: setDateMyDatepicker(this._dateStartFrom)
                    })
                }, 0);
            }
        }
    }

    onCreateInvestDetail() {
        let invest = this.investigateForm.value as fromModels.InvestigateModel;
        const dateStart = getDateMyDatepicker(invest.DateStart);
        const dateEnd = getDateMyDatepicker(invest.DateEnd);
        invest.DateStart = (dateStart);
        invest.DateEnd = (dateEnd);

        if (!this.stateInvest) {
            this.stateInvest = {
                InvestigateCode: invest.InvestigateCode,
                InvestigateNo: invest.InvestigateNo,
                DateStart: invest.DateStart,
                DateEnd: invest.DateEnd,
                Subject: invest.Subject,
                IsActive: invest.IsActive,
                InvestigateDetail: []
            }
            this.store.dispatch(new fromStore.CreateInvestigate(this.stateInvest))
        } else {
            this.stateInvest.InvestigateCode = invest.InvestigateCode;
            this.stateInvest.InvestigateNo = invest.InvestigateNo;
            this.stateInvest.DateStart = invest.DateStart;
            this.stateInvest.DateEnd = invest.DateEnd;
            this.stateInvest.Subject = invest.Subject;
            this.store.dispatch(new fromStore.UpdateInvestigate(this.stateInvest));
        }

        let InvestigateSeq = 1;
        if (this.InvestigateDetail.length) {
            InvestigateSeq += parseInt(this.InvestigateDetail.value.sort((a, b) => b.InvestigateSeq - a.InvestigateSeq)[0].InvestigateSeq);
        }

        this.router.navigate(
            [`investigation/detail-manage`, 'C'],
            {
                queryParams: {
                    investMode: this.mode,
                    investCode: this.investCode,
                    InvestigateSeq: InvestigateSeq
                }
            });
    }

    onViewInvesDetail(invesDetailId: string, investigateSeq: string) {

        this.router.navigate(
            [`investigation/detail-manage`, 'R'],
            {
                queryParams: {
                    investMode: this.mode,
                    investCode: this.investCode,
                    invesDetailId: invesDetailId,
                    InvestigateSeq: investigateSeq
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.investigateForm.reset();
        this.clearFormArray(this.InvestigateDetail);

        this.navService.setOnEdit(false);
        this.navService.setOnSave(false);
        this.navService.setOnDelete(false);
        this.navService.setOnCancel(false);
        this.navService.setOnSearch(false);
        this.navService.setOnPrint(false);
        this.navService.setOnNextPage(false);
        this.navService.setOnPrevPage(false);

        this.navService.setEditField(false);
        this.navService.setSearchBar(false);
        this.navService.setPrintButton(false);
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setNewButton(false);
        this.navService.setNextPageButton(false);
        this.navService.setPrevPageButton(false);

    }

    catchError(error: any) {
        console.log(error);
        swal('', Message.saveFail, 'error');
    }

    clearFormArray = (formArray: FormArray) => {
        while (formArray.length !== 0) {
            formArray.removeAt(0)
        }
    }

    private setItemFormArray(array: any[], formControl: string) {
        if (array !== undefined && array.length) {
            const itemFGs = array.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.investigateForm.setControl(formControl, itemFormArray);
        }
    }

    private async onDelete() {
        swal({
            title: '',
            text: Message.confirmAction,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm!'
        }).then((result) => {
            if (result.value) {
                this.s_invest.InvestigateupdDelete(this.investCode)
                    .takeUntil(this.destroy$)
                    .subscribe(x => {
                        if (this.checkIsSuccess(x)) {
                            swal('', Message.delComplete, 'success');
                            this.router.navigate(['/investigation/list']);
                        } else {
                            swal('', Message.delFail, 'error');
                        }
                    })
            }
        })

    }

    private updateInvestigate(form: any) {
        const invest = {
            InvestigateCode: form.InvestigateCode,
            InvestigateNo: form.InvestigateNo,
            DateStart: form.DateStart,
            DateEnd: form.DateEnd,
            Subject: form.Subject,
            IsActive: form.IsActive
        }

        console.log("InvestigateupdAll : ", JSON.stringify(invest));

        this.s_invest.InvestigateupdAll(invest)
            .takeUntil(this.destroy$)
            .subscribe(x => {
                if (!this.checkIsSuccess(x)) {
                    swal('', Message.saveFail, 'error');
                    return;
                }
                swal('', Message.saveComplete, 'success');

                this.enableBtnModeR();
            }, (error) => this.catchError(error));
    }

}
