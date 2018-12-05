import { NgModule } from '@angular/core';
import { RewardRoutes } from './reward.routing';
import { SharedModule } from '../../shared/shared.module';
import { REWARD_COMPONENTS } from '.';
import { MatCheckboxModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [SharedModule, RewardRoutes, MatCheckboxModule, NgbModule.forRoot()],
  declarations: [...REWARD_COMPONENTS]
})
export class RewardModule {}
