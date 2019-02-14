import { NgModule } from '@angular/core';
import { ListRoutes } from './list.routing';
import { LIST_COMPONENTS } from '.';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
   SharedModule,
    ListRoutes
  ],
  declarations: [
    ...LIST_COMPONENTS
  ]
})
export class ListModule { }
