import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalNoticeComponent } from './modal-notice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArrestsService } from '../../arrests/arrests.service';
import { NoticeService } from '../../notices/notice.service';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { CardActionsModule } from 'app/pages/component/card-actions/card-actions.module';
import { PaginationTableModule } from 'app/pages/component/pagination-table/pagination-table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardActionsModule,
    PaginationTableModule, 
    MyDatePickerTHModule
  ],
  declarations: [ModalNoticeComponent],
  exports: [ModalNoticeComponent],
  providers: [ArrestsService, NoticeService]
})
export class ModalNoticeModule { }
