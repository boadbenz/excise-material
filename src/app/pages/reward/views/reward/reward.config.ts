import { RewardHelper } from '../../reward.helper';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IRequestCompare } from '../../interfaces/RequestCompare';
import { IRequestLawsuitJudgement } from '../../interfaces/RequestLawsuitJudgement';
import { MasDocumentModel } from 'app/models/mas-document.model';
import {
  IRequestReward,
  IRequestRewardinsAll
} from '../../interfaces/RequestReward';
import { IRequestRewardStaff } from '../../interfaces/RequestRewardStaff';
export interface IRewardBinding {
  methodName?: string;
  data?: any[];
}
export class RewardConfig extends RewardHelper {
  public OfficeCode = '102546';
  public RequestBribeCode: string;
  public RequestRewardCode: string;

  public mode$ = new BehaviorSubject<string>('');
  public IndictmentID$ = new BehaviorSubject<number>(null);
  public RequestBribeRewardID$ = new BehaviorSubject<number>(null);
  public RequestRewardID$ = new BehaviorSubject<number>(null);

  // ส่วนคำร้องขอรับเงินรางวัล
  public ILG60_08_04_00_00_E08_EXPANDED = true; // ปุ่ม ย่อขยาย Collapse Panel
  public ILG60_08_04_00_00_E08_DISABLED$ = new BehaviorSubject<boolean>(false); // ปุ่ม ย่อขยาย Collapse Panel DISABLED
  public ILG60_08_04_00_00_E08_DATA$ = new BehaviorSubject<IRewardBinding>(
    null
  );
  public ILG60_08_04_00_00_E08_FORM_VALID: boolean;
  public ILG60_08_04_00_00_E08_FORM_DATA: any;

  // ส่วนตารางการแบ่งจ่ายเงินสินบนรางวัล
  public ILG60_08_04_00_00_E12_EXPANDED = true; // ปุ่ม ย่อขยาย Collapse Panel
  public ILG60_08_04_00_00_E12_DISABLED$ = new BehaviorSubject<boolean>(false); // ปุ่ม ย่อขยาย Collapse Panel DISABLED
  public ILG60_08_04_00_00_E12_DATA$ = new BehaviorSubject<any>(null);
  public ILG60_08_04_00_00_E12_FORM_VALID: boolean;
  public ILG60_08_04_00_00_E12_FORM_DATA: any;
  // ส่วนเอกสารแนบ
  public ILG60_08_04_00_00_E19_EXPANDED = true; // ปุ่ม ย่อขยาย Collapse Panel
  public ILG60_08_04_00_00_E19_DISABLED$ = new BehaviorSubject<boolean>(false); // ปุ่ม ย่อขยาย Collapse Panel DISABLED
  public ILG60_08_04_00_00_E19_DATA$ = new BehaviorSubject<any>(null);
  public ILG60_08_04_00_00_E19_FORM_VALID: boolean;
  public ILG60_08_04_00_00_E19_FORM_DATA: any;

  public RequestPaymentFineupdByCon: number[] = [];
  public RequestRewardDetailupdDelete: number[] = [];
  public RequestRewardStaffupdDelete: number[] = [];
  public RequestRewardStaffupdByCon: IRequestRewardStaff[] = [];
  public RequestRewardUpd$ = new BehaviorSubject<IRequestReward>(null);

  public requestCompare$ = new BehaviorSubject<IRequestCompare[]>(null);
  public RequestReward$ = new BehaviorSubject<IRequestReward[]>(null);
  public MasDocument$ = new BehaviorSubject<MasDocumentModel[]>(null);

  public requstLawsuitJudgement$ = new BehaviorSubject<
    IRequestLawsuitJudgement[]
  >(null);

  public Input_nonRequestRewardStaff$ = new BehaviorSubject<any>(null);
  public Input_RequestBribeRewardgetByIndictmentID$ = new BehaviorSubject<any>(
    null
  );
  public Input_RequestRewardgetByCon$ = new BehaviorSubject<any>(null);
}
