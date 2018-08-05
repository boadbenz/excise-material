import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import {NgForm} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
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
    response: any;
    advSearch: any;
    staffs: any[] = [];
    departments: any[] = [];

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
    }

    ngOnInit() {
        this.sub = this.navservice.showNewButton.subscribe(status => {
            // if (status) {
            //   this.newButton();
            // }
        });

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
        this.rewardService.getMasStaffRequestgetByKeyword(term).subscribe(response => {
            this.staffs = response;
        });
    }

    onAutoCompleteStaff = (text$: Observable<string>) => {
        return text$.debounceTime(200).distinctUntilChanged().do(term => {
            if (term.length > 2) {
                this.autoCompleteStaff(term)
            }
        }).map(term => term.length < 2 ? []
            : this.staffs.map((value, index, array) => value.TitleName + value.FirstName + ' ' + value.LastName));
    };

    autoCompleteDepartment(term: string) {
        return this.rewardService.getMasDepartmentRequestgetByKeyword(term).subscribe(response => {
            console.log(response);
            this.departments = response;
        });
    }

    onAutoCompleteDepartment = (text$: Observable<string>) => {
        return text$.debounceTime(200).distinctUntilChanged().do(term => {
            if (term.length > 2) {
                this.autoCompleteDepartment(term)
            }
        }).map(term => term.length < 2 ? []
            : this.departments.map((value, index, array) => value.DepartmentNameTH));
    };


    onAdvanceSearchByKeyword(form: NgForm) {
        const reward = new Reward();
        reward.ArrestCode = form.value.ArrestCode;
        reward.LawsuitID = form.value.LawsuitID;
        console.log(new Date(form.value.sArrestDate));
        // reward.OccurrenceDateFrom = new Date(form.value.sArrestDate);
        // reward.OccurrenceDateTo = new Date(form.value.eArrestDate);
        // reward.LawsuitDateFrom = new Date(form.value.sLawsuitDate);
        // reward.LawsuitDateTo = new Date(form.value.eLawsuitDate);
        reward.LastName = form.value.MasStaff;
        reward.DepartmentName = form.value.DepartmentName;
        reward.OccurrenceDateFrom = '';
        reward.OccurrenceDateTo = '';
        reward.LawsuitDateFrom = '';
        reward.LawsuitDateTo = '';

        if (false) {
            // if (RewardCommon.isDate(reward.OccurrenceDateFrom) || RewardCommon.isDate(reward.OccurrenceDateTo) ||
            //     RewardCommon.isDate(reward.LawsuitDateFrom) || RewardCommon.isDate(reward.LawsuitDateTo)) {
            reward.OccurrenceDateFrom = '';
            reward.OccurrenceDateTo = '';
            reward.LawsuitDateFrom = '';
            reward.LawsuitDateTo = '';

        } else {
            if (false) {
            // if (RewardCommon.isVerifyDate(reward.OccurrenceDateFrom, reward.OccurrenceDateTo) ||
            //     RewardCommon.isVerifyDate(reward.LawsuitDateFrom, reward.LawsuitDateFrom)) {

                alert(RewordMessages.compareDateFailed);
            } else {
                console.log(reward)
                this.rewardService.getArrestRequestgetByConAdv(reward).subscribe(response => {
                    console.log(response)
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
                if (Array.isArray(response)) {
                    this.response = response;
                } else {
                    console.log(response)
                    alert(RewordMessages.notFoundData);
                }

            } else {
                alert(RewordMessages.notFoundData);
            }
        }, error => {
            alert(error.message);
        })
    }

    viewData(arrestCode: string) {
        this.router.navigate(['/reward/manage', 'R', 'v'], { queryParams: { arrestCode: arrestCode } });
    }

    ngAfterViewInit(): void {
    }
}
