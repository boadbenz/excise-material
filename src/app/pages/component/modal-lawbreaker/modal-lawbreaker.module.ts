import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalLawbreakerComponent } from './modal-lawbreaker.component';
import { CardActionsModule } from '../card-actions/card-actions.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationTableModule } from '../pagination-table/pagination-table.module';
import { ArrestsService } from '../../arrests/arrests.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CardActionsModule,
    PaginationTableModule
  ],
  declarations: [ModalLawbreakerComponent],
  exports: [
    ModalLawbreakerComponent
  ],
  providers: [ArrestsService]
})
export class ModalLawbreakerModule { }
