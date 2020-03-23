import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { JwtServiceService } from "./jwt-service.service";
import { AuthService } from "src/app/auth/service/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(
    private jwtService: JwtServiceService,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.jwtService.getToken()) {
      return true;
    }

    const token = route.queryParamMap.get("token");
    // const resetToken = route.queryParamMap.get("tok")
    console.log(token);
    // if(resetToken) {
    //   this.router.navigate(["/reset-password/" + token]);
    // }
    if (token) {
      // this.jwtService.setToken(token);
      // this.router.navigate(["/dashboard/invoices"]);
      this.authService.isAuthenticated(token).then(data => {
        console.log(data);
        if (data.message === "authenticated") {
          this.jwtService.setToken(token);
          this.router.navigate(["/dashboad/invoices"]);
          return true;
        } else {
          this.router.navigate(["/login"]);
          return false;
        }
      });
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }
}
