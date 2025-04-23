import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DataTableComponent } from './components/data-table/data-table.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'events', component: DataTableComponent },
    // Add placeholder routes for the not-yet-implemented pages
    { path: 'user', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'billing', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'reports', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'support', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' } // Wildcard route for 404
];
