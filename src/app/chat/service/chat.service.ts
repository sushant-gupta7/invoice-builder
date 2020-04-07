import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  url = "http://"+window.location.hostname+':5000';
  socket;

  constructor() {
    this.socket = io(this.url);
  }

  joinRoom(data) {
    this.socket.emit('join',data);
  }

  newUserJoined() {
    let observable = new Observable<{user:string,message:string}>(observer=>{
      this.socket.on('new user joined',(data)=>{
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable ;
  }

  leaveRoom(data) {
    this.socket.emit('leave',data);
  }

  userLeftRoom() {
    let observable = new Observable<{user:string,message:string}>(observer=>{
      this.socket.on('left room',(data)=>{
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable ;
  }

  sendMessage(message) {
    this.socket.emit("message", message);
  }

  newMessageRecieved() {
    let observable = new Observable<{user:string,message:string}>(observer=>{
      this.socket.on('new message',(data)=>{
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable ;
  }
}
