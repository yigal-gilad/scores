import { Component, OnInit } from '@angular/core';
import { GetSettingsService } from "../get-settings.service"
import { AdminFunctionsService } from "../admin-functions.service";
import { StateManagementService } from "../state-management.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  top5sold: any[];
  top5unique: any[];
  sales: any[];

  constructor(public settings: GetSettingsService,
    public state: StateManagementService,
    public admin: AdminFunctionsService) { }

  ngOnInit() {
    this.settings.getProducts();
    this.top5sold = [];
    this.top5unique = [];
    this.findTop5Sold();
    this.findTop5Unique();
    this.getLast5Days();
  }

  findTop5Sold() {
    var sorted = this.state.state.products.sort((a, b) => b.sold - a.sold)
    this.top5sold = sorted.slice(0, 5);
  }

  findTop5Unique() {
    var sorted = this.state.state.products.sort((a, b) => b.unique - a.unique)
    this.top5unique = sorted.slice(0, 5);
  }

  getLast5Days() {
    var days = []
    var date = new Date();
    for (let i = 0; i < 5; i++) {
      var last = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000));
      var month = last.getMonth() + 1;
      days.push(last.getDate() + "/" + month + "/" + last.getFullYear());
    }
    this.admin.getSales(days).subscribe({
      next: data => {
        this.sales = data;
      },
      error: error => alert(error.error)
    })
  }

}
