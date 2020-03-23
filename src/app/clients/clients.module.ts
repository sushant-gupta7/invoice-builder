import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListingComponent } from './component/client-listing/client-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { ClientService } from './service/client.service';
import { ClientFormComponent } from './component/client-form/client-form.component';



@NgModule({
  declarations: [ClientListingComponent, ClientFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[ClientListingComponent],
  providers:[ClientService]
})
export class ClientsModule { }
