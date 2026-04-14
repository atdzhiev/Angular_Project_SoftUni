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
  currentImage = 0;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.eventService.getOne(id).subscribe(ev => {
      this.event.set(ev);

      const user = this.authService.user();

      if (user && ev._ownerId === user._id) {
        this.isOwner.set(true);
      }
    });
  }

  prevImage() {
    const imgs = this.event()?.images;
    if (!imgs) return;
    this.currentImage = (this.currentImage - 1 + imgs.length) % imgs.length;
  }

  nextImage() {
    const imgs = this.event()?.images;
    if (!imgs) return;
    this.currentImage = (this.currentImage + 1) % imgs.length;
  }

  deleteEvent() {
    const id = this.event()?._id;
    if (!id) return;

    this.eventService.delete(id).subscribe(() => {
      this.router.navigate(['/catalog']);
    });
  }
}
