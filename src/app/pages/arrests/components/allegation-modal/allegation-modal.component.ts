import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
// import { ArrestsService } from '../arrests.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { pagination } from 'app/config/pagination';
import { Message } from 'app/config/message';
import * as fromServices from '../../services'
import * as fromModels from '../../models';
import { Subject } from 'rxjs/Subject';
import swal from 'sweetalert2'

enum SORTING { ASC, DESC }

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

    arrestLawGuitbase = new Array<fromModels.ArrestLawGuitbase>();
    private destroy$: Subject<boolean> = new Subject<boolean>();

    lawGroupFG: FormGroup;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();
    @Output() outputArrestLawGuiltbase = new EventEmitter<fromModels.ArrestLawGuitbase>();

    get LawGuiltbase(): FormArray {
        return this.lawGroupFG.get('LawGuiltbase') as FormArray
    }

    get IndictmentLawbreaker(): FormArray {
        return this.lawGroupFG.get('IndictmentLawbreaker') as FormArray
    }

    // --- 1
    getArrestLawSubSectionRule(form: any) {
        return form.controls.ArrestLawSubSectionRule.controls;
    }
    // --- --- 1.1
    getArrestLawSubSection(form: any) {
        return form.controls.ArrestLawSubSection.controls;
    }
    // --- --- 1.2
    getArrestLawSection(form: any) {
        return form.controls.ArrestLawSection.controls;
    }
    // --- --- --- 1.2.1
    getArrestLawPenalty(form: any) {
        return form.controls.ArrestLawPenalty.controls;
    }

    constructor(
        private fb: FormBuilder,
        private s_lawGuiltbase: fromServices.ArrestLawGuiltbaseService
    ) { }

    ngOnInit() {
        this.lawGroupFG = this.fb.group({
            LawGuiltbase: this.fb.array([]),
            IndictmentLawbreaker: this.fb.array([])
        })
    }

    ngOnDestroy(): void {
        this.paginage.TotalItems = 0;
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    async onSearchByKey(f: any) {
        this.s_lawGuiltbase.ArrestLawGuiltbasegetByKeyword(f)
            .takeUntil(this.destroy$)
            .subscribe(res => this.onSearchComplete(res));
    }

    async onSearchComplete(list: fromModels.ArrestLawGuitbase[]) {
        if (!list.length) {
            swal('', Message.noRecord, 'warning');
            return
        }

        this.arrestLawGuitbase = list;
        this.paginage.TotalItems = list.length;
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

    setIsChecked(i: number) {
        this.LawGuiltbase.value.map((item, index) => {
            item.IsChecked = i == index ? true : false;
        })
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    async close(e: any) {
        let lawGuitbase = this.LawGuiltbase.value.filter(x => x.IsChecked);
        if (!lawGuitbase.length) {
            swal('', Message.alertSelectGuiltbase, 'warning');
            return
        }
        this.outputArrestLawGuiltbase.emit(...lawGuitbase);
        this.c.emit(e);
    }

    sort: SORTING;
    sortGuiltBaseName(arg) {
        debugger
        this.sort = (this.sort == SORTING.ASC ? SORTING.DESC : SORTING.ASC);
        let sort = this.arrestLawGuitbase.sort((a, b) => b[arg] - a[arg]);
        this.LawGuiltbase.value.map(() => this.LawGuiltbase.removeAt(0));
        this.arrestLawGuitbase = sort;
        this.paginage.TotalItems = sort.length;
    }

    async pageChanges(event: any) {
        const list = await this.arrestLawGuitbase.slice(event.startIndex - 1, event.endIndex);
        const lawGuitbase = await this.setArrestLawGuitbase(list);
        this.lawGroupFG.setControl('LawGuiltbase', lawGuitbase);
    }
}
