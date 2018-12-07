import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { PreloaderService } from "../../../shared/preloader/preloader.component";
import { LawsuitService } from "../lawsuit.service";
import { MainMasterService } from 'app/services/main-master.service';
import { ActivatedRoute } from '@angular/router';
enum SORTING { ASC, DESC }
@Component({
  selector: 'app-print-lawsuit-modal',
  templateUrl: './print-doc-modal.component.html',
  styleUrls: ['./print-doc-modal.component.scss']
})
export class PrintLawsuitModalComponent implements OnInit {

  sort = SORTING.ASC;
  sorting = SORTING;

  private indictmentID: number;
  private lawsuitID: number;
  constructor(
    private lawsuitService: LawsuitService,
    private activatedRoute: ActivatedRoute,
    private preLoaderService: PreloaderService,
    private s_masmain: MainMasterService,
    private fb: FormBuilder
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.indictmentID = params['IndictmentID'];
      this.lawsuitID = params['LawsuitID'];
    });
  }
  isCheck = ''
  printDoc = [];
  printDocData = [];
  @Input() IndictmentID: string;
  @Input() ArrestCode: string;

  @Output() d = new EventEmitter();
  @Output() c = new EventEmitter();

  FG: FormGroup;
  get PrintDoc(): FormArray {
    return this.FG.get('PrintDoc') as FormArray;
  }

  // private lawsuitid: any;
  // private lawsuitService: LawsuitService

  async ngOnInit() {
    this.preLoaderService.setShowPreloader(true);
    this.FG = this.fb.group({
      PrintDoc: this.fb.array([
        this.fb.group({
          IsChecked: new FormControl(false),
          DocName: new FormControl('บันทึกคำให้การของผู้กล่าวโทษ ส.ส.1/55'),
          DocType: 0,
          DocTypeName: new FormControl('แบบฟอร์ม')
        })
      ])
    })
    this.PrintDoc.push(
      this.fb.group({
        IsChecked: new FormControl(false),
        DocName: new FormControl('บันทึกคำให้การของผู้กล่าวโทษ ส.ส.2/54'),
        DocType: 0,
        DocTypeName: new FormControl('แบบฟอร์ม')
      })
    )
    this.lawsuitService.LawsuitArrestgetByCon(this.indictmentID).then(x => {
      x.filter(y => y.IsActive == 1)
        .map(y => {
          let lawbreak = y.LawsuitArrestIndicment[0].LawsuitArrestIndicmentDetail[0].LawsuitArrestLawbreaker
          lawbreak.forEach(element => {
            this.PrintDoc.push(
              this.fb.group({
                IsChecked: false,
                DocName: "คำร้องขอให้เปรียบเทียบคดี คด.1 ของ" + " " + element.LawbreakerTitleName + element.LawbreakerFirstName +
                  " " + element.LawbreakerLastName,
                DocType: 0,
                DocTypeName: 'แบบฟอร์ม'
              })
            )
          });

        })
    })
    await this.lawsuitService.MasDocumentMaingetAll(4, this.lawsuitID).then(x => {
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
    this.preLoaderService.setShowPreloader(false);
  }

  private setItemFormArray(array: any[], formControl: string) {
    if (array !== undefined && array.length) {
      const itemFGs = array.map(item => this.fb.group(item));
      const itemFormArray = this.fb.array(itemFGs);
      this.FG.setControl(formControl, itemFormArray);
    }
  }

  sortPrintDoc() {
    this.sort = (this.sort == SORTING.ASC ? SORTING.DESC : SORTING.ASC);
    let sort = this.PrintDoc.value.sort(() => -1);
    this.PrintDoc.value.map(() => this.PrintDoc.removeAt(0));
    this.setItemFormArray(sort, 'PrintDoc');
  }

  async onPrint() {
    let _print = this.PrintDoc.value.filter(x => x.IsChecked == true && x.DocType == 0)
    if (_print.length) {
      console.log(this.IndictmentID)
      this.lawsuitService.LawsuitReportArrestgetByCon(this.IndictmentID).subscribe(x => {
        const file = new Blob([x], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
    }
  }

  // onPrint(f: any) {
  //   console.log(f.value)
  // }

  dismiss(e: any) {
    this.d.emit(e);
  }

  close(e: any) {
    this.c.emit(e);
  }

}
