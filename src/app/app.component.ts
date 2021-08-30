import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { StateManagementService } from "./state-management.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public titleService: Title,
     public metaService: Meta,
      public router: Router,
      public state: StateManagementService
      ) {}
  ngOnInit() {
  
    this.router.navigate(['home'], { skipLocationChange: true });
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }
}
