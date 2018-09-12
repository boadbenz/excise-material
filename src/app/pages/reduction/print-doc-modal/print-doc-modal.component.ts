import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReductionService } from '../reduction.service';

@Component({
  selector: 'app-print-doc-modal',
  templateUrl: './print-doc-modal.component.html',
  styleUrls: ['./print-doc-modal.component.scss']
})
export class PrintDocModalComponent implements OnInit {

  printDoc: Array<any> = [
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
  paramsCode: number;
  AdjustComparegetByConRs: any = {};

  constructor(
    private activeRoute: ActivatedRoute,
    private reductionService: ReductionService,
  ) { }

  ngOnInit() {
    this.activeRoute.queryParams
      .subscribe(params => {
        //check id from list page
        this.paramsCode = params.code;
        this.AdjustComparegetByCon();
      });
  }

  async AdjustComparegetByCon() {
    await this.reductionService.AdjustComparegetByCon(this.paramsCode).then(data => {
      //PositionName
      this.AdjustComparegetByConRs = data;
      this.AdjustCompareDocumentgetByCon();
    });
  }

  async AdjustCompareDocumentgetByCon() {
    await this.reductionService.AdjustCompareDocumentgetByCon(this.paramsCode).then(data => {
      console.log(data);
    });
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
