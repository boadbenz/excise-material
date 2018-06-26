import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeListModalComponent } from './notice-list-modal.component';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { NoticeService } from '../notice.service';

@NgModule({
  imports: [
    CommonModule,
    CardActionsModule
  ],
  declarations: [NoticeListModalComponent],
  exports: [NoticeListModalComponent],
  providers: [NoticeService]
})
export class NoticeListModalModule { }
