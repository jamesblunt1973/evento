import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tag } from './models/Tag';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private EVENT_URL = environment.apiUrl + 'event';
  private TAG_URL = environment.apiUrl + 'tag';

  constructor(private http: HttpClient) { }

  getTags() {
    const url = `${this.TAG_URL}/alltags`;
    return this.http.get<Tag[]>(url);
  }

}
