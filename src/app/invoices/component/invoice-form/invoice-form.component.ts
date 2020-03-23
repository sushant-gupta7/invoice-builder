import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { InvoiceService } from "../../service/invoice.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ClientService } from "src/app/clients/service/client.service";

@Component({
  selector: "app-invoice-form",
  templateUrl: "./invoice-form.component.html",
  styleUrls: ["./invoice-form.component.scss"]
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm: FormGroup;
  id: any;
  selectedInvoice: any;
  allClients: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router,
    public snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {
    this.initializeInvoiceForm();
  }

  getIDFromURL() {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      if (this.id) {
        this.invoiceService
          .getInvoiceByID(this.id)
          .then(doc => {
            this.selectedInvoice = doc.data;
            console.log(doc.data);
            if (this.selectedInvoice) {
              this.setInvoiceFormValue(this.selectedInvoice);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        return;
      }
    });
  }

  ngOnInit(): void {
    this.getIDFromURL();
    this.getClients();
  }

  getClients() {
    this.clientService.getAllClients().then(
      data => {
        console.log(data);
        this.allClients = data.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  setInvoiceFormValue(invoiceData) {
    const data = Object.keys(invoiceData);
    data.forEach(key => {
      if (
        this.invoiceForm.get(key) != null ||
        this.invoiceForm.get(key) != undefined
      ) {
        this.invoiceForm.controls[key].setValue(this.selectedInvoice[key]);
      }
      if(this.selectedInvoice.client){
        this.invoiceForm.controls['client'].setValue(this.selectedInvoice.client._id);
      }
    });
  }

  initializeInvoiceForm() {
    this.invoiceForm = this.formBuilder.group({
      item: ["", Validators.required],
      date: ["", Validators.required],
      due: ["", Validators.required],
      qty: ["", Validators.required],
      rate: [""],
      tax: [""],
      client:[""]
    });
  }

  get invoiceFormErrors() {
    return this.invoiceForm.controls;
  }

  submit() {
    if (this.invoiceForm.invalid) {
      return;
    } else {
      Object.keys(this.invoiceForm.controls).forEach(control => {
        if (this.invoiceForm.get(control).value == "") {
          this.invoiceForm.removeControl(control);
        }
      });
      if (this.selectedInvoice) {
        this.updateInvoice();
      } else {
        this.addInvoice();
      }
    }
  }

  addInvoice() {
    this.invoiceService
      .addInvoices(this.invoiceForm.value)
      .then(data => {
        if (data.data) {
          this.snackbar.open("Invoice Created", "Success", {
            duration: 2000
          });
          this.resetForm();
          this.router.navigate(["/dashboard/invoices"]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateInvoice() {
    this.invoiceService
      .updateInvoice(this.id, this.invoiceForm.value)
      .then(data => {
        console.log(data);
        if (data.data) {
          this.snackbar.open("Invoice Updated", "Success", {
            duration: 2000
          });
          this.selectedInvoice = data.data;
          if (this.selectedInvoice) {
            this.setInvoiceFormValue(this.selectedInvoice);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  resetForm() {
    this.invoiceForm.reset();
    this.initializeInvoiceForm();
  }
}
