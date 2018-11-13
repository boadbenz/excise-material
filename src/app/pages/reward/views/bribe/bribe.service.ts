import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MasDocumentModel } from 'app/models/mas-document.model';
import { IRequestBribe } from '../../interfaces/RequestBribe.interface';
import { IRequestCommand } from '../../interfaces/RequestCommand';
import { MasOfficeModel } from 'app/models/mas-office.model';
import { MasStaffModel } from 'app/models';

@Injectable()
export class BribeService {
  public mode$ = new BehaviorSubject<string>('');
  public ArrestCode$ = new BehaviorSubject<string>('');
  public RequestBribeID$ = new BehaviorSubject<number>(null);
  public RequestBribeRewardID$ = new BehaviorSubject<number>(null);
  public RequestBribeCode$ = new BehaviorSubject<string>('');

  public CommandDetailID$ = new BehaviorSubject<number>(null);

  public MasDocument$ = new BehaviorSubject<MasDocumentModel[]>(null);
  public RequestBribe$ = new BehaviorSubject<IRequestBribe[]>(null);
  public MasOfficeMain$ = new BehaviorSubject<MasOfficeModel[]>(null);
  public RequestCommand$ = new BehaviorSubject<IRequestCommand[]>(null);
  public MasStaffMain$ = new BehaviorSubject<MasStaffModel[]>(null);
  constructor() {}
}
