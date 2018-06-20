import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { CardActionsCloseComponent } from '../../component/card-actions/card-actions.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ListComponent,
    CardActionsCloseComponent
  ]
})
export class ListModule { }
