import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { InvestigateService } from '../investigate.service';
import { InvestigateDetail } from '../investigate-detail';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
    selector: 'app-printdoc-modal',
    templateUrl: './printdoc-modal.component.html',
    styleUrls: ['./printdoc-modal.component.scss']
})
export class PrintdocModalComponent implements OnInit {

    investigate: FormGroup;
    investDetail = new Array<InvestigateDetail>()

    @Input() investCode: string;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();

    constructor(
        private investService: InvestigateService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        // this.createFrom();

        this.investService.detailGetByCon(this.investCode).then(result => {
            this.investDetail = new Array<InvestigateDetail>();
            this.investDetail = result;
            // this.setInvestDetail(result);
        })
    }

    createFrom() {
        this.investigate = this.fb.group({
            InvestigateDetail: this.fb.array([])
        })
    }

    // get InvestigateDetail(): FormArray {
    //     return this.investigate.get('InvestigateDetail') as FormArray;
    // }

    // setInvestDetail(detail: InvestigateDetail[]) {
    //     if (detail) {
    //         const detailFGs = detail.map(item => this.fb.group(item));
    //         const detailFormArray = this.fb.array(detailFGs);
    //         this.investigate.setControl('InvestigateDetail', detailFormArray);
    //     }
    // }

    onPrint(form: any) {
        console.log(form.value);
        this.close('Save click')
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    close(e: any) {
        this.c.emit(e);
    }
}
