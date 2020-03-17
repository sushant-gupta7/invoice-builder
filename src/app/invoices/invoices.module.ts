import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListingComponent } from './component/invoice-listing/invoice-listing.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { InvoiceService } from './service/invoice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';



@NgModule({
  declarations: [InvoiceListingComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    HttpClientTestingModule
  ],
  exports:[InvoiceListingComponent],
  providers:[InvoiceService]
})
export class InvoicesModule { }
