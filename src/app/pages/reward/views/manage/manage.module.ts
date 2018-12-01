import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ManageRoutes } from './manage.routing';
import { MANAGE_COMPONENTS } from '.';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [SharedModule, ManageRoutes],
  declarations: [...MANAGE_COMPONENTS],
  entryComponents: [],
})
export class ManageModule {}
