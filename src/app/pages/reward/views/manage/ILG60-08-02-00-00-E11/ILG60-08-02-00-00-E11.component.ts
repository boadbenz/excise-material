import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CONFIG } from './CONFIG';
import { RequestBribeRewardService } from 'app/pages/reward/services/RequestBribeReward.service';
import { RequestBribeService } from 'app/pages/reward/services/RequestBribe.service';
import { map } from 'rxjs/operators/map';
import { debounceTime } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-02-00-00-E11',
  templateUrl: './ILG60-08-02-00-00-E11.component.html',
  styleUrls: ['./ILG60-08-02-00-00-E11.component.scss']
})
export class ILG6008020000E11Component extends CONFIG
  implements OnInit, OnDestroy {
  public dataBinding = [];
  public sumBribeTotal;
  @Input('ILG60_08_02_00_00E11_BUTTON_DISABLED') ILG60_08_02_00_00E11_BUTTON_DISABLED: boolean;
  constructor() {
    super();

    this.inputData$.takeUntil(this.destroy$).subscribe((data: any[]) => {
      if (data !== null) {
        this.sumBribeTotal = data
          .map(m => Number(m.BribeTotal))
          .reduce((a, b) => (a += b));
        const mapData = data.map((m, rowIndex) => {
          return m.RequestBribeDetail.map((x, index) => ({
            rowIndex: index === 0 ? rowIndex + 1 : '',
            view: index === 0 ? true : false,
            RequestBribeID: m.RequestBribeID,
            RequestBribeCode: index === 0 ? m.RequestBribeCode : '',
            RequestDate: index === 0 ? m.RequestDate : '',
            LawbreakerFullName: `${x.LawbreakerTitleName ||
              ' '}${x.LawbreakerFirstName || ' '}${x.LawbreakerMiddleName ||
              ' '}${x.LawbreakerLastName || ' '}${x.LawbreakerOtherName ||
              ' '}`,
            FineTypeName: x.FineType === 0 ? 'เปรียบเทียบคดี' : 'ส่งฟ้องศาล',
            PaymentDueDate:
              x.FineType === 0 ? x.PaymentActualDate : x.PaymentDueDate,
            PaymentPeriodNo: x.PaymentPeriodNo
          }));
        });
        this.dataBinding = [].concat(...mapData);
        // console.log('data');
      }
    });
  }

  ngOnInit() {}
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
