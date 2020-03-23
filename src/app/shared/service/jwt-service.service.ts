import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {

  constructor() { }

  setToken(token) {
    localStorage.setItem('token',token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  destroyToken() {
    localStorage.removeItem('token');
  }

}
