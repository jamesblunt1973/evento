import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LatLng, latLng, Layer, tileLayer, marker, icon } from 'leaflet';
import { AuthState, getAuthUser } from '../../shared/state/auth.reducer';
import { EventsService } from '../events.service';
import { AppEvent } from '../models/event.model';
import { MainService } from '../../shared/main.service';
import { IPhoto } from '../models/photo.model';
import { IUser } from '../../shared/models/user.model';
import { ITag } from '../../shared/models/tag.model';
import { INews } from '../models/news.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {
  loading = true;
  user: IUser;
  eventId: number;
  event = new AppEvent();
  headerImg = '/assets/images/login-icon.svg';
  currentPhoto: IPhoto;
  eventLocation: LatLng = latLng([0, 0]);
  markers: Layer[] = [];
  tags: ITag[];
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true
  });
  options = {
    layers: [this.streetMaps],
    zoom: 15,
    center: this.eventLocation
  };

  private subscriptions: Array<Subscription> = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private eventService: EventsService,
    private mainService: MainService,
    private store: Store<AuthState>) { }

  ngOnInit() {
    let sub = this.store.pipe(select(getAuthUser)).subscribe(user => {
      this.user = user;
    });
    this.subscriptions.push(sub);

    sub = this.mainService.getTags().subscribe(tags => this.tags = tags);
    this.subscriptions.push(sub);

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.eventId = +params.get('id'); // convert to number
      this.eventService.getEvent(this.eventId).subscribe(res => {
        this.loading = false;
        this.event = res;

        let userImageSrc = `/assets/files/users/${this.event.owner.id}.jpg`;
        this.mainService.checkImageExist(userImageSrc).subscribe(res => {
          this.headerImg = userImageSrc;
        });

        if (this.event.photos.length > 0)
          this.currentPhoto = this.event.photos[0];

        // setup event location
        this.eventLocation = latLng([this.event.latitude, this.event.longitude]);
        const newMarker = marker(
          this.eventLocation,
          {
            icon: icon({
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              iconUrl: 'leaflet/marker-icon.png',
              shadowUrl: 'leaflet/marker-shadow.png'
            })
          }
        );

        this.markers = [];
        this.markers.push(newMarker);
      });
    });
  }

  ngOnDestroy(): void {
    for (const i in this.subscriptions) {
      this.subscriptions[i].unsubscribe();
    }
  }

  postNews(value: string) {
    var news: INews = {
      context: value,
      eventId: this.eventId,
      id: 0,
      submitDate: new Date(),
      title: ''
    }
    this.eventService.postNews(news).subscribe(id => {
      news.id = id;
      this.event.news.push(news);
    });
  }

}
