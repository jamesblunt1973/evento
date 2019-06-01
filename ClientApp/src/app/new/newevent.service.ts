import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IEvent } from './models/event.model';

@Injectable()
export class NewEventService {

  private BASE_URL = environment.apiUrl + 'event';

  constructor(private http: HttpClient) { }

  newEvent(event: IEvent) {
    const url = `${this.BASE_URL}/NewEvent`;
    return this.http.post(url, event);
  }

}
