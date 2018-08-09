import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-print-doc-modal',
  templateUrl: './print-doc-modal.component.html',
  styleUrls: ['./print-doc-modal.component.scss']
})
export class PrintDocModalComponent implements OnInit {

  printDoc = [
    {
      DocName: 'บันทึกจับกุม (ส.ส. 2/39)',
      DocType: 'แบบฟอร์ม'
    }, {
      DocName: 'บันทึกจับกุม (ส.ส. 2/39)',
      DocType: 'เอกสารแนบภายใน'
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
