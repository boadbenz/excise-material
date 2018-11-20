import { Component, OnInit } from '@angular/core';
import { RewardHelper } from '../reward.helper';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent extends RewardHelper implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
  }

}
