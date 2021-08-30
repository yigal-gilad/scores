import { Component, OnInit } from '@angular/core';
import { StateManagementService } from "../state-management.service";
import { GetSettingsService } from "../get-settings.service";
import { ProductActionsService } from "../product-actions.service";

@Component({
  selector: 'app-edit-tournament',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  isLoadingCountries: boolean;
  constructor(public state: StateManagementService,
    public settings: GetSettingsService,
    public actions: ProductActionsService) { }

  ngOnInit() {
    this.isLoadingCountries = false;
  }

  select(operation: boolean) {
    alert(operation);
    if (operation) {
      this.state.state.selected_product.isEvedible = true;
      return
    } else {
      this.state.state.selected_product.isEvedible = false;
      return
    }
  }

  clcDiscount() {
    if (this.state.state.selected_product.price <= 0 || this.state.state.selected_product.oldPrice <= 0) {
      this.state.state.selected_product.discountPresent = 0;
      return this.state.state.selected_product.discountPresent;
    } else {
      this.state.state.selected_product.discountPresent =
        Math.round(((this.state.state.selected_product.oldPrice - this.state.state.selected_product.price) / this.state.state.selected_product.oldPrice) * 100);
      if (this.state.state.selected_product.discountPresent < 0) {
        this.state.state.selected_product.discountPresent = 0;
        return this.state.state.selected_product.discountPresent;
      } else {
        return this.state.state.selected_product.discountPresent;
      }
    }
    // this.state.state.selected_product.discountPresent =
    //   Math.round(this.state.state.selected_product.price * this.state.state.selected_product.discountPrice / 100);

  }

  onSelectFile1(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed

        this.state.state.selected_product.mainImage = (event.target as FileReader).result.toString();
      }
    }
  }

  onSelectFile2(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed

        this.state.state.selected_product.images[0] = (event.target as FileReader).result.toString();
      }
    }
  }

  onSelectFile3(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed

        this.state.state.selected_product.images[1] = (event.target as FileReader).result.toString();
      }
    }
  }

  getCountries() {
    if (!this.state.state.site_settings.countries.length) {
      this.isLoadingCountries = true;
      this.settings.getCountries().subscribe({
        next: data => {
          this.isLoadingCountries = false;
          this.state.state.site_settings.countries = data;
        },
        error: error => {
          alert(error.error);
         
        }
      })
    } else {
      return;
    }
  }

  addCountries(index: number) {
    var i;
    for (i = 0; i < this.state.state.selected_product.shippingLimit.length; i++) {
      if (this.state.state.selected_product.shippingLimit[i].name ===
        this.state.state.site_settings.countries[index].name) {
        return;
      }
    }
    this.state.state.selected_product.shippingLimit.push(this.state.state.site_settings.countries[index]);
    return;
  }

  removeCountries(index: number) {
    this.state.state.selected_product.shippingLimit.splice(index, 1);
    return;
  }
}

