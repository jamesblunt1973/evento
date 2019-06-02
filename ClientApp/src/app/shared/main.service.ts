import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ITag } from './models/tag.model';
import { IGetEventsParameter } from './models/getEventsParameter';
import { IEventSummury } from './models/eventSummury';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private EVENT_URL = environment.apiUrl + 'event';
  private TAG_URL = environment.apiUrl + 'tag';
  private CACHE_SIZE = 1;
  private tagsCache$: Observable<ITag[]>;

  constructor(private http: HttpClient) { }

  getTags() {
    // chache tags with shareReplay operator
    if (!this.tagsCache$) {
      this.tagsCache$ = this.requestTags().pipe(
        shareReplay(this.CACHE_SIZE)
      );
    }

    return this.tagsCache$;
  }

  private requestTags() {
    const url = `${this.TAG_URL}/alltags`;
    return this.http.get<ITag[]>(url).pipe(
      map(res => res)
    );
  }

  getEvents(data: IGetEventsParameter) {
    const url = `${this.EVENT_URL}/getevents`;
    this.http.post<IEventSummury[]>(url, data);
  }
}
