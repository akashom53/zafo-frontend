import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-drawer-user-item',
  imports: [],
  templateUrl: './drawer-user-item.component.html',
  styleUrl: './drawer-user-item.component.scss'
})
export class DrawerUserItemComponent {
  userImage = signal("assets/img/dummy_user.png")
}
