import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PreloaderService } from "../../../shared/preloader/preloader.component";
import { LawsuitService } from "../lawsuit.service";
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-indicment-modal',
  templateUrl: './indicment-modal.component.html'
})
export class IndicmentModalComponent implements OnInit {
  private indictmentID: number;
  private lawsuitID: number;

  indicmentList:any = [];
  constructor(
    private lawsuitService: LawsuitService, 
    private activatedRoute: ActivatedRoute,
    private preLoaderService: PreloaderService
    ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.indictmentID = params['IndictmentID'];
      this.lawsuitID = params['LawsuitID'];
    });
  }
  printDocData = [];
  @Input() IndictmentID: string;
  @Input() ArrestCode: string;

  @Output() d = new EventEmitter();
  @Output() c = new EventEmitter();

  ngOnInit() {
    this.preLoaderService.setShowPreloader(true);
    console.log(this.IndictmentID);
    console.log(this.ArrestCode);
    this.indicmentList = this.lawsuitService.LawsuitArrestCheckNotComplete(this.ArrestCode)
    console.log(this.indicmentList)
    // this.lawsuitService.LawsuitArrestgetByCon(this.indictmentID).then(data => {
    //     this.printDocData = data || [];
    //     return true;
    //   }
    // )

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
