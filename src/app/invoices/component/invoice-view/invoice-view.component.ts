import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../service/invoice.service';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnInit {

  id:any;
  selectedInvoice:any;
  constructor(private route:ActivatedRoute,
    private invoiceService:InvoiceService) { 
    this.getInvoiceData()
  }

  ngOnInit(): void {
  }

  getInvoiceData() {
    this.route.params.subscribe(data=>{
      this.id = data['id'];
      console.log(this.id);
      if(this.id) {
        this.invoiceService.getInvoiceByID(this.id).then(data=>{
          console.log(data)
          this.selectedInvoice = data.data;
        })
      }
    })
  }

}
