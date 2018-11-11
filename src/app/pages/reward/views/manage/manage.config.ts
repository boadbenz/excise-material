import { RewardHelper } from '../../reward.helper';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class ManageConfig extends RewardHelper {
  public IndictmentID: number;
  public ArrestCode: string;
  public RequestBribeRewardID: number;

  public RequestArrestLawsuitgetByIndictmentID$ = new BehaviorSubject<any>(
    null
  );
  public RequestBribeRewardgetByIndictmentID$ = new BehaviorSubject<any>(null);
  public RequestRewardgetByRequestBribeRewardID$ = new BehaviorSubject<any>(
    null
  );
  public RequestNoticegetByArrestCode$ = new BehaviorSubject<any>(null);
  public RequestCommandinsAll$ = new BehaviorSubject<any>(null);

  public RequestBribeRewardinsAll$ = new BehaviorSubject<any>(null);

  public RequestCommandgetByArrestCode$ = new BehaviorSubject<any>(null);
}
