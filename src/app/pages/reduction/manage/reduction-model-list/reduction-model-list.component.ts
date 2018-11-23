import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reduction-model-list',
  templateUrl: './reduction-model-list.component.html',
  styleUrls: ['./reduction-model-list.component.scss']
})
export class ReductionModelListComponent implements OnInit {

  /**
   * Data ID from parent page
   */
  @Input() id: any;

  /**
   * Sent something to parent
   */
  @Output() result: EventEmitter<number> = new EventEmitter();
  @Output() d = new EventEmitter();

  public listTest = [
    {
      fullName: 'นายธวัชชัย บิงขุนทด',
      oldFine: '1,400,000.00',
      newFine: '',
      dateFine: '10-ม.ค.-2560',
      payment: 'เงินสด',
      receiptNo: '33',
      receiptRef: '001/2561',
      statusCase: 'รับรายการนำส่ง',
      typeCase: 'เปรียบเทียบคดี',
      period: '1/1'
    },
    {
      fullName: 'นายสุชาติ ปัญโญใหญ่',
      oldFine: '1,400,000.00',
      newFine: '',
      dateFine: '10-ม.ค.-2560',
      payment: 'เงินสด',
      receiptNo: '34',
      receiptRef: '001/2561',
      statusCase: 'รับรายการนำส่ง',
      typeCase: 'เปรียบเทียบคดี',
      period: '1/1'
    },
  ];

  constructor() {
    console.log('reduction model start');
  }

  ngOnInit() {
  }

  public activeModel() {
    console.log('active model');
  }

  public dismiss(e: any) {
    this.d.emit(e);
  }
  public next() {
    console.log('next');
  }

}
