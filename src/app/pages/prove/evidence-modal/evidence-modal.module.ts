import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvidenceModalComponent } from './evidence-modal.component';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CardActionsModule
  ],
  declarations: [EvidenceModalComponent],
  exports: [
    EvidenceModalComponent
  ]
})
export class EvidenceModalModule { }
