import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { pagination } from 'app/config/pagination';
import { LawbreakerTypes, EntityTypes } from 'app/models/drop-downs.model';
import { Message } from 'app/config/message';
import { ArrestLawbreakerAllegation, ArrestLawbreaker } from '../../models/arrest-lawbreaker';
import * as fromService from '../../services'
import * as fromModel from '../../models';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import swal from 'sweetalert2'
import { Acceptability } from '../../models';
import { clearFormArray } from '../../arrest.helper';

@Component({
  selector: 'app-lawbreaker-modal',
  templateUrl: './lawbreaker-modal.component.html',
  styleUrls: ['./lawbreaker-modal.component.scss']
})
export class LawbreakerModalComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('advForm') advForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private s_masLawbreaker: fromService.ArrestMasLawbreakerService,
  ) {
  }

  ACCEPTABILITY = Acceptability;

  paginage = pagination;
  lawbreakerType = LawbreakerTypes;
  entityType = EntityTypes;
  lawbreaker = new Array<ArrestLawbreakerAllegation>();
  advSearch: boolean;

  card1 = true;

  @Output() d = new EventEmitter();
  @Output() c = new EventEmitter();
  @Output() OutputLawbreaker = new EventEmitter<fromModel.ArrestLawbreaker>();

  formGroup: FormGroup;

  get Lawbreaker(): FormArray {
    return this.formGroup.get('Lawbreaker') as FormArray
  }

  async ngOnInit() {
    this.formGroup = this.fb.group({
      Lawbreaker: this.fb.array([])
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

  onClickNewLawbreaker() {
    window.open(`${location.origin}/#/arrest/lawbreaker/C/NEW`);
  }

  view(id: number) {
    window.open(`${location.origin}/#/arrest/lawbreaker/R/${id}`);
  }

  onSearchAdv(f: any) {
    this.s_masLawbreaker.ArrestMasLawbreakergetByConAdv(f).subscribe(x => this.onSearchComplete(x));
  }

  onSearchByKey(f: any) {
    this.s_masLawbreaker.ArrestMasLawbreakergetByKeyword(f).subscribe(x => this.onSearchComplete(x));
  }

  private async onSearchComplete(list: ArrestLawbreaker[]) {
    if (!list.length) {
      swal('', Message.noRecord, 'warning');
      return;
    }

    let law = [];
    await list.filter(item => item.IsActive == 1)
      .map(async (item: fromModel.ArrestLawbreaker, i) => {
        item.RowId = i + 1;
        item.ResultCount = this.s_masLawbreaker.ArrestLawsuitResultCountgetByLawbreakerID(item.LawbreakerID.toString())
        item.IsChecked = Acceptability.INACCEPTABLE;
        law.push(setViewLawbreaker(item));
      })

    this.lawbreaker = law;
    // set total record
    const __list = await this.lawbreaker.slice(0, 5);
    this.setItemFormArray(__list, 'Lawbreaker');
    this.paginage.TotalItems = this.lawbreaker.length;
  }

  setIsChecked(i: number) {
    let law = this.Lawbreaker;
    law.value.map((item, index) => {
      item.IsChecked = (i == index) ? Acceptability.ACCEPTABLE : Acceptability.INACCEPTABLE;
    })
  }

  private setItemFormArray(array: any[], formControl: string) {
    if (array !== undefined && array.length) {
      const itemFGs = array.map(item => this.fb.group(item));
      const itemFormArray = this.fb.array(itemFGs);
      this.formGroup.setControl(formControl, itemFormArray);
    }
  }

  toggle() {
    this.advSearch = !this.advSearch;
    if (this.advSearch == false && this.advForm != undefined) {
      this.advForm.reset();
    }
  }

  async pageChanges(event: any) {
    const list = await this.lawbreaker.slice(event.startIndex - 1, event.endIndex);
    this.setItemFormArray(list, 'Lawbreaker');
  }

  closeLawbreakerDetail() {
    let law = this.Lawbreaker;
    law.value.map(item => item.IsChecked = Acceptability.INACCEPTABLE);
    law.patchValue(law.value);
  }

  close(e: any) {
    let law = this.Lawbreaker.value
      .filter(x => x.IsChecked == Acceptability.ACCEPTABLE)

    if (!law) return;

    this.OutputLawbreaker.emit(...law);

    this.c.emit(e);
  }
}


export function setViewLawbreaker(item: fromModel.ArrestLawbreaker) {
  item.LawbreakerTypeName = LawbreakerTypes.find(key => parseInt(key.value) == item.LawbreakerType).text;
  item.EntityType = item.EntityType;
  item.EntityTypeName = EntityTypes.find(key => parseInt(key.value) == item.EntityType).text;
  item.LawbreakerRefID = item.LawbreakerID;
  item.LawbreakerFullName = `${item.LawbreakerTitleName || ''}`;
  item.LawbreakerFullName += ` ${item.LawbreakerFirstName || ''}`;
  item.LawbreakerFullName += ` ${item.LawbreakerLastName || ''}`;

  switch (item.EntityType) {
    case 1: // บุคคลธรรมดา
      switch (item.LawbreakerType) {
        case 0: // ต่างชาติ
          item.ReferenceID = item.PassportNo;
          break;
        case 1: // ชาวไทย
          item.ReferenceID = item.IDCard;
          break;
      }
      break;

    case 2: // นิติบุคคล
      item.ReferenceID = item.CompanyRegistrationNo;
      break;
  }
  return item;
}