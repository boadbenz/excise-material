import { Routes, RouterModule } from '@angular/router';
import { RequestListComponent } from './request-list/request-list.component';

const routes: Routes = [
  {
    path: '',
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
