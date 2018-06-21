import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuspectModalComponent } from './suspect-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SuspectModalComponent],
  exports: [
    SuspectModalComponent
  ]
})
export class SuspectModalModule { }
