import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { IMyDateModel } from 'mydatepicker-th';
import { ArrestNotice } from '../../models/arrest-notice';
import { MyDatePickerOptions, getDateMyDatepicker, compareDate, convertDateForSave, toLocalShort } from 'app/config/dateFormat';
import { pagination } from 'app/config/pagination';
import { Message } from 'app/config/message';
import * as formService from '../../services';
import { Subject } from 'rxjs/Subject';
import swal from 'sweetalert2'

@Component({
    selector: 'app-modal-notice',
    templateUrl: './modal-notice.component.html'
})
export class ModalNoticeComponent implements OnInit, OnDestroy {

    isCheckAll = false;
    advSearch = false;
    notice = new Array<ArrestNotice>();
    dateStartFrom: any;
    dateStartTo: any;

    myDatePickerOptions = MyDatePickerOptions;

    paginage = pagination;

    noticeFG: FormGroup;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    get ArrestNotice(): FormArray {
        return this.noticeFG.get('ArrestNotice') as FormArray;
    }

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();
    @Output() outputNotice = new EventEmitter<ArrestNotice[]>();

    @ViewChild('noticeTable') noticeTable: ElementRef;
    @ViewChild('advForm') advForm: FormGroup;

    constructor(
        // private arrestService: ArrestsService,
        private _router: Router,
        // private preLoaderService: PreloaderService,
        private fb: FormBuilder,
        private s_arrestNotice: formService.ArrestNoticeService
    ) { }

    ngOnInit() {
        this.paginage.TotalItems = 0;
        this.noticeFG = this.fb.group({
            ArrestNotice: this.fb.array([])
        })
    }    

    ngOnDestroy(): void {
        this.paginage.TotalItems = 0;
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    async onSearch(Textsearch: any) {
        this.s_arrestNotice.ArrestNoticegetByKeyword(Textsearch)
            .takeUntil(this.destroy$)
            .subscribe(x => this.onSearchComplete(x))
    }

    async onAdvSearch(form: any) {
        const sdate = getDateMyDatepicker(form.dateStartFrom);
        const edate = getDateMyDatepicker(form.dateStartTo);

        if (sdate && edate) {
            if (!compareDate(sdate, edate)) {
                swal('', Message.checkDate, 'warning');
                return false;
            }
        }

        form.DateStartFrom = convertDateForSave(sdate) || '';
        form.DateStartTo = convertDateForSave(edate) || '';

        this.s_arrestNotice.ArrestNoticegetByConAdv(form)
            .takeUntil(this.destroy$)
            .subscribe(x => this.onSearchComplete(x))
    }

    async onSearchComplete(list: ArrestNotice[]) {

        if (!list.length) {
            swal('', Message.noRecord, 'warning');
            return;
        }

        this.notice = new Array<ArrestNotice>();
        await list.filter(item => item.IsActive == 1).map((item, i) => {
            item.RowId = i + 1;
            item.IsChecked = false;
            item.NoticeDateString = toLocalShort(item.NoticeDate);
            item.NoticeDate = item.NoticeDate;
            const staff = item.ArrestNoticeStaff
                .map(s => {
                    s.FullName = `${s.TitleName} ${s.FirstName} ${s.LastName}`;
                    return s;
                });
            item.ArrestNoticeStaff = staff;
            const suspect = item.ArrestNoticeSuspect
                .map(s => {
                    s.FullName = `${s.SuspectTitleName} ${s.SuspectFirstName} ${s.SuspectLastName}`;
                    return s;
                });
            item.ArrestNoticeSuspect = suspect;
        })

        this.notice = list;
        // set total record
        this.paginage.TotalItems = list.length;
    }

    onSDateChange(event: IMyDateModel) {
        this.dateStartFrom = event;
        this.checkDate();
    }

    onEDateChange(event: IMyDateModel) {
        this.dateStartTo = event;
        this.checkDate();
    }

    checkDate() {
        if (this.dateStartFrom && this.dateStartTo) {

            const _sdate = this.dateStartFrom;
            const sdate = getDateMyDatepicker(this.dateStartFrom);
            const edate = getDateMyDatepicker(this.dateStartTo);

            if (!compareDate(sdate, edate)) {
                swal('', Message.checkDate, 'warning')
                setTimeout(() => {
                    this.dateStartTo = { date: _sdate.date };
                }, 0);
            }
        }
    }

    // setIsChecked(i: number) {
    //     this.ArrestNotice.value.map((item, index) => {
    //         item.IsChecked = i == index ? true : false;
    //     })
    // }

    view(code: string) {
        this.dismiss('Cross click');
        this._router.navigate([`/notice/manage/R/${code}`]);
    }

    checkAll() {
        this.isCheckAll = !this.isCheckAll;
    }

    toggle() {
        this.advSearch = !this.advSearch;
        if (this.advSearch == false && this.advForm != undefined) {
            this.advForm.reset();
        }
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    async close(e: any) {
        const n: ArrestNotice[] = this.ArrestNotice.value.filter(item => item.IsChecked);
        if (n.length) {
            this.outputNotice.emit(n);
            this.c.emit(e);
        } else {
            swal('', 'กรุณาเลือกรายการใบแจ้งความนำจับ', 'warning')
        }
    }

    async pageChanges(event) {
        const list = await this.notice.slice(event.startIndex - 1, event.endIndex);
        let _noticeList = [];
        await list.map(item => {
            let FG = this.fb.group({
                IsChecked: item.IsChecked,
                RowId: item.RowId,
                NoticeCode: item.NoticeCode,
                NoticeDateString: item.NoticeDateString,
                NoticeDate: item.NoticeDate,
                ArrestNoticeStaff: this.fb.array(item.ArrestNoticeStaff),
                ArrestNoticeSuspect: this.fb.array(item.ArrestNoticeSuspect)
            })
            _noticeList.push(FG)
        })
        const itemFormArray = this.fb.array(_noticeList);
        this.noticeFG.setControl('ArrestNotice', itemFormArray);
    }


}
