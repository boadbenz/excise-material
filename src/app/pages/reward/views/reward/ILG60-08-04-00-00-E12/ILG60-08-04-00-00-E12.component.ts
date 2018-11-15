import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { INonRequestRewardStaff } from 'app/pages/reward/interfaces/NonRequestRewardStaff';

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
  constructor(private fb: FormBuilder) {
    super();
    this.formGroup = this.fb.group({
      sharedBribeReward: this.fb.array([])
    });
    this.inputData$.subscribe((data: INonRequestRewardStaff[]) => {
      if (data) {
        console.log('DATA', data);
        const control = <FormArray>this.formGroup.controls['sharedBribeReward'];
        data.forEach(e => {
          // instantiate a new day FormGroup;
          const newDayGroup: FormGroup = this.fb.group({
            check: [true],
            TitleName: [e.TitleName],
            FullName: [
              `${e.TitleName}${e.FirstName}${e.LastName}`,
              Validators.required
            ],
            PositionName: [`${e.PositionName}`],
            PosLevelName: [`${e.PosLevelName}`],
            ContributorName: [
              `${this.ConvertContributorName(e.ContributorID)}`,
              Validators.required
            ],
            ContributorID: [`${e.ContributorID}`],
            FirstPart: [
              e.ContributorID === '6' || e.ContributorID === '7' ? 1 : ''
            ],
            SecondPart: [''],
            FirstMoney: [1],
            SecondMoney: [0],
            ToTalMoney: [
              ((e.ContributorID === '6' || e.ContributorID === '7' ? 1 : null) *
                1) /
                this.aggregate.FirstMoney.sum +
                0 / this.aggregate.FirstMoney.sum
            ]
          });
          // Add it to our formArray
          control.push(newDayGroup);
        });
        console.log('control.value', control.value);
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

    return this.fb.group({
      check: [true],
      TitleName: [null, Validators.required],
      FullName: [null, Validators.required],
      PositionName: [null, Validators.required],
      PosLevelName: [null, Validators.required],
      ContributorName: [null, Validators.required],
      ContributorID: [null, Validators.required],
      FirstPart: [null, Validators.required],
      FirstMoney: [null, Validators.required],
      SecondPart: [null, Validators.required],
      ToTalMoney: [null, Validators.required]
    });
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
  public deleteHandle({ rowItem }) {
    const control = <FormArray>this.formGroup.controls['scheduleDetail'];
    // remove the chosen row
    control.removeAt(rowItem);
  }
}
