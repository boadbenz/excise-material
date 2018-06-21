import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllegationModalComponent } from './allegation-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AllegationModalComponent],
  exports: [AllegationModalComponent]
})
export class AllegationModalModule { }
