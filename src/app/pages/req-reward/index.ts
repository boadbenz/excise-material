import { REQUEST_LIST_COMPONENTS } from './request-list';
import { ReqRewardComponent } from './req-reward.component';
import { REQUEST_ARREST_LAWSUIT_COMPONENTS } from './request-arrest-lawsuit';

export const REQ_REWARD_COMPONENTS = [
  ReqRewardComponent,
  ...REQUEST_LIST_COMPONENTS,
  ...REQUEST_ARREST_LAWSUIT_COMPONENTS
];
