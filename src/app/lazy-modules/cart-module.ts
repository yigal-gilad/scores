import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, CanActivate } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { PipesModule } from "../pipes.module";

import { CartComponent } from "../cart/cart.component";


const routes: Routes = [{
    path: '', component: CartComponent,
}
]

@NgModule({
    declarations: [
       CartComponent,
      
    ],
    imports: [
        CommonModule,
        FormsModule,
        PipesModule,
        RouterModule.forChild(routes)
    ],
    providers: []
})
export class CartModule { }
