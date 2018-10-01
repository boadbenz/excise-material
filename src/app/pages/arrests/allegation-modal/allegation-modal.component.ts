import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output, Input } from '@angular/core';
import { ArrestLawbreaker } from '../arrest-lawbreaker';
import { ArrestProduct } from '../arrest-product';
import { ArrestIndictment, IndictmentLawbreaker } from '../arrest-indictment';
import { pagination } from '../../../config/pagination';
import { ArrestsService } from '../arrests.service';
import { MasLawGroupSectionModel } from '../../../models';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { Message } from '../../../config/message';

@Component({
    selector: 'app-allegation-modal',
    templateUrl: './allegation-modal.component.html',
    styleUrls: ['./allegation-modal.component.scss']
})
export class AllegationModalComponent implements OnInit {

    isOpen = false;
    isCheckAll = false;
    isCheck = false;

    paginage = pagination;

    lawGroupSection = new Array<MasLawGroupSectionModel>();

    lawGroupFG: FormGroup;

    @Input() mode: string;
    @Input() lawbreaker = new Array<ArrestLawbreaker>();
    @Input() product = new Array<ArrestProduct>();
    @Input() indicment = new Array<ArrestIndictment>();
    @Input() isEditIndicment: boolean | false;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();
    @Output() setIndicment = new EventEmitter<ArrestIndictment[]>();
    @Output() patchIndicment = new EventEmitter<ArrestIndictment>();

    get LawGroupSection(): FormArray {
        return this.lawGroupFG.get('LawGroupSection') as FormArray
    }

    get IndictmentLawbreaker(): FormArray {
        return this.lawGroupFG.get('IndictmentLawbreaker') as FormArray
    }

    constructor(
        private arrestService: ArrestsService,
        private fb: FormBuilder,
        private preloader: PreloaderService
    ) { }

    async ngOnInit() {
        this.paginage.TotalItems = 0;
        this.lawGroupFG = this.fb.group({
            LawGroupSection: this.fb.array([]),
            IndictmentLawbreaker: this.fb.array([])
        })

        // console.log(this.isEditIndictment ? this.indicment : null);


        let _indictmentLawbreaker = new Array<IndictmentLawbreaker>()
        await this.lawbreaker.map(item => {
            _indictmentLawbreaker.push(
                {
                    LawbreakerID: item.LawbreakerID.toString(),
                    LawbreakerFullName: item.LawbreakerFullName,
                    CompanyFullName: item.CompanyFullName,
                    EntityType: item.EntityType,
                    ProductID: null,
                    ProductName: null,
                    Qty: null,
                    QtyUnit: null,
                    Size: null,
                    SizeUnit: null,
                    Weight: null,
                    WeightUnit: null,
                    IsChecked: false
                }
            )
        })

        this.setItemFormArray(_indictmentLawbreaker, 'IndictmentLawbreaker')
    }

    async onSearchByKey(f: any) {
        this.preloader.setShowPreloader(true)

        await this.arrestService
            .masLawGroupSectiongetByKeyword(f)
            .then(res => this.onSearchComplete(res))

        this.preloader.setShowPreloader(false);
    }

    async onSearchComplete(list: MasLawGroupSectionModel[]) {
        if (!list.length) {
            alert(Message.noRecord);
            return
        }
        await list.map((item, i) => {
            item.RowId = i + 1
            item.IsChecked = false
            item.GuiltBaseID = item.GuiltBaseID == null ? i + 1 : item.GuiltBaseID
        })
        this.lawGroupSection = list;
        this.paginage.TotalItems = list.length;
    }

    private setItemFormArray(array: any[], formControl: string) {
        if (array !== undefined && array.length) {
            const itemFGs = array.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.lawGroupFG.setControl(formControl, itemFormArray);
        }
    }

    setIsChecked(i: number) {
        this.LawGroupSection.value.map((item, index) => {
            item.IsChecked = i == index ? true : false;
        })
    }

    selectItemPorduct(e: any, i: number) {
        const _product = this.product.find(item => item.ProductID == e.target.value);
        this.IndictmentLawbreaker.at(i).patchValue({
            ProductID: e.target.value,
            ProductName: _product.ProductDesc,
            Qty: _product.Qty,
            QtyUnit: _product.QtyUnit,
            Size: null,
            SizeUnit: null,
            Weight: _product.NetVolume,
            WeightUnit: _product.NetVolumeUnit
        })
    }

    checkAll() {
        this.isCheckAll = !this.isCheckAll;
    }

    dismiss(e: any) {
        this.isEditIndicment = false;
        this.d.emit(e);
    }

    async close(e: any) {
        let _indictmentLawbreaker = []
        let _lawGroup = this.LawGroupSection.value.filter(item => item.IsChecked);

        if (!_lawGroup.length)
            return;

        await this.IndictmentLawbreaker.value
            .filter(item => item.IsChecked)
            .map(item => {
                _indictmentLawbreaker.push({
                    LawbreakerID: item.LawbreakerID,
                    LawbreakerFullName: item.LawbreakerFullName,
                    CompanyFullName: item.CompanyFullName,
                    EntityType: item.EntityType,
                    ProductID: item.ProductID,
                    ProductName: item.ProductName,
                    Qty: item.Qty,
                    QtyUnit: item.QtyUnit,
                    Size: item.Size,
                    SizeUnit: item.SizeUnit,
                    Weight: item.Weight,
                    WeightUnit: item.WeightUnit,
                    IsChecked: false
                })
            });

        let _indicmentArr = []
        await _lawGroup.map((lg) => {
            _indicmentArr.push({
                IndictmentID: lg.IndictmentID,
                IsProve: 1,
                IsActive: 1,
                GuiltBaseID: lg.GuiltBaseID,
                SectionNo: lg.SectionNo,
                SectionDesc1: lg.SectionDesc1,
                SectionName: lg.SectionName,
                IndictmentLawbreaker: _indictmentLawbreaker,
            })
        })

        if (this.isEditIndicment) {
            this.patchIndicment.emit(..._indicmentArr);
            this.isEditIndicment = false;
        } else {
            this.setIndicment.emit(_indicmentArr);
        }
        this.c.emit(e);
    }

    async pageChanges(event: any) {
        const list = await this.lawGroupSection.slice(event.startIndex - 1, event.endIndex);
        this.setItemFormArray(list, 'LawGroupSection')
    }
}
