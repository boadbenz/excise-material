import { RewardConfig } from '../reward.config';
import { Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IButtonAttr } from 'app/pages/reward/interfaces/ButtonAttr';
import { DropdownInterface } from 'app/pages/reward/shared/interfaces/dropdown-interface';
import { IFormChange } from 'app/pages/reward/interfaces/FormChange';

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
  public ContributorList: DropdownInterface[] = ContributorList;
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
  @Output()
  public emitChange: EventEmitter<IFormChange> = new EventEmitter();
  public ILG60_08_04_00_00_E13_BUTTON$: BehaviorSubject<
    IButtonAttr
  > = new BehaviorSubject<IButtonAttr>({
    DISABLED: false
  });

  @Input()
  set Input_nonRequestRewardStaff(val) {
    this.Input_nonRequestRewardStaff$.next(val);
  }
  get Input_nonRequestRewardStaff() {
    return this.Input_nonRequestRewardStaff$.asObservable();
  }
  public Input_nonRequestRewardStaff$ = new BehaviorSubject<any>([]);

  @Input()
  set Input_RequestBribeRewardgetByIndictmentID(val) {
    this.Input_RequestBribeRewardgetByIndictmentID$.next(val);
  }
  get Input_RequestBribeRewardgetByIndictmentID() {
    return this.Input_RequestBribeRewardgetByIndictmentID$.asObservable();
  }
  public Input_RequestBribeRewardgetByIndictmentID$ = new BehaviorSubject<any>(
    []
  );

  @Input()
  set Input_RequestRewardgetByCon(val) {
    this.Input_RequestRewardgetByCon$.next(val);
  }
  get Input_RequestRewardgetByCon() {
    return this.Input_RequestRewardgetByCon$.asObservable();
  }
  public Input_RequestRewardgetByCon$ = new BehaviorSubject<any>([]);

  // public formObject = {
  //   check: true,
  //   sort: 4,
  //   TitleName: '',
  //   FullName: '',
  //   PositionName: '',
  //   PosLevelName: '',
  //   ContributorName: '',
  //   ContributorID: '',
  //   FirstPart: 0,
  //   FirstMoney: 0,
  //   SecondPart: 0,
  //   SecondMoney: 0,
  //   ToTalMoney: 0
  // };
}
