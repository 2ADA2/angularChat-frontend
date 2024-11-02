import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import {map, Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WSService {
  private socket: any;

  constructor() {
    this.connect();
  }

  private connect() {
    this.socket = new WebSocketSubject(environment.ws);
  }

  public sendMessage(msg: any) {
    this.socket.next(msg);
  }

  public getMessages(): Observable<any> {
    return this.socket.asObservable();
  }

  public close() {
    this.socket.complete();
  }
}
