import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from "./signup/signup.component";

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "sign-up",
    component: SignupComponent
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
