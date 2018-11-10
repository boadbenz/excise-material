import { RequestListService } from './RequestList.service';
import { RequestArrestLawsuitService } from './RequestArrestLawsuit.service';
import { RequestBribeRewardService } from './RequestBribeReward.service';
import { RequestRewardService } from './RequestReward.service';
import { RequestCommandService } from './RequestCommand.service';
import { RequestNoticeService } from './RequestNotice.service';
import { RequestBribeService } from './RequestBribe.service';

export const REWARD_SERVICES = [
  RequestListService,
  RequestArrestLawsuitService,
  RequestBribeRewardService,
  RequestRewardService,
  RequestCommandService,
  RequestNoticeService,
  RequestBribeService
];
