import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BribeService {
public mode$ = new BehaviorSubject<any>(null);
public ArrestCode$ = new BehaviorSubject<any>(null);
public RequestBribeCode$ = new BehaviorSubject<any>(null);
public RequestCommand$ = new BehaviorSubject<any>(null);
public MasStaffMaingetAll$ = new BehaviorSubject<any>(null);
public MasOfficeMaingetAll$ = new BehaviorSubject<any>(null);
constructor() { }

}
