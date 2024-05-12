import { Component, OnDestroy, OnInit } from '@angular/core';
import { Client, StompSubscription } from '@stomp/stompjs';
import { InputMessage } from '../../model/inputMessage.model';
import { OutputMessage } from '../../model/outputMessage.model';
import { ConversationItem } from '../../model/conversationItem.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
      this.subscription = this.stompClient.subscribe(
        '/topic/support', 
        (message) => {
          this.showMessageInput(JSON.parse(message.body));
        }, 
        { id: this.getRandomId() }
    )}
  });
  conversation: ConversationItem[] = [];
  chatForm = this.formBuilder.group({
    text: ['', [Validators.required, Validators.minLength(1)]]
  });

  constructor(private formBuilder: FormBuilder) {}

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
    let outputMessage = new OutputMessage();
    outputMessage.from = this.subscription.id;
    outputMessage.text = this.chatForm.controls.text.value;

    this.stompClient.publish({
      destination: "/app/support",
      body: JSON.stringify(outputMessage)
    });

    this.chatForm.controls.text.reset();
  }

  private getRandomId(): string {
    let min = 1;
    let max = 10000;
    return 'user' + (Math.floor(Math.random() * (max - min + 1)) + min);
  }
}

