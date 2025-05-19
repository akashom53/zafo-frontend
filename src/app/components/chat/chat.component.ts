import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, signal, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from '../graph/graph.component';
import { MarkdownModule } from 'ngx-markdown';

export interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
  isGraph?: boolean;
  graphData?: any[];
  graphType?: string;
  xAxis?: string;
  yAxis?: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, GraphComponent, MarkdownModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements AfterViewInit {
  // Input properties to customize the chat
  @Input() placeholder: string = 'Type a message...';
  @Input() botName: string = 'Bot';
  @Input() userSenderName: string = 'self';
  @Input() botSenderName: string = 'bot';
  @Input() showHeader: boolean = false;
  @Input() headerTitle: string = 'Chat';

  // Output events
  @Output() messageSent = new EventEmitter<string>();

  // State
  messages = signal<ChatMessage[]>([]);

  // DOM references
  @ViewChild('chatContainer') chatContainer?: ElementRef;
  @ViewChild('chatInput') chatInput?: ElementRef<HTMLTextAreaElement>;

  /**
   * Add a user message to the chat
   * @param message The message text
   */
  addUserMessage(message: string): void {
    if (!message || message.trim() === '') {
      return;
    }

    this.messages.update(msgs => [
      ...msgs,
      {
        sender: this.userSenderName,
        message: message.trim(),
        timestamp: new Date().toLocaleString()
      }
    ]);

    // Clear input after sending
    if (this.chatInput) {
      this.chatInput.nativeElement.value = '';
    }

    // Scroll to bottom
    setTimeout(() => this.scrollToBottom(), 20);
  }

  /**
   * Add a bot message to the chat
   * @param message The message text or object
   */
  addBotMessage(message: string | Partial<ChatMessage>): void {
    let botMessage: ChatMessage;

    if (typeof message === 'string') {
      botMessage = {
        sender: this.botSenderName,
        message: message,
        timestamp: new Date().toLocaleString()
      };
    } else {
      botMessage = {
        sender: this.botSenderName,
        message: message.message || '',
        timestamp: new Date().toLocaleString(),
        isGraph: message.isGraph,
        graphData: message.graphData,
        graphType: message.graphType,
        xAxis: message.xAxis,
        yAxis: message.yAxis
      };
    }

    this.messages.update(msgs => [...msgs, botMessage]);

    // Scroll to bottom
    setTimeout(() => this.scrollToBottom(), 20);
  }

  /**
   * Add a thinking message and return a function to replace it
   * @returns Function to replace the thinking message
   */
  addThinkingMessage(): () => void {
    const thinkingMessage: ChatMessage = {
      sender: this.botSenderName,
      message: 'Thinking...',
      timestamp: new Date().toLocaleString()
    };

    this.messages.update(msgs => [...msgs, thinkingMessage]);

    // Scroll to bottom
    setTimeout(() => this.scrollToBottom(), 20);

    // Return a function to replace the thinking message
    return () => {
      this.messages.update(msgs => {
        const newMsgs = [...msgs];
        newMsgs.pop(); // Remove the thinking message
        return newMsgs;
      });
    };
  }

  /**
   * Clear all messages in the chat
   */
  clearMessages(): void {
    this.messages.set([]);
  }

  /**
   * Adjust the height of the textarea based on its content
   */
  adjustTextareaHeight(): void {
    if (!this.chatInput) return;

    const textarea = this.chatInput.nativeElement;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = '24px'; // Reset to single line height

    // Set the height to match the content (with min and max constraints)
    const newHeight = Math.max(24, Math.min(textarea.scrollHeight, 120));
    textarea.style.height = `${newHeight}px`;
  }

  /**
   * Handle send button click
   */
  onSend(): void {
    if (!this.chatInput) return;

    const message = this.chatInput.nativeElement.value.trim();
    if (!message) return;

    // Add user message to chat
    this.addUserMessage(message);

    // Emit the message for parent component to handle
    this.messageSent.emit(message);

    // Reset textarea height after sending
    this.chatInput.nativeElement.style.height = '40px';
  }

  /**
   * Scroll the chat container to the bottom
   */
  scrollToBottom(): void {
    if (!this.chatContainer) return;

    const element = this.chatContainer.nativeElement;
    element.scrollTop = element.scrollHeight;
  }

  ngAfterViewInit(): void {
    // Initialize textarea height
    setTimeout(() => this.adjustTextareaHeight(), 0);
  }
}
