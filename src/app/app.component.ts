import { Component, OnInit } from '@angular/core';
import { PreloaderService } from './shared/preloader/preloader.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  isPreloader: any;

  constructor(private preloader: PreloaderService) {

  }

  ngOnInit() {
    this.isPreloader = this.preloader.showPreloader;
  }
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
}
