// Update imports
import { Component, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatServiceService } from '../../services/chat.service.service';
import { ChatComponent, ChatMessage } from '../../components/chat/chat.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChatComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  user_first_name = signal("John");

  // Libraries of questions and answers
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
    return this.qLib.slice(0, 3);
  }

  get mostUsedQs() {
    return this.qLib.slice(3, 6);
  }

  constructor(private chatService: ChatServiceService) { }

  // Reference to the chat component
  @ViewChild(ChatComponent) chatComponent?: ChatComponent;

  /**
   * Handle when a message is sent from the chat component
   */
  onMessageSent(message: string): void {
    // Call the chat service
    this.chatComponent?.addThinkingMessage();
    this.chatService.send(message).subscribe({
      next: (response) => {
        // Process the response
        console.log('Chat response:', response);
        const processedResponse = this.chatService.processResponse(response);

        if (processedResponse.isGraph) {
          // Add a graph response
          this.chatComponent?.addBotMessage({
            message: processedResponse.summary || 'Here is a graph based on your query:',
            isGraph: true,
            graphData: processedResponse.graphData,
            graphType: processedResponse.graphType,
            xAxis: processedResponse.xAxis,
            yAxis: processedResponse.yAxis
          });
        } else {
          // Add a text response
          this.chatComponent?.addBotMessage(
            processedResponse.message || 'No response received'
          );
        }
      },
      error: (err) => {
        console.error('Error sending chat message:', err);
        this.chatComponent?.addBotMessage(
          'Sorry, I encountered an error processing your request.'
        );
      }
    });
  }

  /**
   * Handle when a predefined query is clicked
   */
  onQueryClick(query: string): void {
    if (this.chatComponent) {
      // Add the query as a user message
      this.chatComponent.addUserMessage(query);

      // Process the query
      this.onMessageSent(query);
    }
  }
}
