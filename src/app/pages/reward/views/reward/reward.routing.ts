import { Routes, RouterModule } from '@angular/router';
import { RewardComponent } from './reward.component';

const routes: Routes = [
  {
    path: ':mode/:RequestBribeRewardID/:IndictmentID',
    component: RewardComponent,
    data: {
      urls: [
        { title: 'หน้าหลัก', url: '/' },
        { title: 'ค้นหาคำร้องขอรับเงินสินบนรางวัล', url: '/reward/list' },
        { title: 'จัดการข้อมูลคำร้องขอรับเงินสินบนรางวัล' },
        { title: 'จัดการข้อมูลคำร้องขอรับเงินรางวัล' }
      ],
      pageType: 'manage'
      // nextPage: { title: '...', url: '#' }
    }
  }
];

export const RewardRoutes = RouterModule.forChild(routes);
