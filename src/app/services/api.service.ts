import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**
   * Get all events from the backend
   * @returns Observable of Event array
   */
  getEvents(): Observable<Event[]> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Event[]>(`${this.baseUrl}/events/`, { headers });
  }

  /**
   * Get the authentication token from localStorage
   * @returns The auth token or empty string if not found
   */
  private getAuthToken(): string {
    // return localStorage.getItem('authToken') || '';
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwidXNlcm5hbWUiOiJpbml0IiwiX2lkIjoiaW5pdCIsIl9fdiI6ImluaXQifSwic3RhdGVzIjp7InJlcXVpcmUiOnt9LCJpbml0Ijp7Il9pZCI6dHJ1ZSwidXNlcm5hbWUiOnRydWUsImVtYWlsIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiX192Ijp0cnVlfX19LCJza2lwSWQiOnRydWV9LCIkaXNOZXciOmZhbHNlLCJfZG9jIjp7Il9pZCI6IjY4MDI0YzA4Y2UyMDdiOGJjNzBkZmE3NiIsInVzZXJuYW1lIjoiYWtraSIsImVtYWlsIjoiYWthc2hAZW1haWwuY29tIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsIl9fdiI6MH0sInBhc3N3b3JkIjoiIiwiaWF0IjoxNzQ1NDA0OTk4LCJleHAiOjE3NDU0MDg1OTh9._ZlgCGnY9Go9vq4mLZXavhdSwGWfWno9sUWOUXEw__4"
  }
}