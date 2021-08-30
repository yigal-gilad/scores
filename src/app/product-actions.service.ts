import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

import { StateManagementService } from "./state-management.service"

@Injectable({
  providedIn: 'root'
})
export class ProductActionsService {

  constructor(public http: HttpClient, public router: Router,
    public state: StateManagementService) { }

  deleteProduct() {
    this.router.navigate(['home'], { skipLocationChange: true });
    return this.http.post<any>(this.state.state.urls.deleteProduct,
      {
        token: this.state.state.user_jwt_token,
        target_id: this.state.state.selected_product._id
      })
      .subscribe({
        next: data => {

          alert(data.messege);
        },
        error: error => {
          alert(error.error);

        }
      })
  }

  editProduct() {
    this.router.navigate(['home'], { skipLocationChange: true });
    return this.http.post<any>(this.state.state.urls.editProduct,
      {
        token: this.state.state.user_jwt_token,
        target_id: this.state.state.selected_product._id,
        changes: this.state.state.selected_product,
      })
      .subscribe({
        next: data => {

          alert(data.messege);
        },
        error: error => {
          alert(error.error);

        }
      })
  }
}


