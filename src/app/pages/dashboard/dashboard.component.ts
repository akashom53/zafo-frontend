import { Component, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatServiceService } from '../../services/chat.service.service';

interface ChatItem {
  sender: string;
  message: string;
  timestamp: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  user_first_name = signal("John")
  get showItems() { return this.chatItems().length == 0 }
  chatItems = signal<ChatItem[]>([])

  chatIndex = 0;

  @ViewChild('chatContainer', { static: false })
  divChatContainer?: ElementRef;

  @ViewChild('chatInput', { static: false })
  chatInput?: ElementRef<HTMLTextAreaElement>;

  qLib = [
    `Which features have the highest drop-off rate?`,
    `What features are being used the most this week?`,
    `Which accounts are at risk of churning this month?`,
    `Which users became inactive in the last 7 days?`,
    `What are trial users doing before converting?`,
    `Which steps in the signup flow are users dropping off?`
  ]

  aLib = [
    `Users are dropping off most after using "Advanced Filters" and "Bulk Export". 42% start the action but don’t complete it, often within 2 minutes of session start.`,
    `The top 3 most-used features this week are:\n\n- Dashboard Overview – accessed by 68% of active users\n- User Activity Heatmap\n- Custom Reports Generator`,
    `9 accounts show a 40%+ decline in feature usage over the past 3 weeks.\nNotable examples: FinNow, UpGrad Pro, and Trelliq\nThese accounts have not used key features like Reports or Alerts recently.`,
    `128 users have not logged in for over 7 days. Of these, 64 were previously active weekly. 70% belong to companies on the Starter plan.`,
    `76% of converted trial users completed these 3 actions before upgrading:\n\n1. Used Custom Reports\n2. Viewed User Segmentation Dashboard\n3. Exported a PDF Report`,
    `Most drop-offs occur after Step 3 (Company Details).\n48% exit the flow after being asked for team size.\n24% drop off at email verification step, possibly due to delay or friction.`
  ]

  get recentQs() {
    return this.qLib.slice(0, 3)
  }

  get mostUsedQs() {
    return this.qLib.slice(3, 6)
  }

  generateSend(index?: number) {
    return this.qLib[index ?? (this.chatIndex % this.qLib.length)]
  }

  generateRecv(index?: number) {
    let temp = this.chatIndex
    if (!index) {

      this.chatIndex++
    }
    return this.aLib[index ?? (temp % this.qLib.length)]
  }

  onSend(index?: number) {
    this.chatItems.update((items) => [
      ...items,
      {
        sender: 'self',
        message: this.generateSend(index),
        timestamp: new Date().toLocaleString()
      },
      {
        sender: 'zafo',
        message: 'Thinking...',
        timestamp: new Date().toLocaleString()
      }
    ])
    setTimeout(() => {
      this.scrollToBottom()
    }, 20)
    setTimeout(() => {
      this.addReply(index)
    }, 500)
  }

  addReply(index?: number) {
    console.log('reply')
    this.chatItems.update((t) => {
      t.pop()
      t.push({
        sender: 'zafo',
        message: this.generateRecv(index),
        timestamp: new Date().toLocaleString()
      })
      setTimeout(() => {
        this.scrollToBottom()
      }, 20)
      return t
    })
  }

  scrollToBottom() {

    // if (this.divChatContainer && !this.showItems) {
    //   this.divChatContainer.nativeElement.scrollTop = this.divChatContainer.nativeElement.scrollHeight;
    // }

    const child = this.divChatContainer?.nativeElement.children[this.divChatContainer?.nativeElement.children.length - 1]
    console.log(child)
    child.scrollIntoView({ behavior: 'smooth' })
  }

  constructor(private chatService: ChatServiceService) { }

  /**
   * Send a real chat message to the backend API
   * @param message The message to send from the textarea
   */
  onSendReal(message: string): void {
    // Validate the message
    if (!message || message.trim() === '') {
      console.warn('Cannot send empty message');
      return;
    }

    // Add user message to chat
    this.chatItems.update((items) => [
      ...items,
      {
        sender: 'self',
        message: message.trim(),
        timestamp: new Date().toLocaleString()
      },
      {
        sender: 'zafo',
        message: 'Thinking...',
        timestamp: new Date().toLocaleString()
      }
    ]);

    // Clear the input field after sending
    if (this.chatInput) {
      this.chatInput.nativeElement.value = '';
    }

    // Scroll to bottom after adding messages
    setTimeout(() => {
      this.scrollToBottom();
    }, 20);

    // Call the chat service
    this.chatService.send(message.trim()).subscribe({
      next: (response) => {
        // Update the "Thinking..." message with the actual response
        this.chatItems.update((items) => {
          const newItems = [...items];
          // Replace the last item (which is "Thinking...")
          newItems.pop();
          newItems.push({
            sender: 'zafo',
            message: response.message,
            timestamp: response.timestamp || new Date().toLocaleString()
          });
          return newItems;
        });

        // Scroll to bottom after receiving response
        setTimeout(() => {
          this.scrollToBottom();
        }, 20);
      },
      error: (err) => {
        console.error('Error sending chat message:', err);
        // Update the "Thinking..." message with an error
        this.chatItems.update((items) => {
          const newItems = [...items];
          // Replace the last item (which is "Thinking...")
          newItems.pop();
          newItems.push({
            sender: 'zafo',
            message: 'Sorry, I encountered an error processing your request.',
            timestamp: new Date().toLocaleString()
          });
          return newItems;
        });

        // Scroll to bottom after error
        setTimeout(() => {
          this.scrollToBottom();
        }, 20);
      }
    });
  }


}
