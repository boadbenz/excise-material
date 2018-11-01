import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';
import { REQ_REWARD_SHARED_COMPONENTS } from '.';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginationTableModule } from 'app/pages/component/pagination-table/pagination-table.module';

const SHARED_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  PaginationTableModule,
];
@NgModule({
  imports: [
    ...SHARED_MODULES
  ],
  exports: [
    ...SHARED_MODULES,
    ...REQ_REWARD_SHARED_COMPONENTS
  ],
  declarations: [
    ...REQ_REWARD_SHARED_COMPONENTS
  ]
})
export class ReqRewardSharedModule { }
