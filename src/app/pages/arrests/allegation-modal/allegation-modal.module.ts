import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllegationModalComponent } from './allegation-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AllegationModalComponent],
  exports: [AllegationModalComponent]
})
export class AllegationModalModule { }
