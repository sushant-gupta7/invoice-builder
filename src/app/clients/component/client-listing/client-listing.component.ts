import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  Inject
} from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { ClientService } from "../../service/client.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-client-listing",
  templateUrl: "./client-listing.component.html",
  styleUrls: ["./client-listing.component.scss"]
})
export class ClientListingComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  clientLength = 0;
  displayedColumns: string[] = [
    "firstname",
    "lastname",
    "email",
    "mobile",
    "action"
  ];
  dataSource: any[] = [];
  isResultsLoading: Boolean = false;
  pageData: any;
  animal: string;
  name: string;
  constructor(
    private clientService: ClientService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
    private router:Router
  ) {
  }

  ngOnInit() {
    this.getAllClients();
  }

  ngAfterViewInit() {
    this.isResultsLoading = true;
    this.paginator.page.subscribe(event => {
      console.log(event);
      this.pageData = event;
      this.getDataOfClient(++event.pageIndex, event.pageSize, null, null, null);
    });
    this.sort.sortChange.subscribe(data => {
      console.log(data);
      console.log(this.pageData);
      this.getDataOfClient(
        this.pageData.pageIndex,
        this.pageData.pageSize,
        null,
        data.active,
        data.direction
      );
    });
  }

  getDataOfClient(page, perPage, sortField, sortDir, filter) {
    this.clientService
      .getClients(page, perPage, filter, sortField, sortDir)
      .then(data => {
        console.log(data);
        this.isResultsLoading = false;
        this.dataSource = data.data.docs;
        this.clientLength = data.data.total;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getAllClients() {
    this.isResultsLoading = true;
    const page = 1;
    const perPage = 10;
    this.pageData = {
      pageIndex: 1,
      pageSize: 10,
      previousPageIndex: 0,
      length: 10
    };
    this.clientService
      .getClients(page, perPage, null, null, null)
      .then(data => {
        console.log(data);
        this.isResultsLoading = false;
        this.dataSource = data.data.docs;
        this.clientLength = data.data.docs.length;
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteClient(clientID: string, index: number) {
    console.log(clientID);
    console.log(index);
    this.clientService
      .deleteClient(clientID)
      .then(data => {
        console.log(data);
        if (data.data) {
          this.dataSource.splice(index, 1);
          this.dataSource = JSON.parse(JSON.stringify(this.dataSource));
          this.snackbar.open("Client Deleted", "Success", {
            duration: 2000
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  filterClient(value: string) {
    console.log(value);
    this.pageData = {
      pageIndex: 1,
      pageSize: 10,
      previousPageIndex: 0,
      length: 10
    };
    this.clientService
      .getClients(
        this.pageData.pageIndex,
        this.pageData.pageSize,
        value,
        null,
        null
      )
      .then(data => {
        console.log(data);
        this.isResultsLoading = false;
        this.dataSource = data.data.docs;
        this.clientLength = data.data.docs.length;
      })
      .catch(err => {
        console.log(err);
      });
  }

  navigateToClientForm() {
    this.router.navigate(['/dashboard/clients/new']);
  }


  editClient(clientID) {
    this.router.navigate(["/dashboard/clients/" + clientID]);
  }
}