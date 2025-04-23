import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../services/api.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent implements OnInit {
  dataSource: Event[] = [];
  headers = ["Date", "Tag", "Group", "User", "Meta Data"];
  loading = true;
  error: string | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.loading = true;
    this.error = null;

    this.apiService.getEvents().subscribe({
      next: (events) => {
        this.dataSource = events;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching events:', err);
        this.error = 'Failed to load events. Please try again later.';
        this.loading = false;
      }
    });
  }

  displayVal(item: any) {
    if ((typeof item) == "object") {
      return JSON.stringify(item);
    }
    return item;
  }

  keys(item: any) {
    return Object.keys(item);
  }

  values(item: any) {
    return Object.values(item);
  }
}
