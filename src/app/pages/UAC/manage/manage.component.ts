import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ManageComponent implements OnInit {

  constructor() { }

  List: any = [ { "name": "test" },
                { "name": "test" },
                { "name": "test" },
                { "name": "test" },
                { "name": "test" },
                { "name": "test" },
                { "name": "test" },
                { "name": "test" },
               
              ];

  ngOnInit() {
  }

}
