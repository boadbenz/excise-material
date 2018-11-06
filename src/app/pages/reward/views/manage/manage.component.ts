import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageConfig } from './manage.config';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent extends ManageConfig implements OnInit {

  public IndictmentID: number;
  constructor(private activatedRoute: ActivatedRoute) {
    super();
    this.activatedRoute.params.subscribe(param => {
      this.IndictmentID = param['IndictmentID'];
    });
  }

  ngOnInit() {}
}
