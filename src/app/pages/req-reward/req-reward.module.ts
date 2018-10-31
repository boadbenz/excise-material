import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReqRewardRoutes } from './req-reward.routing';
import { REQ_REWARD_COMPONENTS } from '.';

@NgModule({
  imports: [CommonModule, ReqRewardRoutes],
  declarations: [...REQ_REWARD_COMPONENTS]
})
export class ReqRewardModule {}
