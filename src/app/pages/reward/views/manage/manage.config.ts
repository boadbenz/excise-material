import { RewardHelper } from '../../reward.helper';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IRequestBribe } from '../../interfaces/RequestBribe.interface';
import { IRequestCommand } from '../../interfaces/RequestCommand';

export class ManageConfig extends RewardHelper {
  public ILG60_08_02_00_00E08_EXPANDED$ = new BehaviorSubject<any>(true);
  public ILG60_08_02_00_00E09_EXPANDED$ = new BehaviorSubject<any>(true);
  public ILG60_08_02_00_00E11_EXPANDED$ = new BehaviorSubject<any>(true);
  public ILG60_08_02_00_00E14_EXPANDED$ = new BehaviorSubject<any>(true);

  public ILG60_08_02_00_00E08_DISABLED$ = new BehaviorSubject<any>(false);
  public ILG60_08_02_00_00E09_DISABLED$ = new BehaviorSubject<any>(false);
  public ILG60_08_02_00_00E11_DISABLED$ = new BehaviorSubject<any>(false);
  public ILG60_08_02_00_00E14_DISABLED$ = new BehaviorSubject<any>(false);

  public ILG60_08_02_00_00E09_EDIT = false;

  public ILG60_08_02_00_00E08_DATA$ = new BehaviorSubject<any>(null);
  public ILG60_08_02_00_00E09_DATA: IRequestCommand[] = [];
  public ILG60_08_02_00_00E11_DATA: IRequestBribe[] = [];
  public ILG60_08_02_00_00E14_DATA$ = new BehaviorSubject<any>(null);

  public ILG60_08_02_00_00E09_SAVE: IRequestCommand = {};

  public IndictmentID$ = new BehaviorSubject<number | null>(null);
  public ArrestCode$ = new BehaviorSubject<string | null>(null);

  public CommandID$ = new BehaviorSubject<number | null>(null);
  public PageLoadHaveNotice$ = new BehaviorSubject<number | null>(null);
  public RequestBribeRewardID$ = new BehaviorSubject<number | null>(null);

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

  public RequestBribegetByRequestBribeRewardID$ = new BehaviorSubject<any>(
    null
  );

  public mode$ = new BehaviorSubject<any>('C');
}
