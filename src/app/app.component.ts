import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor() {
  }

  ngOnInit() {
  }
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
}
