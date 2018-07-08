import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllegationModalComponent } from './allegation-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationTableModule } from '../../component/pagination-table/pagination-table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationTableModule
  ],
  declarations: [AllegationModalComponent],
  exports: [AllegationModalComponent]
})
export class AllegationModalModule { }
