import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {RecaptchaModule} from "ng-recaptcha";
import {FormsModule} from "@angular/forms";
import {AuthLayoutComponent} from "./components/auth-layout/auth-layout.component";
import {RouterModule} from "@angular/router";
import {AuthRoutingModule} from "./auth-routing.module";
import {MemoryGameComponent} from "./components/mini-games/memory-game/memory-game.component";
import {MiniGamesComponent} from "./components/mini-games/mini-games.component";
import {HopperGameComponent} from "./components/mini-games/hopper-game/hopper-game.component";
import {TypingChallengeComponent} from "./components/mini-games/typing-challenge/typing-challenge.component";

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AuthLayoutComponent,
    MiniGamesComponent,
    MemoryGameComponent,
    HopperGameComponent,
    TypingChallengeComponent
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
