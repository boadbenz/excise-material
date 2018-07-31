import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  viewMode: any;
  sub: any;
  courtCase: string ="";
  test1:string="ส่งฟ้องศาล";
  test2:string="เปรียบเทียบคดี";

  constructor(private router: Router, private navService: NavigationService) { }

  ngOnInit() {

    this.sub = this.navService.showFieldEdit.subscribe(status => {
      this.viewMode = status;
      if (!this.viewMode) {
        this.navService.setCancelButton(true);
        this.navService.setSaveButton(true);
        this.navService.setPrintButton(false);
        this.navService.setSearchBar(false);
        this.navService.setDeleteButton(false);
        this.navService.setEditButton(false);
        this.navService.setNewButton(false);

      } else {
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditButton(true);
        this.navService.setSearchBar(false);
        this.navService.setCancelButton(false);
        this.navService.setSaveButton(false);
        this.navService.setNewButton(false);
      }
    });
  }

  changePage(page: string , mode: string, caseSelect: string) {
    // console.log(caseSelect)
    if (page == 'bribe'){
      // this.router.navigate(['reward/bribe']);
      this.router.navigate(['/reward/bribe', mode]);
    }
    else if (page == 'reward'){
      this.router.navigate(['reward/reward',mode, caseSelect]);
    }
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}