import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Event } from '../models/event.model';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**
   * Login user and save token to localStorage
   * @param username User's email or username
   * @param password User's password
   * @returns Observable of login response
   */
  login(username: string, password: string): Observable<LoginResponse> {
    const loginData: LoginRequest = {
      username,
      password
    };

    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, loginData)
      .pipe(
        tap(response => {
          if (response && response.token) {
            console.log('Token received:', response.token);
            localStorage.setItem('auth_token', response.token);
          }
        })
      );
  }

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
    return localStorage.getItem('auth_token') || '';
  }
}