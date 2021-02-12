import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';

import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './login/signup/signup.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: "login",
    children: [
      {
        path: "",
        component: LoginComponent
      },
      {
        path: "sign-up",
        component: SignupComponent
      }
    ]
  },
  {
    path: '',
    //redirectTo: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HomeRoutingModule,
    DetailRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
