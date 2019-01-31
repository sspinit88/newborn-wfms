import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {AuthorizationComponent} from './authorization/authorization.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthorizationHeaderComponent} from './authorization/authorization-header/authorization-header.component';
import {AuthService} from "./servises/auth.service";

@NgModule({
  declarations: [
    AuthorizationComponent,
    LoginComponent,
    RegistrationComponent,
    AuthorizationHeaderComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {
}
