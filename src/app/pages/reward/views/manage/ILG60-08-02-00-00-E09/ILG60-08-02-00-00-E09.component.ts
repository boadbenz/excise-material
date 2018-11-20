import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CONFIG } from './CONFIG';
import { IRequestCommandDetail } from 'app/pages/reward/interfaces/RequestCommandDetail';
import { IRequestCommand } from 'app/pages/reward/interfaces/RequestCommand';
import { IRequestBribe } from 'app/pages/reward/interfaces/RequestBribe.interface';
import { ColumnsInterface } from 'app/pages/reward/shared/interfaces/columns-interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-02-00-00-E09',
  templateUrl: './ILG60-08-02-00-00-E09.component.html',
  styleUrls: ['./ILG60-08-02-00-00-E09.component.scss']
})
export class ILG6008020000E09Component extends CONFIG implements OnInit {
  public bindingData: IRequestCommandDetail[];
  public bindingForm: ColumnsInterface[] = [];
  public submitData: IRequestCommand = {};

  @Output()
  public emitChange = new EventEmitter();
  public inputItem: number[] = [];
  constructor() {
    super();
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

        this.bindingForm = this.FormInputDefault.map(m => ({
          ...m,
          default: inp[0][m.field],
          default2: inp[0][m.field2],
          isDisabled: !this.isEdit$.getValue(),
          isDisabled2: !this.isEdit$.getValue()
        }));
      }
    });
    this.isEdit$.subscribe(edit => {
      if (edit !== undefined && edit != null) {
        this.bindingForm = this.bindingForm.map(m => ({
          ...m,
          isDisabled: !edit,
          isDisabled2: !edit
        }));
      }
    });
  }

  ngOnInit() {
    this.fetchData();
  }
  private fetchData() {}
  public sumItem(): number {
    if (this.inputItem.length > 0) {
      return this.inputItem.reduce((a, b) => (a += b));
    }
    return 0;
  }
  public changeForm(data: IRequestCommand) {
    // console.log('data', data);
    const submitData: IRequestCommand = {
      CommandNo: data.CommandNo,
      CommandDate: data.CommandDate,
      CommandTime: data.CommandTime,
      TotalPart: this.sumItem(),
      RequestCommandDetail: this.bindingData.map((m, index) => ({
        ...m,
        PartMoney: this.inputItem[index]
      }))
    };
    this.submitData = submitData;
    // console.log('submitData', submitData);
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
