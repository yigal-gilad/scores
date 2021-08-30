import { Component, OnInit } from '@angular/core';
import { StateManagementService } from "../state-management.service";
import { AdminFunctionsService } from "../admin-functions.service";
import { currencirs } from "../constants/currencies";
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-site-settings',
  templateUrl: './site-settings.component.html',
  styleUrls: ['./site-settings.component.css']
})
export class SiteSettingsComponent implements OnInit {
  file: any;
  site_settings: any;
  currencirs: any;
  constructor(public state: StateManagementService,
    public admin: AdminFunctionsService,
    public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.currencirs = currencirs
    this.site_settings = {
      terms_of_use: "none",
      privacy_policy: "none",
      appicon: this.state.state.site_settings.appicon,
      applogo: this.state.state.site_settings.applogo,
      storepolicy: "none",
      facebooklink: this.state.state.site_settings.social_links.facebooklink === "none" ? "" :
        this.state.state.site_settings.social_links.facebooklink,
      instagramlink: this.state.state.site_settings.social_links.instagramlink === "none" ? "" :
        this.state.state.site_settings.social_links.instagramlink,
      linkedinlink: this.state.state.site_settings.social_links.linkedinlink === "none" ? "" :
        this.state.state.site_settings.social_links.linkedinlink,
      twitterlink: this.state.state.site_settings.social_links.twitterlink === "none" ? "" :
        this.state.state.site_settings.social_links.twitterlink,
      youtubelink: this.state.state.site_settings.social_links.youtubelink === "none" ? "" :
        this.state.state.site_settings.social_links.youtubelink,
      title: this.state.state.site_settings.title,
      credit_builder: this.state.state.site_settings.credit_builder,
      payment_currency: this.state.state.site_settings.payment_currency,
      is_allowed_to_buy: this.state.state.site_settings.is_allowed_to_buy
    }
  }
  onSelectFile1(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.site_settings.terms_of_use = event.currentTarget.result.toString();
      }
    }
  }

  onSelectFile2(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.site_settings.privacy_policy = event.currentTarget.result.toString();
      }
    }

  }
  onSelectFile3(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.site_settings.storepolicy = event.currentTarget.result.toString();
      }
    }
  }

  onSelectFile4(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.site_settings.appicon = event.currentTarget.result.toString();
      }
    }
  }

  onSelectFile5(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.site_settings.applogo = event.currentTarget.result.toString();
      }
    }
  }
}
