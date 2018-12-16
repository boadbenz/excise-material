import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FineService } from '../fine.service';
import { ICompareCon } from '../condition-model';
import { Arrest } from '../../model/arrest';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { appConfig } from "app/app.config";
import { PreloaderService } from 'app/shared/preloader/preloader.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    @Input() ArrestCode: string;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();

    constructor(
        private fineService: FineService,
        private fb: FormBuilder,
        private _router: Router,
        private preloader: PreloaderService,
        private http: HttpClient
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

    async onPrint(form: any) {
        // let _print = this.PrintDoc.value.filter(x => x.IsChecked == true && x.DocType == 0)
        // if (_print.length) {
        this.preloader.setShowPreloader(true);
        await this.ReportForm252(this.ArrestCode)
            .subscribe(x => {
            const file = new Blob([x], {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.preloader.setShowPreloader(false);
            })
        // }
        this.preloader.setShowPreloader(false);
        // this._router.navigate([`/fine/list`]);
    }
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        return Observable.throw(error);
    }
    private onSuccess(res: Response): void {
        console.log('Request successful');
    }

    private onError(res: Response): void {
        console.log('Error, status code: ' + res.status);
    }
    private onEnd(): void {
        this.preloader.setShowPreloader(false);
    }
    ReportForm252(ArrestCode: string) {
        const params = { ArrestCode: ArrestCode };
        const url = `${appConfig.apiReport}/ReportForm252.aspx`;
        
        return this.http.post(url, params, { ...this.httpOptions, responseType: 'blob' })
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .map(x => x)
            .finally(() => this.onEnd());
    }

    dismiss(e: any) {
        console.log('dd');
        this.d.emit('esc');
        this.d.emit(e);
    }

    close(e: any) {
        console.log('close');
        this.c.emit(e);
        this._router.navigate([`/fine/list`]);
    }
}
