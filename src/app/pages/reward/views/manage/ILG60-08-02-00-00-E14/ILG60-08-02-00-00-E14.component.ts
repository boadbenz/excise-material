import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-02-00-00-E14',
  templateUrl: './ILG60-08-02-00-00-E14.component.html',
  styleUrls: ['./ILG60-08-02-00-00-E14.component.scss']
})
export class ILG6008020000E14Component extends CONFIG implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
    this.fetchData();
  }
  private fetchData() {}
}
