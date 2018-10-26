import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LawsuitService } from "../lawsuit.service";
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-print-lawsuit-modal',
  templateUrl: './print-doc-modal.component.html',
  styleUrls: ['./print-doc-modal.component.scss']
})
export class PrintLawsuitModalComponent implements OnInit {
  private indictmentID: number;
  private lawsuitID: number;
  constructor(private lawsuitService: LawsuitService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.indictmentID = params['IndictmentID'];
      this.lawsuitID = params['LawsuitID'];
      // console.log(indictmentID); // Print the parameter to the console.
    });
  }

  printDoc = [
    // {
    //   DocName: 'บันทึกจับกุม (ส.ส. 2/39)',
    //   DocType: 'แบบฟอร์ม'
    // }, {
    //   DocName: 'บันทึกจับกุม (ส.ส. 2/39)',
    //   DocType: 'เอกสารแนบภายใน'
    // }
  ];
  printDocData = [];
  @Input() IndictmentID: string;
  @Input() ArrestCode: string;

  @Output() d = new EventEmitter();
  @Output() c = new EventEmitter();

  // private lawsuitid: any;
  // private lawsuitService: LawsuitService

  ngOnInit() {
    console.log(this.IndictmentID);
    // console.log('malawwww', this.lawsuitService)
    this.lawsuitService.LawsuitArrestgetByCon(this.indictmentID).then(
      data => {
        this.printDocData = data || [];
        console.log('data-->', data)
        return true;
      }
    )
    // this.lawsuitService.LawsuitCompareDocumentgetByCon(this.lawsuitID).then(
    //   data => {
    //     this.printDoc = data || [];
    //     return true;
    //   },
    // );
    this.lawsuitService.MasDocumentMaingetAll(4, this.lawsuitID).then(
      data => {
        this.printDoc = data || [];
        return true;
      },
    );

    console.log('this.printDocData', this.printDocData)
    console.log('this.printDoc', this.printDoc)
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
