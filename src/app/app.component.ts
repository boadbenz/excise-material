import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from './pages/login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event) {
    this.authService.signout();
  }
}
