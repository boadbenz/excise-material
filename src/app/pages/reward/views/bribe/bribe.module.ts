import { NgModule } from '@angular/core';
import { BribeComponent } from './bribe.component';
import { BribeRoutes } from './bribe.routing';
import { SharedModule } from '../../shared/shared.module';
import { BRIBE_COMPONENTS } from '.';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [SharedModule, BribeRoutes, FormsModule, ReactiveFormsModule, MatCheckboxModule, NgbModule.forRoot()],
  declarations: [...BRIBE_COMPONENTS],
})
export class BribeModule {}
