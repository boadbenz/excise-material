import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ListComponent implements OnInit {
  // advSearch: any;
  constructor(private navService: NavigationService) { 
     // set false
    //  this.navService.setEditButton(false);
    //  this.navService.setDeleteButton(false);
    //  this.navService.setPrintButton(false);
    //  this.navService.setSaveButton(false);
    //  this.navService.setCancelButton(false);
    //  this.navService.setNextPageButton(false);
    //  this.navService.setPrevPageButton(false);
     // set true
    //  this.navService.setSearchBar(true);
    //  this.navService.setNewButton(true);
    //  this.advSearch = this.navService.showAdvSearch;
  }

  ngOnInit() {
    // this.advSearch.next(true);
  }
  ngOnDestroy() {
    // this.advSearch = false;
}

}
