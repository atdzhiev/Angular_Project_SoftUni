import { Component, signal, computed, inject } from '@angular/core';
import { EventCardComponent } from '../../shared/components/event-card/event-card';
import { EventService } from '../../core/services/event';
import { CatalogUtilsService } from '../../core/services/catalog-utils.service';
import { EventItem } from '../../shared/interfaces/event';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalog',
  imports: [EventCardComponent],
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.css']
})
export class CatalogComponent {

  private eventService = inject(EventService);
  private utils = inject(CatalogUtilsService);
  private route = inject(ActivatedRoute);

  events = signal<EventItem[]>([]);
  searchText = signal('');
  selectedTown = signal('');
  selectedCategory = signal('');
  selectedDate = signal('');
  priceSort = signal('');
  dateSort = signal('');

  currentPage = signal(1);
  itemsPerPage = 12;

  pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  constructor() {
    this.route.queryParams.subscribe(params => {
      this.searchText.set(params['q'] || '');
      this.selectedTown.set(params['town'] || '');
      this.currentPage.set(1);
    });
    this.eventService.getAll().subscribe(data => this.events.set(data));
  }

  applyTownFilter(v: string) { this.selectedTown.set(v); this.currentPage.set(1); }
  applyCategoryFilter(v: string) { this.selectedCategory.set(v); this.currentPage.set(1); }
  applyDateFilter(v: string) { this.selectedDate.set(v); this.currentPage.set(1); }
  applyPriceSort(v: string) { this.priceSort.set(v); this.currentPage.set(1); }
  applyDateSort(v: string) { this.dateSort.set(v); this.currentPage.set(1); }

  clearFilters() {
    this.searchText.set('');
    this.selectedTown.set('');
    this.selectedCategory.set('');
    this.selectedDate.set('');
    this.priceSort.set('');
    this.dateSort.set('');
    this.currentPage.set(1);
  }

  filteredEvents = computed(() => {
    let list = this.events();

    if (this.searchText()) {
      const keyword = this.searchText().toLowerCase();
      list = list.filter(e =>
        e.title.toLowerCase().includes(keyword)
      );
    }

    list = this.utils.filterEvents(
      list,
      this.selectedTown(),
      this.selectedCategory(),
      this.selectedDate()
    );

    list = this.utils.sortEvents(
      list,
      this.priceSort(),
      this.dateSort()
    );

    return list;
  });

  totalPages = computed(() =>
    Math.ceil(this.filteredEvents().length / this.itemsPerPage)
  );

  paginatedEvents = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.filteredEvents().slice(start, start + this.itemsPerPage);
  });

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }
}
