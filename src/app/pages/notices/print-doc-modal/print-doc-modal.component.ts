import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-print-doc-modal',
  templateUrl: './print-doc-modal.component.html',
  styleUrls: ['./print-doc-modal.component.scss']
})
export class PrintDocModalComponent implements OnInit {

  printDoc = [
    {
      DocName: 'ใบแจ้งความนำจับตามแบบ รว.1',
      DocType: 'แบบฟอร์ม'
    }, {
      DocName: 'ใบแจ้งความนำจับตามแบบ รว.1',
      DocType: 'เอกสารแนบภายใน'
    }, {
      DocName: 'ภาพหน้าจอแสดงข้อความจากผู้แจ้งความ',
      DocType: 'หลักฐานการแจ้งความ'
    }
  ]

  @Input() NoticeCode: string;

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
