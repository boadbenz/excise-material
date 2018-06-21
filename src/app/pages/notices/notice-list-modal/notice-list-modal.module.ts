import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeListModalComponent } from './notice-list-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NoticeListModalComponent],
  exports: [NoticeListModalComponent]
})
export class NoticeListModalModule { }
