import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LawbreakerTypes, EntityTypes } from '../arrest-lawbreaker';
import { pagination } from '../../../config/pagination';

@Component({
    selector: 'app-lawbreaker-modal',
    templateUrl: './lawbreaker-modal.component.html',
    styleUrls: ['./lawbreaker-modal.component.scss']
})

export class LawbreakerModalComponent implements OnInit {

    isOpen = false;
    isCheckAll = false;
    advSearch = false;

    lawbreakerType = LawbreakerTypes;
    entityType = EntityTypes;

    paginage = pagination;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();

    constructor() { }

    ngOnInit() {
        this.onDetactTable();
    }

    private onDetactTable() {
    }

    onSearchAdv(f: any) {

    }

    checkAll() {
        this.isCheckAll = !this.isCheckAll;
    }

    toggle(e) {
        this.advSearch = !this.advSearch;
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    close(e: any) {
        this.c.emit(e);
    }

    async pageChanges(event: any) {
        // this.arrestList = await this.arrest.slice(event.startIndex - 1, event.endIndex);
    }

}
