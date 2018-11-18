import { RewardConfig } from '../reward.config';
import { Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IButtonAttr } from 'app/pages/reward/interfaces/ButtonAttr';

export class CONFIG extends RewardConfig {
  @Input()
  set inputData(val) {
    this.inputData$.next(val);
  }
  get inputData() {
    return this.inputData$.asObservable();
  }
  public inputData$ = new BehaviorSubject<any>(null);

  @Input()
  set aggregate08(val) {
    this.aggregate08$.next(val);
  }
  get aggregate08() {
    return this.aggregate08$.asObservable();
  }
  public aggregate08$ = new BehaviorSubject<any>(null);

  public ILG60_08_04_00_00_E13_BUTTON$ = new BehaviorSubject<IButtonAttr>({
    DISABLED: false
  });

  public formObject = {
    check: true,
    TitleName: '',
    FullName: '',
    PositionName: '',
    PosLevelName: '',
    ContributorName: '',
    ContributorID: '',
    FirstPart: 0,
    FirstMoney: 0,
    SecondPart: 0,
    SecondMoney: 0,
    ToTalMoney: 0
  };
}
