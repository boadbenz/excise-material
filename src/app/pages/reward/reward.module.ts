import { NgModule } from '@angular/core';
import { RewardRoutes } from './reward.routing';
import { REWARD_COMPONENTS } from '.';
import { SharedModule } from './shared/shared.module';
import { REWARD_SERVICES } from './services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreInterceptor } from './core.Interceptor';
import { SumArrayPipe } from './pipes/sumArray.pipe';
@NgModule({
  imports: [SharedModule, RewardRoutes],
  declarations: [...REWARD_COMPONENTS],
  providers: [
    ...REWARD_SERVICES,
    { provide: HTTP_INTERCEPTORS, useClass: CoreInterceptor, multi: true }
  ]
})
export class RewardModule {}
