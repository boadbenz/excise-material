import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
    private loaderService: LoaderService,
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

    // this.printDoc = [
    //   {
    //     DocName: 'บันทึกจับกุม (ส.ส. 2/39)',
    //     DocType: 'แบบฟอร์ม'
    //   }]
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
          // this.printDoc.push({
          //   DocName: y.DataSource,
          //   DocType: 'เอกสารแนบภายใน'
          // })
        })
    })
  }

  sortPrintDoc() {
    this.sort = (this.sort == 'asc' ? 'desc' : 'asc');
    this.PrintDoc.value.sort((a, b) => {
      return -1; // asc
    });
  }

  onPrint() {
    let _print = this.PrintDoc.value.filter(x => x.IsChecked == true && x.DocType == 0)
    if (_print.length) {
      _print.map(x => {
        this.s_arrest.ArrestReportgetByCon(this.ArrestCode).subscribe(response => {
          
          // const file = new Blob([response.text()], { type: 'application/pdf' });
          console.log(response);
          
          // const fileURL = URL.createObjectURL(file);
          // window.open(response.text()); 
        });
      })
    }
  }

  dismiss(e: any) {
    this.d.emit(e);
  }

  close(e: any) {
    this.c.emit(e);
  }

}
