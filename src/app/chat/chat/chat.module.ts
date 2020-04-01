import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponentComponent } from '../chat-component/chat-component.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ChatService } from '../service/chat.service';



@NgModule({
  declarations: [ChatComponentComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers:[ChatService]
})
export class ChatModule { }
