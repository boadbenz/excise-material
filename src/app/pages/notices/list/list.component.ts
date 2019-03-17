import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { NoticeService } from '../notice.service';
import { Message } from '../../../config/message';
import { Notice } from '../notice';
import { pagination } from '../../../config/pagination';
import { toLocalShort, compareDate, toLocalNumeric, setZeroHours, getDateMyDatepicker, setDateMyDatepicker } from '../../../config/dateFormat';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { SidebarService } from '../../../shared/sidebar/sidebar.component';
import { IMyDateModel, IMyOptions } from 'mydatepicker-th';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

    @ViewChild('alertSwal') private alertSwal: SwalComponent;

    months: any[];
    monthsTh: any[];

    advSearch: any;
    isRequired = false;
    setDefaultDate: string;
    paginage = pagination;

    notice = [];
    noticeList = [];

    dateStartFrom: any;
    dateStartTo: any;

    myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd mmm yyyy',
        showClearDateBtn: true,
        height: '30px'
    };

    dutyGroupNameOptions = [
        { value: '0000', label: 'เทส' },
        { value: '8001', label: 'ยาสูบ' },
        { value: '9001', label: 'ไพ่' },
        { value: '0201', label: 'เครื่องดื่ม' },
        { value: '0301', label: 'เครื่องปรับอากาศ' },
        { value: '0302', label: 'โคมไฟฟ้าและโคมระย้า' },
        { value: '0601', label: 'เรือ' },
        { value: '0701', label: 'ผลิตภัณฑ์เครื่องหอมและเครื่องสำอาง' },
        { value: '0801', label: 'พรมและสิ่งทอปูพื้น' },
        { value: '0802', label: 'รถจักรยานยนต์' },
        { value: '0803', label: 'หินอ่อนและหินแกรนิต' },
        { value: '0804', label: 'แบตเตอรี่' },
        { value: '0901', label: 'ไนท์คลับและดิสโกเธค' },
        { value: '0902', label: 'สถานอาบน้ำหรืออบตัวและนวด' },
        { value: '1001', label: 'สนามแข่งม้า' },
        { value: '1002', label: 'สลากกินแบ่ง' },
        { value: '1101', label: 'สนามกอล์ฟ' },
        { value: '1201', label: 'โทรคมนาคม' },
        { value: '0501', label: 'รถยนต์' },
        { value: '7001', label: 'เบียร์' },
        { value: '7002', label: 'สุรา' },
        { value: '0101', label: 'น้ำมันและผลิตภัณฑ์น้ำมัน' },
        { value: '0202', label: 'เครื่องขายเครื่องดื่ม' },
        { value: '0401', label: 'แก้วและเครื่องแก้ว' },
        { value: '0805', label: 'สารทำลายชั้นบรรยากาศโอโซน' }
    ];
    dutyGroupCode = '0000';

    private subOnsearchByKeyword: any;
    private subSetNextPage: any;

    constructor(
        private _router: Router,
        private navservice: NavigationService,
        private noticeService: NoticeService,
        private preLoaderService: PreloaderService,
        private sidebarService: SidebarService
    ) {
        // set false
        this.navservice.setEditButton(false);
        this.navservice.setDeleteButton(false);
        this.navservice.setPrintButton(false);
        this.navservice.setSaveButton(false);
        this.navservice.setCancelButton(false);
        this.navservice.setNextPageButton(false);
        // set true
        this.navservice.setSearchBar(true);
        this.navservice.setNewButton(true);

        this.navservice.showAdvSearch = new BehaviorSubject<Boolean>(true);
        this.advSearch = this.navservice.showAdvSearch;
    }

    async ngOnInit() {
        this.sidebarService.setVersion('0.0.2.48');
        localStorage.setItem('programcode', 'ILG60-02-00');
        this.paginage.TotalItems = 0;

        this.navservice.setCancelButton(false);
        sessionStorage.removeItem("notice_form_data");
        let currentdate = new Date();
        this.myDatePickerOptions.disableSince = { year: currentdate.getFullYear(), month: currentdate.getMonth() + 1, day: currentdate.getDate() + 1 };

        // this.preLoaderService.setShowPreloader(true);
        // await this.noticeService.getByKeywordOnInt().then(list => this.onSearchComplete(list));

        this.subOnsearchByKeyword = this.navservice.searchByKeyword.subscribe(async Textsearch => {
            if (Textsearch) {
                await this.navservice.setOnSearch('');
                this.onSearch(Textsearch);
            }
        });

        this.subSetNextPage = this.navservice.onNextPage.subscribe(async status => {
            if (status) {
                await this.navservice.setOnNextPage(false);
                this._router.navigateByUrl('/notice/manage/C/NEW?from=new');
            }
        });

        this.months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        this.monthsTh = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

        // this.preLoaderService.setShowPreloader(false);
    }

    ngOnDestroy(): void {

        if (this.subOnsearchByKeyword)
            this.subOnsearchByKeyword.unsubscribe();

        if (this.subSetNextPage)
            this.subSetNextPage.unsubscribe();
    }

    async onSearch(Textsearch: any) {
        this.preLoaderService.setShowPreloader(true);
        const officeCode = localStorage.getItem("officeCode");
        await this.noticeService.getByKeyword(Textsearch, officeCode).then(list => this.onSearchComplete(list));
        this.preLoaderService.setShowPreloader(false);
    }

    async onAdvSearch(form: any) {
        // if (this.dateStartFrom && this.dateStartTo) {

        let currDate = setDateMyDatepicker(new Date());

        if (this.dateStartFrom) {
            form.value.DateStartFrom = this.dateStartFrom.date.day + "-" + this.months[this.dateStartFrom.date.month - 1] + "-" + this.dateStartFrom.date.year;//setZeroHours(sdate);
        } else if (!this.dateStartFrom && this.dateStartTo) {
            this.dateStartFrom = this.dateStartTo;
            form.value.DateStartFrom = this.dateStartFrom.date.day + "-" + this.months[this.dateStartFrom.date.month - 1] + "-" + this.dateStartFrom.date.year;//setZeroHours(sdate);
        }

        if (this.dateStartTo) {
            form.value.DateStartTo = this.dateStartTo.date.day + "-" + this.months[this.dateStartTo.date.month - 1] + "-" + this.dateStartTo.date.year;//setZeroHours(edate);
        } else if (this.dateStartFrom && !this.dateStartTo) {
            this.dateStartTo = currDate;
            form.value.DateStartTo = this.dateStartTo.date.day + "-" + this.months[this.dateStartTo.date.month - 1] + "-" + this.dateStartTo.date.year;//setZeroHours(edate);
        }

        let sdate = getDateMyDatepicker(this.dateStartFrom);
        let edate = getDateMyDatepicker(this.dateStartTo);

        if (!compareDate(sdate, edate)) {
            this.showSwal(Message.checkDate, "warning");
            return false;
        }


        form.value.DateStartFrom = form.value.DateStartFrom ? form.value.DateStartFrom : "";
        form.value.DateStartTo = form.value.DateStartTo ? form.value.DateStartTo : "";
        // }else{
        //     form.value.DateStartFrom = "";
        //     form.value.DateStartTo = "";
        // }

        form.value.AccountOfficeCode = localStorage.getItem("officeCode");

        this.preLoaderService.setShowPreloader(true);

        await this.noticeService.getByConAdv(form.value).then(list => this.onSearchComplete(list));

        this.preLoaderService.setShowPreloader(false);
    }

    onKDutyGroup(){
        let index = this.dutyGroupNameOptions.map(m => m.value).indexOf(this.dutyGroupCode);
        index = (index + 1) % this.dutyGroupNameOptions.length;
        this.dutyGroupCode = this.dutyGroupNameOptions[index].value;
    }

    onSearchComplete(list) {
        let datas = [];
        if (!list || list.length == 0) {
            this.showSwal(Message.noRecord, "warning");
            // return false;
        } else {
            let cnt = 1;
            for (let l of list) {
                l.index = "";
                let insert = true;
                for (let i of datas) {
                    if (i.NoticeCode == l.NoticeCode) {
                        l.NoticeDate = "";
                        l.StaffTitleName = "";
                        l.StaffFirstName = "";
                        l.StaffLastName = "";
                        l.StaffOfficeName = "";
                        insert = false;

                        // i.childs.push(l);
                        i.SuspectFullname += "<br/>" + l.SuspectTitleName + "" + l.SuspectFirstName + " " + l.SuspectLastName;
                        break;
                    }
                }

                if (insert) {
                    // l.childs = [];
                    l.SuspectFullname = l.SuspectTitleName + "" + l.SuspectFirstName + " " + l.SuspectLastName;
                    datas.push(l);
                    l.index = cnt++;
                }
            }
        }

        this.notice = datas;
        this.noticeList = this.notice;
        // set total record
        this.paginage.TotalItems = this.notice.length;
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
                this.showSwal(Message.checkDate, "warning");
                setTimeout(() => {
                    this.dateStartTo = { date: _sdate.date };
                }, 0);
            }
        }
    }

    view(noticeCode: string) {
        this._router.navigate([`/notice/manage/R/${noticeCode}`]);
    }

    formatDate(date: string) {
        if (date) {
            let tmps = date.split("-");
            for (let i in this.months) {
                let m = this.months[i];
                if (tmps[1] == m) {
                    date = tmps[0] + " " + this.monthsTh[i] + " " + (parseInt(tmps[2]) + 543);
                    break;
                }
            }

            return date;
        }
        return "";
    }

    async pageChanges(event) {
        this.noticeList = await this.notice.slice(event.startIndex - 1, event.endIndex);
    }

    private showSwal(msg: string, iconType: any) {
        this.alertSwal.text = msg;
        this.alertSwal.type = iconType;
        this.alertSwal.show();
    }

}
