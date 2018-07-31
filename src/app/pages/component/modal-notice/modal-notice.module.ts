import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalNoticeComponent } from './modal-notice.component';
import { CardActionsModule } from '../card-actions/card-actions.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationTableModule } from '../pagination-table/pagination-table.module';
import { ArrestsService } from '../../arrests/arrests.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardActionsModule,
    PaginationTableModule
  ],
  declarations: [ModalNoticeComponent],
  exports: [ModalNoticeComponent],
  providers: [ArrestsService]
})
export class ModalNoticeModule { }
