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
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: RequestListComponent,
        data: [
          {
            urls: [
              { title: 'หน้าหลัก', url: '/' },
              { title: 'ค้นหาคำร้องขอรับเงินสินบนรางวัล' }
            ],
            pageType: 'list',
            nextPage: {
              title: 'จัดการข้อมูลคำร้องขอรับเงินสินบนรางวัล',
              url: '/reward/manage'
            }
          }
        ]
      },
      {
        path: 'request-arrest-lawsuit/:IndictmentID',
        component: RequestArrestLawsuitComponent
      }
    ]
  }
];

export const ReqRewardRoutes = RouterModule.forChild(routes);
