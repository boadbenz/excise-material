import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { pagination } from 'app/config/pagination';
import { Router, ActivatedRoute } from '@angular/router';
import { LawbreakerTypes, EntityTypes } from 'app/models/drop-downs.model';
import { Message } from 'app/config/message';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MainMasterService } from 'app/services/main-master.service';
import { MasDutyProductUnitModel } from 'app/models/mas-duty-product-unit.model';
import { ArrestLawbreakerAllegation, ArrestLawbreaker } from '../../models/arrest-lawbreaker';
import * as fromStore from '../../store';
import * as fromService from '../../services'
import * as fromModel from '../../models';
import { Acceptability } from '../../models/acceptability';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { TransactionRunningService } from 'app/services/transaction-running.service';
import { TransactionRunning } from 'app/models/transaction-running.model';
import { getDateMyDatepicker, convertDateForSave } from 'app/config/dateFormat';

@Component({
  selector: 'app-allegation-detail-modal',
  templateUrl: './allegation-detail-modal.component.html',
  styleUrls: ['./allegation-detail-modal.component.scss']
})
export class AllegationDetailModalComponent implements OnInit, OnDestroy {

  // Redux based variables
  obArrest: Observable<fromModel.Arrest>;
  obArrestIndictment: Observable<fromModel.ArrestIndictment[]>
  // obArrestProduct: Observable<fromModel.ArrestProduct[]>;
  // obArrestLocal: Observable<fromModel.ArrestLocale[]>;
  // obArrestStaff: Observable<fromModel.ArrestStaff[]>;

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
    private s_mainMaster: MainMasterService,
    private s_masLawbreaker: fromService.ArrestMasLawbreakerService,
    private s_ProductService: fromService.ArrestProductService,
    private s_Indictment: fromService.ArrestIndictmentService,
    private s_IndictmentDetail: fromService.ArrestIndictmentDetailService,
    private s_ProductDetail: fromService.ArrestProductDetailService,
    private s_Lawbreaker: fromService.ArrestLawbreakerService,
    private s_transactionRunning: TransactionRunningService,
    private s_arrest: fromService.ArrestService
  ) {
    this.obArrest = store.select(s => s.arrest);
    this.obArrestIndictment = store.select(s => s.arrestIndictment);
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
  guiltbaseId: string;

  _isSuccess: boolean;

  card1 = true;

  @Output() d = new EventEmitter();
  @Output() c = new EventEmitter();
  @Output() OutputLawbreaker = new EventEmitter<fromModel.ArrestLawbreaker>();

  allegationFG: FormGroup;

  productArray: FormArray;

  get Lawbreaker(): FormArray {
    return this.allegationFG.get('Lawbreaker') as FormArray
  }

  // get Product(): FormArray {
  //   return this.allegationFG.get('Product') as FormArray
  // }

  // get LawbreakerDetail(): FormGroup {
  //   return this.allegationFG.get('LawbreakerDetail') as FormGroup
  // }

  async ngOnInit() {

    this.allegationFG = this.fb.group({
      Lawbreaker: this.fb.array([]),
      // Product: this.fb.array([]),
      // LawbreakerDetail: this.fb.group({
      //   LawbreakerFullName: ['', Validators.required],
      //   LawbreakerDetail: ['', Validators.required]
      // })
    });

    // combineLatest(this.activeRoute.params, this.activeRoute.queryParams)
    //   .map(results => ({ params: results[0], queryParams: results[1] }))
    //   .subscribe(results => {
    //     this.mode = results.params.mode;
    //     this.arrestCode = results.queryParams.arrestCode;
    //     this.indictmentDetailId = results.queryParams.indictmentDetailId;
    //     this.guiltbaseId = results.queryParams.guiltbaseId;

    //     switch (this.mode) {
    //       case 'C':
    //         if (this.arrestCode) {
    //           this.getArrestProduct(this.arrestCode);
    //         } else {
    //           this.setArrestFromStore();
    //         }
    //         break;

    //       case 'U':
    //         this.getArrestIndictmentDetail(this.indictmentDetailId, this.arrestCode);

    //         break;

    //       case 'R':
    //         break;
    //     }
    //   });

    // await this.setProductUnitStore();
  }

  private getArrestProduct(arrestCode: string) {
    this.s_ProductService.ArrestProductgetByArrestCode(arrestCode)
      .takeUntil(this.destroy$)
      .subscribe(x => {
        if (x) {
          this.setItemFormArray(x, 'Product');
        } else {
          this.setArrestFromStore();
        }
      })
  }

  private async getArrestIndictmentDetail(IndictmentDetailID: string, arrestCode: string) {
    let indicitDetail: fromModel.ArrestIndictmentDetail[] =
      await this.s_IndictmentDetail.ArrestIndicmentDetailgetByCon(IndictmentDetailID).toPromise();

    let product: fromModel.ArrestProduct[] =
      await this.s_ProductService.ArrestProductgetByArrestCode(arrestCode).toPromise();

    indicitDetail.map(x => {
      // let newProduct = [...x.ArrestProductDetail, ...product];
      // let unique = newProduct.filter((value, index, self) => {
      //   return self.filter.indexOf(value.ProductID) === index;
      // }); // returns ['a', 1, 2, '1']
    })
  }

  private setArrestFromStore() {
    this.obArrest
      .takeUntil(this.destroy$)
      .subscribe((x: fromModel.Arrest) => {
        let product = this.filterProductNoId(x.ArrestProduct);
        this.setItemFormArray(product, 'Product');
      })
  }

  private filterProductNoId(p: fromModel.ArrestProduct[]) {
    return p.filter(y => y.IsModify != 'd' && y.ProductID == '');
  }

  ngOnDestroy(): void {
    this.paginage.TotalItems = 0;
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  dismiss(e: any) {
    this.d.emit(e);
  }

  view(id: number) {
    this.dismiss('Cross click')
    this.router.navigate([`/arrest/lawbreaker/R/${id}`])
  }

  private async setProductUnitStore() {
    await this.s_mainMaster.masDutyUnitMaingetAll().then(res => {
      this.typeheadProductUnit = res;
    })
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
        item.IsChecked = Acceptability.INACCEPTABLE;
        item.LawbreakerTypeName = this.lawbreakerType.find(key => parseInt(key.value) == item.LawbreakerType).text;
        item.EntityType = item.EntityType;
        item.EntityTypeName = this.entityType.find(key => parseInt(key.value) == item.EntityType).text;
        item.LawbreakerRefID = item.LawbreakerID;
        item.LawbreakerFullName = `${item.LawbreakerTitleName || ''}`;
        item.LawbreakerFullName += ` ${item.LawbreakerFirstName || ''}`;
        item.LawbreakerFullName += ` ${item.LawbreakerLastName || ''}`;
        item.ResultCount = this.s_masLawbreaker.ArrestLawsuitResultCountgetByLawbreakerID(item.LawbreakerID.toString())
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
        law.push(item);
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
    // this.setLawbreakerDetail(law.at(i).value)
  }

  // private setLawbreakerDetail(lawAtIndex: any) {

  //   let lawDesc = this.LawbreakerDetail;

  //   lawDesc.value.LawbreakerFullName = lawAtIndex.LawbreakerFullName
  //   lawDesc.value.LawbreakerDetail = `ประเภทผู้ต้องหา (${lawAtIndex.EntityTypeName})`;
  //   lawDesc.value.LawbreakerDetail += ` ประเภทบุคคล (${lawAtIndex.LawbreakerTypeName})`;

  //   switch (lawAtIndex.EntityType) {
  //     case 0: // นิติบุคคล
  //       lawDesc.value.LawbreakerDetail += ` หมายเลขนิติบุคคล (${lawAtIndex.CompanyRegistrationNo})`;
  //       break;
  //     case 1: // บุคคลธรรมดา
  //       switch (lawAtIndex.LawbreakerType) {
  //         case 0: // ต่างชาติ
  //           lawDesc.value.LawbreakerDetail += ` หมายเลขหนังสือเดินทาง (${lawAtIndex.PassportNo})`;
  //           break;
  //         case 1: // ชาวไทย
  //           lawDesc.value.LawbreakerDetail += ` หมายเลขประจำตัวประชาชน (${lawAtIndex.IDCard})`;
  //           break;
  //       }
  //   }
  //   lawDesc.patchValue(lawDesc.value)

  //   this.showLawbreakerDetail = true;
  // }

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
    let law = this.Lawbreaker.value.filter(x => x.IsChecked == Acceptability.ACCEPTABLE);

    if (!law) return;

    this.OutputLawbreaker.emit(...law);

    this.c.emit(e);
  }

  // getTransactionRunning() {
  //   this.s_transactionRunning
  //     .TransactionRunninggetByCon(this.runningTable, this.runningOfficeCode)
  //     .takeUntil(this.destroy$)
  //     .subscribe((x: TransactionRunning[]) => {
  //       let _arrestCode: string;
  //       if (x.length) {
  //         let tr = x.sort((a, b) => b.RunningNo - a.RunningNo)[0] // sort desc
  //         let str = '' + (tr.RunningNo + 1)
  //         let pad = '00000';
  //         let ans = pad.substring(0, pad.length - str.length) + str
  //         _arrestCode = `${tr.RunningPrefix}${tr.RunningOfficeCode}${tr.RunningYear}${ans}`;

  //         this.s_transactionRunning.
  //           TransactionRunningupdByCon(tr.RunningID.toString())
  //           .takeUntil(this.destroy$)
  //           .subscribe(y => {
  //             if (!this.checkIsSuccess(y)) { this.saveFail(); return; }

  //             this.insertArrest(_arrestCode);
  //           })

  //       } else {
  //         this.s_transactionRunning
  //           .TransactionRunninginsAll(this.runningOfficeCode, this.runningTable, this.runningPrefix)
  //           .takeUntil(this.destroy$)
  //           .subscribe(y => {
  //             if (!this.checkIsSuccess(y)) { this.saveFail(); return; }

  //             let ans = '00001'
  //             let year = ((new Date).getFullYear() + 543).toString()
  //             year = year.substring(2, 4);
  //             _arrestCode = `${this.runningPrefix}${this.runningOfficeCode}${year}${ans}`;

  //             this.insertArrest(_arrestCode);
  //           })
  //       }
  //     })
  // }

  // insertArrest(arrestCode: string) {
  //   if (!arrestCode) { this.saveFail(); return; };

  //   this.obArrest
  //     .takeUntil(this.destroy$)
  //     .subscribe((a: fromModel.Arrest) => {
  //       a.ArrestCode = arrestCode;
  //       if (this.isObject(a.ArrestDate)) {
  //         let arrestDate = getDateMyDatepicker(a.ArrestDate);
  //         a.ArrestDate = convertDateForSave(arrestDate);
  //       }
  //       if (this.isObject(a.OccurrenceDate)) {
  //         let occurrenceDate = getDateMyDatepicker(a.OccurrenceDate);
  //         a.OccurrenceDate = convertDateForSave(occurrenceDate);
  //       }

  //       let newArrest = {
  //         ArrestCode: a.ArrestCode,
  //         ArrestDate: a.ArrestDate,
  //         ArrestTime: a.ArrestTime,
  //         OccurrenceDate: a.OccurrenceDate,
  //         OccurrenceTime: a.OccurrenceTime,
  //         ArrestStationCode: a.ArrestStationCode,
  //         ArrestStation: a.ArrestStation,
  //         HaveCulprit: a.HaveCulprit,
  //         Behaviour: a.Behaviour,
  //         Testimony: a.Testimony,
  //         Prompt: a.Prompt,
  //         IsMatchNotice: a.IsMatchNotice,
  //         ArrestDesc: a.ArrestDesc,
  //         NoticeCode: a.NoticeCode,
  //         InvestigationSurveyDocument: a.InvestigationSurveyDocument,
  //         InvestigationCode: a.InvestigationCode,
  //         IsActive: a.IsActive,
  //         ArrestLocale: a.ArrestLocale
  //           .map(x => {
  //             x.ArrestCode = a.ArrestCode;
  //             return x;
  //           }),
  //         ArrestStaff: a.ArrestStaff
  //           .filter(x => x.IsModify != 'd')
  //           .map(x => {
  //             x.ArrestCode = a.ArrestCode;
  //             return x;
  //           })
  //       }

  //       console.log('Arrest : ', JSON.stringify(newArrest));

  //       this.s_arrest.ArrestinsAll(newArrest)
  //         .takeUntil(this.destroy$)
  //         .subscribe(x => {
  //           if (!this.checkIsSuccess(x)) { this.saveFail(); return; };

  //           this.insertArrestIndictment(arrestCode);
  //         },
  //           () => { this.saveFail(); return; });
  //     })
  // }

  // insertArrestIndictment(arrestCode: string) {
  //   this.obArrestIndictment
  //     .takeUntil(this.destroy$)
  //     .subscribe((indictment: fromModel.ArrestIndictment[]) => {
  //       indictment.map(y => {

  //         y.ArrestCode = arrestCode;

  //         console.log('ArrestIndictment : ', JSON.stringify(y));

  //         this.s_Indictment.ArrestIndictmentinsAll(y)
  //           .takeUntil(this.destroy$)
  //           .subscribe(x => {
  //             if (!this.checkIsSuccess(x)) { this.saveFail(); return; };

  //             this.insertArrestIndictmentDetail(arrestCode, x.IndictmentID);

  //             this.insertArrestLawbreaker(arrestCode);
  //           },
  //             () => { this.saveFail(); return; });
  //       })
  //     })
  // }

  // insertArrestIndictmentDetail(arrestCode: string, indictmentID: number) {
  //   let indictmentDetail = new fromModel.ArrestIndictmentDetail();
  //   let lawbreaker = this.Lawbreaker;
  //   let _lawbreaker = lawbreaker.value.find(x => x.IsChecked == Acceptability.ACCEPTABLE) as fromModel.ArrestLawbreaker;
  //   indictmentDetail.IndictmentID = indictmentID;
  //   indictmentDetail.LawbreakerID = _lawbreaker.LawbreakerID;
  //   indictmentDetail.IsActive = 1;
  //   // indictmentDetail.LawsuitType;
  //   // indictmentDetail.LawsuitEnd;
  //   console.log('ArrestIndictmentDetail : ', JSON.stringify(indictmentDetail));

  //   this.s_IndictmentDetail
  //     .ArrestIndicmentDetailinsAll(indictmentDetail)
  //     .takeUntil(this.destroy$)
  //     .subscribe(x => {
  //       if (!this.checkIsSuccess(x)) { this.saveFail(); return; }

  //       this.insertArrestProduct(arrestCode, x.IndictmentDetailID);
  //     },
  //       () => { this.saveFail(); return; })
  // }

  // async insertArrestProduct(arrestCode: string, indictmentDetailID: number) {
  //   let product: fromModel.ArrestProduct[] = this.Product.value;
  //   let productNoId: fromModel.ArrestProduct[] = this.filterProductNoId(this.Product.value);

  //   if (!productNoId.length) return;

  //   product.map(w => {
  //     w.ArrestCode = arrestCode;
  //     w.GroupCode = w.GroupCode || '1';
  //     w.IsDomestic = w.IsDomestic || '1';
  //     w.ProductDesc = this.isObject(w.ProductDesc) ? w.ProductDesc['ProductDesc'] : w.ProductDesc;

  //     console.log('ArrestProduct : ', JSON.stringify(w));

  //     this.s_ProductService
  //       .ArrestProductinsAll(w)
  //       .takeUntil(this.destroy$)
  //       .subscribe(x => {
  //         if (!this.checkIsSuccess(x)) { this.saveFail(); return; }

  //         this.insertArrestProductDetail(indictmentDetailID, x.ProductID, w);
  //       },
  //         () => { this.saveFail(); return; });
  //   })
  // }

  // insertArrestProductDetail(indictmentDetailID: number, productId: number, productNoId: fromModel.ArrestProduct) {
  //   if (!productNoId.IsChecked) { return }

  //   let pd = new fromModel.ArrestProductDetail();

  //   pd.ProductID = productId;
  //   pd.IsProdcutCo = '1';
  //   pd.Qty = productNoId.Qty;
  //   pd.QtyUnit = productNoId.QtyUnit;
  //   pd.Size = productNoId.Size || '0';
  //   pd.SizeUnit = productNoId.SizeUnitName || '-';
  //   pd.Volume = productNoId.NetVolume;
  //   pd.VolumeUnit = productNoId.NetVolumeUnit;
  //   pd.MistreatRate = '';
  //   pd.Fine = '';
  //   pd.IndictmentDetailID = indictmentDetailID;
  //   pd.ProductDesc = productNoId.ProductDesc;
  //   pd.IsActive = 1;

  //   console.log('ProductDetail : ', JSON.stringify(pd));

  //   this.s_ProductDetail
  //     .ArrestProductDetailinsAll(pd)
  //     .takeUntil(this.destroy$)
  //     .subscribe(y => {
  //       if (!this.checkIsSuccess(y)) { this.saveFail(); return; }
  //     },
  //       () => { this.saveFail(); return; });
  // }

  // insertArrestLawbreaker(arrestCode) {
  //   let lawbreaker = this.Lawbreaker.value.find(x => x.IsChecked);
  //   lawbreaker.ArrestCode = arrestCode;


  //   this.s_Lawbreaker
  //     .ArrestLawbreakerinsAll(lawbreaker)
  //     .takeUntil(this.destroy$)
  //     .subscribe(y => {
  //       if (!this.checkIsSuccess(y)) { this.saveFail(); return; }
  //     },
  //       () => { this.saveFail(); return; });
  // }

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
}