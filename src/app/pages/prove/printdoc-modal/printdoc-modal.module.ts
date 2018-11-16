import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintDocModalComponent } from './printdoc-modal.component';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CardActionsModule
  ],
  declarations: [PrintDocModalComponent],
  exports: [
    PrintDocModalComponent
  ]
})
export class PrintDocModalModule { }
