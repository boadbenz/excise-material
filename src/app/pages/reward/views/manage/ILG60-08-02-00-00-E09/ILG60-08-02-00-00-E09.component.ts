import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import { IRequestCommandDetail } from 'app/pages/reward/interfaces/RequestCommandDetail';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-02-00-00-E09',
  templateUrl: './ILG60-08-02-00-00-E09.component.html',
  styleUrls: ['./ILG60-08-02-00-00-E09.component.scss']
})
export class ILG6008020000E09Component extends CONFIG implements OnInit {
  public submitData: IRequestCommandDetail[];
  constructor() {
    super();
  }

  ngOnInit() {
    this.fetchData();
    this.FormInput$.next(this.FormInputDefault);
  }
  private fetchData() {}
}
