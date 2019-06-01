import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ITag } from './models/tag.model';

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
}
