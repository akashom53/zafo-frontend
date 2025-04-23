import { Component } from '@angular/core';
import { DrawerItemComponent } from "../drawer-item/drawer-item.component";
import { DrawerUserItemComponent } from "../drawer-user-item/drawer-user-item.component";
import { DrawerStateService } from "../../services/drawer-state.service";

@Component({
  selector: 'app-left-drawer',
  imports: [DrawerItemComponent, DrawerUserItemComponent],
  templateUrl: './left-drawer.component.html',
  styleUrl: './left-drawer.component.scss',
})
export class LeftDrawerComponent {
  constructor(private drawerStateService: DrawerStateService) {}

  get items() {
    return this.drawerStateService.items;
  }

  onDrawerItemClick(clickedItem: any): void {
    this.drawerStateService.setActiveItem(clickedItem.title);
  }
}
