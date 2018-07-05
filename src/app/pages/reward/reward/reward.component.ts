import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  viewMode: any;
  sub: any;
  private getmode: any;
  court: boolean;

  constructor(private router: Router, private navService: NavigationService, private activeRoute: ActivatedRoute) { }

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

      } else {
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditButton(true);
        this.navService.setSearchBar(false);
        this.navService.setCancelButton(false);
        this.navService.setSaveButton(false);
      }
    });

    this.getmode = this.activeRoute.params
      .subscribe(params => {
        if(params.caseSelect == "เปรียบเทียบคดี"){
          this.court = false;
          // console.log("เปรียบเทียบคดี"+this.court);
        }
        else if(params.caseSelect == "ส่งฟ้องศาล"){
          this.court = true;
          // console.log("ส่งฟ้องศาล"+this.court);
        }
        
        
      });

  }

  addSupport(i){
    document.getElementById("add").innerHTML = '<td><input type="checkbox" class="filled-in chk-col-indigo" id="'+i+'"><label for="'+i+'"></label></td><td class="text-center">'+i+'</td><td><select class="form-control"></select></td><td><input class="form-control" type="text" ></td><td><input class="form-control" type="text" ></td><td><input class="form-control" type="text" ></td><td><select class="form-control"></select></td><td><input class="form-control" type="text" disabled></td><td><select class="form-control"></select></td><td><input class="form-control" type="text" disabled></td><td><input class="form-control" type="text" disabled></td><td><input class="form-control" type="text" disabled></td><i class="ti-trash btn-action (click)="addSupport('+i+')"></i></td>';
  }

}
