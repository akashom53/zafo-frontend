import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export interface DrawerItem {
  title: string;
  route: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DrawerStateService {
  private itemsSignal = signal<DrawerItem[]>([
    {
      title: "Dashboard",
      route: "/dashboard",
      isActive: true,
    },
    {
      title: "Events",
      route: "/events",
      isActive: false,
    },
    {
      title: "User",
      route: "/user",
      isActive: false,
    },
    {
      title: "Billing",
      route: "/billing",
      isActive: false,
    },
    {
      title: "Reports",
      route: "/reports",
      isActive: false,
    },
    {
      title: "Support",
      route: "/support",
      isActive: false,
    }
  ]);

  items = this.itemsSignal.asReadonly();
  
  activeItem = computed(() => {
    return this.itemsSignal().find(item => item.isActive);
  });

  constructor(private router: Router) {}

  setActiveItem(title: string): void {
    const item = this.itemsSignal().find(item => item.title === title);
    if (item) {
      // Navigate to the corresponding route
      this.router.navigate([item.route]);
      
      // Update the active state
      const updatedItems = this.itemsSignal().map(item => ({
        ...item,
        isActive: item.title === title
      }));
      
      this.itemsSignal.set(updatedItems);
    }
  }
}