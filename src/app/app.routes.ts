import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'events',
    component: DataTableComponent,
    canActivate: [authGuard]
  },
  {
    path: 'user',
    component: PlaceholderComponent,
    data: { title: 'User' },
    canActivate: [authGuard]
  },
  {
    path: 'billing',
    component: PlaceholderComponent,
    data: { title: 'Billing' },
    canActivate: [authGuard]
  },
  {
    path: 'reports',
    component: PlaceholderComponent,
    data: { title: 'Reports' },
    canActivate: [authGuard]
  },
  {
    path: 'support',
    component: PlaceholderComponent,
    data: { title: 'Support' },
    canActivate: [authGuard]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
