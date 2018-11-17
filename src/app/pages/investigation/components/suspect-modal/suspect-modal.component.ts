import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LawbreakerTypes, EntityTypes } from 'app/models/drop-downs.model';
import * as fromModels from '../../models';
import * as fromServices from '../../services';
import { Subject } from 'rxjs/Subject';
import { Acceptability } from 'app/pages/arrests/models';
import { pagination } from 'app/config/pagination';
import { Message } from 'app/config/message';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-suspect-modal',
  templateUrl: './suspect-modal.component.html',
  styleUrls: ['./suspect-modal.component.scss']
})
export class SuspectModalComponent implements OnInit {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  navigationSubscription;
  ACCEPTABILITY = Acceptability;

  paginage = pagination;  
  lawbreakerType = LawbreakerTypes;
  entityType = EntityTypes;

  advSearch: boolean;
  suspect = new Array<fromModels.InvestigateMasSuspectModel>();

  card1 = true;

  @Output() d = new EventEmitter();
  @Output() c = new EventEmitter();
  @Output() OutputSuspect = new EventEmitter<fromModels.InvestigateDetailSuspect>();

  FG: FormGroup;

  get Suspect(): FormArray {
    return this.FG.get('Suspect') as FormArray
  }

  constructor(
    private s_masSuspect: fromServices.InvestgateMasSuspectService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.FG = this.fb.group({
      Suspect: this.fb.array([])
    });
  }

  ngOnDestroy(): void {
    this.paginage.TotalItems = 0;
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  dismiss(e: any) {
    this.d.emit(e);
  }

  onSearchAdv(f: any) {
    this.s_masSuspect.InvestigateMasSuspectgetByConAdv(f)
      .takeUntil(this.destroy$)
      .subscribe(x => this.onSearchComplete(x));
  }

  onSearchByKey(f: any) {
    this.s_masSuspect.InvestigateMasSuspectgetByKeyword(f)
      .takeUntil(this.destroy$)
      .subscribe(x => this.onSearchComplete(x));
  }

  private async onSearchComplete(list: fromModels.InvestigateMasSuspectModel[]) {
    if (!list.length) {
      alert(Message.noRecord);
      return;
    }

    let law = [];
    await list.filter(item => item.IsActive == 1)
      .map(async (item: fromModels.InvestigateMasSuspectModel, i) => {
        item.RowId = i + 1;
        item.IsChecked = Acceptability.INACCEPTABLE;
        law.push(setViewSuspect(item));
      })

    this.suspect = law;
    // set total record
    this.paginage.TotalItems = law.length;
  }

  setIsChecked(i: number) {
    let law = this.Suspect;
    law.value.map((item, index) => {
      item.IsChecked = (i == index) ? Acceptability.ACCEPTABLE : Acceptability.INACCEPTABLE;
    })
  }

  private setItemFormArray(array: any[], formControl: string) {
    if (array !== undefined && array.length) {
      const itemFGs = array.map(item => this.fb.group(item));
      const itemFormArray = this.fb.array(itemFGs);
      this.FG.setControl(formControl, itemFormArray);
    }
  }

  async pageChanges(event: any) {
    const list = await this.suspect.slice(event.startIndex - 1, event.endIndex);
    this.setItemFormArray(list, 'Suspect');
  }

  closeLawbreakerDetail() {
    let law = this.Suspect;
    law.value.map(item => item.IsChecked = Acceptability.INACCEPTABLE);
    law.patchValue(law.value);
  }

  close(e: any) {
    let law = this.Suspect.value
      .filter(x => x.IsChecked == Acceptability.ACCEPTABLE)

    if (!law) return;

    this.OutputSuspect.emit(...law);

    this.c.emit(e);
  }
}

export function setViewSuspect(item: fromModels.InvestigateMasSuspectModel) {
  item.SuspectTypeName = LawbreakerTypes.find(key => parseInt(key.value) == item.SuspectType).text;
  item.EntityType = item.EntityType;
  item.EntityTypeName = EntityTypes.find(key => parseInt(key.value) == item.EntityType).text;
  item.LawbreakerRefID = item.SuspectID.toString();
  item.FullName = `${item.SuspectTitleName || ''}`;
  item.FullName += ` ${item.SuspectFirstName || ''}`;
  item.FullName += ` ${item.SuspectLastName || ''}`;
  switch (item.EntityType) {
    case 0: // นิติบุคคล
      item.ReferenceID = item.CompanyRegistrationNo;
      break;
    case 1: // บุคคลธรรมดา
      switch (item.SuspectType) {
        case 0: // ต่างชาติ
          item.ReferenceID = item.PassportNo;
          break;
        case 1: // ชาวไทย
          item.ReferenceID = item.IDCard;
          break;
      }
  }
  return item;
}
