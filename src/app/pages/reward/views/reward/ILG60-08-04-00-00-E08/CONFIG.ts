import { RewardConfig } from '../reward.config';
import { ColumnsInterface } from 'app/pages/reward/shared/interfaces/columns-interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Input } from '@angular/core';
import { ITableDataOptions } from 'app/pages/reward/shared/table-data/table-data.config';

export class CONFIG extends RewardConfig {
  public TableDataOptions: ITableDataOptions = {};
  @Input()
  set inputData(val) {
    this.inputData$.next(val);
  }
  get inputData() {
    return this.inputData$.asObservable();
  }
  public inputData$ = new BehaviorSubject<any>(null);

  @Input()
  set RequestReward(val) {
    this.RequestReward$.next(val);
  }
  get RequestReward() {
    return this.RequestReward$.asObservable();
  }
  public RequestReward$ = new BehaviorSubject<any>(null);

  @Input()
  set requstLawsuitJudgement(val) {
    this.requstLawsuitJudgement$.next(val);
  }
  get requstLawsuitJudgement() {
    return this.requstLawsuitJudgement$.asObservable();
  }
  public requstLawsuitJudgement$ = new BehaviorSubject<any>(null);

  @Input()
  set requestCompare(val) {
    this.requestCompare$.next(val);
  }
  get requestCompare() {
    return this.requestCompare$.asObservable();
  }
  public requestCompare$ = new BehaviorSubject<any>(null);
  public columnsForm: ColumnsInterface[] = [];
  public columnsFormDefault: ColumnsInterface[] = [
    {
      title: 'เลขที่อ้างอิง',
      field: 'ReferenceNo',
      inputType: 'text',
      default: '',
      isDisabled: true
    },
    {
      title: 'เลขที่คำร้องขอ',
      field: 'RequestRewardCode',
      inputType: 'text',
      default: '',
      isDisabled: true
    },
    {
      title: 'เขียนที่',
      field: 'Station',
      inputType: 'text',
      default: '',
      isDisabled: false
    },
    {
      title: 'วันที่จัดทำ',
      field: 'RequestDate',
      inputType: 'text',
      isDisabled: false,
      default: '',
      title2: 'เวลา',
      field2: 'RequestTime',
      inputType2: 'text',
      isDisabled2: false,
      default2: '',
    }
  ];
  public aggregate = {
    PaymentFine: {
      sum: 0
    },
    BribeMoney: {
      sum: 0
    },
    RewardMoney: {
      sum: 0
    }
  };
  public columnsTable: ColumnsInterface[] = [
    {
      title: 'ชื่อผู้ต้องหา',
      field: 'LawbreakerName' // LawbreakerTitleName +LawbreakerFirstName + LawbreakerMiddleName +LawbreakerLastName +LawbreakerOtherName
    },
    {
      title: 'วันที่ชำระ',
      field: 'PaymentDueDate'
    },
    {
      title: 'ใบเสร็จเล่มที่',
      field: 'ReceiptBookNo'
    },
    {
      title: 'เลขที่อ้างอิง', // -	ReceiptNo  -	JudgementNo

      field: 'ReceiptNo'
    },
    {
      title: 'งวดชำระ',
      field: 'PaymentPeriodNo'
    },
    {
      title: 'ค่าปรับตามงวด',
      field: 'PaymentFine',
      isSum: true
    },
    {
      title: 'เงินสินบน',
      field: 'BribeMoney', // BribeMoney = (PaymentFine * 0.2)
      isSum: true
    },
    {
      title: 'เงินรางวัล',
      field: 'RewardMoney', // RewardMoney = (PaymentFine * 0.2)
      isSum: true
    }
  ];
  public columnsForm$ = new BehaviorSubject<any>(this.columnsForm);
  public columnsTable$ = new BehaviorSubject<any>(this.columnsTable);

  public inputDataTable$ = new BehaviorSubject<any>(null);
}
