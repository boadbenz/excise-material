import { Component, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SidebarService {
  programVersion = new BehaviorSubject<String>('');

  constructor() { }

  setVersion(text: string) {
    this.programVersion.next(text);
  }
}

@Component({
  selector: 'ma-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  textVersion: any;
  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
   this.textVersion = this.sidebarService.programVersion;
  }
}
