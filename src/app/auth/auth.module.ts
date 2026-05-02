// private.module.ts
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {RecaptchaModule} from "ng-recaptcha";
import {FormsModule} from "@angular/forms";
import {AuthLayoutComponent} from "./components/auth-layout/auth-layout.component";
import {RouterModule} from "@angular/router";
import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RecaptchaModule,
    FormsModule,
    RouterModule
  ]
})
export class AuthModule {
}
