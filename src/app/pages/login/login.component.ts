import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService) { }

  onLogin(): void {
    this.loading = true;
    this.error = '';

    try {
      this.authService.login(this.email, this.password);
      // The auth service handles navigation on success
    } catch (err) {
      console.error('Login failed:', err);
      this.error = 'Invalid email or password';
      this.loading = false;
    }
  }
}
