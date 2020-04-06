import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InvoiceListingComponent } from '../invoices/component/invoice-listing/invoice-listing.component';
import { ClientListingComponent } from '../clients/component/client-listing/client-listing.component';
import { InvoiceFormComponent } from '../invoices/component/invoice-form/invoice-form.component';
import { ClientFormComponent } from '../clients/component/client-form/client-form.component';
import { AuthGuardService } from '../shared/service/auth-guard.service';
import { InvoiceViewComponent } from '../invoices/component/invoice-view/invoice-view.component';
import { ChatComponentComponent } from '../chat/chat-component/chat-component.component';


const routes: Routes = [
  {
    path: 'https://chat-app-proj.herokuapp.com/', component: DashboardComponent, canActivate:[AuthGuardService] ,children: [
    { path: 'https://chat-app-proj.herokuapp.com/invoices', canActivateChild:[AuthGuardService] ,component: InvoiceListingComponent },
    { path: 'https://chat-app-proj.herokuapp.com/invoices/new',  canActivateChild:[AuthGuardService] , component: InvoiceFormComponent },
    { path: 'https://chat-app-proj.herokuapp.com/invoices/view/:id',  canActivateChild:[AuthGuardService] , component: InvoiceViewComponent },
    { path: 'https://chat-app-proj.herokuapp.com/invoices/:id',  canActivateChild:[AuthGuardService] , component: InvoiceFormComponent },
    { path: 'https://chat-app-proj.herokuapp.com/clients', canActivateChild:[AuthGuardService] ,component: ClientListingComponent },
    { path: 'https://chat-app-proj.herokuapp.com/clients/new',  canActivateChild:[AuthGuardService] ,component: ClientFormComponent },
    { path: 'https://chat-app-proj.herokuapp.com/clients/:id',  canActivateChild:[AuthGuardService] ,component: ClientFormComponent },
    { path: 'https://chat-app-proj.herokuapp.com/chat',  canActivateChild:[AuthGuardService] ,component: ChatComponentComponent },
    { path: '**',  canActivateChild:[AuthGuardService] ,redirectTo: 'invoices' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
