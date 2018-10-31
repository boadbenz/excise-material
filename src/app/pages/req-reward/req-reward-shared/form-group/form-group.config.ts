import { ReqRewardHelper } from '../../req-reward.helper';
import { ColumnsInterface } from '../interfaces/columns-interface';
import { Input, EventEmitter, Output } from '@angular/core';

export class FormGroupConfig extends ReqRewardHelper {
  @Input()
  public columns: ColumnsInterface[];

  @Output()
  public outputSubmit = new EventEmitter();
}
