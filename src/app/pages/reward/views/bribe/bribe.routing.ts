import { Routes, RouterModule } from '@angular/router';
import { BribeComponent } from './bribe.component';

const routes: Routes = [
  {
    path: ':mode/:RequestBribeID',
    component: BribeComponent,
  },
  {
    path: ':mode/:RequestBribeRewardID/:ArrestCode',
    component: BribeComponent,
  }
];

export const BribeRoutes = RouterModule.forChild(routes);
