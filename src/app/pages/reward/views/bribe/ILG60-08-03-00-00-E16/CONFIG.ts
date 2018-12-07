import { BribeConfig } from '../bribe.config';
import { Output, EventEmitter } from '@angular/core';
import { IFormChange } from 'app/pages/reward/interfaces/FormChange';

export class CONFIG extends BribeConfig {
  @Output()
  emitChange: EventEmitter<IFormChange> = new EventEmitter();
}
