import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BribeComponent } from './bribe.component';
import { BribeRoutes } from './bribe.routing';

@NgModule({
  imports: [
    CommonModule,
    BribeRoutes
  ],
  declarations: [BribeComponent]
})
export class BribeModule { }
