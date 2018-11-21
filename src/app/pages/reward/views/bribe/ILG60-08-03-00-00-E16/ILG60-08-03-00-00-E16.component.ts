import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import { replaceFakePath } from 'app/config/dataString';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-03-00-00-E16',
  templateUrl: './ILG60-08-03-00-00-E16.component.html',
  styleUrls: ['./ILG60-08-03-00-00-E16.component.scss']
})
export class ILG6008030000E16Component extends CONFIG implements OnInit {
  BribeDocument
  constructor() {
    super();
  }

  ngOnInit() {}
  changeBribeDoc(e: any, index: number) {
    // let file = e.target.files[0];
    this.BribeDocument.at(index).patchValue({
        ReferenceCode: this.RequestBribeCode$.getValue(),
        FilePath: replaceFakePath(e.target.value),
        IsActive: 1
    })
}
}
