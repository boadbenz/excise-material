import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
// import { ArrestsService } from '../arrests.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MasLawGroupSectionModel } from 'app/models';
import { pagination } from 'app/config/pagination';
import { Message } from 'app/config/message';
import * as fromServices from '../../services'
import * as fromModels from '../../models';

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

    lawGroupSection = new Array<fromModels.ArrestLawGuitbase>();

    lawGroupFG: FormGroup;

    // @Input() mode: string;
    // @Input() lawbreaker = new Array<ArrestLawbreaker>();
    // @Input() product = new Array<ArrestProduct>();
    // @Input() indicment = new Array<ArrestIndictment>();
    // @Input() isEditIndicment: boolean | false;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();
    @Output() lawGroutSection = new EventEmitter<fromModels.ArrestLawGuitbase>();
    // @Output() setIndicment = new EventEmitter<ArrestIndictment[]>();
    // @Output() patchIndicment = new EventEmitter<ArrestIndictment>();

    get LawGroupSection(): FormArray {
        return this.lawGroupFG.get('LawGroupSection') as FormArray
    }

    get IndictmentLawbreaker(): FormArray {
        return this.lawGroupFG.get('IndictmentLawbreaker') as FormArray
    }

    constructor(
        // private arrestService: ArrestsService,
        private fb: FormBuilder,
        private s_lawGuiltbase: fromServices.ArrestLawGuiltbaseService
        // private preloader: PreloaderService
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
        // this.preloader.setShowPreloader(true)
        this.s_lawGuiltbase.ArrestLawGuiltbasegetByKeyword(f).subscribe(res => this.onSearchComplete(res))
        // await this.arrestService
        //     .masLawGroupSectiongetByKeyword(f)
        //     .then(res => this.onSearchComplete(res))

        // this.preloader.setShowPreloader(false);
    }

    async onSearchComplete(list: fromModels.ArrestLawGuitbase[]) {
        if (!list.length) {
            alert(Message.noRecord);
            return
        }

        await list.map((item, i) => {
            item.RowId = i + 1
            item.IsChecked = false;
        })
        this.lawGroupSection = list;
        this.paginage.TotalItems = list.length;
    }

     // --- 2.1
     private setArrestLawGuitbase = (o: fromModels.ArrestLawGuitbase[]) => {
        let arr = new FormArray([]);
        o.map(x => {
            arr.push(this.fb.group({
                GuiltBaseID: x.GuiltBaseID,
                GuiltBaseName: x.GuiltBaseName,
                IsCompare: x.IsCompare,
                IsActive: x.IsActive,
                IsProve: x.IsProve,
                ArrestLawSubSectionRule: this.setArrestLawSubSectionRule(x.ArrestLawSubSectionRule)
            }))
        })
        return arr;
    }
    // --- --- 2.1.1
    private setArrestLawSubSectionRule = (o: fromModels.ArrestLawSubSectionRule[]) => {
        let arr = new FormArray([]);
        o.map(x => {
            arr.push(this.fb.group({
                SectionNo: x.SectionNo,
                LawsuitLawSubSection: this.setLawsuitLawSubSection(x.LawsuitLawSubSection)
            }))
        })
    }
    // --- --- 2.1.2
    private setLawsuitLawSubSection = (o: fromModels.LawsuitLawSubSection[]) => {
        let arr = new FormArray([]);
        o.map(x => {
            arr.push(this.fb.group({
                SubSectionNo: x.SubSectionNo,
                SubSectionType: x.SubSectionType
            }))
        })
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
