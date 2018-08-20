import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FineService } from '../fine.service';
import { ICompareCon } from '../condition-model';
import { Arrest } from '../../model/arrest';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';


@Component({
    selector: 'app-printdoc-modal',
    templateUrl: './printdoc-modal.component.html',
    styleUrls: ['./printdoc-modal.component.scss']
})

export class PrintDocModalComponent implements OnInit {

    condtion: ICompareCon = {};

    TitleName: String;
    FirstName: String;
    LastName: String;

    @Input() pCompareID: string;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();

    constructor(
        private fineService: FineService,
        private fb: FormBuilder,
        private _router: Router   
    ) { }


    ngOnInit() {
        this.getCompareByID();
        //this.getCompareDoc();
    }

    getCompareByID() {
        this.setCompareCondition();
        // this.fineService.getByCon(this.condtion).subscribe(list => {
        //   if (Array.isArray(list)) {
        //     this.getLawbreakerByArrest(list[0].ArrestCode);
        //   } 
        // });

        // this.fineService.getByCon(this.condtion).then(async res => {
        //     this.getLawbreakerByArrest(res[0].ArrestCode);
        // });
      }

      getLawbreakerByArrest(ArrestCode: string) {
        ArrestCode = "050100020";
        this.fineService.getByArrestCon(ArrestCode).then(async res => {
            this.TitleName = res.ArrestLawbreaker[0].LawbreakerTitleName;
            this.FirstName = res.ArrestLawbreaker[0].LawbreakerFirstName;
            this.LastName = res.ArrestLawbreaker[0].LawbreakerLastName;
        })
      }

      getCompareDoc() {
        debugger
        //this.pCompareID
        this.fineService.getByDoc("050100020").then(async res => {
            this.TitleName = res.ArrestLawbreaker[0].LawbreakerTitleName;
            this.FirstName = res.ArrestLawbreaker[0].LawbreakerFirstName;
            this.LastName = res.ArrestLawbreaker[0].LawbreakerLastName;
        })
      }


      setCompareCondition() {
        this.condtion = {};
    
        this.condtion = {
          CompareID: "22", //this.pCompareID
          CompareDetailID: "",
          CompareDetailReceiptID: "",
          FineType: "",
          CompareFineID: "",
          ReceiptFineType: "",
          StaffID: "",
          ProgramCode: "",
          ProcessCode: ""
        }
      }

    onPrint(form: any) {
        // console.log(form.value);
        // this.close('Save click')
        // this.c.emit(form);
        this._router.navigate([`/fine/list`]);
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    close(e: any) {
        this.c.emit(e);
        this._router.navigate([`/fine/list`]);
    }
}
