import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtServiceService } from '../service/jwt-service.service';
import { HttpInterceptorService } from '../service/http-interceptor.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from '../service/auth-guard.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[JwtServiceService,HttpInterceptorService,AuthGuardService]
})
export class CoreModule { }
