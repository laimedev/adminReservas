import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { FooterLoginComponent } from './footer-login/footer-login.component';
// import { HeaderLoginComponent } from './header-login/header-login.component';
import { SideLoginComponent } from './side-login/side-login.component';
import { UtilsModule } from '../utils/utils.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [LoginComponent, FooterLoginComponent, SideLoginComponent, ForgotPasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    UtilsModule,

    MatIconModule,
    MatInputModule

  ]
})
export class LoginModule { }
