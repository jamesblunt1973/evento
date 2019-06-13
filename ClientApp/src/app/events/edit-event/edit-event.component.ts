import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IEvent } from '../models/event.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  event$:Observable<IEvent> = null;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private eventsService: EventsService) { }

  ngOnInit() {
    this.event$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.eventsService.getEvent(params.get('id')))
    );
  }

}
