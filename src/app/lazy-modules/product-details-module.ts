import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, CanActivate } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { PipesModule } from "../pipes.module";

import { ProductDetailsComponent } from "../product-details/product-details.component";

import { ProductActionsService } from "../product-actions.service";


const routes: Routes = [{
    path: '', component: ProductDetailsComponent,
}
]

@NgModule({
    declarations: [
        ProductDetailsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PipesModule,
        RouterModule.forChild(routes)
    ],
    providers: [ProductActionsService]
})
export class ProductDelailsModule { }
