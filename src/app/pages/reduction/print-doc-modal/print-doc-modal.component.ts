import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, FormGroupName } from '@angular/forms';
import { PreloaderService } from "../../../shared/preloader/preloader.component";
import { ReductionService } from '../reduction.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

enum SORTING { ASC, DESC }

@Component({
  selector: 'app-print-doc-modal',
  templateUrl: './print-doc-modal.component.html',
  styleUrls: ['./print-doc-modal.component.scss'],
})

export class PrintDocModalComponent implements OnInit {

  check: any = {};
  sort = SORTING.ASC;
  sorting = SORTING;

  constructor(private preLoaderService: PreloaderService,
    private fb: FormBuilder,
    private reductionService: ReductionService) { }

  isCheck = ''
  printDoc = [];
  printDocData = [];

  @Output() d = new EventEmitter();
  @Output() c = new EventEmitter();

  FG: FormGroup;
  get PrintDoc(): FormArray {
    return this.FG.get('PrintDoc') as FormArray;
  }

  async ngOnInit() {
    this.preLoaderService.setShowPreloader(true);
    this.FG = this.fb.group({
      PrintDoc: this.fb.array([
        this.fb.group({
          chkbox: 1,
          IsChecked: new FormControl(false),
          DocName: new FormControl('คำร้องขอรับเงินรางวัลกรณีคดีถึงที่สุด โดยการเปรียบเทียบคดี รว. 4'),
          DocType: 0,
          DocTypeName: new FormControl('แบบฟอร์ม')
        })
      ])
    })
    this.PrintDoc.push(
      this.fb.group({
        chkbox: 2,
        IsChecked: new FormControl(false),
        DocName: new FormControl('คำร้องขอรับเงินรางวัลกรณีคดีถึงที่สุด โดยการพิพากษา รว. 5 '),
        DocType: 0,
        DocTypeName: new FormControl('แบบฟอร์ม')
      })
    )
    this.PrintDoc.push(
      this.fb.group({
        chkbox: 3,
        IsChecked: new FormControl(false),
        DocName: new FormControl('รายงานการจับกุมดำเนินคดีของเจ้าพนักงาน รว.7'),
        DocType: 0,
        DocTypeName: new FormControl('แบบฟอร์ม')
      })
    )
    this.PrintDoc.push(
      this.fb.group({
        chkbox: 4,
        IsChecked: new FormControl(false),
        DocName: new FormControl('แบบฟอร์มตารางการแบ่งจ่ายเงินสินบนรางวัล รว.8'),
        DocType: 0,
        DocTypeName: new FormControl('แบบฟอร์ม')
      })
    )
    this.preLoaderService.setShowPreloader(false);
  }

  onPrint(form) {
    this.preLoaderService.setShowPreloader(true);
    let _print = this.PrintDoc.value.filter(x => x.IsChecked == true && x.DocType == 0)
    if (_print.length) {
      var tempChkbox = this.FG.value.PrintDoc
      for (var i = 0; i < tempChkbox.length; i++) {
        if (tempChkbox[i].IsChecked == true) {
          var selected = tempChkbox[i].chkbox;
          let RequestBribeID = ''
          if (selected == 1) {
            console.log("1")
            this.reductionService.ReductionReport(RequestBribeID).subscribe(x => {
              const file = new Blob([x], { type: 'application/pdf' });
              const fileURL = URL.createObjectURL(file);
              window.open(fileURL);
              this.preLoaderService.setShowPreloader(false);
            })
          }
          if (selected == 2) {
            console.log("2")
            this.reductionService.ReductionReport2(RequestBribeID).subscribe(x => {
              const file = new Blob([x], { type: 'application/pdf' });
              const fileURL = URL.createObjectURL(file);
              window.open(fileURL);
              this.preLoaderService.setShowPreloader(false);
            })
          }
          if (selected == 3) {
            console.log("3")
            this.reductionService.ReductionReport3(RequestBribeID).subscribe(x => {
              const file = new Blob([x], { type: 'application/pdf' });
              const fileURL = URL.createObjectURL(file);
              window.open(fileURL);
              this.preLoaderService.setShowPreloader(false);
            })
          }
          if (selected == 4) {
            console.log("4")
            this.reductionService.ReductionReport4(RequestBribeID).subscribe(x => {
              const file = new Blob([x], { type: 'application/pdf' });
              const fileURL = URL.createObjectURL(file);
              window.open(fileURL);
              this.preLoaderService.setShowPreloader(false);
            })
          }
        }
      }
    }
    console.log("onPrint eiei")

  }

  dismiss(e: any) {
    this.d.emit(e);
  }

  // close(e: any) {
  //   this.c.emit(e);
  // }

}
