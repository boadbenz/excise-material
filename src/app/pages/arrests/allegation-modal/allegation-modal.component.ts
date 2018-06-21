import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-allegation-modal',
    templateUrl: './allegation-modal.component.html',
    styleUrls: ['./allegation-modal.component.scss']
})
export class AllegationModalComponent implements OnInit {

    isOpen = false;
    isCheckAll = false;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();

    constructor(private _chRef: ChangeDetectorRef) { }

    ngOnInit() {
        this.onDetactTable();
    }

    private onDetactTable() {
        //   const table: any = $('table#allegation');

        //   if ($.fn.dataTable.isDataTable('table#allegation')) {

        //       this.dataTable = table.DataTable();
        //       this.dataTable.destroy();
        //   }

        //   this._chRef.detectChanges();

        //   this.dataTable = table.DataTable(options);
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


}
