import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LawbreakerModalComponent } from './lawbreaker-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LawbreakerModalComponent],
  exports: [
    LawbreakerModalComponent
  ]
})
export class LawbreakerModalModule { }
