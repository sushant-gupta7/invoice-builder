import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { JwtServiceService } from "src/app/shared/service/jwt-service.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/service/auth.service";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<any>();
  constructor(
    private jwtService: JwtServiceService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  clickMe() {
    this.toggleSidenav.emit();
  }

  logout() {
    this.authService.logout().then(
      data => {
        if (data.message == "Logout Successful") {
          this.jwtService.destroyToken();
          this.router.navigate(["/login"]);
        }
      },
      err => {
        console.log(err);
      }
    );
    // this.jwtService.destroyToken();
    // this.router.navigate(["/login"]);
  }
}
