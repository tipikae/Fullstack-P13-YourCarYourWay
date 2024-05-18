import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputMessage } from '../../model/inputMessage.model';
import { OutputMessage } from '../../model/outputMessage.model';
import { ConversationItem } from '../../model/conversationItem.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ChatService } from '../../service/chat.service';

/**
 * Chat component with conversation and form.
 */
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {

  private userId!: string;

  conversation: ConversationItem[] = [];
  chatForm = this.formBuilder.group({
    text: ['', [Validators.required, Validators.minLength(1)]]
  });

  constructor(private formBuilder: FormBuilder,
              private chatService: ChatService) {}

  /**
   * Called when component is created.
   */
  ngOnInit(): void {
    this.userId = this.chatService.connect(this.showMessageInput.bind(this));
  }

  /**
   * Called when component is destroyed.
   */
  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  /**
   * Show message in conversation.
   * @param message Message to show.
   */
  showMessageInput(message: InputMessage): void {
    let conversationItem = new ConversationItem();
    conversationItem.message = message.from + ': ' + message.text;
    this.conversation.push(conversationItem);
  }

  /**
   * Send a message.
   */
  send(): void {
    let outputMessage = new OutputMessage();
    outputMessage.from = this.userId;
    outputMessage.text = this.chatForm.controls.text.value;

    this.chatService.send(outputMessage);

    this.chatForm.controls.text.reset();
  }
}

