import { Component } from '@angular/core';
import { LoginComponent } from "./pages/login/login.component";
import { AuthService } from './services/auth.service';
import { MainActivityComponent } from './components/main-activity/main-activity.component';
import { LeftDrawerComponent } from './components/left-drawer/left-drawer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [MainActivityComponent, LeftDrawerComponent, LoginComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public authService: AuthService) { }

  get isLoggedIn() {
    return this.authService.isAuthenticated();
  }
}
