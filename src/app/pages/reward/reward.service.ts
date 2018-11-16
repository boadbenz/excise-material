import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class RewardService {

public bribeState$ = new BehaviorSubject<any>(null);
constructor() { }

}
