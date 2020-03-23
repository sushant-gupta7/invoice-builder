import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './shared/core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './shared/service/http-interceptor.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    DashboardModule,
    MatDialogModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS , useClass:HttpInterceptorService , multi:true}],
  bootstrap: [AppComponent],
  exports:[MatDialogModule]
})
export class AppModule { }
