import { Component, signal, ElementRef, ViewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';


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
    const child = this.divChatContainer?.nativeElement.children[this.divChatContainer?.nativeElement.children.length - 1]
    console.log(child)
    child.scrollIntoView({ behavior: 'smooth' })
  }
}
