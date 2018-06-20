import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

import * as $ from 'jquery';
import 'datatables.net-bs';
import { options } from '../../../config/dataTable';

@Component({
    selector: 'app-suspect-modal',
    templateUrl: './suspect-modal.component.html',
    styleUrls: ['./suspect-modal.component.scss']
})
export class SuspectModalComponent implements OnInit {

    isOpen = false;
    isCheckAll = false;
    private dataTable : any;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();
    // @Output() suspectModel: any;

    constructor(private _chRef: ChangeDetectorRef) { }

    ngOnInit() {
        this.onDetactTable();
    }

    private onDetactTable() {
        const table: any = $('table#suspectModal');

        if ($.fn.dataTable.isDataTable('table#suspectModal')) {

            this.dataTable = table.DataTable();
            this.dataTable.destroy();
        }

        this._chRef.detectChanges();

        this.dataTable = table.DataTable(options);
    }

    checkAll() {
        this.isCheckAll = !this.isCheckAll;
    }

    toggle(e) {
        $(e).slideToggle();
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    close(e: any) {        
        this.c.emit(e);
    }
}
