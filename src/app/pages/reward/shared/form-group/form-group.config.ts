import { RewardHelper } from '../../reward.helper';
import { Input, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// tslint:disable-next-line:no-empty-interface
export interface IFormGroup {
  type?: 'FILTER' | 'FORM';
}

export class FormGroupConfig extends RewardHelper {
  @Input()
  public options: IFormGroup;

  @Input()
  public needSearchBtn: boolean;

  @Input()
  set columns(val) {
    this.columns$.next(val);
  }
  get columns() {
    return this.columns$.asObservable();
  }

  public columns$ = new BehaviorSubject<any>(null);

  @Output()
  public outputSubmit = new EventEmitter();
}
