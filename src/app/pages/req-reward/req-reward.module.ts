import { NgModule } from '@angular/core';
import { ReqRewardRoutes } from './req-reward.routing';
import { REQ_REWARD_COMPONENTS } from '.';
import { ReqRewardSharedModule } from './req-reward-shared/req-reward-shared.module';
import { REQ_REWARD_SERVICES } from './services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreInterceptor } from './core.Interceptor';
@NgModule({
  imports: [ReqRewardSharedModule, ReqRewardRoutes],
  declarations: [...REQ_REWARD_COMPONENTS],
  providers: [
    ...REQ_REWARD_SERVICES,
    { provide: HTTP_INTERCEPTORS, useClass: CoreInterceptor, multi: true }
  ]
})
export class ReqRewardModule {}
