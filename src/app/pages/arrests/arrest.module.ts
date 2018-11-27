import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

// Components
import * as fromComponents from './components';

// Services
import * as fromServices from './services';

import { MyDatePickerTHModule } from 'mydatepicker-th';
import { PaginationTableModule } from '../component/pagination-table/pagination-table.module';
import { CardActionsModule } from '../component/card-actions/card-actions.module';
import { StepWizardModule } from '../component/step-wizard/step-wizard.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalOffenseModule } from '../component/modal-offense/modal-offense.module';
import { ROUTES } from './arrest.routing';
import { ArrestsService } from './arrests.service';
import { PreloaderModule } from 'app/shared/preloader/preloader.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    NgbModule.forRoot(),
    CardActionsModule,
    PaginationTableModule,
    MyDatePickerTHModule,
    StepWizardModule,
    ModalOffenseModule,
    PreloaderModule
  ],
  declarations: [...fromComponents.components],
  exports: [...fromComponents.components],
  providers: [...fromServices.services, ArrestsService]
})
export class ArrestModule {

}