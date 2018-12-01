import { Component, OnInit } from '@angular/core';
import { ListConfig } from './list.config';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { RequestListService } from '../../services/RequestList.service';
import { PreloaderService } from 'app/shared/preloader/preloader.component';
import {
  IRequestList,
  IRequestListgetByConAdv
} from '../../interfaces/RequestList.interface';
import { FormGroup } from '@angular/forms';
import {
  convertDateForSave,
  toLocalNumeric,
  getDateMyDatepicker
} from 'app/config/dateFormat';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends ListConfig implements OnInit {
  constructor(
    private navService: NavigationService,
    private requestListService: RequestListService,
    private sidebarService: SidebarService
  ) {
    super();
    this.advSearch = this.navService.showAdvSearch;
    this.navService.searchByKeyword.subscribe(res => {
      if (res) {
        this.fetchData(res['Textsearch'] || '');
      }
    });
  }

  ngOnInit() {
    this.sidebarService.setVersion('0.0.1.3');
    this.setShowButton();
    // this.fetchData('');
  }
  public closeAdvSearch() {
    this.navService.showAdvSearch.next(false);
  }

  public fetchData(Textsearch) {
    this.requestListService
      .RequestListgetByKeyword({ Textsearch: Textsearch })
      .subscribe((res: IRequestList[]) => {
        this.gridData = this.newData(res);
      });
  }
  private setShowButton() {
    this.navService.setSearchBar(true);
    this.navService.setPrintButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);
    this.navService.setNewButton(false);
    this.navService.setEditField(false);
    this.navService.setNextPageButton(false);
    this.navService.setPrevPageButton(false);
  }
  private newData(data): IRequestList[] {
    return data.map((m: IRequestList) => ({
      ...m,
      view: true,
      StaffName: `${m.TitleName}${m.FirstName} ${m.LastName}`
    }));
  }
  public submitAdvSearch($event: FormGroup) {
    console.log(' $event.value', $event.value);

    const formData: IRequestListgetByConAdv = $event.value;
    formData.LawsuitDateFrom = convertDateForSave(
      getDateMyDatepicker(formData.LawsuitDateFrom)
    );
    formData.LawsuitDateTo = convertDateForSave(
      getDateMyDatepicker(formData.LawsuitDateTo)
    );
    formData.OccurrenceDateFrom = convertDateForSave(
      getDateMyDatepicker(formData.OccurrenceDateFrom)
    );
    formData.OccurrenceDateTo = convertDateForSave(
      getDateMyDatepicker(formData.OccurrenceDateTo)
    );
    this.requestListService.RequestListgetByConAdv(formData).subscribe(res => {
      this.gridData = this.newData(res);
    });
  }
}
