import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../service/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-client-form",
  templateUrl: "./client-form.component.html",
  styleUrls: ["./client-form.component.scss"]
})
export class ClientFormComponent implements OnInit {

  clientForm: FormGroup;
  id: any;
  selectedClient: any;
  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    public snackbar: MatSnackBar,
    private route: ActivatedRoute) {
    this.initializeClientForm();
  }

  getIDFromURL() {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      if (this.id) {
        this.clientService
          .getClientByID(this.id)
          .then(doc => {
            console.log(doc);
            this.selectedClient = doc.data;
            if (this.selectedClient) {
              this.setclientFormValue(this.selectedClient);
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
  }

  setclientFormValue(invoiceData) {
    const data = Object.keys(invoiceData);
    data.forEach(key => {
      if (
        this.clientForm.get(key) != null ||
        this.clientForm.get(key) != undefined
      ) {
        this.clientForm.controls[key].setValue(this.selectedClient[key]);
      }
    });
  }

  initializeClientForm() {
    this.clientForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      mobile: ["", Validators.required]
    });
  }

  get clientFormErrors() {
    return this.clientForm.controls;
  }

  submit() {
    if (this.clientForm.invalid) {
      return;
    } else {
      Object.keys(this.clientForm.controls).forEach(control => {
        if (this.clientForm.get(control).value == "") {
          this.clientForm.removeControl(control);
        }
      });
      if (this.selectedClient) {
        this.updateClient();
      } else {
        this.addClient();
      }
    }
  }

  addClient() {
    this.clientService
      .addClient(this.clientForm.value)
      .then(data => {
        if (data.data) {
          this.snackbar.open("Client Created", "Success", {
            duration: 2000
          });
          this.resetForm();
          this.router.navigate(["/dashboard/clients"]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateClient() {
    this.clientService
      .updateClient(this.id, this.clientForm.value)
      .then(data => {
        console.log(data);
        if (data.data) {
          this.snackbar.open("Invoice Updated", "Success", {
            duration: 2000
          });
          this.selectedClient = data.data;
          if (this.selectedClient) {
            this.setclientFormValue(this.selectedClient);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  resetForm() {
    this.clientForm.reset();
    this.initializeClientForm();
  }
}
