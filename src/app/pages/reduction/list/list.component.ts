import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { Component, OnInit } from '@angular/core';
import { ReductionApiService } from '../reduction.api.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  listData = [
    {
      arrestCode: 'TN90806026000001',
      compareID: 'TN90806026000001',
      indictmentID: 'TN11111111111',
      lawsuitNo: '001/2561',
      proofNo: '001/2561',
      caseNumber: '001/2561',
      titleName: 'นาย',
      firstName: 'ธวัชชัย',
      lastName: 'บิงขุนทด',
      lawsuitDate: '10-ม.ค.-2560',
      departmentlawName: 'สสท.ระนอง สาขาเมืองกระบุรี'
    }
  ];

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


  constructor(private navService: NavigationService, private router: Router, private apiServer: ReductionApiService) {
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

  viewData(arrestCode: string, compareID: string = '', indictmentID: string = '') {
    // this.router.navigate(['/reduction/manage', 'R'], { queryParams: { code: arrestCode } });
    this.router.navigate(['/reduction/manage', 'R'],
                         { queryParams: { code: arrestCode, compareID: compareID, indictmentID:  indictmentID} }
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
    console.log('text = ', text);
    const param = {
      Textsearch: text
    };

    this.apiServer.post('/XCS60/AdjustListgetByKeyword', param)
        .subscribe(response => console.log(response), error => console.log(error));
  }


}
