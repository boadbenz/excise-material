import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';
import { REQ_REWARD_SHARED_COMPONENTS } from '.';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const SHARED_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
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
