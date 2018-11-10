import { RewardHelper } from '../../reward.helper';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class BribeConfig extends RewardHelper {
  public formGroup: FormGroup;
  public OfficeCode: string = '102546';
  public RequestBribeRewardID: number;
}
