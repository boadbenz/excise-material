import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './manage.component';

const routes: Routes = [
  {
    path: '',
    component: ManageComponent,
  }
];

export const ManageRoutes = RouterModule.forChild(routes);
