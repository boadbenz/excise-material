import { Component, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

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
  templateUrl: './sidebar.component.html',
  styleUrls:['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  textVersion: any;
  constructor(
    private sidebarService: SidebarService,
    private router: Router
    ) {}

  ngOnInit() {
   this.textVersion = this.sidebarService.programVersion;
  }

  activeRoute(routename: string): boolean {
    return this.router.url.indexOf(routename) > -1;
  }
}
