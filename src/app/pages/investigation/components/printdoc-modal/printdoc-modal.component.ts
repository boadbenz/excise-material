import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MainMasterService } from 'app/services/main-master.service';
import { InvestgateService, InvestgateDetailService } from '../../services';
import { LoaderService } from 'app/core/loader/loader.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-printdoc-modal',
    templateUrl: './printdoc-modal.component.html'
})
export class PrintdocModalComponent implements OnInit, OnDestroy {


    sort = 'asc';
    private destroy$: Subject<boolean> = new Subject<boolean>();

    @Input() investCode: string;
    @Input() investDetailId: string;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();

    FG: FormGroup;

    get PrintDoc(): FormArray {
        return this.FG.get('PrintDoc') as FormArray;
    }

    constructor(
        private s_masmain: MainMasterService,
        private s_invest: InvestgateService,
        private s_investDetail: InvestgateDetailService,
        private loaderService: LoaderService,
        private fb: FormBuilder
    ) { }

    async ngOnInit() {
        this.FG = this.fb.group({
            PrintDoc: this.fb.array([])
        })

        if (this.investCode) {
            this.s_invest.InvestigategetByCon(this.investCode)
                .takeUntil(this.destroy$)
                .subscribe(x => {

                    x[0].InvestigateDetail.map(y => {
                        this.PrintDoc.push(
                            this.fb.group({
                                IsChecked: false,
                                DocName: `รายงานการสืบสวนครั้งที่ ${y.InvestigateSeq}`,
                                DocType: 0,
                                DocTypeName: 'แบบฟอร์ม'
                            })
                        )
                    })

                })

        } else if (this.investDetailId) {
            this.loaderService.show()
            let invD = await this.s_investDetail.InvestigateDetailgetByCon(this.investDetailId).then(x => {
                if (!this.checkResponse(x)) return;

                this.PrintDoc.push(
                    this.fb.group({
                        IsChecked: false,
                        DocName: `รายงานการสืบสวนครั้งที่ ${x.InvestigateSeq}`,
                        DocType: 0,
                        DocTypeName: 'แบบฟอร์ม'
                    })
                )
            })

            let doc = await this.s_masmain.MasDocumentMaingetAll('3', this.investDetailId).then(x => {

                if (!this.checkResponse(x)) return;

                x.filter(y => y.IsActive == 1)
                    .map(y => {
                        this.PrintDoc.push(
                            this.fb.group({
                                IsChecked: false,
                                DocName: y.DataSource,
                                DocType: 3,
                                DocTypeName: 'เอกสารแนบภายใน'
                            })
                        )
                    })
            })

            Promise.all([invD, doc])

            this.loaderService.hide();
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    checkResponse(res: any) {
        switch (res.IsSuccess) {
            case 'False':
            case false:
                return false;
            default:
                return true;
        }
    }

    sortPrintDoc() {
        this.sort = (this.sort == 'asc' ? 'desc' : 'asc');
        this.PrintDoc.value.sort((a, b) => {
            return -1; // asc
        });
    }

    onPrint() {
        let _print = this.PrintDoc.value.filter(x => x.IsChecked == true && x.DocType == 0)
        // if (_print.length) {
        //     this.s_arrest.ArrestReportgetByCon(this.ArrestCode)
        //         .subscribe(x => {
        //             const blob = new Blob([x], { type: "application/pdf" });
        //             const link = document.createElement('a');
        //             link.href = window.URL.createObjectURL(blob);
        //             link.download = `${this.ArrestCode}.pdf`;
        //             link.click();
        //         })
        // }
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    close(e: any) {
        this.c.emit(e);
    }
}
