import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit
} from "@angular/core";
import { InvoiceService } from "../../service/invoice.service";
import { Invoice, InvoicePaginationRsp } from "../../models/invoice";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { MatTable } from "@angular/material/table";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-invoice-listing",
  templateUrl: "./invoice-listing.component.html",
  styleUrls: ["./invoice-listing.component.scss"]
})
export class InvoiceListingComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  invoiceLength = 0;
  displayedColumns: string[] = [
    "client",
    "item",
    "date",
    "due",
    "action"
  ];
  dataSource: Invoice[] = [];
  isResultsLoading: Boolean = false;
  pageData: any;
  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private snackbar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // this.subscribePaginator();
    this.getAllInvoices();
  }

  ngAfterViewInit() {
    this.isResultsLoading = true;
    this.paginator.page.subscribe(event => {
      console.log(event);
      this.pageData = event;
      this.getDataOfInvoice(
        ++event.pageIndex,
        event.pageSize,
        null,
        null,
        null
      );
    });
    this.sort.sortChange.subscribe(data => {
      console.log(data);
      console.log(this.pageData);
      this.getDataOfInvoice(this.pageData.pageIndex, this.pageData.pageSize, null , data.active , data.direction);
    });
  }

  getDataOfInvoice(page, perPage, sortField, sortDir, filter) {
    this.invoiceService
      .getInvoices(page, perPage, filter,sortField, sortDir )
      .then(data => {
        console.log(data);
        this.isResultsLoading = false;
        this.dataSource = data.data.docs;
        this.invoiceLength = data.data.total;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getAllInvoices() {
    this.isResultsLoading = true;
    const page = 1;
    const perPage = 10;
    this.pageData = {
      pageIndex: 1,
      pageSize: 10,
      previousPageIndex: 0,
      length: 10
    };
    this.invoiceService
      .getInvoices(page, perPage, null, null ,null)
      .then(data => {
        console.log(data);
        this.isResultsLoading = false;
        this.dataSource = data.data.docs;
        this.invoiceLength = data.data.total;
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteInvoice(invoiceID: string, index: number) {
    console.log(invoiceID);
    console.log(index);
    this.invoiceService
      .deleteInvoice(invoiceID)
      .then(data => {
        console.log(data);
        if (data.data) {
          this.dataSource.splice(index, 1);
          this.dataSource = JSON.parse(JSON.stringify(this.dataSource));
          this.snackbar.open("Invoice Deleted", "Success", {
            duration: 2000
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  navigateToInvoiceForm() {
    this.router.navigate(["/dashboard/invoices/new"]);
  }

  editInvoice(invoiceID) {
    this.router.navigate(["/dashboard/invoices/" + invoiceID]);
  }

  filterInvoice(value: string) {
    console.log(value);
    this.pageData = {
      pageIndex: 1,
      pageSize: 10,
      previousPageIndex: 0,
      length: 10
    };
    this.invoiceService
      .getInvoices(this.pageData.pageIndex, this.pageData.pageSize, value , null, null )
      .then(data => {
        console.log(data);
        this.isResultsLoading = false;
        this.dataSource = data.data.docs;
        this.invoiceLength = data.data.total;
      })
      .catch(err => {
        console.log(err);
      });
  }

  viewInvoice(invoiceID) {
    this.router.navigate(['/dashboard/invoices/view/' +invoiceID])
  }
}
