import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NavigationService {

  private modeSource = new BehaviorSubject<string>('');
  private actionSave = new BehaviorSubject<boolean>(false);
  private actionCancel = new BehaviorSubject<boolean>(false);
  private actionPrint = new BehaviorSubject<boolean>(false);
  private actionEdit = new BehaviorSubject<boolean>(false);

  currentMode = this.modeSource.asObservable();
  currentActionSave = this.actionSave.asObservable();
  currentActionCancel = this.actionEdit.asObservable();

  constructor() { }

  changeMode(data: string) {
    this.modeSource.next(data);
  }

  on

}
