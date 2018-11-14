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
  public columnsForm: ColumnsInterface[] = [
    {
      title: 'เลขที่อ้างอิง',
      field: 'ReferenceNo',
      isDisabled: true
    },
    {
      title: 'เลขที่คำร้องขอ',
      field: 'RequestRewardCode',
      isDisabled: true
    },
    {
      title: 'เขียนที่',
      field: 'Station',
      isDisabled: true
    },
    {
      title: 'วันที่จัดทำ',
      field: 'RequestDate',
      isDisabled: true,
      title2: 'เวลา',
      field2: 'RequestTime',
      isDisabled2: true
    }
  ];
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
      field: 'PaymentFine'
    },
    {
      title: 'เงินสินบน',
      field: 'BribeMoney' // BribeMoney = (PaymentFine * 0.2)
    },
    {
      title: 'เงินรางวัล',
      field: 'RewardMoney' // RewardMoney = (PaymentFine * 0.2)
    },
    {
      title: 'รวม [ค่าปรับตามงวด]',
      field: 'SumPaymentFine' // SumPaymentFine = (PaymentFine +…+ PaymentFine
    },
    {
      title: 'รวม [เงินสินบน]',
      field: 'SumBribeMoney' // SumBribeMoney = (BribeMoney +…+ BribeMoney)
    },
    {
      title: 'รวม [เงินรางวัล]',
      field: 'SumRewardMoney' // SumRewardMoney = (RewardMoney +…+ RewardMoney)
    }
  ];
  public columnsForm$ = new BehaviorSubject<any>(this.columnsForm);
  public columnsTable$ = new BehaviorSubject<any>(this.columnsTable);

  public inputDataTable$ = new BehaviorSubject<any>(null);
}
