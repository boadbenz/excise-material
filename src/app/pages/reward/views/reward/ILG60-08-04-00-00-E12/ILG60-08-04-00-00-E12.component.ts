import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { INonRequestRewardStaff } from 'app/pages/reward/interfaces/NonRequestRewardStaff';
import { IRewardBinding } from '../reward.config';
import { DropdownInterface } from 'app/pages/reward/shared/interfaces/dropdown-interface';
import { Observable } from 'rxjs/Observable';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { MasTitleService } from 'app/pages/reward/services/master/MasTitle.service';
import { MasTitleModel, MasStaffModel } from 'app/models';
import { MasStaffService } from 'app/pages/reward/services/master/MasStaff.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-04-00-00-E12',
  templateUrl: './ILG60-08-04-00-00-E12.component.html',
  styleUrls: ['./ILG60-08-04-00-00-E12.component.scss']
})
export class ILG6008040000E12Component extends CONFIG implements OnInit {
  public formGroup: FormGroup;
  public newAddValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  public aggregate = {
    FirstMoney: {
      sum: 0
    },
    SecondMoney: {
      sum: 0
    },
    FirstPart: {
      sum: 0
    },
    SecondPart: {
      sum: 0
    },
    ToTalMoney: {
      sum: 0
    }
  };
  public SumBribeMoney = 0;
  public SumRewardMoney = 0;
  // public SumFirstMoney = 0;
  public FirstPartTotal = 0;
  public FirstMoneyTotal = 0;
  // public SumSecondMoney = 0;
  public SecondPartTotal = 0;
  public SecondMoneyTotal = 0;
  // public SumTotalMoney = 0;
  public HaveNotice = 0;
  // public nonRequestRewardStaffData: any[] = [];

  public datatable: any[] = [];
  public staffAll: MasStaffModel[] = [];
  public TitleList: string[] = [];
  public StaffList: string[] = [];
  public PositionNameList: string[] = [];
  public nonRequestRewardStaff: INonRequestRewardStaff[] = [];
  public Staff_StaffCode_List: DropdownInterface[] = [];

  SumTotalMoney = () => this.FirstMoneyTotal + this.SecondMoneyTotal;
  SumMoney = () => this.SumBribeMoney + this.SumRewardMoney;
  SumFirstMoney = () => (this.SumRewardMoney || 0) / 3;
  SumFirstMoneyPerPart = () => this.SumFirstMoney() / this.FirstPartTotal;
  FirstRemainder = () => this.SumFirstMoney() - this.FirstMoneyTotal;
  SumSecondMoney = () => ((this.SumRewardMoney) / 3) * 2;
  SumSecondMoneyPerPart = () => this.SumSecondMoney() / this.SecondPartTotal;
  SecondRemainder = () => this.SumSecondMoney() - this.SecondMoneyTotal;

  searchTitleName = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 1
          ? []
          : this.TitleList.filter(
              v => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            ).slice(0, 10)
      )
    ); // ยศ	Column	Key Press	ILG60-08-04-00-00-E15
  searchFullName = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 1
          ? []
          : this.Staff_StaffCode_List.filter(
              v => v.text.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
              .slice(0, 10)
              .map(m => m.text)
      )
    ); // ชื่อ-สกุล	Column	Key Press	ILG60-08-04-00-00-E16
  // ชื่อ-สกุล	Column	Text Change	ILG60-08-04-00-00-E17

  get RequestBribeRewardForm(): FormArray {
    return this.formGroup.get('RequestBribeRewardForm') as FormArray;
  }
  get RequestRewardForm(): FormArray {
    return this.formGroup.get('RequestRewardForm') as FormArray;
  }
  get nonRequestRewardStaffForm(): FormArray {
    return this.formGroup.get('nonRequestRewardStaffForm') as FormArray;
  }
  get sharedBribeRewardForm(): FormArray {
    return this.formGroup.get('sharedBribeRewardForm') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private masTitleService: MasTitleService,
    private masStaffService: MasStaffService
  ) {
    super();
    this.formGroup = this.fb.group({
      RequestBribeRewardForm: this.fb.array([]),
      RequestRewardForm: this.fb.array([]),
      nonRequestRewardStaffForm: this.fb.array([]),
      sharedBribeRewardForm: this.fb.array([])
    });
    this.aggregate08.subscribe(aggregate08 => {
      if (aggregate08 !== null) {
        this.SumBribeMoney = aggregate08['BribeMoney'];
        this.SumRewardMoney = aggregate08['RewardMoney'];
        if (this.RequestBribeRewardForm.length > 0) {
          this.RequestBribeRewardForm.at(0)
            .get('ToTalMoney')
            .patchValue(aggregate08['BribeMoney']);
        }
        this.aggregate.ToTalMoney.sum = aggregate08['BribeMoney'];
      }
    });
    this.inputData$.subscribe((data: IRewardBinding) => {
      if (data) {
        switch (data.methodName) {
          case 'nonRequestRewardStaff':
            this.nonRequestRewardStaff = data.data;

            this.aggregate.FirstPart.sum += data.data
              .map(m =>
                m.ContributorID === '6' || m.ContributorID === '7' ? 1 : null
              )
              .reduce((a, b) => (a += b));

            this.aggregate.FirstMoney.sum += data.data
              .map(
                m =>
                  (Number(this.aggregate.FirstMoney.sum || 0) /
                    Number(this.aggregate.FirstPart.sum || 0)) *
                  Number(
                    m.ContributorID === '6' || m.ContributorID === '7'
                      ? 1
                      : null || 0
                  )
              )
              .reduce((a, b) => (a += b));

            this.aggregate.SecondPart.sum += 0;
            this.aggregate.SecondMoney.sum += data.data
              .map(
                () =>
                  (Number(this.aggregate.SecondMoney.sum || 0) /
                    Number(this.aggregate.SecondPart.sum || 0)) *
                  Number(null || 0)
              )
              .reduce((a, b) => (a += b));

            // Object.keys(this.aggregate).forEach(element => {
            //   const keyObj = {};
            //   // Object.assign(keyObj, element);

            //   keyObj[element] = data.data.map(m => m[element]);
            //   this.aggregate[element].sum = keyObj[element].reduce(
            //     (a, b) => (a += b)
            //   );
            // });

            const datatable_nonRequestRewardStaff = this.nonRequestRewardStaff.map(
              m => ({
                ...m,
                check: true,
                FullName: `${m.TitleName}${m.FirstName}${m.LastName}`,
                ContributorName: this.ConvertContributorName(m.ContributorID),
                FirstPart:
                  m.ContributorID === '6' || m.ContributorID === '7' ? 1 : null,
                SecondPart: null,

                FirstMoney:
                  (Number(this.aggregate.FirstMoney.sum || 0) /
                    Number(this.aggregate.FirstPart.sum || 0)) *
                    Number(
                      m.ContributorID === '6' || m.ContributorID === '7'
                        ? 1
                        : null || 0
                    ) || 0,

                SecondMoney:
                  (Number(this.aggregate.SecondMoney.sum || 0) /
                    Number(this.aggregate.SecondPart.sum || 0)) *
                    Number(null || 0) || 0,
                ToTalMoney:
                  Number(
                    (Number(this.aggregate.FirstMoney.sum || 0) /
                      Number(this.aggregate.FirstPart.sum || 0)) *
                      Number(
                        m.ContributorID === '6' || m.ContributorID === '7'
                          ? 1
                          : null || 0
                      ) || 0
                  ) +
                    Number(
                      (Number(this.aggregate.SecondMoney.sum || 0) /
                        Number(this.aggregate.SecondPart.sum || 0)) *
                        Number(null || 0) || 0
                    ) || 0
              })
            );

            const control_nonRequestRewardStaff: FormArray = <FormArray>(
              this.nonRequestRewardStaffForm
            );

            datatable_nonRequestRewardStaff.forEach(x => {
              const objForm = {};
              Object.keys(x).forEach(f => {
                objForm[f] = [x[f]];
              });

              this.aggregate.ToTalMoney.sum += this.SumBribeMoney;
              const newGroup: FormGroup = this.fb.group(objForm);
              control_nonRequestRewardStaff.push(newGroup);
            });
            break;

          case 'RequestBribeRewardgetByIndictmentID':
            console.log('RequestBribeRewardgetByIndictmentID', data.data);

            const datatable_RequestBribeReward = data.data;

            const control_RequestBribeRewardForm: FormArray = <FormArray>(
              this.RequestBribeRewardForm
            );
            datatable_RequestBribeReward
              .filter(f => f.HaveNotice === 1)
              .forEach(x => {
                const newGroup: FormGroup = this.fb.group({
                  check: [true],
                  TitleName: [''],
                  FullName: ['สายลับ (ขอปิดนาม)'],
                  PositionName: [''],
                  PosLevelName: [''],
                  ContributorName: ['ผู้แจ้งความนำจับ'],
                  ContributorID: [''],
                  FirstPart: [null],
                  FirstMoney: [null],
                  SecondPart: [null],
                  SecondMoney: [null],
                  ToTalMoney: [this.SumBribeMoney]
                });
                this.aggregate.ToTalMoney.sum += this.SumBribeMoney;
                control_RequestBribeRewardForm.push(newGroup);
              });
            break;

          case 'RequestRewardgetByCon':
            console.log('RequestRewardgetByCon', data.data);
            const datatable_RequestReward = data.data[0].RequestRewardStaff.map(
              m => ({
                ...m,
                check: true,
                FullName: `${m.TitleName}${m.FirstName}${m.LastName}`,
                ContributorName: m.ContributorName
              })
            );

            const control_RequestReward: FormArray = <FormArray>(
              this.RequestRewardForm
            );
            datatable_RequestReward.forEach(x => {
              const objForm = {};
              Object.keys(x).forEach(f => {
                objForm[f] = [x[f]];
              });
              this.aggregate.FirstMoney.sum += x['FirstMoney']
              this.aggregate.SecondMoney.sum += x['SecondMoney']
              this.aggregate.FirstPart.sum += x['FirstPart']
              this.aggregate.SecondPart.sum += x['SecondPart']
              this.aggregate.ToTalMoney.sum += x['TotalMoney'];
              const newGroup: FormGroup = this.fb.group(objForm);
              control_RequestReward.push(newGroup);
            });
            break;
        }
      }
    });

    this.nonRequestRewardStaffForm.valueChanges.subscribe(
      (selectedValue: any[]) => {
        console.log(
          `this.nonRequestRewardStaffForm.valid`,
          this.nonRequestRewardStaffForm
        );

        if (this.nonRequestRewardStaffForm.valid) {
          this.ILG60_08_04_00_00_E13_BUTTON$.next({ DISABLED: false });
        }
        if (selectedValue.length > 0) {
          Object.keys(this.aggregate).forEach(element => {
            const arr: number[] = selectedValue.map(m => Number(m[element]));
            this.aggregate[element].sum = arr.reduce((a, b) => (a += b));
          });
        }
      }
    );
  }
  ngOnInit() {
    this.masTitleService
      .MasTitleMaingetAll()
      .subscribe((TitleMain: MasTitleModel[]) => {
        this.TitleList = TitleMain.map(m => m.TitleNameTH);
      });
    this.masStaffService
      .MasStaffMaingetAll()
      .subscribe((StaffMain: MasStaffModel[]) => {
        this.staffAll = StaffMain;
        this.Staff_StaffCode_List = StaffMain.map(m => ({
          text: `${m.TitleName}${m.FirstName} ${m.LastName}`,
          value: m.StaffCode
        }));
        this.StaffList = StaffMain.map(
          m => `${m.TitleName}${m.FirstName} ${m.LastName}`
        );

        // this.PositionNameList = TitleMain.map(m => m.PosLevelName);
      });
  }
  public changeFullName(text, index) {
    const control = <FormArray>this.nonRequestRewardStaffForm;
    const StaffCodeMap = this.Staff_StaffCode_List.filter(f => f.text === text)
      .map(m => m.value)
      .shift();
    const PositionName =
      this.staffAll
        .filter(f => f.StaffCode === StaffCodeMap)
        .map(m => m.OperationPosName)
        .shift() || '';
    const PosLevelName =
      this.staffAll
        .filter(f => f.StaffCode === StaffCodeMap)
        .map(m => m.PosLevelName)
        .shift() || '';
    control
      .at(index)
      .get('PositionName')
      .patchValue(PositionName);
    control
      .at(index)
      .get('PosLevelName')
      .patchValue(PosLevelName);
  }
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
  public onSelectContributor(id, index: number) {
    if (index > -1) {
      const control = <FormArray>this.nonRequestRewardStaffForm;
      // tslint:disable-next-line:max-line-length
      control
        .at(index)
        .get('ContributorName')
        .patchValue(
          this.ContributorList.filter(f => f.value === id)
            .map(m => m.text)
            .shift() || ' '
        );
    }
  }
  public addRow() {
    // This function instantiates a FormGroup for each day
    // and pushes it to our FormArray

    // We get our FormArray
    const control = <FormArray>this.sharedBribeRewardForm;

    // instantiate a new day FormGroup;
    const newDayGroup: FormGroup = this.initItems();
    this.ILG60_08_04_00_00_E13_BUTTON$.next({ DISABLED: true });
    // Add it to our formArray
    control.push(newDayGroup);
  }

  public initItems(): FormGroup {
    // Here, we make the form for each day
    const objForm = {};
    Object.keys(this.formObject).forEach(f => {
      objForm[f] = [this.formObject[f], Validators.required];
    });

    return this.fb.group(objForm);
  }

  public submit() {
    // do stuff and submit result
    console.log(this.formGroup.value);
  }

  // public sumTotal() {
  //   return {
  //     SumMoney: Number(this.SumBribeMoney) + Number(this.SumRewardMoney),
  //     SumFirstMoney: Number(this.SumRewardMoney) / 3,
  //     SumFirstMoneyPerPart:
  //       Number(this.SumFirstMoney) / Number(this.FirstPartTotal),
  //     FirstRemainder: Number(this.SumFirstMoney) - Number(this.FirstMoneyTotal),
  //     SumSecondMoney: (Number(this.SumRewardMoney) / 3) * 2,
  //     SumSecondMoneyPerPart:
  //       Number(this.SumSecondMoney) / Number(this.SecondPartTotal),
  //     SecondRemainder:
  //       Number(this.SumSecondMoney) - Number(this.SecondMoneyTotal)
  //   };
  // }
  public deleteHandle(rowItem) {
    const control = <FormArray>this.sharedBribeRewardForm;
    // remove the chosen row
    control.removeAt(rowItem);
  }
  public formChange(formGroup: FormGroup) {
    this.emitChange.emit({
      FormName: 'ILG60-08-04-00-00-E12',
      FormData: formGroup
    });
  }
}
