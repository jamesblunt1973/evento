import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { shareReplay, map, share, catchError } from 'rxjs/operators';
import { IEvent, AppEvent } from './models/event.model';
import { environment } from '../../environments/environment';
import { IEventSummury } from '../shared/models/eventSummury';
import { IPhoto } from './models/photo.model';

@Injectable()
export class EventsService {

  private BASE_URL = environment.apiUrl + 'events';
  private CACHE_SIZE = 1;
  private userEventsCache$: Observable<IEventSummury[]>;
  private observableCache: { [key: number]: Observable<AppEvent> } = {};
  private eventsCache: { [key: number]: AppEvent } = {};


  constructor(private http: HttpClient) { }

  newEvent(event: IEvent) {
    const url = `${this.BASE_URL}/new`;
    return this.http.post<number>(url, event);
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
    const url = `${this.BASE_URL}/userEvents`;
    return this.http.get<IEventSummury[]>(url);
  }

  getEventPhotos(id: number) {
    const url = `${this.BASE_URL}/${id}/photos`;
    return this.http.get<IPhoto[]>(url);
  }

  upload(formData: FormData) {
    const url = `${this.BASE_URL}/upload`;
    const uploadReq = new HttpRequest('POST', url, formData, {
      reportProgress: true,
    });

    return this.http.request<IPhoto[]>(uploadReq);
  }

  deletePhoto(id: number) {
    const url = `${this.BASE_URL}/photos/${id}`;
    return this.http.delete<void>(url);
  }

  updatePhoto(photo: IPhoto) {
    const url = `${this.BASE_URL}/photos/${photo.id}`;
    return this.http.put<void>(url, photo);
  }

  getEvent(id: number, edit = false) {
    // Data available
    if (this.eventsCache[id])
      return of(this.eventsCache[id]);
    // Request pending
    else if (this.observableCache[id])
      return this.observableCache[id];
    // New request needed
    else
      this.observableCache[id] = this.fetchEvent(id, edit);

    return this.observableCache[id];
  }

  private fetchEvent(id: number, edit: boolean) {
    let url = `${this.BASE_URL}/${id}`;
    if (edit)
      url += '?edit=true';
    return this.http.get<AppEvent>(url).pipe(
      map(res => this.mapCachedEvent(res)),
      catchError(EventsService.handleError),
      share()
    );
  }

  private mapCachedEvent(body: AppEvent) {
    this.observableCache[body.id] = null;
    this.eventsCache[body.id] = body;
    return this.eventsCache[body.id];
  }

  // ERRORS handling
  /**
   * Internal-static member, used to handle error incomming form data-call.
   * @param     - error returned from http call
   * @returns   - event stream error
   */
  static handleError(error: any) {
    const _errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return throwError(_errMsg);
  }
}
