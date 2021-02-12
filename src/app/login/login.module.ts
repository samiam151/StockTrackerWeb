import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
