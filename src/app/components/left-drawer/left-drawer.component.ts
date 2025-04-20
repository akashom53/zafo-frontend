import { Component, signal } from '@angular/core';
import { DrawerItemComponent } from "../drawer-item/drawer-item.component";
import { DrawerUserItemComponent } from "../drawer-user-item/drawer-user-item.component";

@Component({
  selector: 'app-left-drawer',
  imports: [DrawerItemComponent, DrawerUserItemComponent],
  templateUrl: './left-drawer.component.html',
  styleUrl: './left-drawer.component.scss',
})
export class LeftDrawerComponent {


  items = signal([
    {
      title: "Dashboard",
      isActive: true,
    },
    {
      title: "Events",
      isActive: false,
    },
    {
      title: "User",
      isActive: false,
    },
    {
      title: "Billing",
      isActive: false,
    },
    {
      title: "Reports",
      isActive: false,
    },
    {
      title: "Support",
      isActive: false,
    }
  ])


  onClick(index: number) {
    console.log(index)
  }
}
