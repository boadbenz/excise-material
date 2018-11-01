import { ReqRewardHelper } from '../../req-reward.helper';
import { pagination } from 'app/config/pagination';
import { Input } from '@angular/core';
import { ColumnsInterface } from '../interfaces/columns-interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class TableDataConfig extends ReqRewardHelper {
  public paginage = pagination;

  @Input()
  public columns: Array<ColumnsInterface>;
  @Input()
  set data(val) {
    this.data$.next(val);
  }
  get data() {
    return this.data$.asObservable();
  }

  public data$ = new BehaviorSubject<any>(null);
}
