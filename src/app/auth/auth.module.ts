import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './component/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './service/auth.service';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';



@NgModule({
  declarations: [AuthComponent, ForgotPasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    HttpClientTestingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers:[AuthService]
})
export class AuthModule { }
