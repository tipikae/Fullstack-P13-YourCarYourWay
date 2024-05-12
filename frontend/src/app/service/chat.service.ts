import { Injectable } from '@angular/core';
import { Client, StompSubscription } from '@stomp/stompjs';
import { OutputMessage } from '../model/outputMessage.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private subscription!: StompSubscription;
  private stompClient = new Client({
    brokerURL: 'ws://localhost:8080/chat'
  });
  private userId!: string;

  connect(callback: (text: any) => void): string {
    this.userId = this.getRandomId();

    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.subscription = this.stompClient.subscribe(
        '/topic/support', 
        (message) => {
          callback(JSON.parse(message.body));
        }, 
        { id: this.userId }
      )
    };

    this.stompClient.activate();

    return this.userId;
  }

  disconnect(): void {
    this.stompClient.unsubscribe(this.subscription.id);
    this.stompClient.deactivate();
  }

  send(outputMessage: OutputMessage): void {
    this.stompClient.publish({
      destination: "/app/support",
      body: JSON.stringify(outputMessage)
    });
  }

  private getRandomId(): string {
    let min = 1;
    let max = 10000;
    return 'user' + (Math.floor(Math.random() * (max - min + 1)) + min);
  }
}
