import { Component, OnInit } from '@angular/core';
import { ColumnsInterface } from '../req-reward-shared/interfaces/columns-interface';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  public columns: ColumnsInterface[] = [
    {
        title: 'firstName',
        field: 'firstName',
        inputType: 'email',
        default: 'ssssss'
    },
    {
        title: 'lastName',
        field: 'lastName',
        inputType: 'email',
        default: 'ssssss'
    }
]
  constructor() {}

  ngOnInit() {}
}
