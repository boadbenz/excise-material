import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';
import { REWARD_SHARED_COMPONENTS, REWARD_SHARED_SERVICES } from '.';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginationTableModule } from 'app/pages/component/pagination-table/pagination-table.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CardActionsModule } from 'app/pages/component/card-actions/card-actions.module';

const SHARED_MODULES = [
  CommonModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  PaginationTableModule,
  RouterModule,
  CardActionsModule
];
@NgModule({
  imports: [
    ...SHARED_MODULES
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
