import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardComponent } from './reward.component';
import { RewardRoutes } from './reward.routing';

@NgModule({
  imports: [
    CommonModule,
    RewardRoutes
  ],
  declarations: [RewardComponent]
})
export class RewardModule { }
