import { Routes, RouterModule } from '@angular/router';
import { RewardComponent } from './reward.component';

const routes: Routes = [
  {
    path: ':mode/:RequestBribeRewardID/:IndictmentID',
    component: RewardComponent,
  },
  {
    path: ':mode/:RequestRewardID',
    component: RewardComponent,
  }
];

export const RewardRoutes = RouterModule.forChild(routes);
