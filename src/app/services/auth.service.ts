import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

export interface User {
    email: string;
    username?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticatedSignal = signal<boolean>(this.checkInitialAuthState());
    private currentUserSignal = signal<User | null>(null);

    // Public readable signals
    isAuthenticated = this.isAuthenticatedSignal.asReadonly();
    currentUser = this.currentUserSignal.asReadonly();

    constructor(
        private apiService: ApiService,
        private router: Router
    ) {
        // Initialize user data if token exists
        this.loadUserData();
    }

    login(email: string, password: string) {
        return this.apiService.login(email, password).subscribe({
            next: (response) => {

                // Token is saved by the API service
                this.isAuthenticatedSignal.set(true);

                // Set basic user info
                this.currentUserSignal.set({ email });

                // Navigate to dashboard
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                this.isAuthenticatedSignal.set(false);
                this.currentUserSignal.set(null);
                throw err; // Re-throw to let components handle the error
            }
        });
    }

    logout() {
        // Clear token
        localStorage.removeItem('auth_token');

        // Update state
        this.isAuthenticatedSignal.set(false);
        this.currentUserSignal.set(null);

        // Navigate to login
        this.router.navigate(['/login']);
    }

    private checkInitialAuthState(): boolean {
        const token = localStorage.getItem('auth_token');
        return !!token; // Convert to boolean
    }

    private loadUserData() {
        if (this.isAuthenticated()) {
            // For now, we'll just set a basic user object
            // In a real app, you might want to fetch user details from an API
            const email = localStorage.getItem('user_email') || '';
            if (email) {
                this.currentUserSignal.set({ email });
            }
        }
    }
}