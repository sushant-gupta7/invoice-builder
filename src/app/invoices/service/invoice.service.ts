import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  BASE_URL = 'https://localhost:3000/api/invoices';
  constructor(private http:HttpClient) { }

  getInvoices(): Observable<Invoice[]> {
    console.log('Inside');
     return this.http.get<Invoice[]>(this.BASE_URL );
  }
}
