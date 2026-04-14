import { Component, signal, inject } from '@angular/core';
import { EventCardComponent } from '../../shared/components/event-card/event-card';
import { EventItem } from '../../shared/interfaces/event';
import { EventService } from '../../core/services/event';


@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [EventCardComponent],
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.css']
})
export class CatalogComponent {

  private eventService = inject(EventService);

  events = signal<EventItem[]>([]);

  constructor() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAll().subscribe({
      next: (data) => this.events.set(data),
      error: (err) => console.error('Failed to load events', err)
    });
  }
}
