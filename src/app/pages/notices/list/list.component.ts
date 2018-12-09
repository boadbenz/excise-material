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

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

    @ViewChild('alertSwal') private alertSwal: SwalComponent;

    months:any[];
    monthsTh:any[];

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
        showClearDateBtn: false,
        height: '30px'
    };

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
        this.advSearch = this.navservice.showAdvSearch;
    }

    async ngOnInit() {
        this.sidebarService.setVersion('0.0.2.27');
        this.paginage.TotalItems = 0;

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

        this.months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
        this.monthsTh = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];

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
        await this.noticeService.getByKeyword(Textsearch).then(list => this.onSearchComplete(list));
        this.preLoaderService.setShowPreloader(false);
    }

    async onAdvSearch(form: any) {
        if (this.dateStartFrom && this.dateStartTo) {

            let sdate = getDateMyDatepicker(this.dateStartFrom);
            let edate = getDateMyDatepicker(this.dateStartTo);

            if (!compareDate(sdate, edate)) {
                this.showSwal(Message.checkDate, "warning");
                return false;
            }

            form.value.DateStartFrom = this.dateStartFrom.date.day+"-"+this.months[this.dateStartFrom.date.month-1]+"-"+this.dateStartFrom.date.year;//setZeroHours(sdate);
            form.value.DateStartTo = this.dateStartTo.date.day+"-"+this.months[this.dateStartTo.date.month-1]+"-"+this.dateStartTo.date.year;//setZeroHours(edate);

            form.value.DateStartFrom = form.value.DateStartFrom?form.value.DateStartFrom:"";
            form.value.DateStartTo = form.value.DateStartTo?form.value.DateStartTo:"";
        }else{
            form.value.DateStartFrom = "";
            form.value.DateStartTo = "";
        }

        this.preLoaderService.setShowPreloader(true);

        await this.noticeService.getByConAdv(form.value).then(list => this.onSearchComplete(list));

        this.preLoaderService.setShowPreloader(false);
    }

    onSearchComplete(list) {
        if (!list || list.length==0) {
            this.showSwal(Message.noRecord, "warning");
            return false;
        }

        let datas = [];
        let cnt = 1;
        for(let l of list){
            l.index = "";
            let insert = true;
            for(let i of datas){
                if(i.NoticeCode==l.NoticeCode){
                    l.NoticeDate = "";
                    l.StaffTitleName = "";
                    l.StaffFirstName = "";
                    l.StaffLastName = "";
                    l.StaffOfficeName = "";
                    insert = false;

                    // i.childs.push(l);
                    i.SuspectFullname += "<br/>"+l.SuspectTitleName+""+l.SuspectFirstName+" "+l.SuspectLastName;
                    break;
                }
            }

            if(insert){
                // l.childs = [];
                l.SuspectFullname = l.SuspectTitleName+""+l.SuspectFirstName+" "+l.SuspectLastName;
                datas.push(l);
                l.index = cnt++;
            }
        }

        this.notice = datas;
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
                alert(Message.checkDate)
                setTimeout(() => {
                    this.dateStartTo = { date: _sdate.date };
                }, 0);
            }
        }
    }

    view(noticeCode: string) {
        this._router.navigate([`/notice/manage/R/${noticeCode}`]);
    }

    formatDate(date:string){
        if(date){
            let tmps = date.split("-");
            for(let i in this.months){
                let m = this.months[i];
                if(tmps[1]==m){
                    date = tmps[0]+" "+this.monthsTh[i]+" "+(parseInt(tmps[2])+543);
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

    private showSwal(msg:string, iconType:any){
        this.alertSwal.text = msg;
        this.alertSwal.type = iconType;
        this.alertSwal.show();
    }

}
