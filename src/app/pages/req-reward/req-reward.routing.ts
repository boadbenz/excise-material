import { Routes, RouterModule } from '@angular/router';
import { RequestListComponent } from './request-list/request-list.component';
import { ReqRewardComponent } from './req-reward.component';
import { RequestArrestLawsuitComponent } from './request-arrest-lawsuit/request-arrest-lawsuit.component';

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
      },
      {
        path: 'request-arrest-lawsuit/:IndictmentID',
        component: RequestArrestLawsuitComponent
      }
    ]
  }
];

export const ReqRewardRoutes = RouterModule.forChild(routes);
