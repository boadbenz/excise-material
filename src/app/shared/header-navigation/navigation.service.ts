import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NavigationService {

	// modeSource = new BehaviorSubject<string>('');
	showAdvSearch = new BehaviorSubject<Boolean>(false);
	showPrintButton = new BehaviorSubject<Boolean>(false);
	showEditButton = new BehaviorSubject<Boolean>(false);
	showSaveButton = new BehaviorSubject<Boolean>(false);
	showCancelButton = new BehaviorSubject<Boolean>(false);
	showDeleteButton = new BehaviorSubject<Boolean>(false);
	showProofButton = new BehaviorSubject<Boolean>(false);
	showSearchBar = new BehaviorSubject<Boolean>(false);
	showFieldEdit = new BehaviorSubject<Boolean>(true);
  
	constructor() {}
  
	setAdvSearch() {
	  if (this.showAdvSearch.getValue()) {
		this.showAdvSearch.next(false);
	  } else {
		this.showAdvSearch.next(true);
	  }
	}
  
	setEditField(status: boolean) {
	  this.showFieldEdit.next(status);
	}
  
	setSearchBar(status: boolean) {
	  this.showSearchBar.next(status);
	}
  
	setPrintButton(status: boolean) {
	  this.showPrintButton.next(status);
	}
	setEditButton(status: boolean) {
	  this.showEditButton.next(status);
	}
	setDeleteButton(status: boolean) {
	  this.showDeleteButton.next(status);
	}
  
	setSaveButton(status: boolean) {
	  this.showSaveButton.next(status);
	}
  
	setCancelButton(status: boolean) {
	  this.showCancelButton.next(status);
	}

}
