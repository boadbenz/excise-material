import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintDocModalComponent } from './print-doc-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReductionService } from '../reduction.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ReductionService],
  declarations: [PrintDocModalComponent],
  exports: [PrintDocModalComponent]
})
export class PrintDocModalModule { }
