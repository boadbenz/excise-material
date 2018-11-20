import { NgModule } from '@angular/core';
import { ManageRoutes } from './manage.routing';
import { MANAGE_COMPONENTS } from '.';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [SharedModule, ManageRoutes],
  declarations: [...MANAGE_COMPONENTS]
})
export class ManageModule {}
