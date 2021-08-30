import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GetSettingsService } from "../get-settings.service"
import { StateManagementService } from "../state-management.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public settings: GetSettingsService,
    public state: StateManagementService,
    public router: Router) { }

  ngOnInit() {
    this.settings.getSettings();
    this.settings.getProducts();
  }
  select(i: number) {
    this.state.state.selected_product = this.state.state.products[i];
    this.router.navigate(['details'], { skipLocationChange: true });
  }
}
