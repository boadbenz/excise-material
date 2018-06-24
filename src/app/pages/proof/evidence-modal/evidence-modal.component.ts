import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-evidence-modal',
    templateUrl: './evidence-modal.component.html',
    styleUrls: ['./evidence-modal.component.scss']
})

export class EvidenceModalComponent implements OnInit {

    isOpen = false;
    isCheckAll = false;
    advSearch = false;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();

    constructor(private _chRef: ChangeDetectorRef) { }

    ngOnInit() {

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

}
