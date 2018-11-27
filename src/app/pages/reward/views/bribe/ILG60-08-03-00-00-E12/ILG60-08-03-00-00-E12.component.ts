import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter
} from 'rxjs/operators';
import { MasOfficeService } from 'app/pages/reward/services/master/MasOffice.service';
import { MasOfficeModel } from 'app/models/mas-office.model';
import { MyDatePickerOptions } from 'app/config/dateFormat';
import { MasStaffService } from 'app/pages/reward/services/master/MasStaff.service';
import { MasStaffModel } from 'app/models/mas-staff.model';
import { DropdownInterface } from 'app/pages/reward/shared/interfaces/dropdown-interface';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-03-00-00-E12',
  templateUrl: './ILG60-08-03-00-00-E12.component.html',
  styleUrls: ['./ILG60-08-03-00-00-E12.component.scss']
})
export class ILG6008030000E12Component extends CONFIG implements OnInit {
  public MasOfficeMainList: string[] = [];
  public MasStaffMaingetAllList: MasStaffModel[] = [];
  public myDatePickerOptions = MyDatePickerOptions;
  searchStationOfPOA = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 2
          ? []
          : this.MasOfficeMainList.filter(
              v => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            ).slice(0, 10)
      )
    );
  searchStaffMainName = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 2
          ? []
          : this.MasStaffMaingetAllList.filter(
              v => v.FullName.toLowerCase().indexOf(term.toLowerCase()) > -1
            ).slice(0, 10).map(m => m.FullName)
      )
    );
  constructor(
    private fb: FormBuilder,
    private masOfficeService: MasOfficeService,
    private masStaffService: MasStaffService
  ) {
    super();
    this.formGroup = this.fb.group(this.createForm(this.columns));

    this.formGroup.controls['StaffMainName'].valueChanges.subscribe(form => {
      // console.log('form', form);
      const valChangePos = this.MasStaffMaingetAllList.filter(f => f.FullName === form).map(m => m.OperationPosName).shift();
      const valChangeOffice = this.MasStaffMaingetAllList.filter(f => f.FullName === form).map(m => m.OfficeName).shift();
      this.formGroup.controls['PositionName'].setValue(valChangePos)
      this.formGroup.controls['OfficeName'].setValue(valChangeOffice)
    });
  }

  ngOnInit() {
    this.masOfficeService
      .MasOfficeMaingetAll()
      .subscribe((Office: MasOfficeModel[]) => {
        this.MasOfficeMainList = Office.map(m => m.OfficeName);
      });

    this.masStaffService
      .MasStaffMaingetAll()
      .subscribe((Staff: MasStaffModel[]) => {
        this.MasStaffMaingetAllList = Staff.map(m => ({
          ...m,
          FullName: m.TitleName + m.FirstName + ' ' + m.LastName,
        }));
      });
  }
  public formChange(formData: FormGroup) {
    console.log('formData', formData);
    this.emitChange.emit({
      FormName: 'ILG60-08-03-00-00-E12',
      FormData: formData
    });
  }
}
