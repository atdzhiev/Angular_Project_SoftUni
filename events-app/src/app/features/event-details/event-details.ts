import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventItem } from '../../shared/interfaces/event';
import { EventService } from '../../core/services/event';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private eventService = inject(EventService);
  private authService = inject(AuthService);

  event = signal<EventItem | null>(null);
  isOwner = signal(false);
  joined = signal(false);
  isLoggedIn = signal(false);
  viewerActive = false;
  viewerImage = '';
  showDeleteModal = false;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) return;

      this.loadEvent(id);
    });
  }

  loadEvent(id: string) {
    this.event.set(null);
    this.isOwner.set(false);
    this.joined.set(false);
    this.isLoggedIn.set(false);

    this.eventService.getOne(id).subscribe(ev => {
      this.event.set(ev);

      const user = this.authService.user();
      if (!user) return;

      this.isLoggedIn.set(true);

      if (ev._ownerId && (ev._ownerId as any)._id === user._id) {
        this.isOwner.set(true);
      }

      if (ev.participants?.some((p: any) => p._id === user._id)) {
        this.joined.set(true);
      }
    });
  }

  hasJoined() {
    return this.joined();
  }

  joinEvent() {
    const e = this.event();
    if (!e) return;

    const user = this.authService.user();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.eventService.joinEvent(e._id).subscribe(() => {
      this.loadEvent(e._id);
    });
  }

  leaveEvent() {
    const e = this.event();
    if (!e) return;

    const user = this.authService.user();
    if (!user) return;

    this.eventService.leaveEvent(e._id).subscribe(() => {
      this.loadEvent(e._id);
    });
  }

  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  confirmDelete() {
    const id = this.event()?._id;
    if (!id) return;

    this.eventService.delete(id).subscribe(() => {
      this.router.navigate(['/events']);
    });
  }

  openViewer(img: string) {
    this.viewerImage = img;
    this.viewerActive = true;
  }

  closeViewer() {
    this.viewerActive = false;
  }
}
