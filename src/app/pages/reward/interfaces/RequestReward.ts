import { IRequestRewardDetail } from './RequestRewardDetail';
import { IRequestRewardStaff } from './RequestRewardStaff';

export interface IRequestReward {
  RequestRewardID: number;
  RequestBribeRewardID: number;
  RequestRewardCode: string;
  FineType: number;
  RequestDate: Date;
  RequestTime: string;
  StationCode: string;
  Station: string;
  FirstPartTotal: number;
  FirstMoneyTotal: number;
  FirstMoneyPerPart: number;
  FirstRemainder: number;
  SecondPartTotal: number;
  SecondMoneyTotal: number;
  SecondMoneyPerPart: number;
  SecondRemainder: number;
  RewardTotal: number;
  BribeTotal: number;
  IsActive: number;
  ReferenceNo: number;
  RequestRewardDetail: Array<IRequestRewardDetail>;
  RequestRewardStaff: Array<IRequestRewardStaff>;
}

export interface IRequestRewardgetByRequestBribeRewardID {
  RequestBribeRewardID: string;
}
