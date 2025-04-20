import { Component, computed, Input, signal } from '@angular/core';

@Component({
  selector: 'app-drawer-item',
  imports: [],
  templateUrl: './drawer-item.component.html',
  styleUrl: './drawer-item.component.scss'
})
export class DrawerItemComponent {

  @Input()
  item = {
    title: "Dashboard",
    isActive: false,
  }

  iconImg = computed(() => {
    console.log(this.item)
    if (this.item.isActive) {
      return `assets/img/${this.item.title.toLowerCase()}_selected.png`
    }
    return `assets/img/${this.item.title.toLowerCase()}.png`
  })

  activeClass = computed(() => {
    return this.item.isActive ? "active" : ""
  })
}
