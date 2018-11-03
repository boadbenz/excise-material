import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestArrestLawsuitConfig } from './request-arrest-lawsuit.config';

@Component({
  selector: 'app-request-arrest-lawsuit',
  templateUrl: './request-arrest-lawsuit.component.html',
  styleUrls: ['./request-arrest-lawsuit.component.scss']
})
export class RequestArrestLawsuitComponent extends RequestArrestLawsuitConfig
  implements OnInit {
  public IndictmentID: number;
  constructor(private activatedRoute: ActivatedRoute) {
    super();
    this.activatedRoute.params.subscribe(param => {
      this.IndictmentID = param['IndictmentID'];
    });
  }

  ngOnInit() {}
}
