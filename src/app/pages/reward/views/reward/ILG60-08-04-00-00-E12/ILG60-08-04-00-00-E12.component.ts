import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { INonRequestRewardStaff } from 'app/pages/reward/interfaces/NonRequestRewardStaff';
import { IRewardBinding } from '../reward.config';
import { DropdownInterface } from 'app/pages/reward/shared/interfaces/dropdown-interface';
import { Observable } from 'rxjs/Observable';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
  tap
} from 'rxjs/operators';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-04-00-00-E12',
  templateUrl: './ILG60-08-04-00-00-E12.component.html',
  styleUrls: ['./ILG60-08-04-00-00-E12.component.scss']
})
export class ILG6008040000E12Component extends CONFIG implements OnInit {
  public formGroup: FormGroup;
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
  public SumFirstMoney = 0;
  public FirstPartTotal = 0;
  public FirstMoneyTotal = 0;
  public SumSecondMoney = 0;
  public SecondPartTotal = 0;
  public SecondMoneyTotal = 0;
  // public nonRequestRewardStaffData: any[] = [];

  public datatable: any[] = [];
  constructor(private fb: FormBuilder) {
    super();
    this.formGroup = this.fb.group({
      sharedBribeReward: this.fb.array([])
    });

    this.inputData$.subscribe((data: IRewardBinding) => {
      if (data) {
        // const control = <FormArray>this.formGroup.controls['sharedBribeReward'];
        switch (data.methodName) {
          case 'nonRequestRewardStaff':
            // console.log('nonRequestRewardStaff', data.data);
            // this.nonRequestRewardStaffData = data.data;
            this.datatable = data.data.map(m => ({
              ...m,
              FullName: `${m.TitleName}${m.FirstName}${m.LastName}`,
              ContributorName: this.ConvertContributorName(m.ContributorID),
              FirstPart:
                m.ContributorID === 6 || m.ContributorID === 7 ? 1 : '',
              FirstMoney:
                (Number(this.aggregate.FirstMoney.sum || 0) /
                  Number(this.aggregate.FirstPart.sum || 0)) *
                Number(m.FirstPart || 0),
              SecondMoney:
                (Number(this.aggregate.SecondMoney.sum || 0) /
                  Number(this.aggregate.SecondPart.sum || 0)) *
                Number(m.SecondPart || 0),
              ToTalMoney: Number(m.FirstMoney || 0) + Number(m.SecondMoney || 0)
            }));
            // data.data.forEach(e => {
            //   // instantiate a new day FormGroup;
            //   const newDayGroup: FormGroup = this.fb.group({
            //     check: [true],
            //     TitleName: [e.TitleName],
            //     FullName: [
            //       `${e.TitleName}${e.FirstName}${e.LastName}`,
            //       Validators.required
            //     ],
            //     PositionName: [`${e.PositionName}`],
            //     PosLevelName: [`${e.PosLevelName}`],
            //     ContributorName: [
            //       `${this.ConvertContributorName(e.ContributorID)}`,
            //       Validators.required
            //     ],
            //     ContributorID: [`${e.ContributorID}`],
            //     FirstPart: [
            //       e.ContributorID === 6 || e.ContributorID === 7 ? 1 : ''
            //     ],
            //     SecondPart: [''],
            //     FirstMoney: [
            //       (this.SumFirstMoney / this.FirstPartTotal) * e.FirstPart
            //     ],
            //     SecondMoney: [
            //       (this.SumSecondMoney / this.SecondPartTotal) * e.SecondPart
            //     ],
            //     ToTalMoney: [e.FirstMoney + e.SecondMoney]
            //   });
            //   // Add it to our formArray
            //   control.push(newDayGroup);
            //   // console.log('control.value', control.value);
            // });
            break;

          case 'RequestBribeRewardgetByIndictmentID':
            console.log('RequestBribeRewardgetByIndictmentID', data.data);

            // data.data.forEach(e => {
            //   // instantiate a new day FormGroup;
            //   if (e.HaveNotice === 1) {
            //     const newDayGroup: FormGroup = this.fb.group({
            //       check: [true],
            //       TitleName: [''],
            //       FullName: [''],
            //       PositionName: [''],
            //       PosLevelName: [''],
            //       ContributorName: [
            //         `${e.HaveNotice === 1 ? 'ผู้แจ้งความนำจับ' : ''}`,
            //         Validators.required
            //       ],
            //       ContributorID: [''],
            //       FirstPart: [''],
            //       SecondPart: [''],
            //       FirstMoney: [''],
            //       SecondMoney: [''],
            //       ToTalMoney: [e.HaveNotice === 1 ? this.SumBribeMoney : 0]
            //     });

            //     // Add it to our formArray
            //     control.push(newDayGroup);
            //   }
            // });
            break;

          case 'RequestRewardgetByCon':
            console.log('RequestRewardgetByCon', data.data);
            this.datatable = data.data[0].RequestRewardStaff.map(m => ({
              ...m,
              FullName: `${m.TitleName}${m.FirstName}${m.LastName}`,
              ContributorName: m.ContributorName
            }));
            break;
        }
      }
    });
    this.aggregate08.subscribe(res => {
      console.log('ageee', res);
      if (res !== null) {
        this.SumBribeMoney = res['BribeMoney'];
        this.SumRewardMoney = res['RewardMoney'];
        this.changeReactiveForm();
      }
    });
    this.formGroup.controls['sharedBribeReward'].valueChanges.subscribe(
      selectedValue => {
        Object.keys(this.aggregate).forEach(element => {
          const arr: number[] = selectedValue.map(m => Number(m[element]));
          this.aggregate[element].sum = arr.reduce((a, b) => (a += b));
        });
      }
    );
  }

  ngOnInit() {}
  public changeReactiveForm() {
    // const control = <FormArray>this.formGroup.controls['sharedBribeReward'];
    // control.controls[0]['ToTalMoney'].setValue(Number(res['BribeMoney']));
    // console.log('formList', control.controls);
    // this.nonRequestRewardStaffData.forEach((element, index) => {
    //   control.controls[index].get('check').setValue(true);
    //   control.controls[index].get('TitleName').setValue(element.TitleName);
    //   control.controls[index]
    //     .get('FullName')
    //     .setValue(
    //       `${element.TitleName}${element.FirstName}${element.LastName}`,
    //       Validators.required
    //     );
    //   control.controls[index]
    //     .get('PositionName')
    //     .setValue(`${element.PositionName}`);
    //   control.controls[index]
    //     .get('PosLevelName')
    //     .setValue(`${element.PosLevelName}`);
    //   control.controls[index]
    //     .get('ContributorName')
    //     .setValue(
    //       `${this.ConvertContributorName(element.ContributorID)}`,
    //       Validators.required
    //     );
    //   control.controls[index]
    //     .get('ContributorID')
    //     .setValue(`${element.ContributorID}`);
    //   // control.controls[index]
    //   //   .get('FirstPart')
    //   //   .setValue(
    //   //     element.ContributorID === 6 || element.ContributorID === 7 ? 1 : ''
    //   //   );
    //   // control.controls[index].get('SecondPart').setValue('');
    //   control.controls[index]
    //     .get('FirstMoney')
    //     .setValue(
    //       (this.SumFirstMoney / this.aggregate.FirstPart.sum) *
    //         control.controls[index].get('FirstPart').value
    //     );
    //   control.controls[index]
    //     .get('SecondMoney')
    //     .setValue(
    //       (this.SumSecondMoney / this.aggregate.SecondPart.sum) *
    //         element.SecondPart
    //     );
    //   control.controls[index]
    //     .get('ToTalMoney')
    //     .setValue(element.FirstMoney + element.SecondMoney);
    // });
    //  this.formGroup.controls.sharedBribeReward.controls[0].controls.name.
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
  addRow() {
    // This function instantiates a FormGroup for each day
    // and pushes it to our FormArray

    // We get our FormArray
    const control = <FormArray>this.formGroup.controls['sharedBribeReward'];

    // instantiate a new day FormGroup;
    const newDayGroup: FormGroup = this.initItems();

    // Add it to our formArray
    control.push(newDayGroup);
  }

  initItems(): FormGroup {
    // Here, we make the form for each day
    const objForm = {};
    Object.keys(this.formObject).forEach(f => {
      objForm[f] = [this.formObject[f]];
    });

    return this.fb.group(objForm);
  }

  submit() {
    // do stuff and submit result
    console.log(this.formGroup.value);
  }

  public ILG60_08_04_00_00_E15($event) {
    // ยศ	Column	Key Press	ILG60-08-04-00-00-E15
  }

  public ILG60_08_04_00_00_E16($event) {
    // ชื่อ-สกุล	Column	Key Press	ILG60-08-04-00-00-E16
    // ชื่อ-สกุล	Column	Text Change	ILG60-08-04-00-00-E17
  }
  public sumTotal() {
    return {
      SumMoney: Number(this.SumBribeMoney) + Number(this.SumRewardMoney),
      SumFirstMoney: Number(this.SumRewardMoney) / 3,
      SumFirstMoneyPerPart:
        Number(this.SumFirstMoney) / Number(this.FirstPartTotal),
      FirstRemainder: Number(this.SumFirstMoney) - Number(this.FirstMoneyTotal),
      SumSecondMoney: (Number(this.SumRewardMoney) / 3) * 2,
      SumSecondMoneyPerPart:
        Number(this.SumSecondMoney) / Number(this.SecondPartTotal),
      SecondRemainder:
        Number(this.SumSecondMoney) - Number(this.SecondMoneyTotal)
    };
  }
  public deleteHandle({ rowItem }) {
    const control = <FormArray>this.formGroup.controls['sharedBribeReward'];
    // remove the chosen row
    control.removeAt(rowItem);
  }
}
