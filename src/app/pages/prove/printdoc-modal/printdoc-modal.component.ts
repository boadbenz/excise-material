import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ProveService } from '../prove.service';

@Component({
    selector: 'app-printdoc-modal',
    templateUrl: './printdoc-modal.component.html',
    styleUrls: ['./printdoc-modal.component.scss']
})

export class PrintDocModalComponent implements OnInit {

    isOpen = false;
    isCheckAll = false;
    document = new Array<Document>();

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();

    constructor(
        private proveService: ProveService,
        private _chRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.proveService.DocumentgetByCon("").then(result => {
            this.document = new Array<Document>();
            this.document = result;
        })
    }

    checkAll() {
        this.isCheckAll = !this.isCheckAll;
    }

    toggle(e) {
    //    this.advSearch = !this.advSearch;
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    close(e: any) {
        this.c.emit(e);
    }

}
