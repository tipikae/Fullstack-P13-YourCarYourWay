import { Component, OnDestroy, OnInit } from '@angular/core';
import { Client, StompSubscription } from '@stomp/stompjs';
import { InputMessage } from '../../model/inputMessage.model';
import { OutputMessage } from '../../model/outputMessage.model';
import { ConversationItem } from '../../model/conversationItem.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {

  private subscription!: StompSubscription;
  private stompClient = new Client({
    brokerURL: 'ws://localhost:8080/chat',
    onConnect: (frame) => {
      console.log('Connected: ' + frame);
      this.subscription = this.stompClient.subscribe('/topic/support', (message) => {
        this.showMessageInput(JSON.parse(message.body));
      }
    )}
  });
  conversation: ConversationItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.stompClient.activate();
  }

  ngOnDestroy(): void {
    this.stompClient.unsubscribe(this.subscription.id);
  }

  showMessageInput(message: InputMessage): void {
    let conversationItem = new ConversationItem();
    conversationItem.message = message.from + ': ' + message.text;
    this.conversation.push(conversationItem);
  }

  send(): void {
    console.log('id: ' + this.subscription.id);
    let outputMessage = new OutputMessage();
    let message = document.getElementById('text') as HTMLInputElement;
    outputMessage.from = this.subscription.id;
    outputMessage.text = message.value;

    this.stompClient.publish({
      destination: "/app/support",
      body: JSON.stringify(outputMessage)
    });
  }
}

