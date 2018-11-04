import { RequestListService } from './RequestList.service';
import { RequestArrestLawsuitService } from './RequestArrestLawsuit.service';
import { RequestBribeRewardService } from './RequestBribeReward.service';

export const REQ_REWARD_SERVICES = [
  RequestListService,
  RequestArrestLawsuitService,
  RequestBribeRewardService
];
