import { RewardHelper } from '../../reward.helper';
import { pagination } from 'app/config/pagination';
import { Input } from '@angular/core';
import { ColumnsInterface } from '../interfaces/columns-interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface ITableDataOptions {
  action?: 'VIEW' | 'ADD' | 'EDIT' | 'DELETE';
  actionUrl?: string;
  actionFieldParams?: string[];
}
export class TableDataConfig extends RewardHelper {
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
  @Input() public options: ITableDataOptions;
  @Input() public showIndex = true;

  public data$ = new BehaviorSubject<any>(null);
}
