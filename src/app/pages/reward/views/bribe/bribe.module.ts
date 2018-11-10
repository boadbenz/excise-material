import { NgModule } from '@angular/core';
import { BribeComponent } from './bribe.component';
import { BribeRoutes } from './bribe.routing';
import { SharedModule } from '../../shared/shared.module';
import { BRIBE_COMPONENTS } from '.';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [SharedModule, BribeRoutes, FormsModule, ReactiveFormsModule],
  declarations: [...BRIBE_COMPONENTS]
})
export class BribeModule {}
