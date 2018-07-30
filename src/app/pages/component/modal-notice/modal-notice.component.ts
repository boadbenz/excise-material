import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { pagination } from '../../../config/pagination';
import { Router } from '@angular/router';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { Message } from '../../../config/message';
import { Notice } from '../../notices/notice';
import { toLocalShort } from '../../../config/dateFormat';
import { ArrestsService } from '../../arrests/arrests.service';
import { FormGroup, FormArray, FormBuilder } from '../../../../../node_modules/@angular/forms';
import { NoticeService } from '../../notices/notice.service';

@Component({
    selector: 'app-modal-notice',
    templateUrl: './modal-notice.component.html'
})
export class ModalNoticeComponent implements OnInit {

    isOpen = false;
    isCheckAll = false;
    advSearch = false;
    isRequired = false;
    isNoRecord = false;
    notice = new Array<Notice>();
    noticeList = new Array<Notice>();
    msgNorecord = Message.noRecord;

    paginage = pagination;

    noticeFG: FormGroup;

    get NoticeList(): FormArray {
        return this.noticeFG.get('NoticeList') as FormArray;
    }

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();
    @Output() outputNotice = new EventEmitter<Notice>();

    @ViewChild('noticeTable') noticeTable: ElementRef

    constructor(
        private arrestService: ArrestsService,
        private _router: Router,
        private preLoaderService: PreloaderService,
        private fb: FormBuilder,
        private noticeService: NoticeService
    ) { }

    ngOnInit() {
        this.paginage.TotalItems = 0;
        this.noticeFG = this.fb.group({
            NoticeList: this.fb.array([])
        })
    }

    async onSearch(Textsearch: any) {
        this.preLoaderService.setShowPreloader(true);
        await this.arrestService.noticegetByKeyword(Textsearch).then(list => this.onSearchComplete(list));
        this.preLoaderService.setShowPreloader(false);
    }

    async onAdvSearch(form: any) {

        if (!form.valid) {
            this.isRequired = true;
            return false;
        }

        const sDateCompare = new Date(form.value.DateStartFrom);
        const eDateCompare = new Date(form.value.DateStartTo);

        if (sDateCompare.valueOf() > eDateCompare.valueOf()) {
            alert(Message.checkDate);
        } else {
            this.preLoaderService.setShowPreloader(true);

            form.value.DateStartFrom = sDateCompare.toISOString();
            form.value.DateStartTo = eDateCompare.toISOString();
            await this.arrestService.noticegetByConAdv(form.value).then(list => this.onSearchComplete(list));

            this.preLoaderService.setShowPreloader(false);
        }
    }

    async onSearchComplete(list: Notice[]) {
        this.notice = [];
        await list.map((item, i) => {
            item.RowId = i + 1;
            item.IsChecked = false;
            item.NoticeDate = toLocalShort(item.NoticeDate);
            item.NoticeStaff.map(s => {
                s.StaffFullName = `${s.TitleName} ${s.FirstName} ${s.LastName}`;
            });
            item.NoticeSuspect.map(s => {
                s.SuspectFullName = `${s.SuspectTitleName} ${s.SuspectFirstName} ${s.SuspectLastName}`;
            });
        })

        this.notice = list;
        // set total record
        this.paginage.TotalItems = list.length;
    }

    setIsChecked(i: number) {
        this.NoticeList.value.map((item, index) => {
            item.IsChecked = i == index ? true : false;
        })
    }

    view(code: string) {
        this.dismiss('Cross click');
        this._router.navigate([`/notice/manage/R/${code}`]);
    }

    checkAll() {
        this.isCheckAll = !this.isCheckAll;
    }

    toggle() {
        this.advSearch = !this.advSearch;
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    async close(e: any) {
        this.preLoaderService.setShowPreloader(true);

        const code = await this.NoticeList.value.find(item => item.IsChecked).NoticeCode;
        const _notice = await this.noticeService.getByCon(code).then(res => {return res});
  
        this.outputNotice.emit(_notice);
        this.c.emit(e);

        this.preLoaderService.setShowPreloader(false);
    }

    async pageChanges(event) {
        const list = await this.notice.slice(event.startIndex - 1, event.endIndex);
        let _noticeList = [];
        await list.map(item => {
            let FG = this.fb.group({
                IsChecked: item.IsChecked,
                RowId: item.RowId,
                NoticeCode: item.NoticeCode,
                NoticeDate: item.NoticeDate,
                NoticeStaff: this.fb.array(item.NoticeStaff),
                NoticeSuspect: this.fb.array(item.NoticeSuspect)
            })
            _noticeList.push(FG)
        })
        const itemFormArray = this.fb.array(_noticeList);
        this.noticeFG.setControl('NoticeList', itemFormArray);
    }


}
