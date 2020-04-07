import { Component, OnInit } from "@angular/core";
import { ChatService } from "../service/chat.service";

@Component({
  selector: "app-chat-component",
  templateUrl: "./chat-component.component.html",
  styleUrls: ["./chat-component.component.scss"]
})
export class ChatComponentComponent implements OnInit {
  message: string;
  user: string;
  room: string;
  messages: any[] = [];

  constructor(private chatService: ChatService) {
    this.getUsersJoined();
    this.getAllMessages();
    this.getUsersLeaving();
  }

  ngOnInit() {}

  getUsersJoined() {
    this.chatService.newUserJoined().subscribe(data=>{
      this.messages.push(data);
    })
  }

  getUsersLeaving() {
    this.chatService.userLeftRoom().subscribe(data=>{
      this.messages.push(data);
    })
  }

  getAllMessages() {
    this.chatService.newMessageRecieved().subscribe(data => {
      this.messages.push(data);
    });
  }

  sendMessage() {
    this.chatService.sendMessage({user:this.user,room:this.room,message:this.message});
    this.message = "";
  }

  join() {
    this.chatService.joinRoom({user:this.user,room:this.room});
  }

  leave() {
    this.chatService.leaveRoom({user:this.user,room:this.room});
  }
}
