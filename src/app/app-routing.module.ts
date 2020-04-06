import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/component/auth/auth.component';
import { NoAuthGuardService } from './shared/service/no-auth-guard.service';
import { ForgotPasswordComponent } from './auth/component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/component/reset-password/reset-password.component';


const routes: Routes = [
  {path:'https://chat-app-proj.herokuapp.com/login' , canActivate:[NoAuthGuardService] , component:AuthComponent},
  {path:'https://chat-app-proj.herokuapp.com/signup' , canActivate:[NoAuthGuardService] ,component:AuthComponent},
  {path:'https://chat-app-proj.herokuapp.com/reset-password/:token' , canActivate:[NoAuthGuardService] ,component:ResetPasswordComponent},
  {path:'https://chat-app-proj.herokuapp.com/forgot-password' , canActivate:[NoAuthGuardService] ,component:ForgotPasswordComponent},
  {path:'https://chat-app-proj.herokuapp.com/dashboard',loadChildren:'./dashboard/dashboard.module#DashboardModule'},
  {path:'**' , canActivate:[NoAuthGuardService] ,redirectTo:'dashboard'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
