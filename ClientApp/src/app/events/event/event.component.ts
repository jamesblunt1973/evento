import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  eventId: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private eventService: EventsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.eventId = +params.get('id'); // convert to number
      console.log(new Date().toTimeString());
      this.eventService.getEvent(this.eventId).subscribe(e => {
        console.log(new Date().toTimeString());
      });
    });
  }

}
