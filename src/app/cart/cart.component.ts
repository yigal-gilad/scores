import { Component, OnInit } from '@angular/core';
import { GetSettingsService } from "../get-settings.service"
import { StateManagementService } from "../state-management.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isLoading: boolean;
  products: any;
  constructor(public state: StateManagementService,
    public settings: GetSettingsService) { }
  ngOnInit() {
    this.isLoading = true;
    this.settings.buildCart().subscribe({
      next: data => {
        this.isLoading = false;
      
        this.state.state.cart = data.cart;
        localStorage.removeItem('current cart');
        localStorage.setItem('current cart', JSON.stringify(this.state.state.cart));
        if (data.missings) {
          alert(data.missings + " product/s are missing")
        }
      },
      error: error => {
        alert(error.error);
       
      }
    })
  }

  removeProductFromCart(index: number) {
    this.state.state.cart.splice(index, 1);
    localStorage.removeItem('current cart');
    localStorage.setItem('current cart', JSON.stringify(this.state.state.cart));
    return;
  }

  clcTotalPrice(): number {
    var i;
    var total = 0;
    for (i = 0; i < this.state.state.cart.length; i++) {
      total += this.state.state.cart[i].product.price * this.state.state.cart[i].amount;
    }
    return total;
  }

  clcTotalShippingPrice(): number {
    var i;
    var total = 0;
    for (i = 0; i < this.state.state.cart.length; i++) {
      total += this.state.state.cart[i].product.shippingPrice 
      * this.state.state.cart[i].amount;
      //  * this.state.state.cart[i].amount;
    }
    return total;
  }

  payButtonCheck(): boolean {
    var i;
    for (i = 0; i < this.state.state.cart.length; i++) {
      if (!this.state.state.cart[i].amount ||
        this.state.state.cart[i].amount <= 0 ||
        this.state.state.cart[i].amount > this.state.state.cart[i].product.stock ||
        (this.state.state.cart[i].amount % 1)) {
        return false;
      }
    }
    return true;
  }

  change() {
    localStorage.removeItem('current cart');
    localStorage.setItem('current cart', JSON.stringify(this.state.state.cart));
  }
}
