import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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

@Component({
  selector: 'app-allegation',
  templateUrl: './allegation.component.html',
  styleUrls: ['./allegation.component.scss']
})
export class AllegationComponent implements OnInit, OnDestroy {

  obArrest: Observable<fromModels.Arrest>;
  Arrest: fromModels.Arrest;
  ACCEPTABILITY = Acceptability;

  constructor(
    private modelService: NgbModal,
    private activeRoute: ActivatedRoute,
    private navService: NavigationService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromStore.AppState>,
    private sidebarService: SidebarService,
    private s_mainMaster: MainMasterService,
    private s_masLawbreaker: fromService.ArrestMasLawbreakerService,
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
        this.Arrest = x;
      })

    this.navService.setPrintButton(false);
    this.navService.setPrevPageButton(true);
    this.navService.setNextPageButton(true);

    this.navService.setInnerTextPrevPageButton('งานจับกุม')
    this.navService.setInnerTextNextPageButton('รับคำกล่าวโทษ')
  }
  private destroy$: Subject<boolean> = new Subject<boolean>();

  card1: boolean = true;
  card2: boolean = true;
  cardProduct: boolean = true;

  isCheckAll: boolean = false;

  runningTable = 'ops_arrest';
  runningOfficeCode = '90501';
  runningPrefix = 'TN';

  // param: Params
  mode: string;
  arrestCode: string;
  indictmentId: string;
  guiltbaseId: string;
  typeheadProductUnit = new Array<MasDutyProductUnitModel>();

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

    this.sidebarService.setVersion('0.0.0.18');

    this.arrestIndictmentFG = this.fb.group({
      IndictmentID: [''],
      ArrestCode: ['', Validators.required],
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

    if (this.Arrest) {
      this.setItemFormArray(this.Arrest.ArrestProduct, 'ArrestProduct');
    }

    await this.setProductUnitStore();

    this.navService.showFieldEdit.takeUntil(this.destroy$).subscribe(p => this.showEditField = p.valueOf())

    combineLatest(this.activeRoute.params, this.activeRoute.queryParams)
      .map(results => ({ params: results[0], queryParams: results[1] }))
      .takeUntil(this.destroy$)
      .subscribe(results => {
        this.mode = results.params.mode;
        this.arrestCode = results.queryParams.arrestCode == 'NEW' ? '' : results.queryParams.arrestCode;
        this.indictmentId = results.queryParams.indictmentId;
        this.guiltbaseId = results.queryParams.guiltbaseId;

        switch (this.mode) {
          case 'C':
            // set false
            this.navService.setEditButton(false);
            this.navService.setDeleteButton(false);
            this.navService.setEditField(false);
            // set true
            this.navService.setSaveButton(true);
            this.navService.setCancelButton(true);
            break;

          case 'R':
            // set false
            this.navService.setSaveButton(false);
            this.navService.setCancelButton(false);
            // set true
            this.navService.setEditButton(true);
            this.navService.setDeleteButton(true);
            this.navService.setEditField(true);
            break;
        }
      });

    this.navService.onSave.takeUntil(this.destroy$).subscribe(status => {
      if (status) {
        this.navService.setOnSave(false);
        this.onSave();
      }
    });
    this.navService.onEdit.takeUntil(this.destroy$).subscribe(status => {
      if (status) {
        this.navService.setOnEdit(false);
      }
    })
    this.navService.onDelete.takeUntil(this.destroy$).subscribe(status => {
      if (status) {
        this.navService.setOnDelete(false);

        this.onDelete();
      }
    })
    this.navService.onCancel.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
        await this.navService.setOnCancel(false);
        this.router.navigate(['/arrest/manage', this.mode, this.arrestCode]);
      }
    })
    this.navService.onNextPage.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
        await this.navService.setOnNextPage(false);
        this.router.navigate(['/lawsuit/manage', 'C', this.arrestIndictmentFG.value.IndictmentID]);
      }
    })
    this.navService.onNextPage.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
        await this.navService.setOnPrevPage(false);
        this.router.navigate(['/arrest/manage', this.mode, this.arrestCode]);
      }
    })
  }

  addArrestLawbreaker(lawbreaker: fromModels.ArrestLawbreaker) {
    this.ArrestLawbreaker.push(this.fb.group(lawbreaker))
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
    debugger
    o.at(i).patchValue({ IsModify: 'd', RowId: 0 });
    let sort = this.sortFormArray(o.value);
    o.value.map(() => o.removeAt(0));
    sort.then(x => this.setItemFormArray(x, controls));
  }

  async deleteProduct(i: number) {
    await this.deleteFormArray(this.ArrestProduct, i, 'ArrestProduct');
    // Set product 
    // this.Arrest.ArrestProduct = this.ArrestProduct.value;
  }

  private async setProductUnitStore() {
    await this.s_mainMaster.masDutyUnitMaingetAll().then(res => {
      this.typeheadProductUnit = res;
    })
  }

  private getArrestFormStore() {

  }

  private filterProductIsModify(p: fromModels.ArrestProduct[]) {
    return p.filter(y => y.IsModify != 'd' && y.ProductID == '');
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
      .find(x => x.SectionNo == ArrestLawSubSectionRule.SectionNo);

    let ArrestLawSection = ArrestLawSubSectionRule
      .ArrestLawSection
      .find(x => x.SectionNo == ArrestLawSubSectionRule.SectionNo);

    let ArrestLawPenalty = ArrestLawSection.ArrestLawPenalty
      .find(x => x.SectionNo == ArrestLawSection.SectionNo)

    this.arrestIndictmentFG.patchValue({
      GuiltBaseID: e.GuiltBaseID,
      ArrestLawGuitbase: e,
      IsModify: this.mode == 'C' ? 'c' : 'r',
      SubSectionType: ArrestLawSubSection.SubSectionType,
      GuiltBaseName: e.GuiltBaseName,
      SectionNo: ArrestLawSubSectionRule.SectionNo,
      PenaltyDesc: ArrestLawPenalty.PenaltyDesc,
    })

    // this.store.dispatch(new fromStore.CreateArrestIndictment([this.arrestIndictmentFG.value]));

  }


  private onSave() {
    this.arrestIndictmentFG.value;

    let lawbreaker = this.filterLawbreakerIsModify(this.ArrestLawbreaker.value);
    let product = this.filterProductIsModify(this.ArrestProduct.value);
    if (!lawbreaker.length && !product.length) {
      alert(Message.checkData);
      return;
    }

    if (this.arrestCode && this.mode == 'C') {
      this.createWithArrestCode();

    } else if (!this.arrestCode && this.mode == 'C') {
      this.createWithOutArrestCode();

    } else if (this.mode == 'R') {
      this.revised();
    }
  }

  private onDelete() {
    this.s_lawsuit.ArrestLawsuitgetByIndictmentID(this.indictmentId)
      .takeUntil(this.destroy$)
      .subscribe(x => {
        if (this.checkIsSuccess(x)) {
          alert(Message.cannotDeleteRec)
          return;
        }

        if (confirm(Message.confirmAction)) {
          this.s_indictment.ArrestIndictmentupdDelete(this.indictmentId).then(x => {
            if (this.checkIsSuccess(x)) { 
              alert(Message.delComplete);
              this.router.navigate(['/arrest/manage', this.mode, this.arrestCode]);
             }
          })
        }
      })

  }

  private async createWithArrestCode() {
    this.loaderService.show();
    await this.insertArrestIndictment(this.arrestCode)
    this.loaderService.hide();
  }

  private createWithOutArrestCode() {
    this.getTransactionRunning();
  }

  private revised() {
    this.s_indictment.ArrestIndictmentupdDelete(this.indictmentId).then(y => {
      if (!this.checkIsSuccess(y)) { this.saveFail(); return; }

      this.insertArrestIndictment(this.arrestCode)
    })
  }

  private getTransactionRunning() {
    this.s_transactionRunning
      .TransactionRunninggetByCon(this.runningTable, this.runningOfficeCode)
      .then((x: TransactionRunning[]) => {
        let _arrestCode: string;
        if (x.length) {
          let tr = x.sort((a, b) => b.RunningNo - a.RunningNo)[0] // sort desc
          let str = '' + (tr.RunningNo + 1)
          let pad = '00000';
          let ans = pad.substring(0, pad.length - str.length) + str
          _arrestCode = `${tr.RunningPrefix}${tr.RunningOfficeCode}${tr.RunningYear}${ans}`;

          this.s_transactionRunning.
            TransactionRunningupdByCon(tr.RunningID.toString())
            .then(y => {
              if (!this.checkIsSuccess(y)) { this.saveFail(); return; }

              this.insertArrest(_arrestCode);
            })

        } else {
          this.s_transactionRunning
            .TransactionRunninginsAll(this.runningOfficeCode, this.runningTable, this.runningPrefix)
            .then(y => {
              if (!this.checkIsSuccess(y)) { this.saveFail(); return; }

              let ans = '00001'
              let year = ((new Date).getFullYear() + 543).toString()
              year = year.substring(2, 4);
              _arrestCode = `${this.runningPrefix}${this.runningOfficeCode}${year}${ans}`;

              this.insertArrest(_arrestCode);
            })
        }
      })
  }

  async insertArrest(arrestCode: string) {
    if (!arrestCode) { this.saveFail(); return; };
    let a = this.Arrest;
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
        if (!this.checkIsSuccess(x)) { this.saveFail(); return; };

        await this.insertArrestIndictment(arrestCode);
      },
        () => { this.saveFail(); return; });
  }

  async insertArrestIndictment(arrestCode: string) {

    let arrestIndictment = this.arrestIndictmentFG.value as fromModels.ArrestIndictment;
    arrestIndictment.ArrestCode = arrestCode;

    console.log('ArrestIndictment : ', JSON.stringify(arrestIndictment));

    await this.s_indictment.ArrestIndictmentinsAll(arrestIndictment)
      .then(async x => {
        if (!this.checkIsSuccess(x)) { this.saveFail(); return; };

        await this.insertArrestIndictmentDetail(arrestCode, x.IndictmentID);

        await this.insertArrestLawbreaker(arrestCode);
      },
        () => { this.saveFail(); return; });
  }

  async insertArrestIndictmentDetail(arrestCode: string, indictmentID: number) {
    let indictmentDetail = new fromModels.ArrestIndictmentDetail();
    let lawbreaker = this.ArrestLawbreaker;
    let _lawbreaker = lawbreaker.value.find(x => x.IsChecked == Acceptability.ACCEPTABLE) as fromModels.ArrestLawbreaker;
    indictmentDetail.IndictmentID = indictmentID;
    indictmentDetail.LawbreakerID = _lawbreaker.LawbreakerID;
    indictmentDetail.IsActive = 1;
    // indictmentDetail.LawsuitType;
    // indictmentDetail.LawsuitEnd;
    console.log('ArrestIndictmentDetail : ', JSON.stringify(indictmentDetail));

    await this.s_indictmentDetail
      .ArrestIndicmentDetailinsAll(indictmentDetail)
      .then(async x => {
        if (!this.checkIsSuccess(x)) { this.saveFail(); return; }

        await this.insertArrestProduct(arrestCode, x.IndictmentDetailID);
      },
        () => { this.saveFail(); return; })
  }

  async insertArrestProduct(arrestCode: string, indictmentDetailID: number) {
    let product: fromModels.ArrestProduct[] = this.ArrestProduct.value;
    let productNoId: fromModels.ArrestProduct[] = this.filterProductIsModify(this.ArrestProduct.value);

    if (!productNoId.length) return;

    await product.map(async w => {
      w.ArrestCode = arrestCode;
      w.GroupCode = w.GroupCode || '1';
      w.IsDomestic = w.IsDomestic || '1';
      w.ProductDesc = this.isObject(w.ProductDesc) ? w.ProductDesc['ProductDesc'] : w.ProductDesc;

      console.log('ArrestProduct : ', JSON.stringify(w));

      await this.s_productService
        .ArrestProductinsAll(w)
        .then(async x => {
          if (!this.checkIsSuccess(x)) { this.saveFail(); return; }

          await this.insertArrestProductDetail(indictmentDetailID, x.ProductID, w);
        },
          () => { this.saveFail(); return; });
    })
  }

  async insertArrestProductDetail(indictmentDetailID: number, productId: number, productNoId: fromModels.ArrestProduct) {
    if (!productNoId.IsChecked) { return }

    let pd = new fromModels.ArrestProductDetail();

    pd.ProductID = productId;
    pd.IsProdcutCo = '1';
    pd.Qty = productNoId.Qty;
    pd.QtyUnit = productNoId.QtyUnit;
    pd.Size = productNoId.Size || '0';
    pd.SizeUnit = productNoId.SizeUnitName || '-';
    pd.Volume = productNoId.NetVolume;
    pd.VolumeUnit = productNoId.NetVolumeUnit;
    pd.MistreatRate = '';
    pd.Fine = '';
    pd.IndictmentDetailID = indictmentDetailID;
    pd.ProductDesc = productNoId.ProductDesc;
    pd.IsActive = 1;

    console.log('ProductDetail : ', JSON.stringify(pd));

    await this.s_productDetail
      .ArrestProductDetailinsAll(pd)
      .then(y => {
        if (!this.checkIsSuccess(y)) { this.saveFail(); return; }
      },
        () => { this.saveFail(); return; });
  }

  async insertArrestLawbreaker(arrestCode) {
    let lawbreaker = this.ArrestLawbreaker.value.find(x => x.IsChecked);
    lawbreaker.ArrestCode = arrestCode;

    await this.s_lawbreaker
      .ArrestLawbreakerinsAll(lawbreaker)
      .then(y => {
        if (!this.checkIsSuccess(y)) { this.saveFail(); return; }
      },
        () => { this.saveFail(); return; });
  }

  isObject = (obj) => obj === Object(obj);

  saveFail() {
    alert(Message.saveFail);
    return false;
  }

  checkIsSuccess(res: any) {
    switch (res.IsSuccess) {
      case 'True':
      case true:
        return true;
      default:
        return false;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openModal(e) {
    this.modal = this.modelService.open(e, { size: 'lg', centered: true });
  }

}
