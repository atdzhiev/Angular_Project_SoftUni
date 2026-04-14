import { Component, signal } from '@angular/core';
import { EventCardComponent } from '../../shared/components/event-card/event-card';
import { EventItem } from '../../shared/interfaces/event';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [EventCardComponent],
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.css']
})
export class CatalogComponent {

  events = signal<EventItem[]>([
    {
      id: '1',
      title: 'Rock Concert',
      category: 'Music',
      town: 'Sofia',
      address: 'Arena Armeec',
      price: '25 BGN',
      imageUrl: '/assets/img/our_blog/blog-img1.jpg',
      date: '2026-05-12 20:00',
      description: 'A great rock concert with top bands.',
      website: 'https://rockfest.bg',
      phone: '+359 888 123 456'
    },
    {
      id: '1',
      title: 'Rock Concert',
      category: 'Music',
      town: 'Sofia',
      address: 'Arena Armeec',
      price: '25 BGN',
      imageUrl: '/assets/img/our_blog/blog-img1.jpg',
      date: '2026-05-12 20:00',
      description: 'A great rock concert with top bands.',
      website: 'https://rockfest.bg',
      phone: '+359 888 123 456'
    },{
      id: '1',
      title: 'Rock Concert',
      category: 'Music',
      town: 'Sofia',
      address: 'Arena Armeec',
      price: '25 BGN',
      imageUrl: '/assets/img/our_blog/blog-img1.jpg',
      date: '2026-05-12 20:00',
      description: 'A great rock concert with top bands.',
      website: 'https://rockfest.bg',
      phone: '+359 888 123 456'
    }
  ]);

 
}

