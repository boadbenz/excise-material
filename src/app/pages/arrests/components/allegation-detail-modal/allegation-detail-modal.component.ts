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
import { ArrestProduct } from '../../models/arrest-product';
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
  obArrestProduct: Observable<ArrestProduct[]>;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  navigationSubscription;
  ACCEPTABILITY = Acceptability;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<fromStore.AppState>,
    private activeRoute: ActivatedRoute,
    private s_mainMaster: MainMasterService,
    private s_masLawbreaker: fromService.ArrestMasLawbreakerService,
    private s_ProductService: fromService.ArrestProductService,
    private s_IndictmentDetail: fromService.ArrestIndictmentDetailService
  ) {
    this.obArrestProduct = store.select(s => s.arrestProduct);
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

  card1 = true;

  @Output() d = new EventEmitter();
  @Output() c = new EventEmitter();

  allegationFG: FormGroup;

  productArray: FormArray;

  get Lawbreaker(): FormArray {
    return this.allegationFG.get('Lawbreaker') as FormArray
  }

  get Product(): FormArray {
    return this.allegationFG.get('Product') as FormArray
  }

  get LawbreakerDetail(): FormGroup {
    return this.allegationFG.get('LawbreakerDetail') as FormGroup
  }

  // private onlyUnique(value, index, self) {
  //   return self.indexOf(value) === index;
  // }

  async ngOnInit() {

    this.allegationFG = this.fb.group({
      Lawbreaker: this.fb.array([]),
      Product: this.fb.array([]),
      LawbreakerDetail: this.fb.group({
        LawbreakerFullName: ['', Validators.required],
        LawbreakerDetail: ['', Validators.required]
      })
    });

    // this.activeRoute.queryParams.subscribe(params => {
    //   this.params.indictmentDetailId = params['indictmentDetailId'];
    //   this.params.guiltbaseId = params['guiltbaseId'];
    // })

    combineLatest(this.activeRoute.params, this.activeRoute.queryParams)
      .map(results => ({ params: results[0], queryParams: results[1] }))
      .subscribe(results => {
        this.mode = results.params.mode;
        this.arrestCode = results.params.arrestCode;
        this.indictmentDetailId = results.queryParams.indictmentDetailId;
        this.guiltbaseId = results.queryParams.guiltbaseId;

        switch (this.mode) {
          case 'C':
            if (this.arrestCode) {
              this.getArrestProduct(this.arrestCode);
            } else {
              this.setArrestProductFromStore();
            }
            break;

          case 'U':
            this.getArrestIndictmentDetail(this.indictmentDetailId, this.arrestCode);

            break;

          case 'R':
            break;
        }
      });

    await this.setProductUnitStore();
  }

  private getArrestProduct(arrestCode: string) {
    this.s_ProductService.ArrestProductgetByArrestCode(arrestCode)
      .takeUntil(this.destroy$)
      .subscribe(x => {
        if (x) {
          this.setItemFormArray(x, 'Product');
        } else {
          this.setArrestProductFromStore();
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

  private setArrestProductFromStore() {
    this.obArrestProduct.subscribe(x => {
      this.setItemFormArray(x, 'Product');
    })
  }

  ngOnDestroy(): void {
    this.paginage.TotalItems = 0;
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
      .map(async (item, i) => {
        let l = new ArrestLawbreakerAllegation();
        l.RowId = i + 1;
        l.IsChecked = Acceptability.INACCEPTABLE;
        l.LawbreakerID = item.LawbreakerID;
        l.IDCard = item.IDCard;
        l.PassportNo = item.PassportNo
        l.LawbreakerType = item.LawbreakerType;
        l.LawbreakerTypeName = this.lawbreakerType.find(key => parseInt(key.value) == item.LawbreakerType).text;
        l.EntityType = item.EntityType;
        l.EntityTypeName = this.entityType.find(key => parseInt(key.value) == item.EntityType).text;
        l.CompanyName = item.CompanyFullName;
        l.CompanyRegistrationNo = item.CompanyRegistrationNo;
        l.LawbreakerTitleName = item.LawbreakerTitleName;
        l.LawbreakerFirstName = item.LawbreakerFirstName;
        l.LawbreakerLastName = item.LawbreakerLastName;
        l.LawbreakerFullName = `${item.LawbreakerTitleName || ''}`;
        l.LawbreakerFullName += ` ${item.LawbreakerFirstName || ''}`;
        l.LawbreakerFullName += ` ${item.LawbreakerLastName || ''}`;
        l.ResultCount = this.s_masLawbreaker.ArrestLawsuitResultCountgetByLawbreakerID(item.LawbreakerID.toString())
        switch (item.EntityType) {
          case 0: // นิติบุคคล
            l.ReferenceNo = item.CompanyRegistrationNo;
            break;
          case 1: // บุคคลธรรมดา
            switch (item.LawbreakerType) {
              case 0: // ต่างชาติ
                l.ReferenceNo = item.PassportNo;
                break;
              case 1: // ชาวไทย
                l.ReferenceNo = item.IDCard;
                break;
            }
        }
        law.push(l);
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
    this.setLawbreakerDetail(law.at(i).value)
  }

  private setLawbreakerDetail(lawAtIndex: any) {

    let lawDesc = this.LawbreakerDetail;

    lawDesc.value.LawbreakerFullName = lawAtIndex.LawbreakerFullName
    lawDesc.value.LawbreakerDetail = `ประเภทผู้ต้องหา (${lawAtIndex.EntityTypeName})`;
    lawDesc.value.LawbreakerDetail += ` ประเภทบุคคล (${lawAtIndex.LawbreakerTypeName})`;

    switch (lawAtIndex.EntityType) {
      case 0: // นิติบุคคล
        lawDesc.value.LawbreakerDetail += ` หมายเลขนิติบุคคล (${lawAtIndex.CompanyRegistrationNo})`;
        break;
      case 1: // บุคคลธรรมดา
        switch (lawAtIndex.LawbreakerType) {
          case 0: // ต่างชาติ
            lawDesc.value.LawbreakerDetail += ` หมายเลขหนังสือเดินทาง (${lawAtIndex.PassportNo})`;
            break;
          case 1: // ชาวไทย
            lawDesc.value.LawbreakerDetail += ` หมายเลขประจำตัวประชาชน (${lawAtIndex.IDCard})`;
            break;
        }
    }
    lawDesc.patchValue(lawDesc.value)

    this.showLawbreakerDetail = true;
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

  async close(e: any) {
    let law = this.Lawbreaker;
    let lawDesc = this.LawbreakerDetail;
    law = law.value.filter(x => x.IsChecked == Acceptability.ACCEPTABLE);

    if (!law && lawDesc.invalid)
      return

    if (confirm(Message.confirmAction)) {

      // if (this.params.arrestCode && this.params.mode == 'C')

      this.c.emit(e);
    }
  }
}