import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicmentModalComponent  } from './indicment-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [IndicmentModalComponent],
  exports: [IndicmentModalComponent]
})
export class IndicmentModalModule { }
