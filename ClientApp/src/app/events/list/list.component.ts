import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventsService } from '../events.service';
import { IEventSummury } from '../../shared/models/eventSummury';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  events$: Observable<IEventSummury[]>;

  constructor(private service: EventsService) { }

  ngOnInit() {
    this.events$ = this.service.getUserEvents();
  }

}
