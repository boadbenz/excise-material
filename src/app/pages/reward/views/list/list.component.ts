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

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends ListConfig implements OnInit {
  constructor(
    private navService: NavigationService,
    private requestListService: RequestListService,
    private preloaderService: PreloaderService
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
    this.setShowButton();
    this.fetchData('');
  }
  public closeAdvSearch() {
    this.navService.showAdvSearch.next(false);
  }

  public fetchData(Textsearch) {
    this.preloaderService.setShowPreloader(true);
    this.requestListService
      .RequestListgetByKeyword({ Textsearch: Textsearch })
      .subscribe((res: IRequestList[]) => {
        this.gridData = this.newData(res);
        this.preloaderService.setShowPreloader(false);
      });
  }
  private setShowButton() {
    this.navService.setSearchBar(true);
    this.navService.setPrintButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);
  }
  private newData(data): IRequestList[] {
    return data.map((m: IRequestList) => ({
      ...m,
      StaffName: `${m.TitleName}${m.FirstName} ${m.LastName}`
    }));
  }
  public submitAdvSearch($event: FormGroup) {
    this.preloaderService.setShowPreloader(true);
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
      this.gridData = this.gridData = this.newData(res);
      this.preloaderService.setShowPreloader(false);
    });
  }
}
