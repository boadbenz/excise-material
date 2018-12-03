import { Component, AfterViewInit } from '@angular/core';
import { NavigationService } from '../../shared/header-navigation/navigation.service';
@Component({
	selector: 'ea-starter',
	templateUrl: './starter.component.html'
})
export class StarterComponent implements AfterViewInit {
	title:string;
	subtitle:string;	
	constructor(private navService: NavigationService) {
		this.title = "Starter Page";
		this.subtitle = "This is some text within a card block."
		
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
		this.navService.setEditField(false);
        this.navService.setEditButton(false);
        this.navService.setPrintButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
	}

	ngAfterViewInit(){}
}