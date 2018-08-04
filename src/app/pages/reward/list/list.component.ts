import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import {NgForm} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import {Reward} from '../reward';
import {RewardCommon} from '../reward-common';
import {RewordMessages} from '../reward-message';
import {RewardService} from '../reward.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [ RewardService ]
})
export class ListComponent implements OnInit, AfterViewInit {
    private sub: any;
    response: object;
    advSearch: any;
    staff = [];

    staffModel: any;
    staffSearching = false;
    staffSearchFailed = false;

    departmentModel: any;
    departmentSearching = false;
    departmentSearchFailed = false;

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private navservice: NavigationService,
        private rewardService: RewardService) {

        // set false
        this.navservice.setEditButton(false);
        this.navservice.setDeleteButton(false);
        this.navservice.setPrintButton(false);
        this.navservice.setSaveButton(false);
        this.navservice.setCancelButton(false);
        this.navservice.setNextPageButton(false);
        // set true
        this.navservice.setNewButton(true);
        this.navservice.setSearchBar(true);
        this.advSearch = this.navservice.showAdvSearch;


        this.response = [
            { 'no': 1, 'work_no': 'TN90806026000002', 'case_no': '001/2561' , 'arrest_day': '10-ม.ค.-2560', 'court_date': '10-ม.ค.-2560 ', 'lawyer': 'นายธวัชชัย บิง ', 'department': 'สสท.ระนอง สาขาเมือง' },
            { 'no': 2, 'work_no': 'TN90806026000002', 'case_no': '001/2561' , 'arrest_day': '10-ม.ค.-2560', 'court_date': '10-ม.ค.-2560 ', 'lawyer': 'นายธวัชชัย บิง ', 'department': 'สสท.ระนอง สาขาเมือง' },
            { 'no': 3, 'work_no': 'TN90806026000002', 'case_no': '001/2561' , 'arrest_day': '10-ม.ค.-2560', 'court_date': '10-ม.ค.-2560 ', 'lawyer': 'นายธวัชชัย บิง ', 'department': 'สสท.ระนอง สาขาเมือง' }];
    }

    ngOnInit() {
        this.sub = this.navservice.showNewButton.subscribe(status => {
            // if (status) {
            //   this.newButton();
            // }
        })

        this.initialSearchByKeyword();
    }

    initialSearchByKeyword() {
        this.navservice.searchByKeyword.subscribe(async textSearch => {
            console.log(textSearch);
            if (textSearch) {
                await this.navservice.setOnSearch('');
                this.onSearchByKeyword(textSearch);
            }
        })
    }

    // onSearchByKeyword() {
    //     this.rewardService.getArrestRequestgetByKeyword('').subscribe(response => {
    //         if (response) {
    //             this.response = response;
    //         } else {
    //             alert(RewordMessages.notFoundData)
    //         }
    //     }, error => {
    //         alert(error.message)
    //     })
    // }

    autoCompleteStaff(term: string) {
        return this.rewardService.getMasStaffRequestgetByKeyword(term).pipe(map(response => response[1]))
    }

    onAutoCompleteStaff = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            tap(() => this.staffSearching = true),
            switchMap(term =>
                this.autoCompleteStaff(term).pipe(
                    tap(() => this.staffSearchFailed = false),
                    catchError(() => {
                        this.staffSearchFailed = true;
                        return of([]);
                    }))),
            tap(() => this.staffSearching = false)
        );

    autoCompleteDepartment(term: string) {
        return this.rewardService.getMasDepartmentRequestgetByKeyword(term).pipe(map(response => response[1]))
    }

    onAutoCompleteDepartment = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            tap(() => this.departmentSearching = true),
            switchMap(term =>
                this.autoCompleteDepartment(term).pipe(
                    tap(() => this.departmentSearchFailed = false),
                    catchError(() => {
                        this.departmentSearchFailed = true;
                        return of([]);
                    }))),
            tap(() => this.departmentSearching = false)
        );


    onAdvanceSearchByKeyword(form: NgForm) {
        const reward = new Reward();
        reward.ArrestCode = form.value.ArrestCode;
        reward.LawsuitID = form.value.LawsuitID;
        reward.OccurrenceDateFrom = new Date(form.value.sArrestDate);
        reward.OccurrenceDateTo = new Date(form.value.eArrestDate);
        reward.LawsuitDateFrom = new Date(form.value.sLawsuitDate);
        reward.LawsuitDateTo = new Date(form.value.eLawsuitDate);
        reward.StaffName = form.value.MasStaff;
        reward.DepartmentName = form.value.DepartmentName;

        if (RewardCommon.isDate(reward.OccurrenceDateFrom) || RewardCommon.isDate(reward.OccurrenceDateTo) ||
            RewardCommon.isDate(reward.LawsuitDateFrom) || RewardCommon.isDate(reward.LawsuitDateTo)) {

            alert(RewordMessages.verifyDateFiled)
        } else {
            if (RewardCommon.isVerifyDate(reward.OccurrenceDateFrom, reward.OccurrenceDateTo) ||
                RewardCommon.isVerifyDate(reward.LawsuitDateFrom, reward.LawsuitDateFrom)) {

                alert(RewordMessages.compareDateFailed);
            } else {
                this.rewardService.getArrestRequestgetByConAdv(reward).subscribe(response => {
                    if (response) {
                        this.response = response;
                    } else {
                        alert(RewordMessages.notFoundData)
                    }
                }, error => {
                    alert(error.message)
                })
            }

        }
    }

    onSearchByKeyword(text: any) {
        this.rewardService.getArrestRequestgetByKeyword(text).subscribe(response => {
            if (response) {
                this.response = response;
            } else {
                alert(RewordMessages.notFoundData)
            }
        }, error => {
            alert(error.message)
        })
    }

    // private newButton() {
    //   this.router.navigate(['/reward/manage', 'R']);
    // }

    viewData(arrestCode: string) {
        this.router.navigate(['/reward/manage', 'R', 'v'], { queryParams: { arrestCode: arrestCode } });
    }

    ngAfterViewInit(): void {
    }
}
