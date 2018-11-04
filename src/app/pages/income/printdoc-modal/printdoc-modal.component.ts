import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IncomeService } from '../income.service';
import { document } from '../document';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
    selector: 'app-printdoc-modal',
    templateUrl: './printdoc-modal.component.html',
    styleUrls: ['./printdoc-modal.component.scss']
})

export class PrintDocModalComponent implements OnInit {
    printDoc = [
        {
            DocName: 'รายงานนำส่งรายได้',
            DocType: 'แบบฟอร์ม'
        }
    ]

    @Input() ArrestCode: string;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    onPrint(f: any) {

    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    close(e: any) {
        this.c.emit(e);
    }
}
