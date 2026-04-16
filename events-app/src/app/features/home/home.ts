import { Component, inject,ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule,  } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { EventService } from '../../core/services/event';
import { EventItem } from '../../shared/interfaces/event';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  private eventService = inject(EventService);

  lastThreeEvents: EventItem[] = [];

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    document.body.classList.add('home-active');
    this.eventService.getLastThree().subscribe(events => {
      this.lastThreeEvents = events;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    document.body.classList.remove('home-active');
  }

  search(form: NgForm) {
    const keyword = form.value.searchText || '';
    const town = form.value.town || '';

    this.router.navigate(['/events'], {
      queryParams: {
        q: keyword || null,
        town: town || null
      }
    });
  }
}
