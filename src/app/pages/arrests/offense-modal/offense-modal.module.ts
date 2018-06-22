import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffenseModalComponent } from './offense-modal.component';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';

@NgModule({
  imports: [
    CommonModule,
    CardActionsModule
  ],
  declarations: [OffenseModalComponent],
  exports: [OffenseModalComponent]
})
export class OffenseModalModule { }
