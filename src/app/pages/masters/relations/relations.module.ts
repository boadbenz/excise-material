import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListComponent, ManageComponent]
})
export class RelationsModule { }
