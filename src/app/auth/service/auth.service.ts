import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  headers = new HttpHeaders({
    "Content-Type": "application/json"
  });
  BASE_URL = "http://localhost:3000/api/users";
  GOOGLE_URL = "http://localhost:3000/api/auth/google";
  GITHUB_URL = "http://localhost:3000/api/auth/github";
  AUTHENTICATE_URL = "http://localhost:3000/api/auth/authenticate";
  LOGOUT_URL = "http://localhost:3000/api/auth/logout";
  FORGOT_PASSWORD_URL = "http://localhost:3000/api/users/forgot-password";
  RESET_PASSWORD_URL = "http://localhost:3000/api/users/reset-password";
  constructor() {}

  login(loginObject) {
    return fetch(this.BASE_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(loginObject)
    }).then(data => {
      return data.json();
    });
  }

  signup(signbject) {
    return fetch(this.BASE_URL + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(signbject)
    }).then(data => {
      return data.json();
    });
  }

  googleAuthentication() {
    return fetch(this.GOOGLE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    }).then(data => {
      return data.json();
    });
  }

  githubAuthentication() {
    return fetch(this.GITHUB_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    }).then(data => {
      return data.json();
    });
  }

  isAuthenticated(token) {
    return fetch(this.AUTHENTICATE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
        "Authorization": `bearer ${token}`
      }
    }).then(data => {
      return data.json();
    });
  }

  logout() {
    return fetch(this.LOGOUT_URL, {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
        "Authorization":`bearer ${localStorage.getItem('token')}`
      }
    }).then(data => {
      return data.json();
    });

  }

  forgotPassword(forgotPasswordObject) {
    console.log(forgotPasswordObject);
    return fetch(this.FORGOT_PASSWORD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(forgotPasswordObject)
    }).then(data => {
      return data.json();
    });

  }

  resetPassword(resetPasswordObject) {
    console.log(resetPasswordObject);
    return fetch(this.RESET_PASSWORD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resetPasswordObject)
    }).then(data => {
      return data.json();
    });

  }
}
