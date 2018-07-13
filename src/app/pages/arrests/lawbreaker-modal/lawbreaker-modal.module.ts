import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LawbreakerModalComponent, LawbreakerService } from './lawbreaker-modal.component';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationTableModule } from '../../component/pagination-table/pagination-table.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CardActionsModule,
    PaginationTableModule
  ],
  declarations: [LawbreakerModalComponent],
  exports: [
    LawbreakerModalComponent
  ],
  providers: [LawbreakerService]
})
export class LawbreakerModalModule { }
