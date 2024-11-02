import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {AuthInterface, MessageInterface} from "./chatInterface";
import {FormsModule} from "@angular/forms";
import {WSService} from "../services/websocket.service";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  authService: AuthService = inject(AuthService);
  private token = inject(CookieService).get("token")
  http = inject(HttpClient)
  private wss = inject(WSService)

  username: string = ""
  public value: string | null = ""
  public messages:MessageInterface[] = []

  @ViewChild("chat") chat: ElementRef | undefined;

  constructor() {
    this.http.post<AuthInterface>(environment.apiUrl + "auth", {}, {headers: {Authorization: this.token}})
      .subscribe(
        data => {
          this.username = data.username
          this.messages = data.messages

          this.wss.getMessages()
            .subscribe(
              data => {
                this.messages = [...this.messages, data]
                setTimeout(() => {
                  this.chat?.nativeElement.scrollTo({
                    top: this.chat?.nativeElement.scrollHeight,
                    behavior: "smooth"
                  });
                },100)

              },
              error => console.log(error)
            )
        },
        error => {
          this.authService.logout()
        }
      )
  }

  ngOnDestroy() {
    this.wss.close();
  }

  checkEnter(e: KeyboardEvent) {
    if (e.code === "Enter") {
      this.sendMessage()
    }
  }


  sendMessage() {
    if (!this.value) return
    this.wss.sendMessage({author:this.username, message: this.value})
    this.value = null
  }

  protected readonly Number = Number;
}

