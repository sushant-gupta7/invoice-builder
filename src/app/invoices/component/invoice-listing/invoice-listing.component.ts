import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../service/invoice.service';
import { Invoice } from '../../models/invoice';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {

  constructor(private invoiceService:InvoiceService) { }

  ngOnInit(): void {
    this.getAllInvoices();
  }

  getAllInvoices() {
    this.invoiceService.getInvoices().subscribe((res)=>{
      console.log(res);
    },(err:HttpErrorResponse)=>{
      console.log(err);
    })
  }

}
