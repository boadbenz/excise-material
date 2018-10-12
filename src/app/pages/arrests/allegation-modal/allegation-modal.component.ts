import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { ArrestLawbreaker } from '../models/arrest-lawbreaker';
import { ArrestProduct } from '../models/arrest-product';
import { ArrestIndictment, IndictmentLawbreaker } from '../models/arrest-indictment';
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
export class AllegationModalComponent implements OnInit, OnDestroy {

    isOpen = false;
    isCheckAll = false;
    isCheck = false;

    paginage = pagination;

    lawGroupSection = new Array<MasLawGroupSectionModel>();

    lawGroupFG: FormGroup;

    // @Input() mode: string;
    // @Input() lawbreaker = new Array<ArrestLawbreaker>();
    // @Input() product = new Array<ArrestProduct>();
    // @Input() indicment = new Array<ArrestIndictment>();
    // @Input() isEditIndicment: boolean | false;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();
    // @Output() setIndicment = new EventEmitter<ArrestIndictment[]>();
    // @Output() patchIndicment = new EventEmitter<ArrestIndictment>();

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

    ngOnInit() {
        this.lawGroupFG = this.fb.group({
            LawGroupSection: this.fb.array([]),
            IndictmentLawbreaker: this.fb.array([])
        })
    }

    ngOnDestroy(): void {
        this.paginage.TotalItems = 0;
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

    dismiss(e: any) {
        this.d.emit(e);
    }

    async close(e: any) {
        this.c.emit(e);
    }

    async pageChanges(event: any) {
        const list = await this.lawGroupSection.slice(event.startIndex - 1, event.endIndex);
        this.setItemFormArray(list, 'LawGroupSection')
    }
}
