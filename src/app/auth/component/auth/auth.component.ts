import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../service/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { JwtServiceService } from "src/app/shared/service/jwt-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
  userForm: FormGroup;
  title: string = "";
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private jwtTokenService: JwtServiceService,
    private router: Router,
    private tokenService:JwtServiceService
  ) {
    this.initializeUserForm();
    this.title = this.router.url == "/login" ? "Login" : "Signup";
  }

  ngOnInit(): void {}

  get userFormErrors() {
    return this.userForm.controls;
  }

  initializeUserForm() {
    this.userForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  submit() {
    console.log(this.userForm);
    if (this.title === "Login") {
      this.authService.login(this.userForm.value).then(
        data => {
          console.log(data);
          if(data.token) {
          this.jwtTokenService.setToken(data.token);
          this.router.navigate(["/dashboard/invoices"]);
          } else {
            this.tokenService.destroyToken();
            this.router.navigate(["/login"]);
          }
        },
        (err: HttpErrorResponse) => {
          this.router.navigate(["/login"]);
          console.log(err);
        }
      );
    } else {
      this.authService.signup(this.userForm.value).then(
        data => {
          console.log(data);
          this.router.navigate(["/login"]);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );

    }
  }

  resetForm() {
    this.userForm.reset();
    this.initializeUserForm();
  }

  googleAuthenticationHandleRequest() {
    this.authService.googleAuthentication().then(data=>{
      console.log(data);
    }).catch(err=>{
      console.log(err);
    })
  }

  githubAuthenticationHandleRequest() {
    this.authService.githubAuthentication().then(data=>{
      console.log(data);
    }).catch(err=>{
      console.log(err);
    })
  }

  forgotPasswordHandler() {
    this.router.navigate(['/forgot-password']);
  }
}
