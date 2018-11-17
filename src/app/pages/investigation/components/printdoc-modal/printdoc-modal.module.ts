import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintdocModalComponent } from './printdoc-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [PrintdocModalComponent],
  exports: [PrintdocModalComponent]
})
export class PrintdocModalModule { }
