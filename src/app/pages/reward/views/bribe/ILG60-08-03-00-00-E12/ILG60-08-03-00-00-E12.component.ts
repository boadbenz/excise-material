import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import { FormGroup } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-03-00-00-E12',
  templateUrl: './ILG60-08-03-00-00-E12.component.html',
  styleUrls: ['./ILG60-08-03-00-00-E12.component.scss']
})
export class ILG6008030000E12Component extends CONFIG implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
  public formChange(formData: FormGroup) {
    console.log('formData', formData);
    this.emitChange.emit({
      FormName: 'ILG60-08-03-00-00-E12',
      FormData: formData
    });
  }
}
