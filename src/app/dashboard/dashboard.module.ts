import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContentComponent } from './components/main-content/main-content.component';
import { MaterialModule } from '../shared/material/material.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { ClientsModule } from '../clients/clients.module';


@NgModule({
  declarations: [DashboardComponent, MainContentComponent, SideNavComponent, ToolbarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    InvoicesModule,
    ClientsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
})
export class DashboardModule { }
