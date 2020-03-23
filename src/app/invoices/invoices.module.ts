import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListingComponent } from './component/invoice-listing/invoice-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { InvoiceService } from './service/invoice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InvoiceFormComponent } from './component/invoice-form/invoice-form.component';
import { InvoiceViewComponent } from './component/invoice-view/invoice-view.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [InvoiceListingComponent, InvoiceFormComponent, InvoiceViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[InvoiceListingComponent,InvoiceFormComponent],
  providers:[InvoiceService]
})
export class InvoicesModule { }
