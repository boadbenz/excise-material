import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import {RewardService} from '../reward.service';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss'],
    providers: [ RewardService ]
})
export class ManageComponent implements OnInit, OnDestroy {

    viewMode: any;
    sub: any;
    courtCase = '';
    test = 'ส่งฟ้องศาล';
    showEditField: any;
    queryParam: any;
    searchingAutoCompleteAllegation = {
        searching: false,
        searchingFailed: false
    };

    notices = [
        { NoticeCode: 'LS90806026000002', NoticeDate: '10-ม.ค.-2560', ArrestName: 'สายลับ (ขอปิดนาม)', StaffName: 'นายธวัชชัย บิงขุนทด', PositionName: 'เจ้าพนักงานสรรพสามิตชำนาญงาน', DepartmentName: 'สสท.ระนอง สาขาเมืองกระบุรี', PartMoney: 1 },
        { NoticeCode: 'LS90806026000001', NoticeDate: '11-ม.ค.-2560', ArrestName: 'สายลับ (ขอปิดนาม)', StaffName: 'นายธวัชชัย บิงขุนทด 001', PositionName: 'เจ้าพนักงานสรรพสามิตชำนาญงาน', DepartmentName: 'สสท.ระนอง สาขาเมืองกระบุรี', PartMoney: 1 },
        { NoticeCode: 'LS90806026000001', NoticeDate: '11-ม.ค.-2560', ArrestName: 'สายลับ (ขอปิดนาม)', StaffName: 'นายธวัชชัย บิงขุนทด 001', PositionName: 'เจ้าพนักงานสรรพสามิตชำนาญงาน', DepartmentName: 'สสท.ระนอง สาขาเมืองกระบุรี', PartMoney: 3 }
    ];

    requestRewards = [
        { RequestRewardCode: 'RW90806026000002', RequestDate: '10-ม.ค.-2560', LawbreakerTitleName: 'นายธวัชชัย บิงขุนทด', LawsuitType: 'ส่งฟ้องศาล', CourtFineDate: '10-ม.ค.-2560', PaymentPeroidRound: '1/1' }
    ];

    requestBribes = [
        { RequestBribeCode: 'BR90806026000002', RequestDate: '10-ม.ค.-2560', LawbreakerTitleName: 'นายธวัชชัย บิงขุนทด', LawsuitType: 'เปรียบเทียบคดี', CourtFineDate: '10-ม.ค.-2560', PaymentPeroidRound: '1/1' }
    ];

    totalPartMoney = 0;

    constructor(private router: Router, private navService: NavigationService, private activeRoute: ActivatedRoute,
                private rewardService: RewardService) { }

    ngOnInit() {
        this.sumPartMoney();

        // this.sub = this.navService.showFieldEdit.subscribe(status => {
        //     // this.viewMode = status;
        //     if (!this.viewMode) {
        //         this.navService.setCancelButton(true);
        //         this.navService.setSaveButton(true);
        //         this.navService.setPrintButton(false);
        //         this.navService.setSearchBar(false);
        //         this.navService.setDeleteButton(false);
        //         this.navService.setEditButton(false);
        //         this.navService.setNewButton(false);
        //
        //     } else {
        //         this.navService.setPrintButton(true);
        //         this.navService.setDeleteButton(true);
        //         this.navService.setEditButton(true);
        //         this.navService.setSearchBar(false);
        //         this.navService.setCancelButton(false);
        //         this.navService.setSaveButton(false);
        //         this.navService.setNewButton(false);
        //     }
        // });

        this.sub = this.navService.onCancel.subscribe(response => {
            if (response) {
                this.router.navigate(['reward/list']);
                this.navService.setOnCancel(false);
            }
        });

        this.activeRoute.queryParams.subscribe(queryParam => {
            this.queryParam = queryParam;
        });

        this.activeRoute.params.subscribe(param => {
            this.rewardService.getArrestRequestgetByCon(this.queryParam).subscribe(response => {
            });
            this.rewardService.getRequestbribegetByCon(this.queryParam).subscribe(response => {
            });

            switch (param['mode']) {
                case 'C': {
                    this.navService.setEditField(true);
                    this.navService.setCancelButton(true);
                    this.navService.setSaveButton(true);
                    this.navService.setPrintButton(false);
                    this.navService.setSearchBar(false);
                    this.navService.setDeleteButton(false);
                    this.navService.setEditButton(false);
                    this.navService.setNewButton(false);

                    this.setIsViewMode(true);

                    break;
                }
                case 'R': {
                    this.navService.setEditField(true);
                    this.navService.setPrintButton(true);
                    this.navService.setDeleteButton(true);
                    this.navService.setEditButton(true);
                    this.navService.setSearchBar(false);
                    this.navService.setCancelButton(false);
                    this.navService.setSaveButton(false);
                    this.navService.setNewButton(false);
                    this.setIsViewMode(false);
                    break;
                }
                default: {
                    break;
                }

            }
        });

        this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p;
        });
    }

    setIsViewMode(value: boolean) {
        this.viewMode = !value;
    }

    private sumPartMoney() {
        this.totalPartMoney = this.notices.reduce(function (sum, d) {
            return sum + d.PartMoney;
        }, 0);
    }

    changePage(page: string , caseSelect: string) {
        // console.log(caseSelect)
        if (page === 'bribe') {
            this.router.navigate(['reward/bribe']);
        } else if (page === 'reward') {
            this.router.navigate(['reward/reward', caseSelect]);
        }

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    autoCompleteAllegation(term: string) {
        return this.rewardService.getRequestbribegetByKeyword(term).pipe(map(response => response[1]))
    }

    onAutoCompleteAllegation = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            tap(() => this.searchingAutoCompleteAllegation.searching = true),
            switchMap(term =>
                this.autoCompleteAllegation(term).pipe(
                    tap(() => this.searchingAutoCompleteAllegation.searchingFailed = false),
                    catchError(() => {
                        this.searchingAutoCompleteAllegation.searchingFailed = true;
                        return of([]);
                    }))),
            tap(() => this.searchingAutoCompleteAllegation.searching = false)
        );

    get
}
