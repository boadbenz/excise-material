import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';

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
  public formSubmit(formData) {

  }
}
