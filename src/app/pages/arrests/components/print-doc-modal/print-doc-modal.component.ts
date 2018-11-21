import { Component, OnInit, Input, Output, EventEmitter, Injectable } from '@angular/core';
import { MainMasterService } from 'app/services/main-master.service';
import { LoaderService } from 'app/core/loader/loader.service';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { ArrestService } from '../../services';

@Component({
  selector: 'app-print-doc-modal',
  templateUrl: './print-doc-modal.component.html',
  styleUrls: ['./print-doc-modal.component.scss']
})
export class PrintDocModalComponent implements OnInit {

  sort = 'asc';

  @Input() ArrestCode: string;

  @Output() d = new EventEmitter();
  @Output() c = new EventEmitter();

  FG: FormGroup;

  get PrintDoc(): FormArray {
    return this.FG.get('PrintDoc') as FormArray;
  }

  constructor(
    private s_masmain: MainMasterService,
    private s_arrest: ArrestService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.FG = this.fb.group({
      PrintDoc: this.fb.array([
        this.fb.group({
          IsChecked: new FormControl(false),
          DocName: new FormControl('บันทึกจับกุม (ส.ส. 2/39)'),
          DocType: 0,
          DocTypeName: new FormControl('แบบฟอร์ม')
        })
      ])
    })

    this.s_masmain.MasDocumentMaingetAll('3', this.ArrestCode).then(x => {
      x.filter(y => y.IsActive == 1)
        .map(y => {
          this.PrintDoc.push(
            this.fb.group({
              IsChecked: false,
              DocName: y.DataSource,
              DocType: 3,
              DocTypeName: 'เอกสารแนบภายใน'
            })
          )
        })
    })
  }

  sortPrintDoc() {
    this.sort = (this.sort == 'asc' ? 'desc' : 'asc');
    this.PrintDoc.value.sort((a, b) => {
      return -1; // asc
    });
  }

  async onPrint() {
    let _print = this.PrintDoc.value.filter(x => x.IsChecked == true && x.DocType == 0)
    if (_print.length) {
      this.s_arrest.ArrestReportgetByCon(this.ArrestCode)
        .subscribe(x => {
          const blob = new Blob([x], { type: "application/pdf" });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `${this.ArrestCode}.pdf`;
          link.click();
        })
      // await _print.map(x => {
      //   const ArrestCode = this.ArrestCode;
      //   const data = JSON.stringify({
      //     "ArrestCode": ArrestCode
      //   });
      //   const xhr = new XMLHttpRequest();
      //   xhr.open("POST", `${appConfig.apiReport}/ArrestgetByCon.aspx`);
      //   xhr.responseType = 'arraybuffer';
      //   xhr.onload = function (e) {
      //     if (this.status == 200) {
      //       const blob = new Blob([this.response], { type: "application/pdf" });
      //       const link = document.createElement('a');
      //       link.href = window.URL.createObjectURL(blob);
      //       link.download = `${ArrestCode}.pdf`;
      //       link.click();
      //     }
      //   };
      //   xhr.send(data);
      // })
    }
  }

  dismiss(e: any) {
    this.d.emit(e);
  }

  close(e: any) {
    this.c.emit(e);
  }

}
