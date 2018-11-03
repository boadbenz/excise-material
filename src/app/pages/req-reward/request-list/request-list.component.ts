import { Component, OnInit } from '@angular/core';
import { RequestListConfig } from './request-list.config';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { RequestListService } from '../services/RequestList.service';
import { IRequestListgetByConAdv, IRequestList } from './request-list.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent extends RequestListConfig implements OnInit {
  constructor(
    public navService: NavigationService,
    private requestListService: RequestListService
  ) {
    super();
    this.advSearch = this.navService.showAdvSearch;
    this.navService.searchByKeyword.subscribe((res) => {
      if (res) {
        this.fetchData(res['Textsearch'] ? res['Textsearch'] : '');
      }
    });
  }

  ngOnInit() {
    this.setShowButton();
    this.fetchData('');
  }
  public closeAdvSearch() {
    this.navService.showAdvSearch.next(false);
  }

  public fetchData(Textsearch) {
    this.requestListService
      .RequestListgetByKeyword({Textsearch: Textsearch})
      .subscribe((res: IRequestList[]) => {
        this.gridData = this.newData(res);
      });
  }
  private setShowButton() {
    this.navService.setSearchBar(true);
  }
  private newData(data): IRequestList[] {
    return data.map((m: IRequestList) => ({...m, StaffName: `${m.TitleName}${m.FirstName} ${m.LastName}`}));
  }
  public submitAdvSearch($event: FormGroup) {
    const formData: IRequestListgetByConAdv =  $event.value;
    this.requestListService
      .RequestListgetByConAdv(formData)
      .subscribe(res => {
        this.gridData = this.gridData = this.newData(res);
      });
  }
}
