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
          codePage: 'ILG60-08-01-00-00',
        }
      },
      {
        path: 'manage/:IndictmentID',
        loadChildren: './views/manage/manage.module#ManageModule',
        data: {
          urls: [
            { title: 'หน้าหลัก', url: '/' },
            { title: 'ค้นหารายการคำร้องขอรับเงินสินบนรางวัล' , url: '/reward/list' },
            { title: 'จัดการคำร้องขอรับเงินสินบนรางวัล' }
          ],
          pageType: 'manage',
          codePage: 'ILG60-08-02-00-00',
        }
      }
    ]
  }
];

export const RewardRoutes = RouterModule.forChild(routes);
