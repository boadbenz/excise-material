import { RequestListService } from './RequestList.service';
import { RequestArrestLawsuitService } from './RequestArrestLawsuit.service';
import { RequestBribeRewardService } from './RequestBribeReward.service';

export const REWARD_SERVICES = [
  RequestListService,
  RequestArrestLawsuitService,
  RequestBribeRewardService
];
