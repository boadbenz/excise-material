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
  newArrestCode: string;
  indictmentId: string;
  guiltbaseId: string;
  typeheadProductUnit = new Array<MasDutyProductUnitModel>();
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

    this.sidebarService.setVersion('0.0.0.21');

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

    await this.setProductUnitStore();

    this.navService.showFieldEdit.takeUntil(this.destroy$).subscribe(p => this.showEditField = p.valueOf())

    combineLatest(this.activeRoute.params, this.activeRoute.queryParams)
      .map(results => ({ params: results[0], queryParams: results[1] }))
      .takeUntil(this.destroy$)
      .subscribe(async results => {
        this.mode = results.params.mode;
        this.arrestCode = results.queryParams.arrestCode;
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

            if (this.arrestCode != 'NEW') {
              this.getArrestProductByArrest(this.arrestCode);
            } else {
              let _prod = this.filterProductIsModify(this.Arrest.ArrestProduct);
              this.setItemFormArray(_prod, 'ArrestProduct');
            }
            break;

          case 'R':
            // set false
            this.navService.setSaveButton(false);
            this.navService.setCancelButton(false);
            // set true
            this.navService.setEditButton(true);
            this.navService.setDeleteButton(true);
            this.navService.setEditField(true);

            this.loaderService.show();
            await this.getArrestIndictment(this.indictmentId);
            await this.getArrestIndictmentProduct(this.indictmentId, this.arrestCode);
            this.loaderService.hide();
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
    this.navService.onPrevPage.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
        await this.navService.setOnPrevPage(false);
        this.router.navigate(['/arrest/manage', this.mode, this.newArrestCode || this.arrestCode]);
      }
    })
  }

  private async getArrestIndictment(indictmentId: string) {
    await this.s_indictment.ArrestIndictmentgetByCon(indictmentId)
      .then(x => {
        this.setArrestIndictment(x);
      })
  }

  private async getArrestIndictmentProduct(indictmentId: string, arrestCode: string) {
    await this.s_indictmentDetail.ArrestIndicmentDetailgetByIndictmentID(indictmentId)
      .then(async (x: fromModels.ArrestProduct[]) => {
        await this.s_productService.ArrestProductgetByArrestCode(arrestCode)
          .then(async (y: fromModels.ArrestProduct[]) => {
            let newProduct = new Array<fromModels.ArrestProduct>();

            await x.map(x1 => {
              y.filter(y1 => y1.ProductID != x1.ProductID);
              if (y.length)
                newProduct.push(...y)
            })

            this.setItemFormArray(newProduct, 'ArrestProduct');
          })
      });
  }

  private getArrestProductByArrest(arrestCode: string) {
    this.s_productService.ArrestProductgetByArrestCode(arrestCode)
      .then((x: fromModels.ArrestProduct[]) => {
        x.map((y, index) => {
          y.IsChecked = false;
          y.RowId = index + 1;
          y.IsModify = 'r';
        })
        // let product = this.filterProductIsModify(this.Arrest.ArrestProduct)
        // let _product = [...product, ...x];
        this.setItemFormArray(x, 'ArrestProduct');
      })
  }

  // set FormArray ArrestIndictment
  private setArrestIndictment(o: fromModels.ArrestIndictment[]) {
    let _indict = this.arrestIndictmentFG;
    if (!o.length) return;

    // _indict.patchValue(o[0])

    _indict.patchValue({
      IndictmentID: o[0].IndictmentID,
      GuiltBaseID: o[0].GuiltBaseID,
      ArrestLawGuitbase: this.setArrestLawGuitbase(o[0].ArrestLawGuitbase)
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
    this.ArrestLawbreaker.push(this.fb.group(lawbreaker))
    let sort = this.sortFormArray(this.ArrestLawbreaker.value);
    sort.then(x => this.setItemFormArray(x, 'ArrestLawbreaker'));
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
    sort.then(x => this.setItemFormArray(x, controls));
  }

  async deleteProduct(i: number) {
    await this.deleteFormArray(this.ArrestProduct, i, 'ArrestProduct');
  }

  async deleteLawbreaker(i: number) {
    await this.deleteFormArray(this.ArrestLawbreaker, i, 'ArrestLawbreaker');
  }

  private async setProductUnitStore() {
    await this.s_mainMaster.masDutyUnitMaingetAll().then(res => {
      this.typeheadProductUnit = res;
    })
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
  }

  private onSave() {
    this.arrestIndictmentFG.value;

    let lawbreaker = this.filterLawbreakerIsModify(this.ArrestLawbreaker.value);
    let product = this.filterProductIsModify(this.ArrestProduct.value);
    if (!lawbreaker.length && !product.length) {
      alert(Message.checkData);
      return;
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
      .takeUntil(this.destroy$)
      .subscribe(x => {
        if (this.checkResponse(x)) {
          alert(Message.cannotDeleteRec)
          return;
        }

        if (confirm(Message.confirmAction)) {
          this.s_indictment.ArrestIndictmentupdDelete(this.indictmentId).then(x => {
            if (this.checkResponse(x)) {
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
    if (this._isSuccess) {
      alert(Message.saveComplete)
    } else {
      alert(Message.saveFail)
    }
    this.loaderService.hide();
  }

  private async createWithOutArrestCode() {
    this.loaderService.show();
    await this.getTransactionRunning();
    if (this._isSuccess) {
      alert(Message.saveComplete)
    } else {
      alert(Message.saveFail)
    }
    this.loaderService.hide();
  }

  private async revised() {
    this.loaderService.show();
    await this.s_indictment.ArrestIndictmentupdDelete(this.indictmentId).then(y => {
      if (!this.checkIsSuccess(y)) return;

      this.insertArrestIndictment(this.arrestCode)
    })
    if (this._isSuccess) {
      alert(Message.saveComplete)
    } else {
      alert(Message.saveFail)
    }
    this.loaderService.hide();
  }

  private async getTransactionRunning() {

    let resRunning: any[] = await this.s_transactionRunning
      .TransactionRunninggetByCon(this.runningTable, this.runningOfficeCode)
      .then(async (x: TransactionRunning[]) => x);

    if (resRunning.length) {
      let tr = resRunning.sort((a, b) => b.RunningNo - a.RunningNo)[0] // sort desc
      let str = '' + (tr.RunningNo + 1)
      let pad = '00000';
      let ans = pad.substring(0, pad.length - str.length) + str
      this.newArrestCode = `${tr.RunningPrefix}${tr.RunningOfficeCode}${tr.RunningYear}${ans}`;

      await this.s_transactionRunning.
        TransactionRunningupdByCon(tr.RunningID.toString())
        .then(async y => {
          if (!this.checkIsSuccess(y)) return;
          return true;
        },
          () => { this.saveFail(); return; })

    } else {
      await this.s_transactionRunning
        .TransactionRunninginsAll(this.runningOfficeCode, this.runningTable, this.runningPrefix)
        .then(async y => {
          if (!this.checkIsSuccess(y)) return;

          let ans = '00001'
          let year = ((new Date).getFullYear() + 543).toString()
          year = year.substring(2, 4);
          this.newArrestCode = `${this.runningPrefix}${this.runningOfficeCode}${year}${ans}`;
          return true;
        },
          () => { this.saveFail(); return; })
    }

    if (this.newArrestCode)
      await this.insertArrest(this.newArrestCode);
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
        if (!this.checkIsSuccess(x)) return;

        await this.insertArrestIndictment(arrestCode);
      },
        () => { this.saveFail(); return; });
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

        this.insertArrestIndictmentDetail(arrestCode, x.IndictmentID);
      },
        () => { this.saveFail(); return false; });
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
        if (!this.checkIsSuccess(x)) return;

        await this.insertArrestProduct(arrestCode, x.IndictmentDetailID)

        await this.insertArrestLawbreaker(arrestCode)
      },
        () => { this.saveFail(); return; })
  }

  async insertArrestProduct(arrestCode: string, indictmentDetailID: number) {

    let product: fromModels.ArrestProduct[] = this.ArrestProduct.value;
    let productNoId: fromModels.ArrestProduct[] = this.filterProductIsModify(this.ArrestProduct.value);

    if (!productNoId.length) return;

    const prod = await product.map(async w => {
      w.ArrestCode = arrestCode;
      w.GroupCode = w.GroupCode || '1';
      w.IsDomestic = w.IsDomestic || '1';
      w.ProductDesc = this.isObject(w.ProductDesc) ? w.ProductDesc['ProductDesc'] : w.ProductDesc;

      console.log('ArrestProduct : ', JSON.stringify(w));

      await this.s_productService
        .ArrestProductinsAll(w)
        .then(async x => {
          if (!this.checkIsSuccess(x)) return;

          await this.insertArrestProductDetail(indictmentDetailID, x.ProductID, w);
        },
          () => { this.saveFail(); return; });
    })
    return Promise.all(prod);
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
        if (!this.checkIsSuccess(y)) return;
      },
        () => { this.saveFail(); return; });

  }

  async insertArrestLawbreaker(arrestCode) {
    let lawbreaker: fromModels.ArrestLawbreaker[] = this.ArrestLawbreaker.value;
    let lawb = await lawbreaker.map(async e => {
      e.ResultCount = "";
      e.ArrestCode = arrestCode;

      console.log('Lawbreaker : ', JSON.stringify(e));

      await this.s_lawbreaker
        .ArrestLawbreakerinsAll(e)
        .then(y => {
          if (!this.checkIsSuccess(y)) return;
          return true;
        },
          () => { this.saveFail(); return; });
    })
    return Promise.all(lawb);
  }

  isObject = (obj) => obj === Object(obj);

  saveFail() {
    this._isSuccess = false;
    return false;
  }

  checkResponse(res: any) {
    switch (res.IsSuccess) {
      case 'True':
      case true:
        return true;
      default:
        return false;
    }
  }

  checkIsSuccess(res: any) {
    switch (res.IsSuccess) {
      case 'True':
      case true:
        this._isSuccess = true;
        return true;
      default:
        alert(Message.saveFail);
        this._isSuccess = false;
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
