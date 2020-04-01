import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Invoice } from "../models/invoice";

@Injectable({
  providedIn: "root"
})
export class InvoiceService {
  headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    'Authorization': `bearer ${localStorage.getItem("token")}`
  };
  headersFormData = {
    "Content-Type": "application/x-www-form-urlencoded",
    'Authorization': `bearer ${localStorage.getItem("token")}`,
  };

  BASE_URL = "http://localhost:3000/api/invoices";
  constructor(private http: HttpClient) {}

  getInvoices(page = 1, perPage = 10, filter, sortField, sortDir) {
    if (sortField && sortDir) {
      var apiQueryParams =
        this.BASE_URL +
        "?page=" +
        page +
        "&perPage=" +
        perPage +
        "&sortField=" +
        sortField +
        "&sortDir=" +
        sortDir;
    } else {
      var apiQueryParams =
        this.BASE_URL + "?page=" + page + "&perPage=" + perPage;
    }
    if (filter) {
      var apiQueryParams =
        this.BASE_URL +
        "?page=" +
        page +
        "&perPage=" +
        perPage +
        "&filter=" +
        filter;
    } else {
      var apiQueryParams =
        this.BASE_URL + "?page=" + page + "&perPage=" + perPage;
    }
    return fetch(apiQueryParams, {
      method: "GET",
      headers: this.headers
    }).then(data => {
      return data.json();
    });
  }

  addInvoices(invoice) {
    const data = new URLSearchParams();
    for (const pair of invoice) {
      data.append(pair[0], pair[1]);
      console.log(pair)
    }
    console.log(data);
    return fetch(this.BASE_URL, {
      method: "POST",
      headers: this.headersFormData,
      body: data,
    }).then(data => {
      console.log(data)
      return data.json();
    });
  }

  deleteInvoice(invoiceId) {
    return fetch(this.BASE_URL + "/" + "delete/" + invoiceId, {
      method: "DELETE",
      headers: this.headers
    }).then(data => {
      return data.json();
    });
  }

  getInvoiceByID(invoiceID) {
    return fetch(this.BASE_URL + "/" + invoiceID, {
      method: "GET",
      headers: this.headers
    }).then(data => {
      return data.json();
    });
  }

  updateInvoice(invoiceID, invoiceObject) {
    return fetch(this.BASE_URL + "/update/" + invoiceID, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(invoiceObject)
    }).then(data => {
      return data.json();
    });
  }
}
