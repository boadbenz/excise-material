import { ReqRewardHelper } from '../../req-reward.helper';
import { ColumnsInterface } from '../interfaces/columns-interface';
import { Input, EventEmitter, Output } from '@angular/core';

// tslint:disable-next-line:no-empty-interface
export interface IFormGroup  {
  type?: 'FILTER' | 'FORM';
}
export class FormGroupConfig extends ReqRewardHelper {
  @Input()
  public columns: ColumnsInterface[];

  @Input()
  public options: IFormGroup;

  @Output()
  public outputSubmit = new EventEmitter();
}
