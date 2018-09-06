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

    revenueForm: FormGroup;
    document = new Array<Document>();

    @Input() DocumentID: string;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();

    constructor(
        private incomeService: IncomeService,
        private fb: FormBuilder,
        private _router: Router
    ) { }


    ngOnInit() {
        debugger

        // this.incomeService.DocumentgetByCon(this.DocumentID).subscribe(result => {
        //     this.document = new Array<Document>();
        //     this.document = result;
        // })
    }

    createFrom() {
        this.revenueForm = this.fb.group({
            document: this.fb.array([])
        })
    }

    onPrint(form: any) {
        // console.log(form.value);
        // this.close('Save click')
        // this.c.emit(form);
        this._router.navigate([`/income/list`]);
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    close(e: any) {
        this.c.emit(e);
        this._router.navigate([`/income/list`]);
    }
}
