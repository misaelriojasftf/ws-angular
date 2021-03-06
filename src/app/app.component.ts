import { Component } from '@angular/core';
import { ChatService } from './chat.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ChatService]
})
export class AppComponent {
  msgInput : string;
  loginInput : string;
  isLogin : boolean;
  msgs = [];
  writting: boolean;

  constructor(private chatService : ChatService) {}

  ngOnInit() {
    this.chatService
    .getMessage()
    .subscribe(msg => {
      this.msgs.push({type:2,msg:msg})
      if(this.msgs.length>7){
        setTimeout(()=>this.msgs.pop(),3000)
      }
    });

    this.chatService
    .getWritting()
    .subscribe(state => {
      this.writting=state

    });
  }

  sendMsg(){
    if(this.msgInput!=""){
      this.msgs.push({type:1,msg:this.msgInput})
      this.chatService.sendMessage('message',this.msgInput);
      this.msgInput="";
    }
  }

  login(){
    if(this.msgInput!=""){
      this.chatService.sendMessage('login',this.loginInput);
      this.msgs.push({type:2,msg:"Bienvenido a ZapWhat, "+this.loginInput})
      this.isLogin=true;
    }
  }
}
