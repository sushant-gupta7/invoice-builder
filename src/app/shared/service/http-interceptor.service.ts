import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtServiceService } from "./jwt-service.service";

@Injectable({
  providedIn: "root"
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private jwtService: JwtServiceService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig = {
      "Content-type": "application/json",
      'Accept': "application/json"
    };
    console.log(req);
    const token = this.jwtService.getToken();
    if (token) {
      headersConfig["Authorization"] = `bearer ${token}`;
      const _req = req.clone({ setHeaders: headersConfig });
      return next.handle(_req);
    } else {
      return next.handle(req);
    }
  }
}
