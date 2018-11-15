import { RewardConfig } from '../reward.config';
import { Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class CONFIG extends RewardConfig {
    @Input()
    set inputData(val) {
      this.inputData$.next(val);
    }
    get inputData() {
      return this.inputData$.asObservable();
    }
    public inputData$ = new BehaviorSubject<any>(null);
}
