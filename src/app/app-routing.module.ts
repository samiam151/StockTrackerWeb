import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './modules/home/home-routing.module';

import { LoginComponent } from './modules/login/login/login.component';
import { SignupComponent } from './modules/login/signup/signup.component';
import { HomeComponent } from './modules/home/home.component';
import { StockDetailComponent } from './modules/stock/pages/stock-detail/stock-detail.component';

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
    path: "stock",
    children: [
      {
        path: "",
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: ":symbol",
        component: StockDetailComponent
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
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
