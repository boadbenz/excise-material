import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardActionsModule } from '../component/card-actions/card-actions.module';
import { PaginationTableModule } from '../component/pagination-table/pagination-table.module';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { StepWizardModule } from '../component/step-wizard/step-wizard.module';
import { PreloaderModule } from 'app/shared/preloader/preloader.module';
// Components
import * as fromComponents from './components';
import * as fromServices from './services';
import { routes } from './investigation.routing';
import * as fromPipe from './pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    PaginationTableModule,
    MyDatePickerTHModule,
    StepWizardModule,
    PreloaderModule,
    CardActionsModule
  ],
  declarations: [...fromComponents.components, ...fromPipe.INVESTIGATION_PIPE],
  exports: [...fromComponents.components],
  providers: [...fromServices.services]
})
export class InvestigationModule { }
