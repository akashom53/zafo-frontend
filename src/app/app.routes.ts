import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'events', component: DataTableComponent },
  { path: 'user', component: PlaceholderComponent, data: { title: 'User' } },
  { path: 'billing', component: PlaceholderComponent, data: { title: 'Billing' } },
  { path: 'reports', component: PlaceholderComponent, data: { title: 'Reports' } },
  { path: 'support', component: PlaceholderComponent, data: { title: 'Support' } },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
