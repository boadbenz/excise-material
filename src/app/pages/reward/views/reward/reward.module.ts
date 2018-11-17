import { NgModule } from '@angular/core';
import { RewardComponent } from './reward.component';
import { RewardRoutes } from './reward.routing';
import { SharedModule } from '../../shared/shared.module';
import { REWARD_COMPONENTS } from '.';
import { MatCheckboxModule } from '@angular/material';

@NgModule({
  imports: [SharedModule, RewardRoutes, MatCheckboxModule],
  declarations: [...REWARD_COMPONENTS]
})
export class RewardModule {}
