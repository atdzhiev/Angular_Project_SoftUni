import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventItem } from '../../shared/interfaces/event';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EventService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/events`;

  getAll(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(this.baseUrl);
  }

  getOne(id: string): Observable<EventItem> {
    return this.http.get<EventItem>(`${this.baseUrl}/${id}`);
  }

  create(data: EventItem): Observable<EventItem> {
    return this.http.post<EventItem>(this.baseUrl, data);
  }

  update(id: string, data: EventItem): Observable<EventItem> {
    return this.http.put<EventItem>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getLastThree(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(`${this.baseUrl}?limit=3`);
  }

  joinEvent(eventId: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${eventId}/join`,
      {}
    );
  }

  leaveEvent(eventId: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${eventId}/leave`,
      {}
    );
  }


  getByCreator(userId: string): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(
      `${this.baseUrl}?creator=${userId}`,
    );
  }

}

