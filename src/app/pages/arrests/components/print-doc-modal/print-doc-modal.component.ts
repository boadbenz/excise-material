import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MainMasterService } from 'app/services/main-master.service';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { LoaderService } from 'app/core/loader/loader.service';
import { ArrestService } from '../../services';
@Component({
  selector: 'app-print-doc-modal',
  templateUrl: './print-doc-modal.component.html',
  styleUrls: ['./print-doc-modal.component.scss']
})
export class PrintDocModalComponent implements OnInit {

  printDoc: any[];

  sort = 'asc';

  @Input() ArrestCode: string;

  @Output() d = new EventEmitter();
  @Output() c = new EventEmitter();

  FG: FormGroup;
  get PrintDoc(): FormArray {
    return this.FG.get('PrintDoc') as FormArray;
  }
  constructor(
    private s_masmain: MainMasterService,
    private s_arrest: ArrestService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.printDoc = [
      {
        DocName: 'บันทึกจับกุม (ส.ส. 2/39)',
        DocType: 'แบบฟอร์ม'
      }]
    this.s_masmain.MasDocumentMaingetAll('3', this.ArrestCode).then(x => {
      x.filter(y => y.IsActive == 1)
        .map(y => {
          this.printDoc.push({
            DocName: y.DataSource,
            DocType: 'เอกสารแนบภายใน'
          })
        })
    })
  }

  sortPrintDoc() {
    this.sort = (this.sort == 'asc' ? 'desc' : 'asc');
    this.printDoc.sort((a, b) => {
      return -1; // asc
    });
  }

  onPrint() {
    let _print = this.PrintDoc.value.filter(x => x.IsChecked == true && x.DocType == 0)
    if (_print.length) {
      // this.s_arrest.ArrestReportgetByCon(this.ArrestCode)
      //   .subscribe(x => {
      //     const blob = new Blob([x], { type: "application/pdf" });
      //     const link = document.createElement('a');
      //     link.href = window.URL.createObjectURL(blob);
      //     link.download = `${this.ArrestCode}.pdf`;
      //     link.click();
      //   })
    }
  }

  dismiss(e: any) {
    this.d.emit(e);
  }

  close(e: any) {
    this.c.emit(e);
  }

}
