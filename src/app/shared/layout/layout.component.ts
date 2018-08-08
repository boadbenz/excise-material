import { Component, OnInit } from '@angular/core';
import { PreloaderService } from '../preloader/preloader.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
  
  isPreloader: any;

  constructor(private preloader: PreloaderService) {

  }

  ngOnInit() {
    this.isPreloader = this.preloader.showPreloader;
  }

}
