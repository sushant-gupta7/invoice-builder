import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  headers = {
    "Content-Type": "application/json;charset=utf-8",
    "Accept": "application/json",
    "Authorization":  `bearer ${localStorage.getItem('token')}`
  };
  BASE_URL = "https://chat-app-proj.herokuapp.com/api/clients";

  constructor() { }

  getClients(page = 1, perPage = 10, filter ,sortField, sortDir) {
    if (sortField && sortDir) {
      var apiQueryParams =
        this.BASE_URL +
        "?page=" +
        page +
        "&perPage=" +
        perPage +
        "&sortField=" +
        sortField +
        "&sortDir=" +
        sortDir;
    } else {
      var apiQueryParams =
        this.BASE_URL +
         "?page=" +
          page + 
          "&perPage=" + 
          perPage;
    }
    if (filter) {
      var apiQueryParams =
        this.BASE_URL +
        "?page=" +
        page +
        "&perPage=" +
        perPage +
        "&filter=" +
        filter
    } else {
      var apiQueryParams =
        this.BASE_URL +
         "?page=" +
          page + 
          "&perPage=" + 
          perPage;
    }
    return fetch(apiQueryParams, {
      method: "GET",
      headers: this.headers
    }).then(data => {
      return data.json();
    });
  }

  addClient(client) {
    return fetch(this.BASE_URL, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(client)
    }).then(data => {
      return data.json();
    });
  }

  deleteClient(clientID) {
    return fetch(this.BASE_URL + "/" + "delete/" + clientID, {
      method: "DELETE",
      headers: this.headers
    }).then(data => {
      return data.json();
    });
  }

  getClientByID(clientID) {
    return fetch(this.BASE_URL + "/" + clientID, {
      method: "GET",
      headers: this.headers
    }).then(data => {
      return data.json();
    });
  }

  updateClient(clientID, clientObject) {
    return fetch(this.BASE_URL + "/update/" + clientID, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(clientObject)
    }).then(data => {
      return data.json();
    });
  }

  getAllClients() {

    return fetch(this.BASE_URL + "/all", {
      method: "GET",
      headers: this.headers
    }).then(data => {
      return data.json();
    });
  }
}
