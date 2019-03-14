import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { StarterComponent } from './starter.component';
import { MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';

const routes: Routes = [{
	path: '',
	component: StarterComponent
}];

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		MatStepperModule,
        MatInputModule,
        MatButtonModule,
        MatAutocompleteModule,  
		RouterModule.forChild(routes)
	],
	declarations: [StarterComponent]
})
export class StarterModule { }