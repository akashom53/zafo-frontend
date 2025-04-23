import { Injectable, signal, computed } from '@angular/core';
import { Observable } from 'rxjs';

export interface DrawerItem {
  title: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DrawerStateService {
  private itemsSignal = signal<DrawerItem[]>([
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
  ]);

  items = this.itemsSignal.asReadonly();
  
  activeItem = computed(() => {
    return this.itemsSignal().find(item => item.isActive);
  });

  setActiveItem(title: string): void {
    const updatedItems = this.itemsSignal().map(item => ({
      ...item,
      isActive: item.title === title
    }));
    
    this.itemsSignal.set(updatedItems);
  }
}