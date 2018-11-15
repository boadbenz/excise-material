import { RewardHelper } from '../../reward.helper';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IRequestCompare } from '../../interfaces/RequestCompare';
import { IRequestLawsuitJudgement } from '../../interfaces/RequestLawsuitJudgement';
export interface IRewardBinding {
    methodName?: string;
    data?: any;
}
export class RewardConfig extends RewardHelper {
    public mode$ = new BehaviorSubject<string>('');
    public IndictmentID$ = new BehaviorSubject<number>(null);
    public RequestBribeRewardID$ = new BehaviorSubject<number>(null);

    // ส่วนคำร้องขอรับเงินรางวัล
    public ILG60_08_04_00_00_E08_EXPANDED$ = new BehaviorSubject<boolean>(true); // ปุ่ม ย่อขยาย Collapse Panel
    public ILG60_08_04_00_00_E08_DISABLED$ = new BehaviorSubject<boolean>(false); // ปุ่ม ย่อขยาย Collapse Panel DISABLED
    public ILG60_08_04_00_00_E08_DATA$ = new BehaviorSubject<any>(null);
    // ส่วนตารางการแบ่งจ่ายเงินสินบนรางวัล
    public ILG60_08_04_00_00_E12_EXPANDED$ = new BehaviorSubject<boolean>(true); // ปุ่ม ย่อขยาย Collapse Panel
    public ILG60_08_04_00_00_E12_DISABLED$ = new BehaviorSubject<boolean>(false); // ปุ่ม ย่อขยาย Collapse Panel DISABLED
    public ILG60_08_04_00_00_E12_DATA$ = new BehaviorSubject<any>(null);
    // ส่วนเอกสารแนบ
    public ILG60_08_04_00_00_E19_EXPANDED$ = new BehaviorSubject<boolean>(true); // ปุ่ม ย่อขยาย Collapse Panel
    public ILG60_08_04_00_00_E19_DISABLED$ = new BehaviorSubject<boolean>(false); // ปุ่ม ย่อขยาย Collapse Panel DISABLED
    public ILG60_08_04_00_00_E19_DATA$ = new BehaviorSubject<any>(null);

    public requestCompare$  = new BehaviorSubject<IRequestCompare[]>(null);
    public requstLawsuitJudgement$  = new BehaviorSubject<IRequestLawsuitJudgement[]>(null);
}
