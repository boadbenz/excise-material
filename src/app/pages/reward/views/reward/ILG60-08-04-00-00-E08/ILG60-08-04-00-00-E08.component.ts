import { Component, OnInit, OnDestroy } from '@angular/core';
import { CONFIG } from './CONFIG';
import { ColumnsInterface } from 'app/pages/reward/shared/interfaces/columns-interface';
import { IRewardBinding } from '../reward.config';
import { IRequestReward } from 'app/pages/reward/interfaces/RequestReward';
import { IRequestCompare } from 'app/pages/reward/interfaces/RequestCompare';
import { DropdownInterface } from 'app/pages/reward/shared/interfaces/dropdown-interface';
import { IRequestPaymentFine } from 'app/pages/reward/interfaces/RequestPaymentFine';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { MyDatePickerOptions } from 'app/config/dateFormat';
import { Observable } from 'rxjs/Observable';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter
} from 'rxjs/operators';
import { MasOfficeModel } from 'app/models/mas-office.model';
import { MasOfficeService } from 'app/pages/reward/services/master/MasOffice.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-04-00-00-E08',
  templateUrl: './ILG60-08-04-00-00-E08.component.html',
  styleUrls: ['./ILG60-08-04-00-00-E08.component.scss']
})
// tslint:disable-next-line:class-name
export class ILG6008040000E08Component extends CONFIG
  implements OnInit, OnDestroy {
  public myDatePickerOptions = MyDatePickerOptions;
  public checkAll = false;
  public checkList: boolean[];
  public RequestPaymentFine: IRequestPaymentFine[] = [];
  public listData: any[] = [];
  public MasOfficeMainList: string[] = [];
  public ReferenceNoList: any[] = [];
  public MasOfficeMain: MasOfficeModel[] = [];
  searchStation = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 1
          ? []
          : this.MasOfficeMainList.filter(
              v => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            ).slice(0, 10)
      )
    );
  get RequestRewardDetail(): FormArray {
    return this.formGroup.get('RequestRewardDetail') as FormArray;
  }
  constructor(
    private fb: FormBuilder,
    private masOfficeService: MasOfficeService
  ) {
    super();

    this.formGroup = this.fb.group({
      ReferenceNo: ['', Validators.required],
      RequestRewardCode: ['Auto Generate'],
      RequestDate: [this.setDateNow],
      RequestTime: [this.setTimeNow],
      FineType: ['1'],
      StationCode: [''],
      Station: ['', Validators.required],
      FirstPartTotal: [''],
      FirstMoneyTotal: [''],
      FirstMoneyPerPart: [''],
      FirstRemainder: [''],
      SecondPartTotal: [''],
      SecondMoneyTotal: [''],
      SecondMoneyPerPart: [''],
      SecondRemainder: [''],
      RewardTotal: [''],
      BribeTotal: [''],
      IsActive: ['1'],
      RequestRewardDetail: this.fb.array([])
    });
    this.inputData$
      .takeUntil(this.destroy$)
      .subscribe((res: IRewardBinding) => {
        if (typeof res !== 'undefined' && res && res !== null) {
          console.log('res', res);

          let newMapName;

          switch (res.methodName) {
            case 'RequestRewardgetByCon':
              const dataRequestReward: IRequestReward[] = res.data;

              switch (dataRequestReward[0].FineType) {
                case 0:
                  newMapName = `เลขคดีเปรียบเทียบที่ / ${
                    dataRequestReward[0].ReferenceNo
                  }`;
                  break;
                case 1:
                  newMapName = `คำพิพากษาฎีกาที่ / ${
                    dataRequestReward[0].ReferenceNo
                  }`;
                  break;
              }
              this.ReferenceNoList.push(newMapName);
              // console.log('dataRequestReward', dataRequestReward);
              break;
            case 'RequestComparegetByIndictmentID':
              const dataRequestCompare: IRequestCompare[] = res.data;
              if (dataRequestCompare.length > 0) {
                newMapName = `เลขคดีเปรียบเทียบที่ / ${
                  dataRequestCompare[0].CompareCode
                }`;

                // const RequestRewardCode = this.columnsFormDefault.findIndex(
                //   f => f.field === 'RequestRewardCode'
                // );
                // const ReferenceNo = this.columnsFormDefault.findIndex(
                //   f => f.field === 'ReferenceNo'
                // );

                // const columnsForm: ColumnsInterface[] = this.columnsFormDefault;
                // columnsForm[ReferenceNo].default = newMapName;

                // columnsForm[RequestRewardCode].isDisabled = true;
                // columnsForm[RequestRewardCode].default = 'Auto Generate';
                // // console.log('ReferenceNoData', columnsForm);
                // this.columnsForm = columnsForm;
                // columnsForm.forEach(f => {
                // this.formGroup.controls['ReferenceNo'].setValue(newMapName);
                this.ReferenceNoList.push(newMapName);
                this.formGroup.controls['RequestRewardCode'].setValue(
                  'Auto Generate'
                );
                // })

                // this.columnsForm$.next(this.columnsForm);
                const mapData = dataRequestCompare[0].RequestPaymentFine.map(
                  m => ({
                    ...m,
                    // tslint:disable-next-line:max-line-length
                    LawbreakerName: `${m.LawbreakerTitleName ||
                      ' '}${m.LawbreakerFirstName ||
                      ' '}${m.LawbreakerMiddleName ||
                      ' '}${m.LawbreakerLastName ||
                      ' '}${m.LawbreakerOtherName || ' '}`,
                    PaymentDueDate: `${m.PaymentActualDate}`,
                    BribeMoney: `${m.PaymentFine * 0.2 || 0}`,
                    RewardMoney: `${m.PaymentFine * 0.2 || 0}`
                  })
                );
                this.listData = mapData;
                this.checkList = mapData.map(m => true);
                this.aggregate.BribeMoney.sum = Number(
                  mapData.map(m => m.BribeMoney).reduce((a, b) => (a += b))
                );
                this.aggregate.PaymentFine.sum = Number(
                  mapData.map(m => m.PaymentFine).reduce((a, b) => (a += b))
                );
                this.aggregate.RewardMoney.sum = Number(
                  mapData.map(m => m.RewardMoney).reduce((a, b) => (a += b))
                );
                this.RequestRewardDetail.push(
                  this.fb.group(
                    mapData.map(m => ({
                      RequestRewardDetailID: '',
                      RequestRewardID: '',
                      PaymentFineID: `${m.PaymentFineID || ''}`,
                      IsActive: '1'
                    })).shift()
                  )
                );
                this.checkAll = this.checkChecked(this.checkList);
                this.checkboxCal();
                this.inputDataTable$.next(mapData);
              }

              break;
            case 'ReqeustLawsuitJudgementgetByIndictmentID':
              const dataReqeustLawsuitJudgement: any[] = res.data;
              newMapName = `คำพิพากษาฎีกาที่ / ${
                dataReqeustLawsuitJudgement[0]['JudgementNo']
              }`;
              break;
          }
        }
      });

    this.formGroup
      .get('Station')
      .valueChanges.takeUntil(this.destroy$)
      .subscribe(station => {
        const StationCode = this.MasOfficeMain.filter(
          f => f.OfficeName.toLowerCase() === station.toLowerCase()
        )
          .map(m => m.OfficeCode)
          .shift();
        // console.log('StationCode', StationCode);
        if (StationCode) {
          this.formGroup.get('StationCode').patchValue(StationCode);
        }
      });
  }

  async ngOnInit() {
    const Office: MasOfficeModel[] = await this.masOfficeService
      .MasOfficeMaingetAll()
      .toPromise();
    this.MasOfficeMainList = Office.map(m => m.OfficeName);
    this.MasOfficeMain = Office;
    this.formChange(this.formGroup);
  }

  public checkChecked(arrBool: boolean[]): boolean {
    const d = arrBool.map(m => (m ? 1 : -1));
    let num = 1;
    d.forEach(e => {
      num = num * e;
    });
    return num === 1 ? true : false;
  }
  public checkboxCal() {
    // this.aggregate.BribeMoney.sum =
    this.aggregate.BribeMoney.sum = Number(
      this.listData
        .map((m, index) => (this.checkList[index] ? m.BribeMoney : null))
        .reduce((a, b) => (a += b))
    );
    this.aggregate.PaymentFine.sum = Number(
      this.listData
        .map((m, index) => (this.checkList[index] ? m.PaymentFine : null))
        .reduce((a, b) => (a += b))
    );
    this.aggregate.RewardMoney.sum = Number(
      this.listData
        .map((m, index) => (this.checkList[index] ? m.RewardMoney : null))
        .reduce((a, b) => (a += b))
    );

    this.formGroup
      .get('RewardTotal')
      .patchValue(this.aggregate.RewardMoney.sum);
    this.formGroup.get('BribeTotal').patchValue(this.aggregate.BribeMoney.sum);
    this.aggregateHandle.emit({
      BribeMoney: this.aggregate.BribeMoney.sum,
      PaymentFine: this.aggregate.PaymentFine.sum,
      RewardMoney: this.aggregate.RewardMoney.sum
    });
  }
  public checkboxHandle(PaymentFineID, i, checked) {
    if (checked) {
      this.RequestRewardDetail.push(
        this.fb.group({
          RequestRewardDetailID: '',
          RequestRewardID: '',
          PaymentFineID: `${PaymentFineID || ''}`,
          IsActive: '1'
        })
      );
    } else {
      this.RequestRewardDetail.removeAt(i);
    }
    this.checkboxCal();
  }
  public ILG60_08_04_00_00_E09_OnSelect() {
    // 1 START
    this.columnsForm = this.columnsForm.map(m => ({
      ...m,
      default: '',
      default2: ''
    }));

    // 2
    this.inputDataTable$.next(null);

    // 3
  }
  public formChange(formGroup: FormGroup) {
    this.emitChange.emit({
      FormName: 'ILG60-08-04-00-00-E08',
      FormData: formGroup
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
