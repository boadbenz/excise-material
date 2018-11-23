import { RewardConfig } from '../reward.config';
import { Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IButtonAttr } from 'app/pages/reward/interfaces/ButtonAttr';
import { DropdownInterface } from 'app/pages/reward/shared/interfaces/dropdown-interface';

export const ContributorList: DropdownInterface[] = [
  {
    text: 'ผู้แจ้งความนำจับ',
    value: 0
  },
  {
    text: 'ผู้สั่งการ',
    value: 1
  },
  {
    text: 'เจ้าพนักงานผู้จับกุม',
    value: 2
  },
  {
    text: 'เจ้าหน้าที่สนับสนุน',
    value: 3
  },
  {
    text: 'เจ้าพนักงานผู้จับกุม',
    value: 6
  },
  {
    text: 'ผู้ร่วมจับกุม',
    value: 7
  }
];
export class CONFIG extends RewardConfig {
  public ContributorList = ContributorList;
  @Input()
  set inputData(val) {
    this.inputData$.next(val);
  }
  get inputData() {
    return this.inputData$.asObservable();
  }
  public inputData$ = new BehaviorSubject<any>([]);

  @Input()
  set aggregate08(val) {
    this.aggregate08$.next(val);
  }
  get aggregate08() {
    return this.aggregate08$.asObservable();
  }
  public aggregate08$ = new BehaviorSubject<any>(null);

  public ILG60_08_04_00_00_E13_BUTTON$: BehaviorSubject<IButtonAttr> = new BehaviorSubject<IButtonAttr>({
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
