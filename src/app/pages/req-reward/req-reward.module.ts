import { NgModule } from '@angular/core';
import { ReqRewardRoutes } from './req-reward.routing';
import { REQ_REWARD_COMPONENTS } from '.';
import { ReqRewardSharedModule } from './req-reward-shared/req-reward-shared.module';
@NgModule({
  imports: [ReqRewardSharedModule, ReqRewardRoutes],
  declarations: [...REQ_REWARD_COMPONENTS]
})
export class ReqRewardModule {}
