import { RequestListService } from './RequestList.service';
import { RequestArrestLawsuitService } from './RequestArrestLawsuit.service';
import { RequestBribeRewardService } from './RequestBribeReward.service';
import { RequestRewardService } from './RequestReward.service';
import { RequestCommandService } from './RequestCommand.service';
import { RequestNoticeService } from './RequestNotice.service';
import { RequestBribeService } from './RequestBribe.service';
import { REWARD_MASTER_SERVICES } from './master';
import { RewardService } from '../reward.service';
import { TransactionRunningService } from './TransactionRunning.service';

export const REWARD_SERVICES = [
  ...REWARD_MASTER_SERVICES,
  RewardService,
  RequestListService,
  RequestArrestLawsuitService,
  RequestBribeRewardService,
  RequestRewardService,
  RequestCommandService,
  RequestNoticeService,
  RequestBribeService,
  TransactionRunningService
];
