import { BrowserModule } from '@angular/platform-browser';
// import { NgxPayPalModule } from 'ngx-paypal';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, } from '@angular/common/http';
import { SocialLoginModule, AuthService, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular-6-social-login';
import { AppRoutingModule } from './app-routing.module';
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SignUpService } from './sign-up.service'
import { PipesModule } from './pipes.module';
import { StateManagementService } from './state-management.service';
import { GetSettingsService } from "./get-settings.service";
import { ProductActionsService } from "./product-actions.service";

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("1080139323692-4pvctgp94qqqhkr12p924qckd0695a08.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("643487423012662")
  }
]);
export function provideConfig() {
  return config;
}




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
  
    // PaymentComponent,
    // StartTournamentComponent,
  ],
  imports: [
    HttpClientModule,
    SocialLoginModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    LazyLoadImageModule,
    // NgxPayPalModule,
    PipesModule
  ],
  providers: [
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks },
    GetSettingsService,
    AuthService,
    ProductActionsService,
    SignUpService,
    StateManagementService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
