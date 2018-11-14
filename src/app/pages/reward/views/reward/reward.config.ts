import { RewardHelper } from '../../reward.helper';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export interface IRewardBinding {
    methodName?: string;
    data?: any;
}
export class RewardConfig extends RewardHelper {

    // ส่วนคำร้องขอรับเงินรางวัล
    public ILG60_08_04_00_00_E08_EXPANDED$ = new BehaviorSubject<boolean>(true); // ปุ่ม ย่อขยาย Collapse Panel
    public ILG60_08_04_00_00_E08_DISABLED$ = new BehaviorSubject<boolean>(false); // ปุ่ม ย่อขยาย Collapse Panel DISABLED

    // ส่วนตารางการแบ่งจ่ายเงินสินบนรางวัล
    public ILG60_08_04_00_00_E12_EXPANDED$ = new BehaviorSubject<boolean>(true); // ปุ่ม ย่อขยาย Collapse Panel
    public ILG60_08_04_00_00_E12_DISABLED$ = new BehaviorSubject<boolean>(false); // ปุ่ม ย่อขยาย Collapse Panel DISABLED

    // ส่วนเอกสารแนบ
    public ILG60_08_04_00_00_E19_EXPANDED$ = new BehaviorSubject<boolean>(true); // ปุ่ม ย่อขยาย Collapse Panel
    public ILG60_08_04_00_00_E19_DISABLED$ = new BehaviorSubject<boolean>(false); // ปุ่ม ย่อขยาย Collapse Panel DISABLED

}
