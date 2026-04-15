import { Injectable } from '@angular/core';
import { EventItem } from '../../shared/interfaces/event';

@Injectable({ providedIn: 'root' })
export class CatalogUtilsService {

  parseDate(d: string): Date {
    const [day, month, year] = d.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  normalizePrice(price: any): number {
    if (!price) return 0;

    if (typeof price === 'string') {
      const lower = price.toLowerCase().trim();
      if (lower === 'free') return 0;
    }

    const num = Number(price);
    return isNaN(num) ? 0 : num;
  }

  filterEvents(
    events: EventItem[],
    town: string,
    category: string,
    fromDate: string
  ): EventItem[] {
    let list = [...events];

    if (town) list = list.filter(e => e.town === town);
    if (category) list = list.filter(e => e.category === category);

    if (fromDate) {
      const selected = new Date(fromDate).getTime();
      list = list.filter(e => this.parseDate(e.date).getTime() >= selected);
    }

    return list;
  }

  sortEvents(
    events: EventItem[],
    priceSort: string,
    dateSort: string
  ): EventItem[] {
    let list = [...events];

    if (priceSort === 'asc') {
      list.sort((a, b) => this.normalizePrice(a.price) - this.normalizePrice(b.price));
    } else if (priceSort === 'desc') {
      list.sort((a, b) => this.normalizePrice(b.price) - this.normalizePrice(a.price));
    }

    if (dateSort === 'asc') {
      list.sort((a, b) => this.parseDate(a.date).getTime() - this.parseDate(b.date).getTime());
    } else if (dateSort === 'desc') {
      list.sort((a, b) => this.parseDate(b.date).getTime() - this.parseDate(a.date).getTime());
    }

    return list;
  }
}
