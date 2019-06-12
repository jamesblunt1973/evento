import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IEvent } from './models/event.model';
import { IEventSummury } from '../shared/models/eventSummury';

@Injectable()
export class EventsService {

  private BASE_URL = environment.apiUrl + 'event';

  constructor(private http: HttpClient) { }

  newEvent(event: IEvent) {
    const url = `${this.BASE_URL}/newevent`;
    return this.http.post<number>(url, event);
  }

  getUserEvents() { // get events for authenticated user
    const url = `${this.BASE_URL}/getuserevents`;
    return this.http.get<IEventSummury[]>(url);
  }

}
