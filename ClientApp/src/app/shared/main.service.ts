import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay, map, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ITag } from './models/tag.model';
import { IGetEventsParameter } from './models/getEventsParameter';
import { IGetEventsResult } from './models/getEventsResult';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private EVENT_URL = environment.apiUrl + 'events';
  private TAG_URL = environment.apiUrl + 'tags';
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
    const url = `${this.TAG_URL}`;
    return this.http.get<ITag[]>(url).pipe(
      map(res => {
        let tags: ITag[] = [];
        for (var i in res) {
          let tag = res[i];
          tags[tag.id] = tag;
        }
        return tags;
      })
    );
  }

  getEvents(data: IGetEventsParameter) {
    const url = `${this.EVENT_URL}`;
    return this.http.post<IGetEventsResult>(url, data);
  }

  checkImageExist(url: string) {
    return this.http.get(url, { responseType: 'blob' });
  }

  navigatorGeolocationError(error: PositionError) {
    switch (error.code) {
      case 1:
        console.log('Permission Denied');
        break;
      case 2:
        console.log('Position Unavailable');
        break;
      case 3:
        console.log('Timeout');
        break;
    }
  }
}
