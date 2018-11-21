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

@Component({
  selector: 'app-print-dialog',
  templateUrl: './print-dialog.component.html',
  styleUrls: ['./print-dialog.component.scss']
})
export class PrintDialogComponent extends CONFIG implements OnInit {
  printDoc: any[];

  sort = 'asc';

  @Input() ArrestCode: string;

  @Output() d = new EventEmitter();
  @Output() c = new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<PrintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private masDocumentMainService: MasDocumentMainService
  ) {
    super();
  }

  ngOnInit() {
    this.printDoc = this.data['printDoc'];
  }

  sortPrintDoc() {
    this.sort = this.sort == 'asc' ? 'desc' : 'asc';
    this.printDoc.sort((a, b) => {
      return -1; // asc
    });
  }

  onPrint(f: any) {
    console.log(f);
    window.open();
  }

  dismiss(e: any) {
    this.d.emit(e);
  }

  close(e: any) {
    this.c.emit(e);
  }

  closeDialog() {
    this.dialogRef.close('close PrintDialogComponent');
  }
}
