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
  getDateMyDatepicker,
  compareDate
} from 'app/config/dateFormat';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import { RequestListgetByConAdvModel } from '../../models/RequestListgetByConAdv.Model';

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
    this.navService.showAdvSearch.subscribe(show => {
      this.advSearch = show;
    });
    this.navService.searchByKeyword.subscribe(res => {
      if (res) {
        this.fetchData(res['Textsearch'] || '');
      }
    });
  }

  ngOnInit() {
    this.sidebarService.setVersion('0.0.1.4');
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

    if ($event.value) {
      const data: any = $event.value;
      data.LawsuitDateFrom = $event.value.LawsuitDateFrom
        ? getDateMyDatepicker($event.value.LawsuitDateFrom)
        : null;
      data.LawsuitDateTo = $event.value.LawsuitDateTo
        ? getDateMyDatepicker($event.value.LawsuitDateTo)
        : null;
      data.OccurrenceDateFrom = $event.value.OccurrenceDateFrom
        ? getDateMyDatepicker($event.value.OccurrenceDateFrom)
        : null;
      data.OccurrenceDateTo = $event.value.OccurrenceDateTo
        ? getDateMyDatepicker($event.value.OccurrenceDateTo)
        : null;
      let check = 1;
      if (
        !compareDate(
          new Date(data['OccurrenceDateFrom']),
          new Date(data['OccurrenceDateTo'])
        )
      ) {
        alert('[วันที่จับกุม] ต้องน้อยกว่าหรือเท่ากับ [ถึง]');
        check *= 0;
      }
      if (
        new Date(data['OccurrenceDateTo']).valueOf() >= new Date().valueOf()
      ) {
        alert('[วันที่จับกุม ถึง] ต้องน้อยกว่าหรือเท่ากับวันที่ปัจจุบัน');
        check *= 0;
      }
      if (
        !compareDate(
          new Date(data['LawsuitDateFrom']),
          new Date(data['LawsuitDateTo'])
        )
      ) {
        alert('[วันที่รับคดี] ต้องน้อยกว่าหรือเท่ากับ [ถึง]');
        check *= 0;
      }
      if (new Date(data['LawsuitDateTo']).valueOf() >= new Date().valueOf()) {
        alert('[วันที่รับคดี ถึง] ต้องน้อยกว่าหรือเท่ากับวันที่ปัจจุบัน');
        check *= 0;
      }

      if (check === 1) {
        const formData: IRequestListgetByConAdv = $event.value;
        const newMap = RequestListgetByConAdvModel;
        for (const key in newMap) {
          if (newMap.hasOwnProperty(key)) {
            const element = newMap[key];
            newMap[key] = formData[key];
          }
        }

        newMap.LawsuitDateFrom = newMap.LawsuitDateFrom
          ? this.ConvDateTimeToDate(
              convertDateForSave(getDateMyDatepicker(newMap.LawsuitDateFrom))
            )
          : '';
        newMap.LawsuitDateTo = newMap.LawsuitDateTo
          ? this.ConvDateTimeToDate(
              convertDateForSave(getDateMyDatepicker(newMap.LawsuitDateTo))
            )
          : '';
        newMap.OccurrenceDateFrom = newMap.OccurrenceDateFrom
          ? this.ConvDateTimeToDate(
              convertDateForSave(getDateMyDatepicker(newMap.OccurrenceDateFrom))
            )
          : '';
        newMap.OccurrenceDateTo = newMap.OccurrenceDateTo
          ? this.ConvDateTimeToDate(
              convertDateForSave(getDateMyDatepicker(newMap.OccurrenceDateTo))
            )
          : '';
        console.log('newMap', newMap);
        this.requestListService
          .RequestListgetByConAdv(newMap)
          .subscribe((res: any[]) => {
            if (res.length > 0) {
              this.gridData = this.newData(res);
            } else {
              alert('ไม่พบข้อมูล');
            }
          });
      }
    }
  }
}
