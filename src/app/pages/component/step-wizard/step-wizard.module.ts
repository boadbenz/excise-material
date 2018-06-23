import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepWizardComponent } from './step-wizard.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StepWizardComponent],
  exports: [StepWizardComponent]
})
export class StepWizardModule { }
