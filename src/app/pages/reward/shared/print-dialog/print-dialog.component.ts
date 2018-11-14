import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-print-dialog',
  templateUrl: './print-dialog.component.html',
  styleUrls: ['./print-dialog.component.scss']
})
export class PrintDialogComponent extends CONFIG implements OnInit {
  constructor(public dialogRef: MatDialogRef<PrintDialogComponent>) {
    super();
  }

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close('close PrintDialogComponent');
  }
}
