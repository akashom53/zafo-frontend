import { Component, computed, Input, signal } from '@angular/core';

@Component({
  selector: 'app-drawer-item',
  imports: [],
  templateUrl: './drawer-item.component.html',
  styleUrl: './drawer-item.component.scss'
})
export class DrawerItemComponent {
  private itemSignal = signal({
    title: "Dashboard",
    isActive: false,
  });

  @Input()
  set item(value: any) {
    this.itemSignal.set(value);
  }
  get item() {
    return this.itemSignal();
  }

  iconImg = computed(() => {
    const item = this.itemSignal();
    if (item.isActive) {
      return `assets/img/${item.title.toLowerCase()}_selected.png`;
    }
    return `assets/img/${item.title.toLowerCase()}.png`;
  });

  activeClass = computed(() => {
    return this.itemSignal().isActive ? "active" : "";
  });
}
