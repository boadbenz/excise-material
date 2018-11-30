import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  Inject
} from '@angular/core';
import { CONFIG } from './CONFIG';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasDocumentMainService } from '../../services/master/MasDocumentMain.service';
import { NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-print-dialog',
  templateUrl: './print-dialog.component.html',
  styleUrls: ['./print-dialog.component.scss'],
})
export class PrintDialogComponent extends CONFIG implements OnInit {
  printDoc: any[];

  sort = 'asc';

  public data: any;
 
  constructor(
    private ActiveModal: NgbActiveModal
  ) {
    super();
  }

  ngOnInit() {
    this.printDoc = this.data;
  }

  sortPrintDoc() {
    // tslint:disable-next-line:triple-equals
    this.sort = this.sort == 'asc' ? 'desc' : 'asc';
    this.printDoc.sort((a, b) => {
      return -1; // asc
    });
  }

  onPrint(f: any) {
    console.log(f);
    window.open();
  }
  closeDialog() {
    this.ActiveModal.close();
  }
}
