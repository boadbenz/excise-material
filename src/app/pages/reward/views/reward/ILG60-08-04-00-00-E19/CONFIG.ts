import { RewardConfig } from '../reward.config';
import { EventEmitter, Output } from '@angular/core';
import { IFormChange } from 'app/pages/reward/interfaces/FormChange';

export class CONFIG extends RewardConfig {
  @Output()
  emitChange: EventEmitter<IFormChange> = new EventEmitter();
}
