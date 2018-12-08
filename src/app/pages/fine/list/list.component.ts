import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { FineService } from '../fine.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Compare } from '../compare';
import { pagination } from '../../../config/pagination';
import { Message } from '../../../config/message';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { stringify } from 'querystring';
import { IMyDpOptions } from 'mydatepicker';
import { toLocalShort } from 'app/config/dateFormat';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import Swal from 'sweetalert2'
import swal from 'sweetalert2';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

    advSearch: any;
    Compare = new Array<Compare>();
    CompareList: any = [];
    paginage = pagination;
    private subOnSearch: any;

    @ViewChild('fineTable') fineTable: ElementRef;

    CompareDateFrom = '';
    CompareDateTo = '';
    private today = new Date();
    @ViewChild('advForm') advForm: NgForm;
    constructor(
        private _router: Router,
        private navService: NavigationService,
        private fineService: FineService,
        private preLoaderService: PreloaderService,
        private sidebarService: SidebarService
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
        this.navService.setNewButton(false);
        this.advSearch = this.navService.showAdvSearch;
    }
    public LawsuitDateFromOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd/mmm/yyyy',
        disableSince: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() + 1 },
    };
    public LawsuitDateToOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd/mmm/yyyy',
        disableSince: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() + 1 },
    };
    onDateChanged(event) {
        setTimeout(() => {
            try {
                if (this.advForm.value.LawsuitDateFrom.epoc > this.advForm.value.LawsuitDateTo.epoc) {
                    this.advForm.controls['LawsuitDateTo'].setValue({
                      date: this.advForm.value.LawsuitDateFrom.date,
                      epoc: this.advForm.value.LawsuitDateFrom.epoc,
                      formatted: this.advForm.value.LawsuitDateFrom.formatted,
                      jsdate: this.advForm.value.LawsuitDateFrom.jsdate,
                    });
                    console.log(this.advForm.controls['LawsuitDateTo'])
                    alert(Message.checkDate);
                    return;
                  }
                  else {
                    this.LawsuitDateFromOptions = {
                      dateFormat: 'dd/mmm/yyyy',
                      disableSince: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() + 1 }
                    }
                  }
            } catch (err) {
                console.log(err)
            }

        }, 100);
    }
    onDateFromChanged(event) {
        setTimeout(() => {
            try {
                if ( this.advForm.value.LawsuitDateFrom.epoc > this.advForm.value.LawsuitDateTo.epoc ) {
                    this.advForm.controls['LawsuitDateTo'].setValue({
                      date: this.advForm.value.LawsuitDateFrom.date,
                      epoc: this.advForm.value.LawsuitDateFrom.epoc,
                      formatted: this.advForm.value.LawsuitDateFrom.formatted,
                      jsdate: this.advForm.value.LawsuitDateFrom.jsdate,
                    });
                    alert(Message.checkDate);
                    return;
                  }
                  else if (!event) {
                    let checkDate = new Date(event.jsdate);
                    this.LawsuitDateFromOptions = {
                      dateFormat: 'dd/mmm/yyyy',
                      disableSince: { year: checkDate.getFullYear(), month: checkDate.getMonth() + 1, day: checkDate.getDate() + 1 }
                    }
                  }
            } catch (err) {
                console.log(err);
            }

        }, 100);
      }
    async ngOnInit() {
        this.sidebarService.setVersion('0.0.0.22');
        const form = new FormGroup({
            ArrestCode: new FormControl(''),
            LawsuitCode: new FormControl(''),
            ProveReportNo: new FormControl(''),
            CompareCode: new FormControl(''),
            CompareDateFrom: new FormControl(''),
            CompareDateTo: new FormControl(''),
            ProgramCode: new FormControl(''),
            ProcessCode: new FormControl(''),
            Staff: new FormControl(''),
            Department: new FormControl(''),

        });
        // this.onAdvSearch(form);
        // this.onSearch({Textsearch:''});
        this.preLoaderService.setShowPreloader(true);

        this.subOnSearch = await this.navService.searchByKeyword.subscribe(async Textsearch => {
            this.preLoaderService.setShowPreloader(true);
            console.log('pre');
            if (Textsearch) {
                
                await this.navService.setOnSearch('');
                if (Textsearch.Textsearch && Textsearch.Textsearch == null) {
                    Textsearch = {Textsearch:''};
                }
                await this.onSearch(Textsearch);
            }
            this.preLoaderService.setShowPreloader(false);
        });

        this.preLoaderService.setShowPreloader(false);
    }

    ngOnDestroy(): void {
        this.subOnSearch.unsubscribe();
    }

    async onSearch(Textsearch: any) {
        if(Textsearch.Textsearch == null){
            Textsearch = {Textsearch:''};
        }
        await this.fineService.getByKeyword(Textsearch).subscribe(list => {
            this.Compare = list;
            this.onSearchComplete(list)
        }, (err: HttpErrorResponse) => {
            console.log('fail onSearch');
        });
    }

    async onAdvSearch(form: any) {
        const sDateCompare = new Date(form.value.CompareDateFrom);
        const eDateCompare = new Date(form.value.CompareDateTo);
        if (sDateCompare.getTime() > eDateCompare.getTime()) {
            alert(Message.checkRevenueDate);
        } else {
            form.value.CompareDateFrom = sDateCompare.getTime();
            form.value.CompareDateTo = eDateCompare.getTime();

            isNaN(form.value.CompareDateFrom) ? form.value.CompareDateFrom = '' :  form.value.CompareDateFrom = new Date(form.value.CompareDateFrom).toLocaleString('en-GB', { timeZone: 'UTC' });
            isNaN(form.value.CompareDateTo) ? form.value.CompareDateTo = '' :  form.value.CompareDateFrom = new Date(form.value.CompareDateTo).toLocaleString('en-GB', { timeZone: 'UTC' });

            form.value.ProgramCode = '';
            form.value.ProcessCode = '';

            var sendingFormat = {
                ArrestCode: form.value.ArrestCode,
                LawsuitCode: form.value.LawsuitCode,
                CompareCode: form.value.CompareCode,
                ProveReportNo: form.value.ProveReportNo,
                CompareDateFrom: form.value.CompareDateFrom,
                CompareDateTo: form.value.CompareDateTo,
                StaffName: form.value.Staff,
                DepartmentName: form.value.Department,
            }
            this.fineService.getByConAdv(sendingFormat).subscribe(async list => {
                this.onSearchComplete(list)
            }, (err: HttpErrorResponse) => {
                console.log('fail onAdvSearch', err.message);
            });
        }
    }

    onSearchComplete(list: any) {
        this.Compare = list;
        var IsOutside = 0;
        var CompareCode = '';
        this.CompareList = [];
        if (list.length < 1) {
            swal(
                'ข้อผิดพลาด',
                Message.noRecord,
                'error'
            );
            return false;
        }

        this.CompareList = list.map((item, i) => {
            item.RowsId = i + 1;
            try {
              item.CompareDate = item.CompareDate ? toLocalShort(item.CompareDate) : '';
            } catch (error) {

            }

            // item.LawsuitID = list.LawsuitArrestIndicment[0];
            // console.log('Check LIST:'+JSON.stringify(item));
            return item;
          });
          /* Set Total Record */
        //   this.paginage.TotalItems = this.results.length;

        // if (Array.isArray(list)) {
        //     list.forEach(element => {
        //         this.CompareList.push({
        //             CompareCode: element.CompareCode,
        //             ArrestCode: element.ArrestCode,
        //             LawsuitNo: element.LawsuitNo,
        //             ProveReportNo: element.ProveReportNo,
        //             TitleName: element.TitleName,
        //             FirstName: element.FirstName,
        //             LastName: element.LastName,
        //             CompareDate: toLocalShort(element.CompareDate),
        //             DepartmentName: element.DepartmentName,
        //             IsOutside: IsOutside
        //         });
        //     });
        // } else {
        //     this.CompareList.push(list);
        // }
        // set total record
        this.paginage.TotalItems = this.CompareList.length;
    }

    clickView(IndictmentID: string, ArrestCode: string, CompareID: string) {
      if (+CompareID) {
        this._router.navigate([`/fine/manage/R/${CompareID}/${IndictmentID}/${ArrestCode}`]);
      } else {
        this._router.navigate([`/fine/manage/C/0/${IndictmentID}/${ArrestCode}`]);
      }
    }

    async pageChanges(event) {
        this.CompareList = await this.Compare.slice(event.startIndex - 1, event.endIndex);
    }

    varidateCDF(form: any) {
        const sDateCompare = new Date(form.value.CompareDateFrom);
        const eDateCompare = new Date(form.value.CompareDateTo);

        if (sDateCompare.getTime() > eDateCompare.getTime()) {
            alert(Message.checkReceiveDate);
            this.CompareDateFrom = '';
        }
    }

    varidateCDE(form: any) {
        const sDateCompare = new Date(form.value.CompareDateFrom);
        const eDateCompare = new Date(form.value.CompareDateTo);

        if (sDateCompare.getTime() > eDateCompare.getTime()) {
            alert(Message.checkReceiveDate);
            this.CompareDateTo = '';
        }
    }
}
