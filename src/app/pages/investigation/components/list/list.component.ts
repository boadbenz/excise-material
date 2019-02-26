import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Message } from 'app/config/message';
import { pagination } from 'app/config/pagination';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import { PreloaderService } from 'app/shared/preloader/preloader.component';
import * as fromServices from '../../services';
import * as fromModels from '../../models';
import { IMyOptions, IMyDateModel } from 'mydatepicker-th';
import { compareDate, getDateMyDatepicker, toLocalShort, convertDateForSave, MyDatePickerOptions, setZeroHours } from 'app/config/dateFormat';
import { Subject } from 'rxjs/Subject';
import swal from 'sweetalert2';
import { InvestgateService } from '../../services/investgate.service'
import { error } from 'util';
import { async } from '@angular/core/testing';


@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

    staffCode = localStorage.getItem('staffCode');

    private destroy$: Subject<boolean> = new Subject<boolean>();

    private subSetNextPage: any;

    permisCheck: any
    perBeforReturn: any
    _dateStartFrom: any;
    _dateStartTo: any;
    DateStartTo: any;

    advSearch: any;
    investigate = new Array<fromModels.InvestigateList>();
    invesList = new Array<fromModels.InvestigateList>();
    paginage = pagination;
    myDatePickerOptions = MyDatePickerOptions;

    @ViewChild('invesTable') invesTable: ElementRef;

    constructor(
        private navService: NavigationService,
        private s_invest: fromServices.InvestgateService,
        private router: Router,
        private sidebarService: SidebarService,
        private preLoader: PreloaderService,
        private investgateService: InvestgateService
    ) {
        // set false
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setPrintButton(false);
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setNextPageButton(false);
        // set true
        this.navService.setSearchBar(true);
        this.navService.setNewButton(true);
        this.advSearch = this.navService.showAdvSearch;
    }

    ngOnInit() {
        // var permissionCheck: any = [{
        //     IsCreate: 0,
        //     IsDelete: 0,
        //     IsRead: 0,
        //     IsUpdate: 0
        // }];
        // var permissionCheck: any = null
        // // console.log("onList")
        // var userAccountID = localStorage.getItem('UserAccountID')
        // var programCode = 'ILG60-01-00'
        // const params = {
        //     UserAccountID: userAccountID,
        //     ProgramCode: programCode
        // };
        // // console.log('params : ', params)
        // this.investgateService.PermissionCheck(params).then(pRes => {
        //     console.error('ngOnInit PermissionCheck !!: ', pRes);
        //     permissionCheck = pRes
        // }, (error) => { console.error('error : ', error); });
        //-------------------------------------------------------------------

        this.advSearch.next(true)
        this.sidebarService.setVersion(this.s_invest.version);

        this.navService.searchByKeyword.subscribe(async Textsearch => {
            if (Textsearch) {
                await this.navService.setOnSearch('');
                this.onSearch(Textsearch);
            }
        })

        this.subSetNextPage = this.navService.onNextPage.subscribe(async status => {

            console.log("status : ", status)
            if (this.subSetNextPage) {
                var pmCheck = this.permissionCheck('IsCreate')

                console.log('pmCheck !: ', await pmCheck)
                if (await pmCheck != 1) {
                    swal('', 'ผู้ใช้งานไม่มีสิทธิ์ กรุณาติดต่อผู้ดูแลระบบ', 'warning');
                    console.log('IsCreate != 1 ', '  IsCreate !!: ', pmCheck)
                } else if (await pmCheck == 1) {
                    this.router.navigate([`/suppression/investigation/manage/C/NEW`]);
                    console.log('IsCreate else ', '  IsCreate !!: ', pmCheck)
                }
            }
        })
    }

    async permissionCheck(subscribe) {
        var userAccountID = localStorage.getItem('UserAccountID')
        var programCode = 'ILG60-01-00'
        const params = {
            UserAccountID: userAccountID,
            ProgramCode: programCode
        };
        await this.investgateService.PermissionCheck(params).then(pRes => {
            this.permisCheck = pRes

            if (subscribe == 'IsCreate') {
                this.perBeforReturn = 0;
                this.perBeforReturn = this.permisCheck.IsCreate;
                // return res;
            } else if (subscribe == 'IsDelete') {
                this.perBeforReturn = 0;
                this.perBeforReturn = this.permisCheck.IsDelete;
                // return res;
            } else if (subscribe == 'IsRead') {
                this.perBeforReturn = 0;
                this.perBeforReturn = this.permisCheck.IsRead;
                // return res;
            } else if (subscribe == 'IsUpdate') {
                this.perBeforReturn = 0;
                this.perBeforReturn = this.permisCheck.IsUpdate;
                // return res;
            }
        }, (error) => { console.error('error : ', error); });
        return this.perBeforReturn
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.paginage.TotalItems = 0;
    }

    onSearch(form: any) {

        this.s_invest.InvestigateListgetByKeyword(form.Textsearch, this.staffCode)
            .takeUntil(this.destroy$)
            .subscribe(x => this.onSearchComplete(x))

    }

    onAdvSearch(form: any) {
        const sdate = getDateMyDatepicker(form.DateStart);
        const edate = getDateMyDatepicker(form.DateEnd);

        if (sdate && edate) {
            if (!compareDate(sdate, edate)) {
                swal('', Message.checkDate, 'warning');
                return
            }
        }

        form.DateStart = setZeroHours(sdate) || '';
        form.DateEnd = setZeroHours(edate) || '';

        console.log(JSON.stringify(form));

        this.s_invest.InvestigateListgetByConAdv(form)
            .takeUntil(this.destroy$)
            .subscribe(list => {
                this.onSearchComplete(list)
            }, (err: HttpErrorResponse) => {
                swal('', Message.noRecord, 'warning');
            });
    }

    onSearchComplete(list: fromModels.InvestigateList[]) {
        this.investigate = [];

        if (!list.length) {
            swal('', Message.noRecord, 'warning');
            return false;
        }

        let rows = list.map((p, i) => {
            p.RowsId = i + 1;
            p.DateStart = toLocalShort(p.DateStart);
            p.DateEnd = toLocalShort(p.DateEnd);
            return p;
        })

        this.investigate = rows;
        this.invesList = this.investigate.slice(0, 5);
        // set total record
        this.paginage.TotalItems = this.investigate.length;
    }

    onSDateChange(event: IMyDateModel) {
        this._dateStartFrom = event
        this.checkDate();
    }

    onEDateChange(event: IMyDateModel) {
        this._dateStartTo = event
        this.checkDate()
    }

    checkDate() {
        if (this._dateStartFrom && this._dateStartTo) {

            const sdate = getDateMyDatepicker(this._dateStartFrom);
            const edate = getDateMyDatepicker(this._dateStartTo);

            if (!compareDate(sdate, edate)) {
                swal('', Message.checkDate, 'warning')
                setTimeout(() => {
                    this.DateStartTo = { date: this._dateStartFrom.date };
                }, 0);
            }
        }
    }

    clickView(invesCode: string) {
        this.router.navigate([`/suppression/investigation/manage/R/${invesCode}`]);
    }

    async pageChanges(event) {
        this.invesList = await this.investigate.slice(event.startIndex - 1, event.endIndex);
    }
}
