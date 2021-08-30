import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateManagementService } from "./state-management.service"
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(public http: HttpClient, public state: StateManagementService,
    public router: Router) {
    this.checkForToken();
  }

  // check if user has jwt token in his local storage
  checkForToken() {
    if (localStorage.getItem('current user')) {
      this.getUserData(JSON.parse(localStorage.getItem('current user')).token);
      return;
    } else {
      this.state.state.is_logging = false;
      this.state.state.is_logged = false;
      return;
    }
  }

  // post google/facebook data from hendler and get jwt token from the server
  signUp(provider: string, id: string, token: string) {
    return this.http.post<any>(this.state.state.urls.signup, { provider: provider, id: id, token: token })
      .subscribe({
        next: data => {
          localStorage.clear();
          localStorage.setItem('current user', JSON.stringify(data));
          this.checkForToken();
        },
        error: error => {
          alert(error.error);
        }
      })
  }

  // get user data using the jwt token in local storage
  getUserData(token: string) {
    return this.http.post<any>(this.state.state.urls.getuser, { token: token })
      .subscribe({
        next: data => {
          this.state.state.is_logging = false;
          this.state.state.is_logged = true;
          this.state.state.current_user = {
            _id: data._id,
            email: data.email,
            name: data.name,
            profile_image: data.profileImg,
            gameId: data.gameId,
            role: data.role,
            isbanned: data.isbanned
          }
          this.state.state.user_jwt_token =
            JSON.parse(localStorage.getItem('current user')).token;
          this.getCart();
        },
        error: error => {
          localStorage.clear();
          this.checkForToken();
          alert(error.error);
        }
      })
  }

  getCart() {
    if (localStorage.getItem('current cart')) {
      this.state.state.cart = JSON.parse(localStorage.getItem('current cart'));
      return;
    } else {
      return;
    }
  }

  // clear local storage and log out
  logOut() {
    this.router.navigate(['home'], { skipLocationChange: true });
    this.state.state.is_logging = true;
    localStorage.clear();
    this.checkForToken();
  }

}
