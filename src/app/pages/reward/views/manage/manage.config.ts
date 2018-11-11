import { RewardHelper } from '../../reward.helper';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class ManageConfig extends RewardHelper {

  public ILG60_08_02_00_00E08$ = new BehaviorSubject<any>(true);
  public ILG60_08_02_00_00E09$ = new BehaviorSubject<any>(true);
  public ILG60_08_02_00_00E11$ = new BehaviorSubject<any>(true);
  public ILG60_08_02_00_00E14$ = new BehaviorSubject<any>(true);

  public ILG60_08_02_00_00E08_DATA$ = new BehaviorSubject<any>(null);
  public ILG60_08_02_00_00E09_DATA$ = new BehaviorSubject<any>(null);
  public ILG60_08_02_00_00E11_DATA$ = new BehaviorSubject<any>(null);
  public ILG60_08_02_00_00E14_DATA$ = new BehaviorSubject<any>(null);

  public IndictmentID: number;
  public ArrestCode: string;
  public RequestBribeRewardID$ = new BehaviorSubject<any>(null);

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
  
  public RequestBribegetByRequestBribeRewardID$ = new BehaviorSubject<any>(null);
  


  public mode$ = new BehaviorSubject<any>('C');
}
