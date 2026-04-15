import { Component, inject, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { EventService } from '../../core/services/event';
import { EventItem } from '../../shared/interfaces/event';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

  private auth = inject(AuthService);
  private eventService = inject(EventService);
  private router = inject(Router);

  user = computed(() => this.auth.user());

  myEvents = signal<EventItem[]>([]);
  joinedEvents = signal<EventItem[]>([]);

  constructor() {

    effect(() => {
      const u = this.user();
      if (u) {
        this.loadEvents(u._id);
      }
    });

    
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        const u = this.user();
        if (u && this.router.url.startsWith('/profile')) {
          this.loadEvents(u._id);
        }
      });
  }

  loadEvents(userId: string) {
    this.eventService.getAll().subscribe(events => {

     
      this.myEvents.set(
        events.filter(ev =>
          ev._ownerId && ev._ownerId._id === userId
        )
      );

  
      this.joinedEvents.set(
        events.filter(ev =>
          ev.participants?.some((p: any) => p._id === userId)
        )
      );
    });
  }

 
  goToEvent(id: string) {
    this.router.navigate(['/events', id]);
  }

  editEvent(id: string) {
    this.router.navigate(['/edit', id]);
  }

  deleteEvent(id: string) {
    if (!confirm('Are you sure you want to delete this event?')) return;

    this.eventService.delete(id).subscribe(() => {
      const u = this.user();
      if (u) this.loadEvents(u._id);
    });
  }

  
  leaveEvent(id: string) {
    const u = this.user();
    if (!u) return;

    this.eventService.leaveEvent(id).subscribe(() => {
      this.loadEvents(u._id);
    });
  }
}
