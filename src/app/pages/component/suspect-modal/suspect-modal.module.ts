import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuspectModalComponent, SuspectService } from './suspect-modal.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardActionsModule } from '../card-actions/card-actions.module';
import { PaginationTableModule } from '../pagination-table/pagination-table.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CardActionsModule,
    PaginationTableModule
  ],
  declarations: [SuspectModalComponent],
  exports: [SuspectModalComponent],
  providers: [SuspectService]
})
export class SuspectModalModule { }
