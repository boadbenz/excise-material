import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import { FormBuilder } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-03-00-00-E08',
  templateUrl: './ILG60-08-03-00-00-E08.component.html',
  styleUrls: ['./ILG60-08-03-00-00-E08.component.scss']
})
export class ILG6008030000E08Component extends CONFIG implements OnInit {
  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      NoticeCodeAndName: [''],
      RequestBribeCode: [''],
      Station: [''],
      RequestDate: [''],
      RequestTime: [''],
      Informeracknowledge: ['']
    })
  }
}
