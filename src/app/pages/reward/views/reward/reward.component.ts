import { Component, OnInit } from '@angular/core';
import { RewardConfig } from './reward.config';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent extends RewardConfig implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
