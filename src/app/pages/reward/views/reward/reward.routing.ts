import { Routes, RouterModule } from '@angular/router';
import { RewardComponent } from './reward.component';

const routes: Routes = [
  {
    path: '',
    component: RewardComponent
  }
];

export const RewardRoutes = RouterModule.forChild(routes);
