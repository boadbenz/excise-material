import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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
import { PreloaderService } from 'app/shared/preloader/preloader.component';
import { MyDatePickerOptions, getDateMyDatepicker, compareDate, setDateMyDatepicker, toLocalShort } from 'app/config/dateFormat';
import { IMyDateModel } from 'mydatepicker-th';
import { Subject } from 'rxjs/Subject';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';



@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit, OnDestroy {

    card1 = true;
    card2 = true;

    private destroy$: Subject<boolean> = new Subject<boolean>();

    private obInvest: Observable<fromModels.InvestigateModel>;
    stateInvest: fromModels.InvestigateModel;

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
    investigateDetail = new Array<fromModels.InvestigateDetail>();

    @ViewChild('printDocModal') printDocModel: ElementRef;

    // get InvestigateDetail(): FormArray {
    //     return this.investigateForm.get('InvestigateDetail') as FormArray;
    // }

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private activeRoute: ActivatedRoute,
        private navService: NavigationService,
        private ngbModel: NgbModal,
        private sidebarService: SidebarService,
        private preloader: PreloaderService,
        private s_invest: fromService.InvestgateService,
        private store: Store<fromStore.AppState>
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setNextPageButton(false);

        this.obInvest = store.select(s => s.invest);
        this.obInvest
            .takeUntil(this.destroy$)
            .subscribe((x: fromModels.InvestigateModel) => this.stateInvest = x)
    }

    ngOnInit() {
        this.preloader.setShowPreloader(true);
        this.sidebarService.setVersion('0.0.0.2');

        this.active_Route();
        this.navigate_Service();
        this.createForm();

        this.preloader.setShowPreloader(false);
    }

    private createForm() {
        this.investigateForm = this.fb.group({
            InvestigateCode: new FormControl(this.investCode, Validators.required),
            InvestigateNo: new FormControl(null),
            DateStart: new FormControl(null),
            DateEnd: new FormControl(null),
            Subject: new FormControl(null),
            IsActive: new FormControl(1)
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
        // set true
        this.navService.setPrintButton(true);
        this.navService.setEditButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditField(true);
        this.navService.setPrevPageButton(true);
        this.navService.setNextPageButton(true);
    }

    private navigate_Service() {
        this.navService.showFieldEdit.takeUntil(this.destroy$).subscribe(p => {
            this.showEditField = p;
        });

        this.navService.onCancel.takeUntil(this.destroy$).subscribe(async status => {
            if (status) {
                await this.navService.setOnCancel(false);
                // this.router.navigate(['/investigation/list']);
            }
        })

        this.navService.onSave.takeUntil(this.destroy$).subscribe(async status => {
            if (status) {
                await this.navService.setOnSave(false);

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

    private pageLoad() {
        if (this.stateInvest) {
            this.pageRefreshInvestigate(this.stateInvest);
        } else {
            if (this.investCode == 'NEW') return;
            this.s_invest.InvestigategetByCon(this.investCode)
                .then((x: fromModels.InvestigateModel) => {
                    if (!this.checkResponse(x)) return;
                    this.pageRefreshInvestigate(x)
                });
        }
    }

    private pageRefreshInvestigate(x: fromModels.InvestigateModel) {
        x.DateStart = setDateMyDatepicker(x.DateStart);
        x.DateEnd = setDateMyDatepicker(x.DateEnd);

        let investDetail = x.InvestigateDetail;
        investDetail.map(id => {
            id.InvestigateDateStart = toLocalShort(id.InvestigateDateStart);
            id.InvestigateDateEnd = toLocalShort(id.InvestigateDateEnd);
            let staff = id.InvestigateDetailStaff
                .filter(staff => staff.ContributorID == '2' || staff.ContributorID == '3')
                .map(staff => {
                    switch (staff.ContributorID) {
                        case '2':
                            staff.Investigator = `${staff.TitleName} ${staff.FirstName} ${staff.LastName}`;
                            break;
                        case '3':
                            staff.Commander = `${staff.TitleName} ${staff.FirstName} ${staff.LastName}`;
                            break;
                    }
                    return staff;
                });
            id.InvestigateDetailStaff = staff;
        })
        this.investigateDetail = investDetail;
        this.investigateForm.patchValue(x);
    }

    private onCreate() {

    }

    private onReviced() {

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

            let sdate = this.isObject(this._dateStartFrom)
                ? getDateMyDatepicker(this._dateStartFrom)
                : new Date(this._dateStartFrom);
            let edate = this.isObject(this._dateStartTo)
                ? getDateMyDatepicker(this._dateStartTo)
                : new Date(this._dateStartTo);

            if (!compareDate(sdate, edate)) {
                alert(Message.checkDate)
                setTimeout(() => {
                    this.investigateForm.patchValue({
                        DateEnd: this.isObject(this._dateStartFrom)
                            ? { date: this._dateStartFrom.date }
                            : setDateMyDatepicker(this._dateStartFrom)
                    })
                }, 0);
            }
        }
    }

    private onComplete() {

        alert(Message.saveComplete);
    }

    private async onDelete() {

    }

    onCreateInvestDetail() {
        let invest = this.investigateForm.value as fromModels.InvestigateModel;
        invest.DateStart = this.isObject(invest.DateStart) ? getDateMyDatepicker(invest.DateStart) : invest.DateStart;
        invest.DateEnd = this.isObject(invest.DateEnd) ? getDateMyDatepicker(invest.DateEnd) : invest.DateEnd;
        this.store.dispatch(new fromStore.CreateInvestigate(invest));

        this.router.navigate(
            [`investigation/detail-manage`, 'C'],
            {
                queryParams: {
                    investMode: this.mode,
                    investCode: this.investCode
                }
            });
    }

    onViewInvesDetail(invesDetailId: string) {

        this.router.navigate(
            [`investigation/detail-manage`, 'R'],
            {
                queryParams: {
                    investMode: this.mode,
                    investCode: this.investCode,
                    invesDetailId: invesDetailId
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    isObject = (obj) => obj === Object(obj);

    private setItemFormArray(array: any[], formControl: string) {
        if (array !== undefined && array.length) {
            const itemFGs = array.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.investigateForm.setControl(formControl, itemFormArray);
        }
    }

}
