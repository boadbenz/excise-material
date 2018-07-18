import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output, Input } from '@angular/core';
import { ArrestLawbreaker } from '../arrest-lawbreaker';
import { ArrestProduct } from '../arrest-product';
import { ArrestIndictment } from '../arrest-indictment';
import { pagination } from '../../../config/pagination';
import { ArrestsService } from '../arrests.service';
import { MasLawGroupSectionModel } from '../../../models';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { PreloaderService } from '../../../shared/preloader/preloader.component';

@Component({
    selector: 'app-allegation-modal',
    templateUrl: './allegation-modal.component.html',
    styleUrls: ['./allegation-modal.component.scss']
})
export class AllegationModalComponent implements OnInit {

    isOpen = false;
    isCheckAll = false;

    paginage = pagination;

    lawGroupSection = new Array<MasLawGroupSectionModel>();

    lawGroupFG: FormGroup;

    @Input() mode: string;
    @Input() lawbreaker = new Array<ArrestLawbreaker>();
    @Input() product = new Array<ArrestProduct>();
    @Input() indicment = new Array<ArrestIndictment>();

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();

    get LawGroupSection(): FormArray {
        return this.lawGroupFG.get('LawGroupSection') as FormArray
    }

    get Lawbreaker(): FormArray {
        return this.lawGroupFG.get('Lawbreaker') as FormArray
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
            Lawbreaker: this.fb.array([])
        })

        await this.lawbreaker.map(item => {
            item.IsChecked = false
        })
        this.setItemFormArray(this.lawbreaker, 'Lawbreaker')
    }

    async onSearchByKey(f: any) {
        this.preloader.setShowPreloader(true)

        await this.arrestService
            .masLawGroupSectiongetByKeyword(f)
            .then(res => this.onSearchComplete(res))

        this.preloader.setShowPreloader(false);
    }

    async onSearchComplete(list: MasLawGroupSectionModel[]) {
        await list.map((item, i) => {
            item.RowId = i + 1
            item.IsChecked = false
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

    checkAll() {
        this.isCheckAll = !this.isCheckAll;
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    close(e: any) {
        debugger
        let indict = this.lawGroupFG.value
        // .LawGroupSection as MasLawGroupSectionModel[];
        // indict = indict.filter(item => item.IsChecked == true);
        console.log(indict);
        

        this.c.emit(e);
    }

    async pageChanges(event: any) {
        const list = await this.lawGroupSection.slice(event.startIndex - 1, event.endIndex);
        this.setItemFormArray(list, 'LawGroupSection')
    }
}
