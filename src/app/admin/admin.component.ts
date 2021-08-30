import { Component, OnInit } from '@angular/core';
import { StateManagementService } from "../state-management.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public state: StateManagementService) { }

  ngOnInit() {
  }

}
