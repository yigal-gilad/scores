import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GetSettingsService } from "../get-settings.service"
import { StateManagementService } from "../state-management.service";
import { ProductActionsService } from "../product-actions.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  mainImage: string;
  images: string[];
  selectedImage: string;
  q: number;
  constructor(public state: StateManagementService,
    public settings: GetSettingsService,
    public actions: ProductActionsService,
    public router: Router) { }

  ngOnInit() {
    this.q = 1;
    this.mainImage = this.state.state.selected_product.mainImage;
    this.images = this.state.state.selected_product.images
  }

  select(isMain: boolean, i?: number) {

    if (isMain) {
      this.selectedImage = this.state.state.selected_product.mainImage;
      return;
    } else {
      this.selectedImage = this.state.state.selected_product.images[i]
    }
  }

  check(): boolean {
    if (this.q &&
      this.q > 0 &&
      this.q <= this.state.state.selected_product.stock &&
      !(this.q % 1)) {
      var i;
      if (this.state.state.cart.length) {
        for (i = 0; i < this.state.state.cart.length; i++) {
          if (this.state.state.selected_product._id === this.state.state.cart[i].product._id) {
            if (this.q + this.state.state.cart[i].amount > this.state.state.selected_product.stock) {
              return false;
            } else {
              return true;
            }
          }
        }
        return true;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  addToCart() {
    var i;
    if (this.state.state.cart.length) {
      for (i = 0; i < this.state.state.cart.length; i++) {
        if (this.state.state.cart[i].product._id === this.state.state.selected_product._id) {
          this.state.state.cart[i].amount += this.q;
          break;
        }
        if (i === this.state.state.cart.length - 1 && this.state.state.cart[i].product._id !== this.state.state.selected_product._id) {

          this.state.state.cart.unshift({
            amount: this.q,
            product: this.state.state.selected_product,
          });
          break;
        }
      }
    } else {
      this.state.state.cart.unshift({
        amount: this.q,
        product: this.state.state.selected_product
      });
    }
    localStorage.removeItem('current cart');
    localStorage.setItem('current cart', JSON.stringify(this.state.state.cart));
    this.q = 0;
    this.router.navigate(['home'], { skipLocationChange: true });
  }
}
