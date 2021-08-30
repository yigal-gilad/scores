import { NgModule } from '@angular/core';
import { NgxPayPalModule } from 'ngx-paypal';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, CanActivate } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { PipesModule } from "../pipes.module";

import { EditProductComponent } from "../edit-product/edit-product.component";


const routes: Routes = [{
    path: '', component: EditProductComponent,
}
]

@NgModule({
    declarations: [
        EditProductComponent,
      
    ],
    imports: [
        CommonModule,
        FormsModule,
        PipesModule,
        NgxPayPalModule,
        RouterModule.forChild(routes)
    ],
    providers: []
})
export class EditProductModule { }
