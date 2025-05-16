import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

interface ChatResponse {
  message: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  constructor(private apiService: ApiService) { }

  /**
   * Send a chat query to the backend
   * @param query The user's chat query
   * @returns Observable of the chat response
   */
  send(query: string): Observable<ChatResponse> {
    // Validate the query
    if (!query || query.trim() === '') {
      throw new Error('Query cannot be empty');
    }

    // Get auth headers
    const headers = this.apiService.createAuthHeaders();

    // Use ApiService's generic get method
    return this.apiService.get<ChatResponse>('/chat/send', {
      headers,
      params: { query }
    });
  }
}
