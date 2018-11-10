import { Routes, RouterModule } from '@angular/router';
import { ViewsComponent } from './views/views.component';

const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        loadChildren: './views/list/list.module#ListModule',
        data: {
          urls: [
            { title: 'หน้าหลัก', url: '/' },
            { title: 'ค้นหารายการคำร้องขอรับเงินสินบนรางวัล' }
          ],
          pageType: 'list',
          codePage: 'ILG60-08-01-00-00'
        }
      },
      {
        path: 'manage/:IndictmentID/:ArrestCode',
        loadChildren: './views/manage/manage.module#ManageModule',
        data: {
          urls: [
            { title: 'หน้าหลัก', url: '/' },
            {
              title: 'ค้นหารายการคำร้องขอรับเงินสินบนรางวัล',
              url: '/reward/list'
            },
            { title: 'จัดการคำร้องขอรับเงินสินบนรางวัล' }
          ],
          pageType: 'manage',
          codePage: 'ILG60-08-02-00-00'
        }
      },
      {
        path: 'bribe/:mode/:RequestBribeRewardID/:ArrestCode',
        loadChildren: './views/bribe/bribe.module#BribeModule',
        data: {
          urls: [
            { title: 'หน้าหลัก', url: '/' },
            { title: 'ค้นหาคำร้องขอรับเงินสินบนรางวัล', url: '/reward/list' },
            {
              title: 'จัดการข้อมูลคำร้องขอรับเงินสินบนรางวัล'
            },
            { title: 'จัดการข้อมูลคำร้องขอรับเงินสินบน' }
          ],
          pageType: 'manage'
        }
      },
      {
        path: 'reward/:mode/:caseSelect',
        loadChildren: './views/reward/reward.module#RewardModule',
        data: {
          urls: [
              { title: 'หน้าหลัก', url: '/'},
              { title: 'ค้นหาคำร้องขอรับเงินสินบนรางวัล', url: '/reward/list'},
              { title: 'จัดการข้อมูลคำร้องขอรับเงินสินบนรางวัล'},
              { title: 'จัดการข้อมูลคำร้องขอรับเงินรางวัล'}
          ],
          pageType: 'manage'
          // nextPage: { title: '...', url: '#' }
      },
      }
    ]
  }
];

export const RewardRoutes = RouterModule.forChild(routes);
