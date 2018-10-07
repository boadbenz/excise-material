import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LawsuitService } from "../lawsuit.service";
import {Observable} from 'rxjs/Rx';
@Component({
  selector: 'app-print-lawsuit-modal',
  templateUrl: './print-doc-modal.component.html',
  styleUrls: ['./print-doc-modal.component.scss']
})
export class PrintLawsuitModalComponent implements OnInit {

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

  private lawsuitid: any;
  private lawsuitService: LawsuitService

  constructor() { }

  ngOnInit() {
    this.lawsuitService.LawsuitArrestgetByCon(this.ArrestCode).then(
      data => {
        this.printDoc = data || [ ];
        return true;
      }
    )
    this.lawsuitService.LawsuitCompareDocumentgetByCon(this.lawsuitid).then(
      data => {
      this.printDoc = data || [ ];
      return true;
      },
    );
    /*this.lawsuitService.LawsuitCompareDocumentgetByCon(this.lawsuitid).then(res => {
      this.printDoc = res || [ ];
    });*/
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
