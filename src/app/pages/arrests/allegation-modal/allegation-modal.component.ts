import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output, Input } from '@angular/core';
import { ArrestLawbreaker } from '../arrest-lawbreaker';
import { ArrestProduct } from '../arrest-product';
import { ArrestIndictment } from '../arrest-indictment';
import { pagination } from 'app/config/pagination';

@Component({
    selector: 'app-allegation-modal',
    templateUrl: './allegation-modal.component.html',
    styleUrls: ['./allegation-modal.component.scss']
})
export class AllegationModalComponent implements OnInit {

    isOpen = false;
    isCheckAll = false;

    paginage = pagination;

    @Input() mode: string;
    @Input() lawbreaker = new Array<ArrestLawbreaker>();
    @Input() product = new Array<ArrestProduct>();
    @Input() indicment = new Array<ArrestIndictment>();

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();

    constructor(private _chRef: ChangeDetectorRef) { }

    ngOnInit() {
    }

    checkAll() {
        this.isCheckAll = !this.isCheckAll;
    }

    toggle(e) {
        // $(e).slideToggle();
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
