import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IncomeService } from '../income.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreloaderService } from '../../../shared/preloader/preloader.component';

@Component({
    selector: 'app-printdoc-modal',
    templateUrl: './printdoc-modal.component.html',
    styleUrls: ['./printdoc-modal.component.scss']
})

export class PrintDocModalComponent implements OnInit {
    printDoc = [
        {
            IsChecked: false,
            DocName: 'รายงานนำส่งรายได้',
            DocType: 0,
            DocTypeName: 'แบบฟอร์ม'
        }
    ]

    @Input() RevenueID: string;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();

    constructor(
        private revenueService: IncomeService,
        private preloader: PreloaderService
    ) { }

    ngOnInit() {
    }

    onPrint(f: any) {
        let _print = this.printDoc.filter(x => x.IsChecked == true && x.DocType == 0)
        if (_print.length) {
            this.preloader.setShowPreloader(true);
          this.revenueService.RevenueReportgetByCon(this.RevenueID)
            .subscribe(x => {
              const blob = new Blob([x], { type: "application/pdf" });
              const link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = `${this.RevenueID}.pdf`;
              link.click();
              this.preloader.setShowPreloader(false);
            })
        }
        else{
            alert("กรุณาเลือกเอกสารที่ต้องการพิมพ์ !!!");
        }
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    close(e: any) {
        this.c.emit(e);
    }
}
