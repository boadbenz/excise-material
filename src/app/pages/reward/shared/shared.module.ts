import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';
import { REWARD_SHARED_COMPONENTS, REWARD_SHARED_SERVICES } from '.';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginationTableModule } from 'app/pages/component/pagination-table/pagination-table.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CardActionsModule } from 'app/pages/component/card-actions/card-actions.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MyDatePickerTHModule } from 'mydatepicker-th';
const SHARED_MODULES = [
  CommonModule,
  HttpClientModule,
  RouterModule,
  CardActionsModule,
];
@NgModule({
  imports: [
    ...SHARED_MODULES,
    MyDatePickerTHModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule,
    PaginationTableModule,
    FormsModule,
  ],
  exports: [
    ...SHARED_MODULES,
    ...REWARD_SHARED_COMPONENTS
  ],
  declarations: [
    ...REWARD_SHARED_COMPONENTS
  ],
  providers: [
    ...REWARD_SHARED_SERVICES
  ]
})
export class SharedModule { }
