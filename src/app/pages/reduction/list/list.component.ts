import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { Component, OnInit } from '@angular/core';
import { ReductionApiService } from '../reduction.api.service';
import { Subject } from 'rxjs/Subject';

import { PreloaderService } from '../../../shared/preloader/preloader.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  listData = [];

  arrestCode: string;
  lawsuitNo: string;
  proofNo: string;
  caseNumber: string;
  lawsuitDateStart: Date;
  lawsuitDateEnd: Date;
  lawName: string;
  departmentlawName: string;
  advSearch: any;
  allPageCount = 0;
  numberPage = 5;
  numberSelectPage;


  constructor(
    private navService: NavigationService,
    private router: Router,
    private apiServer: ReductionApiService,
    private preloaderService: PreloaderService
    ) {
    this.advSearch = this.navService.showAdvSearch;
  }

  ngOnInit() {
    this.navService.setSearchBar(true);
    this.navService.setPrintButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);

    this.allPageCount = this.listData.length / this.numberPage;
    this.numberSelectPage = Array(Math.ceil(this.allPageCount)).fill(0).map((x, i) => i + 1);

    this.navService.searchByKeyword.subscribe(async text => {
      if (text) {
        this.onSearch(text.Textsearch);
      }
    });
  }

  public viewData(compareID: string = '', indictmentID: string = '') {
    // this.router.navigate(['/reduction/manage', 'R'], { queryParams: { code: arrestCode } });
    this.router.navigate(['/reduction/manage', 'R'],
                         { queryParams: {CompareID: compareID, IndictmentID:  indictmentID} }
                        );
  }

  closeAdvSearch() {
    this.navService.showAdvSearch.next(false);
  }

  changeNumPage(numPage: number) {
    this.numberPage = numPage;
    this.allPageCount = Math.ceil(this.listData.length / this.numberPage);
    this.numberSelectPage = Array(this.allPageCount).fill(0).map((x, i) => i + 1);
  }

  public onSearch(text: string): void {
    const param = {
      Textsearch: text || ''
    };
    this.preloaderService.setShowPreloader(true);
    this.apiServer.post('/XCS60/AdjustListgetByKeyword', param)
        .subscribe(response => this.adjustListByKeywordDone(response), error => this.adjustListByKeywordError(error));
  }

  public adjustListByKeywordDone(lists: any[]): void {
    this.listData = lists;

    if (this.listData.length === 0) {
      this.listData = [];
      alert('ไม่พบข้อมูล')
    }

    this.preloaderService.setShowPreloader(false);
  }

  public adjustListByKeywordError(error: any): void {
    console.log(error);
    this.listData = [];
    alert('โหลดข้อมูลไม่ได้กรุณาลองใหม่อีกครั้ง');
    this.preloaderService.setShowPreloader(false);
  }

  public onAdvSearch() {
    const param = {
      ArrestCode: this.arrestCode || '',
      LawsuitNo: this.lawsuitNo || '',
      CompareCode: this.caseNumber || '',
      ProveReportNo: this.proofNo || '',
      CompareDateFrom: this.lawsuitDateStart || '',
      CompareDateTo: this.lawsuitDateEnd || '',
      StaffName: this.lawName || '',
      OfficeShortName: this.departmentlawName || ''
    };

    this.preloaderService.setShowPreloader(true);
    this.apiServer.post('/XCS60/AdjustListgetByConAdv', param)
        .subscribe(response => this.adjustListgetByConAdvDone(response), error => console.log(error));
  }

  public adjustListgetByConAdvDone(data: any): void {
    console.log(data);
    if (data) {
      this.listData.push(data);
    } else {
      this.listData = [];
      alert('ไม่พบข้อมูล');
    }

    this.preloaderService.setShowPreloader(false);
  }

  public adjustListgetByConAdvError(error: any): void {
    console.log(error);
    this.listData = [];
    alert('โหลดข้อมูลไม่ได้กรุณาลองใหม่อีกครั้ง');
    this.preloaderService.setShowPreloader(false);
  }

}
