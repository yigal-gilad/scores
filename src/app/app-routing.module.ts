import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [{
  path: 'home',
  component: HomeComponent
},
{
  path: 'admin',
  loadChildren: () =>
    import('./lazy-modules/admin-module').then(m => m.AdminModule)
},
{
  path: 'edit',
  loadChildren: () =>
    import('./lazy-modules/edit-product-module').then(m => m.EditProductModule)
},
{
  path: 'details',
  loadChildren: () =>
    import('./lazy-modules/product-details-module').then(m => m.ProductDelailsModule)
},
{
  path: 'cart',
  loadChildren: () =>
    import('./lazy-modules/cart-module').then(m => m.CartModule)
},

  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
//
export class AppRoutingModule { }
