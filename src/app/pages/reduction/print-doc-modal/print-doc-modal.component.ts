import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, FormGroupName } from '@angular/forms';
import { PreloaderService } from "../../../shared/preloader/preloader.component";

enum SORTING { ASC, DESC }

@Component({
  selector: 'app-print-doc-modal',
  templateUrl: './print-doc-modal.component.html',
  styleUrls: ['./print-doc-modal.component.scss'],
  // encapsulation: ViewEncapsulation.Emulatedf
})

export class PrintDocModalComponent implements OnInit {

  check: any = {};
  sort = SORTING.ASC;
  sorting = SORTING;

  constructor(private preLoaderService: PreloaderService,
    private fb: FormBuilder) { }

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
          DocName: new FormControl('xxx'),
          DocType: 0,
          DocTypeName: new FormControl('แบบฟอร์ม')
        })
      ])
    })
    this.PrintDoc.push(
      this.fb.group({
        chkbox: 2,
        IsChecked: new FormControl(false),
        DocName: new FormControl('xxx'),
        DocType: 0,
        DocTypeName: new FormControl('แบบฟอร์ม')
      })
    )
    this.preLoaderService.setShowPreloader(false);
  }

  onPrint(form){
    console.log("onPrint eiei")
  }

  dismiss(e: any) {
    this.d.emit(e);
  }

  // close(e: any) {
  //   this.c.emit(e);
  // }

}
