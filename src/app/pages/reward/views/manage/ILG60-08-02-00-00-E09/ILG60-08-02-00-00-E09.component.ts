import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CONFIG } from './CONFIG';
import { IRequestCommandDetail } from 'app/pages/reward/interfaces/RequestCommandDetail';
import { IRequestCommand } from 'app/pages/reward/interfaces/RequestCommand';
import { IRequestBribe } from 'app/pages/reward/interfaces/RequestBribe.interface';
import { ColumnsInterface } from 'app/pages/reward/shared/interfaces/columns-interface';
import { RequestCommandupdByConModel } from 'app/pages/reward/models/RequestCommandupdByCon.Model';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  getDateMyDatepicker,
  convertDateForSave,
  toLocalShort,
  setDateMyDatepicker
} from 'app/config/dateFormat';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-02-00-00-E09',
  templateUrl: './ILG60-08-02-00-00-E09.component.html',
  styleUrls: ['./ILG60-08-02-00-00-E09.component.scss']
})
export class ILG6008020000E09Component extends CONFIG implements OnInit {
  public bindingData: IRequestCommandDetail[];
  public bindingForm: ColumnsInterface[] = [];
  public submitData: any = {
    ArrestCode: '',
    CommandDate: '',
    CommandID: null,
    CommandNo: '',
    CommandTime: '',
    IsActive: 1,
    RequestCommandDetail: [],
    TotalPart: 0
  };

  @Output()
  public emitChange = new EventEmitter();
  public inputItem: number[] = [];
  constructor(private fb: FormBuilder) {
    super();
    this.formGroup = this.fb.group({
      CommandID: [''],
      CommandNo: [''],
      CommandDate: [''],
      CommandTime: ['']
    });
    this.inputData$.subscribe((inp: IRequestCommand[]) => {
      if (inp && inp.length > 0) {
        // console.log('IRequestBribe', inp[0]);
        this.bindingData = inp[0].RequestCommandDetail.map(m => ({
          ...m,
          CommandName:
            (m.TitleName || '') + (m.FirstName || '') + (m.LastName || ''),
          StaffName:
            (m.StaffTitleName || '') +
            (m.StaffFirstName || '') +
            ' ' +
            (m.StaffLastName || '')
        }));

        this.inputItem = inp[0].RequestCommandDetail.map(m => m.PartMoney);

        this.formGroup.get('CommandID').patchValue(inp[0].CommandID);
        this.formGroup.get('CommandNo').patchValue(inp[0].CommandNo);
        const commandDateValue = inp[0].CommandDate != null ? setDateMyDatepicker(new Date(inp[0].CommandDate)) : '';
        this.formGroup.get('CommandDate').patchValue(commandDateValue);
        this.formGroup.get('CommandTime').patchValue(inp[0].CommandTime);

        // set input data
        this.submitData.CommandID = inp[0].CommandID != null ? inp[0].CommandID : '';
        this.submitData.CommandNo = inp[0].CommandNo != null ? inp[0].CommandNo : '';
        this.submitData.CommandDate = inp[0].CommandDate != null ? inp[0].CommandDate : '';
        this.submitData.CommandTime = inp[0].CommandTime != null ? inp[0].CommandTime : '';
      }
    });
    this.formGroup.valueChanges.subscribe(() => {
      this.submitData.CommandDate = this.ConvDateTimeToDate(
        convertDateForSave(getDateMyDatepicker(this.formGroup.controls['CommandDate'].value))
      );
      this.itemChange();
    });
  }

  ngOnInit() {
    this.fetchData();
  }
  private fetchData() { }
  public sumItem(): number {
    if (this.inputItem.length > 0) {
      return this.inputItem.reduce((a, b) => (a += b));
    }
    return 0;
  }
  public changeForm(formGroup: FormGroup) {
    // console.log('data', data);
    const data: IRequestCommand = formGroup.value;
    // const newData = RequestCommandupdByConModel;
    // Object.keys(RequestCommandupdByConModel).forEach(f => {
    //   newData[f] = data[f] || '';
    // });
    // newData['TotalPart'] = this.sumItem().toString();
    // newData['CommandDate'] = this.ConvDateTimeToDate(
    //   convertDateForSave(getDateMyDatepicker(data['CommandDate']))
    // );
    // newData['RequestCommandDetail'] = this.bindingData.map((m, index) => ({
    //   CommandDetailID: `${m.CommandDetailID}`,
    //   NoticeCode: `${m.NoticeCode}`,
    //   CommandID: `${m.CommandID}`,
    //   IsActive: 1,
    //   PartMoney: this.inputItem[index]
    // }));

    this.submitData.CommandID = data['CommandID'];
    this.submitData.CommandNo = data['CommandNo'];
    this.submitData.CommandDate = this.ConvDateTimeToDate(
      convertDateForSave(getDateMyDatepicker(data['CommandDate']))
    );
    this.submitData.CommandTime = data['CommandTime'];
    this.submitData.TotalPart = this.sumItem();
    this.submitData.RequestCommandDetail = this.bindingData.map((m, index) => ({
      ...m,
      PartMoney: this.inputItem[index]
    }));

    // this.submitData = newData;
    this.sendEmitData();
  }
  public itemChange() {
    this.submitData.TotalPart = this.sumItem();
    this.submitData.RequestCommandDetail = this.bindingData.map((m, index) => ({
      ...m,
      PartMoney: this.inputItem[index]
    }));
    this.sendEmitData();
  }
  public sendEmitData() {
    this.emitChange.emit(this.submitData);
  }
}
