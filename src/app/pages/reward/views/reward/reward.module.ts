import { NgModule } from '@angular/core';
import { RewardComponent } from './reward.component';
import { RewardRoutes } from './reward.routing';
import { SharedModule } from '../../shared/shared.module';
import { REWARD_COMPONENTS } from '.';

@NgModule({
  imports: [SharedModule, RewardRoutes],
  declarations: [...REWARD_COMPONENTS]
})
export class RewardModule {}
