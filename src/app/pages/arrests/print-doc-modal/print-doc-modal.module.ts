import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintDocModalComponent } from './print-doc-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PrintDocModalComponent],
  exports: [PrintDocModalComponent]
})
export class PrintDocModalModule { }
