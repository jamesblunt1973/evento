import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { EventsService } from '../events.service';
import { AppEvent } from '../models/event.model';
import { MainService } from '../../shared/main.service';
import { IPhoto } from '../models/photo.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  eventId: number;
  event = new AppEvent();
  headerImg = '/assets/images/login-icon.svg';
  currentPhoto: IPhoto;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private eventService: EventsService,
    private mainService: MainService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.eventId = +params.get('id'); // convert to number
      this.eventService.getEvent(this.eventId).subscribe(res => {
        this.event = res;

        let userImageSrc = `/assets/files/users/${this.event.owner.id}.jpg`;
        this.mainService.checkImageExist(userImageSrc).subscribe(res => {
          this.headerImg = userImageSrc;
        });

        if (this.event.photos.length > 0)
          this.currentPhoto = this.event.photos[0];

      });
    });
  }

}
