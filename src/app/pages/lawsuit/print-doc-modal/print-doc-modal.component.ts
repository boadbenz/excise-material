import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PreloaderService } from "../../../shared/preloader/preloader.component";
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
  constructor(
    private lawsuitService: LawsuitService, 
    private activatedRoute: ActivatedRoute,
    private preLoaderService: PreloaderService
    ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.indictmentID = params['IndictmentID'];
      this.lawsuitID = params['LawsuitID'];
      // console.log(indictmentID); // Print the parameter to the console.
    });
  }
  isCheck = ''
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
    this.preLoaderService.setShowPreloader(true);
    console.log(this.IndictmentID);
    // console.log('malawwww', this.lawsuitService)
    this.lawsuitService.LawsuitArrestgetByCon(this.indictmentID).then(data => {
        this.printDocData = data || [];
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
    this.preLoaderService.setShowPreloader(false);
  }

  onPrint(f: any) {
    console.log(f.value)
  }

  dismiss(e: any) {
    this.d.emit(e);
  }

  close(e: any) {
    this.c.emit(e);
  }

}
