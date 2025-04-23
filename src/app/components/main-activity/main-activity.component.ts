import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DrawerStateService } from '../../services/drawer-state.service';


@Component({
  selector: 'app-main-activity',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './main-activity.component.html',
  styleUrl: './main-activity.component.scss'
})
export class MainActivityComponent {
  constructor(public drawerStateService: DrawerStateService) { }
}