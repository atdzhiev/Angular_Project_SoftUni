import { Component,inject,signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventItem } from '../../shared/interfaces/event';



@Component({
  selector: 'app-event-details',
  imports: [],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails {
  private route = inject(ActivatedRoute);

  event = signal<any>(null);
  currentImage = 0;

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      
      const mockEvent = {
        id,
        title: 'Rock Concert',
        town: 'Sofia',
        address: 'Arena Armeec',
        price: '25 BGN',
        images: [
          'assets/img/our_blog/blog-img1.jpg',
          'assets/img/service/1.png',
          'assets/img/service/2.png'
        ],
        date: '2026-05-12 20:00',
        description: 'A great rock concert with top bands performing live.'
      };

      this.event.set(mockEvent);
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
}

