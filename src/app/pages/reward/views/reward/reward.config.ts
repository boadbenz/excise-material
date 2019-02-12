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
import { DropdownInterface } from '../../shared/interfaces/dropdown-interface';
import { Validators } from '@angular/forms';
export interface IRewardBinding {
  methodName?: string;
  data?: any[];
}
export const ContributorList: DropdownInterface[] = [
  {
    text: 'ผู้แจ้งความนำจับ',
    value: 0
  },
  {
    text: 'ผู้สั่งการ',
    value: 1
  },
  {
    text: 'เจ้าพนักงานผู้จับกุม',
    value: 2
  },
  {
    text: 'เจ้าหน้าที่สนับสนุน',
    value: 3
  },
  {
    text: 'เจ้าพนักงานผู้จับกุม',
    value: 6
  },
  {
    text: 'ผู้ร่วมจับกุม',
    value: 7
  }
];
export class RewardConfig extends RewardHelper {
  public OfficeCode = localStorage.getItem('officeCode');

  public ContributorList: DropdownInterface[] = ContributorList;
  public RequestBribeCode: string;
  public RequestRewardCode: string;

  public mode: string;
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

  public formObject = {
    check: true,
    sort: 4,
    TitleName: ['' , Validators.required],
    FullName: ['' , Validators.required],
    PositionName: ['' , Validators.required],
    PosLevelName: ['' , Validators.required],
    ContributorName: ['' , Validators.required],
    ContributorID: ['' , Validators.required],
    FirstPart: 0,
    FirstMoney: 0,
    SecondPart: 0,
    SecondMoney: 0,
    MoneySort1: 0,
    ToTalMoney: 0,
    StaffID: '',
    ProgramCode: '',
    ProcessCode: '',
    RequestRewardID: '',
    StaffCode: '',
    FirstName: '',
    LastName: '',
    PositionCode: '',
    PosLevel: '',
    DepartmentCode: '',
    DepartmentName: '',
    DepartmentLevel: '',
    OfficeCode: '',
    OfficeName: '',
    OfficeShortName: '',
    IsActive: '1',
    DateReceiveMoney: ''
  };
  public ConvertContributorName(id): string {
    let name = '';
    switch (id) {
      case '6':
        name = 'เจ้าพนักงานผู้จับกุม';
        break;
      case '7':
        name = 'ผู้ร่วมจับกุม';
        break;

      default:
        name = 'เจ้าหน้าที่สนับสนุน';
        break;
    }
    return name;
  }
}
