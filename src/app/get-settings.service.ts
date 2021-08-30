import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Title, Meta } from '@angular/platform-browser';

import { StateManagementService } from "./state-management.service"
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetSettingsService {

  constructor(public http: HttpClient, public router: Router,
    public titleService: Title, public metaService: Meta,
    public state: StateManagementService) {
    this.getSettings();
  }

  getSettings() {
    return this.http.get<any>(this.state.state.urls.getsettings)
      .subscribe({
        next: data => {
          this.state.state.site_settings.title = data[0].apptitle;
          this.state.state.site_settings.is_allowed_to_buy = data[0].paymentdisabled;
          this.state.state.site_settings.credit_builder = data[0].creditbuilder;
          this.state.state.site_settings.payment_currency = data[0].supportedCuurrency;
          this.state.state.site_settings.terms_of_use = data[0].termsofuse;
          this.state.state.site_settings.privacy_policy = data[0].privacypolicy;
          this.state.state.site_settings.appicon = data[0].appicon;
          this.state.state.site_settings.applogo = data[0].applogo;
          this.state.state.site_settings.storepolicy = data[0].storepolicy;
          this.state.state.site_settings.social_links.facebooklink = data[0].facebooklink;
          this.state.state.site_settings.social_links.instagramlink = data[0].instagramlink;
          this.state.state.site_settings.social_links.linkedinlink = data[0].linkedinlink;
          this.state.state.site_settings.social_links.twitterlink = data[0].twitterlink;
          this.state.state.site_settings.social_links.youtubelink = data[0].youtubelink;
        },
        error: error => {
          alert(error.error);
        }
      })
  }

  buy() {
    this.router.navigate(['home'], { skipLocationChange: true });
    this.http.post<any>(this.state.state.urls.buy, {
      token: this.state.state.user_jwt_token,
      cart: this.state.state.cart
    })
      .subscribe({
        next: data => {
          alert(data.messege);
        },
        error: error => {
          console.log(error)
          alert(error.message);
        }
      })
    this.state.state.cart = [];
    localStorage.removeItem('current cart');
  }

  buildCart() {
    return this.http.post<any>(this.state.state.urls.buildCart, {
      token: this.state.state.user_jwt_token,
      cart: this.state.state.cart
    })
  }

  getProducts() {
    this.state.state.site_settings.is_loading_page = true;
    return this.http.get<any>(this.state.state.urls.getproducts)
      .subscribe({
        next: data => {
          this.state.state.products = data;
          window.scrollTo(0, 0);
          this.state.state.site_settings.is_loading_page = false;
        },
        error: error => {
          this.state.state.site_settings.is_loading_page = false;
        }
      })
  }

  getCountries(): Observable<any> {
    return this.http.post<any>(this.state.state.urls.getCountries,
      {
        token: this.state.state.user_jwt_token
      })
  }

}
