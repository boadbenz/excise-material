import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {RewordMessages} from '../reward-message';
import {RewardService} from '../reward.service';
import {pagination} from '../../../config/pagination';
import {Message} from '../../../config/message';
import {toLocalShort} from '../../../config/dateFormat';
import {PreloaderService} from "../../../shared/preloader/preloader.component";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [ RewardService ]
})
export class ListComponent implements OnInit {

  results: Reward[] = [];
  resultsPerPage: Reward[] = [];

  advSearch: any;
  advSearchSub: any;

  paginage = pagination;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private navService: NavigationService,
    private preLoaderService: PreloaderService,
    private rewardService: RewardService
  ) {
    /* Initial Adv.Search */
    this.advSearch = this.navService.showAdvSearch;
    this.advSearchSub = this.navService.searchByKeyword.subscribe(filterValue => {
      if (filterValue) {
        this.rewardService.getByKeyword(filterValue)
          .then(res => this.onSearchComplete(res));
      }
    });
  }

  private setShowButton() {
    this.navService.setEditButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setPrintButton(false);
    this.navService.setSaveButton(false);
    this.navService.setCancelButton(false);
    this.navService.setNextPageButton(false);
    this.navService.setNewButton(true);
    this.navService.setSearchBar(true);
  }

  async ngOnInit() {
    /* Display Button */
    this.setShowButton();
    /* Load Data*/
    this.preLoaderService.setShowPreloader(true);
    await this.rewardService.getByKeywordOnInt().then(list => this.onSearchComplete(list));
    this.preLoaderService.setShowPreloader(false);
  }

  async onSearchComplete(list: Reward[]) {
    /* Alert When No Data To Show */
    if (!list.length) {
      alert(Message.noRecord);
      return false;
    }
    /* Adjust Another Column */
    this.results = list.map((item, i) => {
      item.RowsId = i + 1;
      item.ArrestDate = toLocalShort(item.ArrestDate);
      item.LawsuitDate = toLocalShort(item.LawsuitDate);
      item.Lawbreaker = (item.ArrestLawbreaker || []).length > 0? (item.ArrestLawbreaker[0].LawbreakerTitleName +
        item.ArrestLawbreaker[0].LawbreakerFirstName + ' ' + item.ArrestLawbreaker[0].LawbreakerLastName): '';
      return item;
    });
    /* Set Total Record */
    this.paginage.TotalItems = this.results.length;
  }

  async onAdvSearch(form: any) {
    if (form.value.sArrestDate && form.value.eArrestDate) {
      const sDateCompare = new Date(form.value.sArrestDate);
      const eDateCompare = new Date(form.value.eArrestDate);
      if (sDateCompare.valueOf() > eDateCompare.valueOf()) {
        alert(Message.checkDate);
        return false;
      }
      form.value.sArrestDate = sDateCompare.toISOString();
      form.value.eArrestDate = eDateCompare.toISOString();
    }
    if (form.value.sLawsuitDate && form.value.eLawsuitDate) {
      const sDateCompare = new Date(form.value.sLawsuitDate);
      const eDateCompare = new Date(form.value.eLawsuitDate);
      if (sDateCompare.valueOf() > eDateCompare.valueOf()) {
        alert(Message.checkDate);
        return false;
      }
      form.value.sLawsuitDate = sDateCompare.toISOString();
      form.value.eLawsuitDate = eDateCompare.toISOString();
    }
    this.preLoaderService.setShowPreloader(true);
    await this.rewardService.getByConAdv(form.value).then(list => this.onSearchComplete(list));
    this.preLoaderService.setShowPreloader(false);
  }

  // onAdvanceSearchByKeyword(form: NgForm) {
  //   const reward = new Reward();
  //   reward.ArrestCode = form.value.ArrestCode;
  //   reward.LawsuitID = form.value.LawsuitID;
  //   console.log(new Date(form.value.sArrestDate));
  //   // reward.OccurrenceDateFrom = new Date(form.value.sArrestDate);
  //   // reward.OccurrenceDateTo = new Date(form.value.eArrestDate);
  //   // reward.LawsuitDateFrom = new Date(form.value.sLawsuitDate);
  //   // reward.LawsuitDateTo = new Date(form.value.eLawsuitDate);
  //   reward.LastName = form.value.MasStaff;
  //   reward.DepartmentName = form.value.DepartmentName;
  //   reward.OccurrenceDateFrom = '';
  //   reward.OccurrenceDateTo = '';
  //   reward.LawsuitDateFrom = '';
  //   reward.LawsuitDateTo = '';
  //
  //   if (false) {
  //     // if (RewardCommon.isDate(reward.OccurrenceDateFrom) || RewardCommon.isDate(reward.OccurrenceDateTo) ||
  //     //     RewardCommon.isDate(reward.LawsuitDateFrom) || RewardCommon.isDate(reward.LawsuitDateTo)) {
  //     reward.OccurrenceDateFrom = '';
  //     reward.OccurrenceDateTo = '';
  //     reward.LawsuitDateFrom = '';
  //     reward.LawsuitDateTo = '';
  //
  //   } else {
  //     if (false) {
  //       // if (RewardCommon.isVerifyDate(reward.OccurrenceDateFrom, reward.OccurrenceDateTo) ||
  //       //     RewardCommon.isVerifyDate(reward.LawsuitDateFrom, reward.LawsuitDateFrom)) {
  //
  //       alert(RewordMessages.compareDateFailed);
  //     } else {
  //       console.log(reward);
  //       this.rewardService.getArrestRequestgetByConAdv(reward).subscribe(response => {
  //         console.log(response);
  //         this.onSearchComplete(response)
  //       }, error => {
  //         alert(error.message)
  //       })
  //     }
  //
  //   }
  // }

  closeAdvSearch() {
    this.navService.showAdvSearch.next(false);
  }

  async pageChanges(event) {
    this.resultsPerPage = await this.results.slice(event.startIndex - 1, event.endIndex);
  }

  ngOnDestroy() {
    this.advSearchSub.unsubscribe();
  }

  autoCompleteStaff(term: string) {
    this.rewardService.getMasStaffRequestGetByKeyword(term).then(response => {
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
    return this.rewardService.getMasDepartmentRequestGetByKeyword(term).then(response => {
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














  private sub: any;
    rewardList: any[] = [];
    reward: any[] = [];

    staffs: any[] = [];
    departments: any[] = [];

    @ViewChild('rewardTable') rewardTable: ElementRef;

  



    viewData(arrestCode: string) {
        this.router.navigate(['/reward/manage', 'R', 'v'], { queryParams: { arrestCode: arrestCode } });
    }

}
