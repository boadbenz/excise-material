import { Component, AfterViewInit ,OnInit} from '@angular/core';
import { NavigationService } from '../../shared/header-navigation/navigation.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'ea-starter',
	templateUrl: './starter.component.html',
	styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements OnInit {
	title:string;
	subtitle:string;
	
	isLinear = false;
	// firstFormGroup: FormGroup;
	// secondFormGroup: FormGroup;
	constructor(private navService: NavigationService,private _formBuilder: FormBuilder) {
			this.title = "Starter Page";
			this.subtitle = "This is some text within a card block."
		
		this.navService.setNewButton(false);
		this.navService.setNextPageButton(false);
		this.navService.setPrevPageButton(false);
        this.navService.setSearchBar(false);
		this.navService.setEditField(false);
        this.navService.setEditButton(false);
        this.navService.setPrintButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
	}

	ngOnInit(){
	
		// this.firstFormGroup = this._formBuilder.group({
		// 	firstCtrl: ['', Validators.required]
		//   });
		//   this.secondFormGroup = this._formBuilder.group({
		// 	secondCtrl: ['', Validators.required]
		//   });
	}
}