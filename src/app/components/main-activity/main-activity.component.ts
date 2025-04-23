import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DrawerStateService } from '../../services/drawer-state.service';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { PlaceholderComponent } from '../placeholder/placeholder.component';


@Component({
  selector: 'app-main-activity',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './main-activity.component.html',
  styleUrl: './main-activity.component.scss'
})
export class MainActivityComponent {
  constructor(public drawerStateService: DrawerStateService) { }
}