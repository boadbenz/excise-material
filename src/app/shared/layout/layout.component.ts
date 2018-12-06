import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { PreloaderService } from '../preloader/preloader.component';
import * as custom from 'assets/js/_custom';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})

export class LayoutComponent implements OnInit {

  isPreloader: any;
  fName: string = "data test";
  opName: string = "";

  constructor(private preloader: PreloaderService) {
    this.fName = localStorage.getItem('fullName')
    this.opName = localStorage.getItem('operationPosName')
  }

  ngOnInit() {
    custom.detectChange();
    this.isPreloader = this.preloader.showPreloader;
  }
}
