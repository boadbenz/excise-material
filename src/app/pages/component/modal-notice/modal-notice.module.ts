import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalNoticeComponent } from './modal-notice.component';
import { CardActionsModule } from '../card-actions/card-actions.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationTableModule } from '../pagination-table/pagination-table.module';
import { ArrestsService } from '../../arrests/arrests.service';
import { NoticeService } from '../../notices/notice.service';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';

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
  providers: [ArrestsService, NoticeService, NavigationService]
})
export class ModalNoticeModule { }
