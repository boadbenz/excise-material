import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MainMasterService } from 'app/services/main-master.service';
import { LoaderService } from 'app/core/loader/loader.service';

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

  constructor(
    private s_masmain: MainMasterService,
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
    this.printDoc.sort((a, b) => {
      switch (this.sort) {
        case 'asc':
          return -1;
        case 'desc':
          return 1; // desc
      }
      // if (a.DocType < b.DocType) return -1; // asc
      // if (a.DocType > b.DocType) return 1; // desc
      // return 0;
    });
  }

  onPrint(f: any) {
    console.log(f);
    window.open();

  }

  dismiss(e: any) {
    this.d.emit(e);
  }

  close(e: any) {
    this.c.emit(e);
  }

}
