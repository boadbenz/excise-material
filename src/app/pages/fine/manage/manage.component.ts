import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  viewMode:boolean =true;
  // advSearch: any;


  constructor(
    private router: Router,
    private navservice: NavigationService
) {
//  true
    this.navservice.setEditButton(true);
    this.navservice.setDeleteButton(true);
    this.navservice.setPrintButton(true);
    this.navservice.setNextPageButton(true);

// false
    this.navservice.setSaveButton(false);
    this.navservice.setCancelButton(false);
    this.navservice.setSearchBar(false);
    this.navservice.setNewButton(false);
    // this.advSearch = this.navservice.showAdvSearch;

}

ngOnInit() {
  
}

  viewData(){
    this.router.navigate(['fine/detail']);
  }

  // viewData(arrestCode:string){
  //   this.router.navigate(['/fine/manage', 'R'], { queryParams: {  arrestCode: arrestCode} });
  // }

}
