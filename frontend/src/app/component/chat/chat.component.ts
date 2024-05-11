import { Component, OnDestroy, OnInit } from '@angular/core';
import { Client, StompSubscription } from '@stomp/stompjs';
import { InputMessage } from '../../model/inputMessage.model';
import { OutputMessage } from '../../model/outputMessage.model';
import { formatDate } from '@angular/common';

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

  constructor() {}

  ngOnInit(): void {
    this.stompClient.activate();
  }

  ngOnDestroy(): void {
    this.stompClient.unsubscribe(this.subscription.id);
  }

  showMessageInput(message: InputMessage): void {
    this.addMessageToConversation(message.from, message.text, message.time);
  }

  showMessageOutput(message: OutputMessage): void {
    let time = formatDate(Date.now(), 'HH:mm', 'fr-FR');
    this.addMessageToConversation(message.from, message.text, time);
  }

  addMessageToConversation(from: string, text: string, time: string): void {
    var response = document.getElementById('response');
    var p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.appendChild(document.createTextNode(from + " (" + time + ")" + ": " + text));
    response?.appendChild(p);
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

    this.showMessageOutput(outputMessage);
  }
}

