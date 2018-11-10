import { NgModule } from '@angular/core';
import { RewardComponent } from './reward.component';
import { RewardRoutes } from './reward.routing';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RewardRoutes
  ],
  declarations: [RewardComponent]
})
export class RewardModule { }
