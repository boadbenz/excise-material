import { Routes, RouterModule } from '@angular/router';
import { RequestListComponent } from './request-list/request-list.component';
import { ReqRewardComponent } from './req-reward.component';

const routes: Routes = [
  {
    path: '',
    component: ReqRewardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'request-list'
      },
      {
        path: 'request-list',
        component: RequestListComponent
      }
    ]
  }
];

export const ReqRewardRoutes = RouterModule.forChild(routes);
