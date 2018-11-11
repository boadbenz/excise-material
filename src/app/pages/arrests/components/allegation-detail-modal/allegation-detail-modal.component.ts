import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { pagination } from 'app/config/pagination';
import { Router, ActivatedRoute } from '@angular/router';
import { LawbreakerTypes, EntityTypes } from 'app/models/drop-downs.model';
import { Message } from 'app/config/message';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MasDutyProductUnitModel } from 'app/models/mas-duty-product-unit.model';
import { ArrestLawbreakerAllegation, ArrestLawbreaker } from '../../models/arrest-lawbreaker';
import * as fromStore from '../../store';
import * as fromService from '../../services'
import * as fromModel from '../../models';
import { Acceptability } from '../../models/acceptability';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-allegation-detail-modal',
  templateUrl: './allegation-detail-modal.component.html',
  styleUrls: ['./allegation-detail-modal.component.scss']
})
export class AllegationDetailModalComponent implements OnInit, OnDestroy {

  // Redux based variables
  // obArrest: Observable<fromModel.Arrest>;
  // ArrestStore: fromModel.Arrest;

  private destroy$: Subject<boolean> = new Subject<boolean>();
  navigationSubscription;
  ACCEPTABILITY = Acceptability;

  runningTable = 'ops_arrest';
  runningOfficeCode = '90501';
  runningPrefix = 'TN';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<fromStore.AppState>,
    private activeRoute: ActivatedRoute,
    private s_masLawbreaker: fromService.ArrestMasLawbreakerService,
  ) {
    // this.obArrest = store.select(s => s.arrest);
    // this.obArrest
    //   .takeUntil(this.destroy$)
    //   .subscribe((x: fromModel.Arrest) => {
    //     this.ArrestStore = x;
    //   })
  }

  paginage = pagination;
  lawbreakerType = LawbreakerTypes;
  entityType = EntityTypes;
  lawbreaker = new Array<ArrestLawbreakerAllegation>();
  advSearch: boolean;
  showLawbreakerDetail: boolean;
  lawbreakerIndex: number;
  typeheadProductUnit = new Array<MasDutyProductUnitModel>();

  // param: Params
  mode: string;
  arrestCode: string;
  indictmentDetailId: string;
  indictmentId: string;
  guiltbaseId: string;

  _isSuccess: boolean;

  card1 = true;

  @Input() ArrestIndictment: fromModel.ArrestIndictment;
  @Output() d = new EventEmitter();
  @Output() c = new EventEmitter();
  @Output() OutputLawbreaker = new EventEmitter<fromModel.ArrestLawbreaker>();

  allegationFG: FormGroup;

  productArray: FormArray;

  get Lawbreaker(): FormArray {
    return this.allegationFG.get('Lawbreaker') as FormArray
  }

  async ngOnInit() {

    combineLatest(this.activeRoute.params, this.activeRoute.queryParams)
      .map(results => ({ params: results[0], queryParams: results[1] }))
      .takeUntil(this.destroy$)
      .subscribe(async results => {
        this.mode = results.params.mode;
        this.arrestCode = results.queryParams.arrestCode;
        this.indictmentId = results.queryParams.indictmentId;
        this.guiltbaseId = results.queryParams.guiltbaseId;
      });

    this.allegationFG = this.fb.group({
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
    // this.ArrestStore.ArrestIndictment = [this.ArrestIndictment];
    // this.store.dispatch(new fromStore.UpdateArrest(this.ArrestStore));
    
    // this.dismiss('Cross click')
    // this.router.navigate(
    //   [`/arrest/lawbreaker`, 'C', 'NEW'],
    //   {
    //     queryParams: {
    //       allegationMode: this.mode,
    //       arrestCode: this.arrestCode,
    //       indictmentId: this.indictmentId,
    //       guiltbaseId: this.guiltbaseId
    //     }
    //   })

     window.open(`${location.origin}/#/arrest/lawbreaker/C/NEW`);
     
  }

  view(id: number) {
    // this.dismiss('Cross click')
    window.open(`${location.origin}/#/arrest/lawbreaker/R/${id}`);
    // this.router.navigate(
    //   [`/arrest/lawbreaker`, 'R', id],
    //   {
    //     queryParams: {
    //       allegationMode: this.mode,
    //       arrestCode: this.arrestCode,
    //       indictmentId: this.indictmentId,
    //       guiltbaseId: this.guiltbaseId
    //     }
    //   })
  }

  onSearchAdv(f: any) {
    this.s_masLawbreaker.ArrestMasLawbreakergetByConAdv(f).subscribe(x => this.onSearchComplete(x));
  }

  onSearchByKey(f: any) {
    this.s_masLawbreaker.ArrestMasLawbreakergetByKeyword(f).subscribe(x => this.onSearchComplete(x));
  }

  private async onSearchComplete(list: ArrestLawbreaker[]) {
    if (!list.length) {
      alert(Message.noRecord);
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
    this.paginage.TotalItems = law.length;
  }

  setIsChecked(i: number) {
    this.lawbreakerIndex = i;
    let law = this.Lawbreaker;
    law.value.map((item, index) => {
      item.IsChecked = (i == index) ? Acceptability.ACCEPTABLE : Acceptability.INACCEPTABLE;
    })
  }

  private setItemFormArray(array: any[], formControl: string) {
    if (array !== undefined && array.length) {
      const itemFGs = array.map(item => this.fb.group(item));
      const itemFormArray = this.fb.array(itemFGs);
      this.allegationFG.setControl(formControl, itemFormArray);
    }
  }

  async pageChanges(event: any) {
    const list = await this.lawbreaker.slice(event.startIndex - 1, event.endIndex);
    this.setItemFormArray(list, 'Lawbreaker');
    this.showLawbreakerDetail = false;
  }

  closeLawbreakerDetail() {
    let law = this.Lawbreaker;
    law.value.map(item => item.IsChecked = Acceptability.INACCEPTABLE);
    law.patchValue(law.value);
    this.showLawbreakerDetail = false;
  }

  close(e: any) {
    // let law = this.Lawbreaker;
    let law = this.Lawbreaker.value
      .filter(x => x.IsChecked == Acceptability.ACCEPTABLE)
    // .map(x => {
    //   x.IsModify = 'c';
    //   return x;
    // })

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
    case 0: // นิติบุคคล
      item.ReferenceID = item.CompanyRegistrationNo;
      break;
    case 1: // บุคคลธรรมดา
      switch (item.LawbreakerType) {
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