import { Component, OnInit } from '@angular/core';
import { AdminFunctionsService } from "../admin-functions.service";
import { StateManagementService } from "../state-management.service";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  search: string;
  constructor(public admin: AdminFunctionsService,
    public state: StateManagementService) { }

  ngOnInit() {
  }
  searchUser(mode: string) {
    this.admin.searchUser(mode, this.search);
    this.search = "";
  }
}
