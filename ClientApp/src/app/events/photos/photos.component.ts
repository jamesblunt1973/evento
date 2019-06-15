import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { EventsService } from '../events.service';
import { IPhoto } from '../models/photo.model';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  photos$: Observable<IPhoto[]>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private eventService: EventsService) { }
  eventId: number;
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => { // ActivatedRoute subs don't require unsubscripbing
      this.eventId = +params.get('id'); // convert to number
      this.photos$ = this.eventService.getEventPhotos(this.eventId);
    });
  }

}
