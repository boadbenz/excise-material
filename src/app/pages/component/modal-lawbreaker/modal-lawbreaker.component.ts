import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ArrestLawbreaker } from '../../arrests/arrest-lawbreaker';
import { pagination } from '../../../config/pagination';
import { ArrestsService } from '../../arrests/arrests.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { Router } from '@angular/router';
import { LawbreakerTypes, EntityTypes } from '../../../models';
import { Message } from '../../../config/message';

@Component({
    selector: 'app-modal-lawbreaker',
    templateUrl: './modal-lawbreaker.component.html'
})

export class ModalLawbreakerComponent implements OnInit {

    isOpen = false;
    isCheckAll = false;
    advSearch = false;
    lawbreaker = new Array<ArrestLawbreaker>();
    lawbreakerList = new Array<ArrestLawbreaker>();

    lawbreakerType = LawbreakerTypes;
    entityType = EntityTypes;

    paginage = pagination;

    lawbreakerFG: FormGroup;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();
    @Output() lawbreakerEmit = new EventEmitter<ArrestLawbreaker[]>();

    get Lawbreaker(): FormArray {
        return this.lawbreakerFG.get('Lawbreaker') as FormArray
    }

    constructor(
        private arrestService: ArrestsService,
        private fb: FormBuilder,
        private preloader: PreloaderService,
        private router: Router
    ) { }

    ngOnInit() {
        this.paginage.TotalItems = 0;
        this.lawbreakerFG = this.fb.group({
            Lawbreaker: this.fb.array([])
        })
    }

    async  onSearchAdv(f: any) {
        this.preloader.setShowPreloader(true);
        await this.arrestService
            .masLawbreakergetByConAdv(f)
            .then(res => this.onSearchComplete(res));
        this.preloader.setShowPreloader(false);
    }

    async  onSearchByKey(f: any) {
        this.preloader.setShowPreloader(true);
        await this.arrestService
            .masLawbreakergetByKeyword(f)
            .then(res => this.onSearchComplete(res));
        this.preloader.setShowPreloader(false)
    }

    private async onSearchComplete(list: ArrestLawbreaker[]) {
        
        if (!list.length) {
            alert(Message.noRecord);
            return;
        }
        
        await list.map((item, i) => {
            item.RowId = i + 1;
            item.IsChecked = false;
            item.LawbreakerRefID = item.LawbreakerRefID == null ? 1 : item.LawbreakerRefID
            item.CompanyFullName = `${item.CompanyTitle} ${item.CompanyName}`
            item.LawbreakerFullName = `${item.LawbreakerTitleName} ${item.LawbreakerFirstName} ${item.LawbreakerLastName}`
            item.LawbreakerTypeName = this.lawbreakerType.find(key => parseInt(key.value) == item.LawbreakerType).text
            item.EntityTypeName = this.entityType.find(key => parseInt(key.value) == item.EntityType).text
        })

        this.lawbreaker = list;
        // set total record
        this.paginage.TotalItems = list.length;
    }

    private setItemFormArray(array: any[], formControl: string) {
        if (array !== undefined && array.length) {
            const itemFGs = array.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.lawbreakerFG.setControl(formControl, itemFormArray);
        }
    }

    checkAll() {
        this.isCheckAll = !this.isCheckAll;
        this.Lawbreaker.value.map(item => item.IsChecked = true);
    }

    toggle() {
        this.advSearch = !this.advSearch;
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    view(id:number) {
        this.dismiss('Cross click')
        this.router.navigate([`/arrest/lawbreaker/R/${id}`])
    }

    async close(e: any) {
        let form = this.lawbreakerFG.value.Lawbreaker as ArrestLawbreaker[];
        form = await form
            .filter(item => item.IsChecked);

        this.lawbreakerEmit.emit(form);
        this.c.emit(e);
    }

    async pageChanges(event: any) {
        const list = await this.lawbreaker.slice(event.startIndex - 1, event.endIndex);
        this.setItemFormArray(list, 'Lawbreaker')
    }

}
