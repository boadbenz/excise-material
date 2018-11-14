import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import { FormBuilder } from '@angular/forms';
import { RequestArrestLawsuitService } from 'app/pages/reward/services/RequestArrestLawsuit.service';
import {
  IRequestArrestLawsuitGetByIndictmentId,
  IRequestArrestLawsuit
} from 'app/pages/reward/interfaces/RequestArrestLawsuit.interface';
import { BribeService } from '../bribe.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-03-00-00-E08',
  templateUrl: './ILG60-08-03-00-00-E08.component.html',
  styleUrls: ['./ILG60-08-03-00-00-E08.component.scss']
})
export class ILG6008030000E08Component extends CONFIG implements OnInit {
  constructor(
    private fb: FormBuilder,
    private requestArrestLawsuitService: RequestArrestLawsuitService,
    private bribeService: BribeService
  ) {
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
    });
  }
  public RequestArrestLawsuitgetByIndictmentID(
    param: IRequestArrestLawsuitGetByIndictmentId
  ) {
    this.requestArrestLawsuitService
      .RequestArrestLawsuitgetByIndictmentID(param)
      .subscribe((res: IRequestArrestLawsuit[]) => {
        this.RequestArrestLawsuit$.next(res);
      });
  }
}
