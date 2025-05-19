import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Event } from '../models/event.model';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

// Generic interface for HTTP options
interface HttpOptions {
  headers?: HttpHeaders;
  params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
  reportProgress?: boolean;
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private baseUrl = 'https://zafo-backend-0f3426d8e515.herokuapp.com';
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**
   * Generic GET method for HTTP requests
   * @param endpoint The API endpoint (without base URL)
   * @param options HTTP options including headers and params
   * @returns Observable of the response
   */
  get<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, options);
  }

  /**
   * Generic POST method for HTTP requests
   * @param endpoint The API endpoint (without base URL)
   * @param body The request body
   * @param options HTTP options including headers and params
   * @returns Observable of the response
   */
  post<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, options);
  }

  /**
   * Generic PUT method for HTTP requests
   * @param endpoint The API endpoint (without base URL)
   * @param body The request body
   * @param options HTTP options including headers and params
   * @returns Observable of the response
   */
  put<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, options);
  }

  /**
   * Generic DELETE method for HTTP requests
   * @param endpoint The API endpoint (without base URL)
   * @param options HTTP options including headers and params
   * @returns Observable of the response
   */
  delete<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, options);
  }

  /**
   * Get the authentication token from localStorage
   */
  getAuthToken(): string {
    return localStorage.getItem('auth_token') || '';
  }

  /**
   * Create HTTP headers with authentication token
   */
  createAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}`
    });
  }

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

    // Use the generic post method
    return this.post<LoginResponse>('/auth/login', loginData)
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
    const headers = this.createAuthHeaders();
    return this.get<Event[]>('/events', { headers });
  }
}