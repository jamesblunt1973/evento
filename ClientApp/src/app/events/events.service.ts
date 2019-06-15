import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { IEvent } from './models/event.model';
import { environment } from '../../environments/environment';
import { IEventSummury } from '../shared/models/eventSummury';

@Injectable()
export class EventsService {

  private BASE_URL = environment.apiUrl + 'event';
  private CACHE_SIZE = 1;
  private userEventsCache$: Observable<IEventSummury[]>;

  constructor(private http: HttpClient) { }

  newEvent(event: IEvent) {
    const url = `${this.BASE_URL}/newEvent`;
    return this.http.post<number>(url, event);
  }

  getEvent(id: number) {
    const url = `${this.BASE_URL}/getEvent/${id}`;
    return this.http.get<IEvent>(url);
  }

  getUserEvents() { // get events for authenticated user
    // chache events with shareReplay operator
    if (!this.userEventsCache$) {
      this.userEventsCache$ = this.requestUserEvents().pipe(
        shareReplay(this.CACHE_SIZE)
      );
    }

    return this.userEventsCache$;
  }

  private requestUserEvents() {
    const url = `${this.BASE_URL}/getUserEvents`;
    return this.http.get<IEventSummury[]>(url);
  }
}
