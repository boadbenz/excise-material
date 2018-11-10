import { Routes, RouterModule } from '@angular/router';
import { BribeComponent } from './bribe.component';

const routes: Routes = [
  {
    path: '',
    component: BribeComponent
  }
];

export const BribeRoutes = RouterModule.forChild(routes);
