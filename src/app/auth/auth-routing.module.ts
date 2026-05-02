import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from "./components/login/login.component";
import {ForbiddenComponent} from "../core/components/forbidden/forbidden.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {AuthLayoutComponent} from "./components/auth-layout/auth-layout.component";

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegistrationComponent},
      {path: 'forbidden', component: ForbiddenComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
