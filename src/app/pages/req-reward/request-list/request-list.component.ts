import { Component, OnInit } from '@angular/core';
import { ColumnsInterface } from '../req-reward-shared/interfaces/columns-interface';
import { RequestListConfig } from './request-list.config';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent extends RequestListConfig implements OnInit {
  dataTest = [
    {
      firstName: '11',
      lastName: '11'
    },
    {
      firstName: '22',
      lastName: ''
    },
    {
      firstName: '',
      lastName: '33'
    }
  ];
  constructor() {
    super();
  }

  ngOnInit() {}
  submit($event) {
    console.log('form', $event);
  }
}
