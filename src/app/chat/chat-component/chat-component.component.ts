import { Component, OnInit } from "@angular/core";
import { ChatService } from "../service/chat.service";

@Component({
  selector: "app-chat-component",
  templateUrl: "./chat-component.component.html",
  styleUrls: ["./chat-component.component.scss"]
})
export class ChatComponentComponent implements OnInit {
  message: string;
  messages: string[] = [];

  constructor(private chatService: ChatService) {
    this.getAllMessages();
  }

  ngOnInit() {}

  getAllMessages() {
    this.chatService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
      console.log(this.messages);
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = "";
  }
}
