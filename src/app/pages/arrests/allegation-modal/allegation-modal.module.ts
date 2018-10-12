import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllegationModalComponent } from './allegation-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationTableModule } from '../../component/pagination-table/pagination-table.module';
import { ArrestsService } from '../arrests.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    PaginationTableModule
  ],
  providers: [ArrestsService],
  declarations: [AllegationModalComponent],
  exports: [AllegationModalComponent]
})
export class AllegationModalModule { }
