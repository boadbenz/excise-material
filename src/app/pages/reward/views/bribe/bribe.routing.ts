import { Routes, RouterModule } from '@angular/router';
import { BribeComponent } from './bribe.component';

const routes: Routes = [
  {
    path: ':mode/:RequestBribeID',
    component: BribeComponent,
    data: {
      urls: [
        { title: 'หน้าหลัก', url: '/' },
        { title: 'ค้นหาคำร้องขอรับเงินสินบนรางวัล', url: '/reward/list' },
        {
          title: 'จัดการข้อมูลคำร้องขอรับเงินสินบนรางวัล'
        },
        { title: 'จัดการข้อมูลคำร้องขอรับเงินสินบน' }
      ],
      pageType: 'view'
    }
  },
  {
    path: ':mode/:RequestBribeRewardID/:ArrestCode',
    component: BribeComponent,
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
  }
];

export const BribeRoutes = RouterModule.forChild(routes);
