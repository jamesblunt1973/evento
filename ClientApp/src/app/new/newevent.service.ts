import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NewModule } from './new.module';

@Injectable({
  providedIn: NewModule
})
export class NewEventService {

  private BASE_URL = environment.apiUrl + 'event';

  constructor(private http: HttpClient) { }

}
