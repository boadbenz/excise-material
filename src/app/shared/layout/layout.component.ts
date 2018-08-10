import { Component, OnInit } from '@angular/core';
import { PreloaderService } from '../preloader/preloader.component';
import * as custom from 'assets/js/_custom';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
  
  isPreloader: any;

  constructor(private preloader: PreloaderService) {

  }

  ngOnInit() {
    custom.detectChange();
    this.isPreloader = this.preloader.showPreloader;
  }

}
