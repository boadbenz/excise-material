import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import 'rxjs/add/operator/takeUntil';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs/observable/combineLatest';
import * as fromModels from '../../models';
import * as fromStore from '../../store';
import * as fromService from '../../services';
import { Store } from '@ngrx/store';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import { MainMasterService } from 'app/services/main-master.service';
import { MasDutyProductUnitModel } from 'app/models/mas-duty-product-unit.model';
import { Message } from 'app/config/message';
import { TransactionRunningService } from 'app/services/transaction-running.service';
import { TransactionRunning } from 'app/models/transaction-running.model';
import { getDateMyDatepicker, convertDateForSave } from 'app/config/dateFormat';
import { Acceptability } from '../../models';
import { LoaderService } from 'app/core/loader/loader.service';
import { setViewLawbreaker } from '../allegation-detail-modal/allegation-detail-modal.component';

@Component({
  selector: 'app-allegation',
  templateUrl: './allegation.component.html',
  styleUrls: ['./allegation.component.scss']
})
export class AllegationComponent implements OnInit, OnDestroy {

  obArrest: Observable<fromModels.Arrest>;
  ArrestStore: fromModels.Arrest;
  ACCEPTABILITY = Acceptability;
  typeheadQtyUnit = new Array<MasDutyProductUnitModel>();

  constructor(
    private modelService: NgbModal,
    private activeRoute: ActivatedRoute,
    private navService: NavigationService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromStore.AppState>,
    private sidebarService: SidebarService,
    private s_mainMaster: MainMasterService,
    private s_notice: fromService.ArrestNoticeService,
    private s_productService: fromService.ArrestProductService,
    private s_indictment: fromService.ArrestIndictmentService,
    private s_indictmentDetail: fromService.ArrestIndictmentDetailService,
    private s_productDetail: fromService.ArrestProductDetailService,
    private s_lawbreaker: fromService.ArrestLawbreakerService,
    private s_transactionRunning: TransactionRunningService,
    private s_arrest: fromService.ArrestService,
    private s_lawsuit: fromService.ArrestLawSuitService,
    private loaderService: LoaderService
  ) {

    this.obArrest = store.select(s => s.arrest);
    this.obArrest
      .takeUntil(this.destroy$)
      .subscribe((x: fromModels.Arrest) => {
        this.ArrestStore = x;
      })

    this.navService.setPrintButton(false);

    this.navService.setInnerTextPrevPageButton('งานจับกุม')
    this.navService.setInnerTextNextPageButton('รับคำกล่าวโทษ')
  }
  private destroy$: Subject<boolean> = new Subject<boolean>();

  card1: boolean = true;
  card2: boolean = true;
  cardProduct: boolean = true;

  isCheckAll: boolean = false;

  runningTable = 'ops_arrest';
  runningOfficeCode = '900012';
  runningPrefix = 'TN';

  // param: Params
  mode: string;
  arrestMode: string;
  arrestCode: string;
  newArrestCode: string;
  indictmentId: string;
  guiltbaseId: number;
  _isSuccess: boolean = false;

  modal: any;
  showEditField: boolean;

  get ArrestLawbreaker(): FormArray {
    return this.arrestIndictmentFG.get('ArrestLawbreaker') as FormArray
  }

  get ArrestProduct(): FormArray {
    return this.arrestIndictmentFG.get('ArrestProduct') as FormArray
  }

  arrestIndictmentFG: FormGroup

  async ngOnInit() {

    this.sidebarService.setVersion(this.s_arrest.version);

    this.arrestIndictmentFG = this.fb.group({
      IndictmentID: [''],
      ArrestCode: [''],
      GuiltBaseID: ['', Validators.required],
      IsProve: ['1', Validators.required],
      IsActive: ['1', Validators.required],
      IsLawsuitComplete: ['0', Validators.required],
      ArrestIndictmentDetail: [[]],
      ArrestLawGuitbase: [[]],
      ArrestProduct: this.fb.array([]),
      ArrestLawbreaker: this.fb.array([]),

      IsModify: ['', Validators.required],
      SubSectionType: ['', Validators.required],
      GuiltBaseName: ['', Validators.required],
      SectionNo: ['', Validators.required],
      PenaltyDesc: ['', Validators.required],
    });

    await this.setProductUnitStore();

    this.navService.showFieldEdit.takeUntil(this.destroy$).subscribe(p => this.showEditField = p.valueOf())

    combineLatest(this.activeRoute.params, this.activeRoute.queryParams)
      .map(results => ({ params: results[0], queryParams: results[1] }))
      .takeUntil(this.destroy$)
      .subscribe(async results => {
        this.mode = results.params.mode;
        this.arrestMode = results.queryParams.arrestMode;
        this.arrestCode = results.queryParams.arrestCode;
        this.indictmentId = results.queryParams.indictmentId;
        this.guiltbaseId = results.queryParams.guiltbaseId;

        switch (results.params.mode) {
          case 'C':
            this.enableBtnModeC();
            if (this.arrestCode != 'NEW') {
              this.getArrestProductByArrest(this.arrestCode);
            } else {
              if (this.ArrestStore) {
                let _prod = this.filterProductIsModify(this.ArrestStore.ArrestProduct);
                this.setItemFormArray(_prod, 'ArrestProduct');
              }
              // this.setArrestIndictFromStore();
            }
            break;

          case 'R':
            this.enableBtnModeR();
            this.loaderService.show();
            await this.getArrestIndictment(this.indictmentId);
            await this.getArrestIndictmentProduct(this.indictmentId, this.arrestCode);
            this.loaderService.hide();
            break;
        }
      });

    this.navService.onSave.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
        await this.navService.setOnSave(false);
        this.onSave();
      }
    });
    this.navService.onEdit.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
        await this.navService.setOnEdit(false);
        this.onEdit();
      }
    })
    this.navService.onDelete.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
        await this.navService.setOnDelete(false);
        this.onDelete();
      }
    })
    this.navService.onCancel.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
        await this.navService.setOnCancel(false);

        this.router.navigate(['/arrest/manage', this.arrestMode, this.arrestCode]);
      }
    })
    this.navService.onNextPage.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
        await this.navService.setOnNextPage(false);
        this.router.navigate(['/lawsuit/manage', 'C']);
      }
    })
    this.navService.onPrevPage.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
        await this.navService.setOnPrevPage(false);
        this.router.navigate(['/arrest/manage', this.arrestMode, this.newArrestCode || this.arrestCode]);
      }
    })
  }

  private enableBtnModeC() {
    // set false
    this.navService.setEditButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setEditField(false);
    this.navService.setPrevPageButton(false);
    this.navService.setNextPageButton(false);
    // set true
    this.navService.setSaveButton(true);
    this.navService.setCancelButton(true);
  }

  private enableBtnModeR() {
    // set false
    this.navService.setSaveButton(false);
    this.navService.setCancelButton(false);
    // set true
    this.navService.setEditButton(true);
    this.navService.setDeleteButton(true);
    this.navService.setEditField(true);
    this.navService.setPrevPageButton(true);
    this.navService.setNextPageButton(true);
  }

  searchUnit = (text$: Observable<string>) =>
    text$.debounceTime(200).distinctUntilChanged()
      .map(term => term == '' ? []
        : this.typeheadQtyUnit
          .filter(v => v.DutyCode.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10)
      );

  formatterUnit = (DutyCode: string) => DutyCode;

  selectItemQtyUnit(e: any, i: number) {
    this.ArrestProduct.at(i).patchValue({
      QtyUnit: e.item.DutyCode,
    })
  }

  selectItemNetVolumeUnit(e: any, i: number) {
    this.ArrestProduct.at(i).patchValue({
      NetVolumeUnit: e.item.DutyCode,
    })
  }

  private async getArrestIndictment(indictmentId: string) {
    await this.s_indictment.ArrestIndictmentgetByCon(indictmentId)
      .then((x: fromModels.ArrestIndictment[]) => {
        if (this.checkResponse(x)) {
          let indict = x[0]
          let guiltbase = indict.ArrestLawGuitbase.find(x => x.GuiltBaseID == this.guiltbaseId);
          this.setArrestLawGuiltbase(guiltbase);

          indict.ArrestIndicmentDetail.map(d => {
            let law = d.ArrestLawbreaker.find(l => l.LawbreakerID == d.LawbreakerID);
            this.addArrestLawbreaker(setViewLawbreaker(law));
          });
          // indictDetail.ArrestLawbreaker.map(law => {
          //   this.addArrestLawbreaker(setViewLawbreaker(law));
          // })
        }
      })
      .catch((error) => this.catchError(error));
  }


  private async getArrestIndictmentProduct(indictmentId: string, arrestCode: string) {

    let _product = new Array<fromModels.ArrestProduct>();

    if (this.ArrestStore) {
      _product = this.filterProductIsModify(this.ArrestStore.ArrestProduct);
    };

    await this.s_productService.ArrestProductgetByArrestCode(arrestCode)
      .then(async (y: fromModels.ArrestProduct[]) => {

        if (!this.checkResponse(y)) return;

        let p = y.map((y1, index) => {
          y1.IsChecked = false;
          y1.RowId = index + 1;
          y1.IsModify = 'r';
          return y1;
        });

        _product = [..._product, ...p];

        await this.s_indictment.ArrestIndictmentProductgetByIndictmentID(indictmentId)
          .then(async (x: fromModels.ArrestIndictmentProduct[]) => {

            if (!this.checkResponse(x)) return;

            x.filter(x1 => _product.find(p => parseInt(p.ProductID) == x1.ProductID).IsChecked = true);

          }).catch((error) => this.catchError(error));

      }).catch((error) => this.catchError(error));

    this.setItemFormArray(_product, 'ArrestProduct');

  }

  private setArrestIndictFromStore() {
    if (this.ArrestStore) {
      if (this.ArrestStore.ArrestIndictment) {
        this.setArrestIndictment(this.ArrestStore.ArrestIndictment);
      }
      let _prod = this.filterProductIsModify(this.ArrestStore.ArrestProduct);
      this.setItemFormArray(_prod, 'ArrestProduct');
    }
  }

  private getArrestProductByArrest(arrestCode: string) {
    this.s_productService.ArrestProductgetByArrestCode(arrestCode)
      .then((x: fromModels.ArrestProduct[]) => {
        let _product = new Array<fromModels.ArrestProduct>();
        if (this.checkResponse(x)) {

          _product = x.map((y, index) => {
            y.IsChecked = false;
            y.RowId = index + 1;
            y.IsModify = 'r';
            return y;
          });
        }

        if (this.ArrestStore) {
          let product = this.filterProductIsModify(this.ArrestStore.ArrestProduct)
          _product = [..._product, ...product];
        }

        this.setItemFormArray(_product, 'ArrestProduct');
      })
  }

  // set FormArray ArrestIndictment
  private setArrestIndictment(o: fromModels.ArrestIndictment[]) {
    let _indict = this.arrestIndictmentFG;
    if (!o.length) return;

    _indict.patchValue({
      IndictmentID: o[0].IndictmentID,
      GuiltBaseID: o[0].GuiltBaseID,
      ArrestLawGuitbase: this.setArrestLawGuitbase(o[0].ArrestLawGuitbase),
      IsProve: o[0].IsProve,
      IsActive: o[0].IsActive,
      IsLawsuitComplete: o[0].IsLawsuitComplete,
    })
  }
  // --- 1
  private setArrestLawGuitbase = (o: fromModels.ArrestLawGuitbase[]) => {
    let arr = new FormArray([]);
    o.map((x, index) => {
      arr.push(this.fb.group({
        RowId: ++index,
        IsChecked: false,
        GuiltBaseID: x.GuiltBaseID,
        GuiltBaseName: x.GuiltBaseName,
        IsCompare: x.IsCompare,
        IsActive: x.IsActive,
        IsProve: x.IsProve,
        SubSectionRuleID: x.SubSectionRuleID,
        ArrestLawSubSectionRule: this.setArrestLawSubSectionRule(x.ArrestLawSubSectionRule)
      }))
    })
    return arr;
  }
  // --- --- 1.1
  private setArrestLawSubSectionRule = (o: fromModels.ArrestLawSubSectionRule[]) => {
    let arr = new FormArray([]);
    o.map(x => {
      arr.push(this.fb.group({
        SubSectionRuleID: x.SubSectionRuleID,
        SubSectionID: x.SubSectionID,
        SectionNo: x.SectionNo,
        IsActive: x.IsActive,
        ArrestLawSubSection: this.setArrestLawSubSection(x.ArrestLawSubSection),
        ArrestLawSection: this.setArrestLawSection(x.ArrestLawSection)
      }))
    })
    return arr;
  }
  // --- --- --- 1.1.1
  private setArrestLawSubSection = (o: fromModels.ArrestLawSubSection[]) => {
    let arr = new FormArray([]);
    o.map(x => {
      arr.push(this.fb.group({
        SubSectionID: x.SubSectionID,
        SubSectionNo: x.SubSectionNo,
        SubSectionType: x.SubSectionType,
        SubSectionDesc: x.SubSectionDesc,
        SectionNo: x.SectionNo
      }))
    })
    return arr;
  }
  // --- --- --- 1.1.2
  private setArrestLawSection = (o: fromModels.ArrestLawSection[]) => {
    let arr = new FormArray([]);
    o.map(x => {
      arr.push(this.fb.group({
        SectionNo: x.SectionNo,
        SectionName: x.SectionName,
        SectionDesc1: x.SectionDesc1,
        SectionDesc2: x.SectionDesc2,
        SectionDesc3: x.SectionDesc3,
        LawGroupID: x.LawGroupID,
        ArrestLawPenalty: this.setArrestLawPenalty(x.ArrestLawPenalty)
      }))
    })
    return arr;
  }
  // --- --- --- --- 1.1.2.1
  private setArrestLawPenalty = (o: fromModels.ArrestLawPenalty[]) => {
    let arr = new FormArray([]);
    o.map(x => {
      arr.push(this.fb.group({
        PenaltyID: x.PenaltyID,
        SectionNo: x.SectionNo,
        PenaltyDesc: x.PenaltyDesc,
        FineMin: x.FineMin,
        FineMax: x.FineMax,
        IsFinePrison: x.IsFinePrison,
        IsTaxPaid: x.IsTaxPaid
      }))
    })
    return arr;
  }

  addArrestLawbreaker(lawbreaker: fromModels.ArrestLawbreaker) {
    lawbreaker.RowId = 1;
    lawbreaker.IsModify = 'c';

    this.ArrestLawbreaker.push(this.fb.group(lawbreaker))
    let sort = this.sortFormArray(this.ArrestLawbreaker.value);
    sort.then(x => this.setItemFormArray(x, 'ArrestLawbreaker'))
      .catch((error) => this.catchError(error));
  }

  productCheckAll() {
    this.isCheckAll = !this.isCheckAll;
    let product = this.ArrestProduct.value.map(item => {
      item.IsChecked = this.isCheckAll
      return item;
    });
    this.ArrestProduct.patchValue(product);
  }

  private async sortFormArray(arr: any[]) {
    let a = await arr.sort((a, b) => {
      if (a.RowId < b.RowId) return -1; // asc
      if (a.RowId > b.RowId) return 1; // desc
      return 0;
    });
    let i = 0;
    a.map((x) => { if (x.RowId != 0) x.RowId = ++i; });
    return a;
  }

  private deleteFormArray(o: FormArray, i: number, controls: string) {
    o.at(i).patchValue({ IsModify: 'd', RowId: 0 });
    let sort = this.sortFormArray(o.value);
    o.value.map(() => o.removeAt(0));
    sort.then(x => this.setItemFormArray(x, controls))
      .catch((error) => this.catchError(error));
  }

  async deleteProduct(i: number) {
    await this.deleteFormArray(this.ArrestProduct, i, 'ArrestProduct');
  }

  async deleteLawbreaker(i: number) {
    await this.deleteFormArray(this.ArrestLawbreaker, i, 'ArrestLawbreaker');
  }

  private async setProductUnitStore() {
    await this.s_mainMaster.MasDutyUnitMaingetAll()
      .then(res => this.typeheadQtyUnit = res)
      .catch((error) => this.catchError(error));
  }

  private filterProductIsModify(p: fromModels.ArrestProduct[]) {
    return p.filter(y => y.IsModify == 'c');
  }

  private filterLawbreakerIsModify(o: fromModels.ArrestLawbreaker[]) {
    return o.filter(x => x.IsModify != 'd');
  }

  private setItemFormArray(array: any[], formControl: string) {

    if (array !== undefined && array.length) {

      const itemFGs = array.map(item => this.fb.group(item));
      const itemFormArray = this.fb.array(itemFGs);
      this.arrestIndictmentFG.setControl(formControl, itemFormArray);
    }
  }

  setArrestLawGuiltbase(e: fromModels.ArrestLawGuitbase) {

    if (!e) return;

    let ArrestLawSubSectionRule = e.ArrestLawSubSectionRule
      .find(x => x.SubSectionRuleID == e.SubSectionRuleID);

    let ArrestLawSubSection = ArrestLawSubSectionRule
      .ArrestLawSubSection
      .find(x => x.SubSectionID == ArrestLawSubSectionRule.SubSectionID);

    let ArrestLawSection = ArrestLawSubSectionRule
      .ArrestLawSection
      .find(x => x.SectionNo == ArrestLawSubSectionRule.SectionNo);

    let ArrestLawPenalty = ArrestLawSection.ArrestLawPenalty[0];

    this.arrestIndictmentFG.patchValue({
      GuiltBaseID: e.GuiltBaseID,
      ArrestLawGuitbase: e,
      IsModify: this.mode == 'C' ? 'c' : 'r',
      SubSectionType: ArrestLawSubSection.SubSectionType,
      GuiltBaseName: e.GuiltBaseName,
      SectionNo: ArrestLawSubSectionRule.SectionNo,
      PenaltyDesc: ArrestLawPenalty.PenaltyDesc,
    })
  }

  private onSave() {
    this.arrestIndictmentFG.value;

    let lawbreaker = this.filterLawbreakerIsModify(this.ArrestLawbreaker.value);
    let product = this.ArrestProduct.value.filter(x => x.IsModify != 'd');

    if (this.arrestIndictmentFG.invalid) {
      alert(Message.checkData);
      return;
    }

    if (!lawbreaker.length && !product.length) {
      alert(Message.checkData);
      return;
    }

    if (this.ArrestStore) {
      let staff: fromModels.ArrestStaff[] = this.ArrestStore.ArrestStaff.filter(x => x.IsModify != 'd')
      if (staff.length) {
        if (staff.length <= 0) {
          alert('ต้องมีรายการผู้ร่วมจับกุมอย่างน้อย 1 รายการ')
          return
      }
      if (staff.filter(x => x.ContributorID == '').length > 0) {
          alert('กรุณาเลือกฐานะของผู้จับกุม');
          return;
      }
      if (staff.filter(x => x.ContributorID == '6').length <= 0) {
          alert('ต้องมีผู้จับกุมที่มีฐานะเป็น “ผู้กล่าวหา” อย่างน้อย 1 รายการ');
          return;
      }
      }
    }

    if (this.arrestCode != 'NEW' && this.mode == 'C') {
      this.createWithArrestCode();

    } else if (this.arrestCode == 'NEW' && this.mode == 'C') {
      this.createWithOutArrestCode();

    } else if (this.mode == 'R') {
      this.revised();
    }
  }

  private onDelete() {
    this.s_lawsuit.ArrestLawsuitgetByIndictmentID(this.indictmentId)
      .then(x => {
        if (this.checkResponse(x)) {
          alert(Message.cannotDeleteRec)
          return;
        }

        if (confirm(Message.confirmAction)) {
          this.s_indictment.ArrestIndictmentupdDelete(this.indictmentId)
            .then(x => {
              if (this.checkResponse(x)) {
                alert(Message.delComplete);
                this.router.navigate(['/arrest/manage', this.arrestMode, this.arrestCode]);
              }
            }).catch((error) => this.catchError(error));
        }
      }).catch((error) => this.catchError(error));

  }

  private onEdit() {
    this.enableBtnModeC();
  }

  private async createWithArrestCode() {
    this.loaderService.show();
    await this.insertArrestIndictment(this.arrestCode)

    this.onComplete();

    this.loaderService.hide();
  }

  private async createWithOutArrestCode() {
    this.loaderService.show();
    await this.getTransactionRunning();

    this.onComplete();

    this.loaderService.hide();
  }

  private async revised() {
    this.loaderService.show();
    await this.s_indictment.ArrestIndictmentupdDelete(this.indictmentId)
      .then(async y => {
        if (!this.checkIsSuccess(y)) return;

        await this.insertArrestIndictment(this.arrestCode)
      })
      .catch((error) => this.catchError(error));

    this.onComplete();

    this.loaderService.hide();
  }

  private onComplete() {
    if (this._isSuccess) {

      setTimeout(() => {
        this.isCheckAll = false;
        this.store.dispatch(new fromStore.RemoveArrest);
        this.arrestIndictmentFG.reset();
        this.clearFormArray(this.ArrestProduct);
        this.clearFormArray(this.ArrestLawbreaker);
      }, 300);

      alert(Message.saveComplete)
      this.router.navigate(
        [`arrest/allegation`, 'R'],
        {
          queryParams: {
            arrestMode: this.arrestMode,
            arrestCode: this.arrestCode,
            indictmentId: this.indictmentId,
            guiltbaseId: this.guiltbaseId
          }
        });

    } else {
      alert(Message.saveFail)
    }
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  private async getTransactionRunning() {

    let resRunning: any[] = await this.s_transactionRunning
      .TransactionRunninggetByCon(this.runningTable, this.runningOfficeCode)
      .then(async (x: TransactionRunning[]) => x)

    if (resRunning.length) {
      let tr = resRunning.sort((a, b) => b.RunningNo - a.RunningNo)[0] // sort desc
      let str = '' + (tr.RunningNo + 1)
      let pad = '00000';
      let ans = pad.substring(0, pad.length - str.length) + str
      this.arrestCode = `${tr.RunningPrefix}${tr.RunningOfficeCode}${tr.RunningYear}${ans}`;

      await this.s_transactionRunning.
        TransactionRunningupdByCon(tr.RunningID.toString())
        .then(async y => {
          if (!this.checkIsSuccess(y)) return;
          return true;
        }, () => { this.saveFail(); return; })
        .catch((error) => this.catchError(error));

    } else {
      await this.s_transactionRunning
        .TransactionRunninginsAll(this.runningOfficeCode, this.runningTable, this.runningPrefix)
        .then(async y => {
          if (!this.checkIsSuccess(y)) return;

          let ans = '00001'
          let year = ((new Date).getFullYear() + 543).toString()
          year = year.substring(2, 4);
          this.arrestCode = `${this.runningPrefix}${this.runningOfficeCode}${year}${ans}`;
          return true;
        }, () => { this.saveFail(); return; })
        .catch((error) => this.catchError(error));
    }

    if (this.arrestCode)
      await this.insertArrest(this.arrestCode);
  }

  async insertArrest(arrestCode: string) {
    if (!arrestCode) { this.saveFail(); return; };
    let a = this.ArrestStore;
    a.ArrestCode = arrestCode;
    if (this.isObject(a.ArrestDate)) {
      let arrestDate = getDateMyDatepicker(a.ArrestDate);
      a.ArrestDate = convertDateForSave(arrestDate);
    }
    if (this.isObject(a.OccurrenceDate)) {
      let occurrenceDate = getDateMyDatepicker(a.OccurrenceDate);
      a.OccurrenceDate = convertDateForSave(occurrenceDate);
    }

    let newArrest = {
      ArrestCode: a.ArrestCode,
      ArrestDate: a.ArrestDate,
      ArrestTime: a.ArrestTime,
      OccurrenceDate: a.OccurrenceDate,
      OccurrenceTime: a.OccurrenceTime,
      ArrestStationCode: a.ArrestStationCode,
      ArrestStation: a.ArrestStation,
      HaveCulprit: a.HaveCulprit,
      Behaviour: a.Behaviour,
      Testimony: a.Testimony,
      Prompt: a.Prompt,
      IsMatchNotice: a.IsMatchNotice,
      ArrestDesc: a.ArrestDesc,
      NoticeCode: a.NoticeCode,
      InvestigationSurveyDocument: a.InvestigationSurveyDocument,
      InvestigationCode: a.InvestigationCode,
      IsActive: a.IsActive,
      ArrestLocale: a.ArrestLocale
        .map(x => {
          x.ArrestCode = a.ArrestCode;
          return x;
        }),
      ArrestStaff: a.ArrestStaff
        .filter(x => x.IsModify != 'd')
        .map(x => {
          x.ArrestCode = a.ArrestCode;
          return x;
        })
    }

    console.log('Arrest : ', JSON.stringify(newArrest));

    await this.s_arrest.ArrestinsAll(newArrest)
      .then(async x => {
        if (!this.checkIsSuccess(x)) return;

        let newNotice = a.ArrestNotice.filter(x => x.IsModify != 'd')
          .map(x => {
            x.ArrestCode = a.ArrestCode;
            return x;
          });

        await this.updateArrestNotice(newNotice);

        await this.insertArrestIndictment(arrestCode);

      }, () => { this.saveFail(); return; })
      .catch((error) => this.catchError(error));
  }

  private async updateArrestNotice(arrestNotice: fromModels.ArrestNotice[]) {
    let n = arrestNotice.map(async x => {
      console.log('ArrestNotice : ', JSON.stringify({ ArrestCode: x.ArrestCode, NoticeCode: x.NoticeCode }));

      await this.s_notice.ArrestNoticeupdByCon(x.ArrestCode, x.NoticeCode)
        .then(x => {
          if (!this.checkIsSuccess(x)) return;
        }, () => { this.saveFail(); return; })
        .catch((error) => this.catchError(error));
    });

    return Promise.all(n);
  }

  private async insertArrestIndictment(arrestCode: string) {

    let i: fromModels.ArrestIndictment = this.arrestIndictmentFG.value;
    let newIndictment = new fromModels.ArrestIndictment;
    newIndictment.ArrestCode = arrestCode;
    newIndictment.GuiltBaseID = i.GuiltBaseID
    newIndictment.IsProve = i.IsProve || 1
    newIndictment.IsActive = i.IsActive || 1
    newIndictment.IsLawsuitComplete = i.IsLawsuitComplete || 0

    console.log('ArrestIndictment : ', JSON.stringify(newIndictment));

    await this.s_indictment.ArrestIndictmentinsAll(newIndictment)
      .then(async x => {
        if (!this.checkIsSuccess(x)) return;
        this.indictmentId = x.IndictmentID;
        this.guiltbaseId = i.GuiltBaseID;

        await this.insertArrestProduct(arrestCode, x.IndictmentID).then(async product => {
          await this.insertArrestLawbreaker(arrestCode, x.IndictmentID, product)
        })
        // return Promise.all([product, lawbreaker]);

      }, () => { this.saveFail(); return false; })
      .catch((error) => this.catchError(error));
  }

  async insertArrestLawbreaker(arrestCode: string, indictmentId: number, productArr: fromModels.ArrestProduct[]) {
    let lawbreaker: fromModels.ArrestLawbreaker[] = this.ArrestLawbreaker.value;
    let lawb;
    if (lawbreaker.length) {
      lawb = await lawbreaker
        .filter(e => e.IsModify == 'c')
        .map(async e => {
          e.ResultCount = "";
          e.ArrestCode = arrestCode;
          e.LawbreakerRefID = e.LawbreakerID;

          console.log('Lawbreaker : ', JSON.stringify(e));

          await this.s_lawbreaker
            .ArrestLawbreakerinsAll(e)
            .then(async y => {
              if (!this.checkIsSuccess(y)) return;

              await this.insertArrestIndictmentDetail(indictmentId, y.LawbreakerID, productArr);

            }, () => { this.saveFail(); return; })
            .catch((error) => this.catchError(error));
        })
    } else {
      lawb = await this.insertArrestIndictmentDetail(indictmentId, null, productArr);
    }
    return Promise.all(lawb);
  }

  async insertArrestIndictmentDetail(indictmentID: number, lawbreakerId: number, productArr: fromModels.ArrestProduct[]) {
    let indictmentDetail = new fromModels.ArrestIndictmentDetail();
    indictmentDetail.IndictmentID = indictmentID;
    indictmentDetail.LawbreakerID = lawbreakerId;
    indictmentDetail.IsActive = 1;

    console.log('ArrestIndictmentDetail : ', JSON.stringify(indictmentDetail));

    await this.s_indictmentDetail
      .ArrestIndicmentDetailinsAll(indictmentDetail)
      .then(async x => {
        if (!this.checkIsSuccess(x)) return;

        let prod = await this.insertArrestProductDetail(x.IndictmentDetailID, productArr);

      }, () => { this.saveFail(); return; })
      .catch((error) => this.catchError(error));
  }

  async insertArrestProduct(arrestCode: string, indictmentId: number): Promise<fromModels.ArrestProduct[]> {
    let product: fromModels.ArrestProduct[] = this.ArrestProduct.value;
    // let product: fromModels.ArrestProduct[] = this.filterProductIsModify(this.ArrestProduct.value);

    await product.map(async w => {
      w.ArrestCode = arrestCode;
      w.GroupCode = w.GroupCode || '1';
      w.IsDomestic = w.IsDomestic || '1';
      w.ProductDesc = this.isObject(w.ProductDesc) ? w.ProductDesc['ProductDesc'] : w.ProductDesc;

      switch (w.IsModify) {
        case 'c':
          console.log('ArrestProduct "c" : ', JSON.stringify(w));
          await this.s_productService.ArrestProductinsAll(w)
            .then(async x => {
              if (!this.checkIsSuccess(x)) return;

              if (w.IsChecked) {
                console.log('ArrestIndictmentProduct "c" : ', JSON.stringify(w));
                // let prod = await this.insertArrestProductDetail(indictmentDetailID, x.ProductID, w);
                w.ProductID = x.ProductID;
                let indictProd = await this.insertArrestIndictmentProduct(indictmentId, x.ProductID, w);
                return Promise.all([indictProd]);
              }

            }, () => { this.saveFail(); return; })
            .catch((error) => this.catchError(error));
          break;

        case 'r':
          if (w.IsChecked) {
            console.log('ArrestIndictmentProduct "r" : ', JSON.stringify(w));
            // let prod = await this.insertArrestProductDetail(indictmentDetailID, parseInt(w.ProductID), w);
            let indictProd = await this.insertArrestIndictmentProduct(indictmentId, parseInt(w.ProductID), w);
            return Promise.all([indictProd]);
          }
          break;
      }

      return w;
    })

    return product;
  }

  async insertArrestProductDetail(indictmentDetailID: number, productArr: fromModels.ArrestProduct[]) {

    let pd = await productArr.map(async p => {
      let pd = new fromModels.ArrestProductDetail();
      pd.IsProdcutCo = '1';
      pd.Qty = p.Qty || '0';
      pd.QtyUnit = p.QtyUnit || '-';
      pd.Size = p.Size || '0';
      pd.SizeUnit = p.SizeUnitName || '-';
      pd.Volume = p.NetVolume || '0';
      pd.VolumeUnit = p.NetVolumeUnit || '-';
      pd.MistreatRate = '';
      pd.Fine = '';
      pd.IndictmentDetailID = indictmentDetailID;
      pd.ProductDesc = p.ProductDesc;
      pd.IsActive = 1;

      console.log('ProductDetail : ', JSON.stringify(pd));

      let _pd = await this.s_productDetail.ArrestProductDetailinsAll(pd)
        .then(y => {
          if (!this.checkIsSuccess(y)) return;
        }, () => { this.saveFail(); return; })
        .catch((error) => this.catchError(error));

      return Promise.all([_pd]);
    })

    return Promise.all([pd]);
  }

  async insertArrestIndictmentProduct(indictmentId: number, productId: number, product: fromModels.ArrestProduct) {
    let p = new fromModels.ArrestIndictmentProduct();
    p.IndictmentID = indictmentId;
    p.ProductID = productId;
    p.IsProdcutCo = '1';
    p.IndictmentProductQty = product.Qty || '0';
    p.IndictmentProductQtyUnit = product.QtyUnit || '-';
    p.IndictmentProductSize = product.Size || '0';
    p.IndictmentProductSizeUnit = product.SizeUnitName || '-';
    p.IndictmentProductVolume = product.NetVolume || '0';
    p.IndictmentProductVolumeUnit = product.NetVolumeUnit || '-';
    p.IndictmentProductMistreatRate = '';
    p.IndictmentProductFine = '';
    p.IndictmentProductIsActive = 1;

    console.log('IndictmentProduct : ', JSON.stringify(p));

    await this.s_indictment.ArrestIndictmentProductinsAll(p)
      .then(y => {
        if (!this.checkIsSuccess(y)) return;
      }).catch((error) => this.catchError(error));
  }

  isObject = (obj) => obj === Object(obj);

  saveFail() {
    this._isSuccess = false;
    return false;
  }

  checkResponse(res: any) {
    switch (res.IsSuccess) {
      case 'False':
      case false:
        return false;
      default:
        return true;
    }
  }

  checkIsSuccess(res: any) {
    switch (res.IsSuccess) {
      case 'True':
      case true:
        this._isSuccess = true;
        return true;
      default:
        this._isSuccess = false;
        return false;
    }
  }

  catchError(error: any) {
    console.log(error);
    this.endLoader();
  }

  endLoader = () => this.loaderService.hide();

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openModal(e) {
    this.modal = this.modelService.open(e, { size: 'lg', centered: true });
  }

}
