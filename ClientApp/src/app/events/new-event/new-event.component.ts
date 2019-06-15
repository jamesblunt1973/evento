import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { icon, latLng, LatLng, Layer, marker, tileLayer } from 'leaflet';
import { Observable, Subscription } from 'rxjs';
import { MainService } from '../../shared/main.service';
import { ITag } from '../../shared/models/tag.model';
import { IUser } from '../../shared/models/user.model';
import { AuthState, getAuthUser } from '../../shared/state/auth.reducer';
import { EventsService } from '../events.service';
import { AppEvent } from '../models/event.model';

@Component({
  selector: 'app-newevent',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit, OnDestroy {

  private yesterday: Date;
  private subscriptions: Array<Subscription> = [];
  model = new AppEvent();
  center: LatLng = latLng([0, 0]);
  markers: Layer[] = [];
  tags$: Observable<ITag[]>;
  user: IUser;
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true
  });
  options = {
    layers: [this.streetMaps],
    zoom: 15,
    center: this.center
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private mainService: MainService,
    private eventService: EventsService,
    private store: Store<AuthState>) {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.yesterday = yesterday;
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(res => {
      this.center = latLng(res.coords.latitude, res.coords.longitude);
      this.setModelPosition(this.center);
      this.addMarker(latLng(res.coords.latitude, res.coords.longitude));
    }, this.mainService.navigatorGeolocationError);

    this.tags$ = this.mainService.getTags();

    this.store.pipe(select(getAuthUser)).subscribe(user => {
      this.user = user;
    });

    // if id parameter is provided then we edit the specified event
    this.route.paramMap.subscribe((params: ParamMap) => { // ActivatedRoute subs don't require unsubscripbing
      if (params.has('id')) {
        let eventId = +params.get('id'); // convert to number
        let sub = this.eventService.getEvent(eventId).subscribe(event => {
          this.model = event;
          this.center = latLng(event.latitude, event.longitude);
          this.addMarker(this.center);
        });
        this.subscriptions.push(sub);
      }
      else
        this.model = new AppEvent();
    });
  }

  ngOnDestroy(): void {
    for (const i in this.subscriptions) {
      this.subscriptions[i].unsubscribe();
    }
  }

  mapClick(map: any) {
    this.addMarker(map.latlng);
    this.setModelPosition(map.latlng);
  }

  addMarker(position: LatLng) {
    const newMarker = marker(
      position,
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
  }

  setModelPosition(position: LatLng) {
    this.model.latitude = position.lat;
    this.model.longitude = position.lng;
  }

  dateFilter = (d: Date): boolean => {
    return d >= this.yesterday;
  }

  newEvent() {
    ///* in order to add selected time to holding date,
    //   we split the time string and convert it to 
    //   corresponding millisecond, then by using setTime
    //   method, we can obtain the correct date and time.
    //   the given time is something like "08:47 am" */
    //if (this.time != '') {
    //  var time = this.model.holdingDate.getTime();
    //  var items = this.time.split(':');
    //  var hour = parseInt(items[0]);
    //  items = items[1].split(' ');
    //  var min = parseInt(items[0]);

    //  time += (hour * 3600 + min * 60) * 1000;
    //  this.model.holdingDate.setTime(time);
    //}
    this.model.userId = this.user.id;
    this.eventService.newEvent(this.model).subscribe(id => {
      this.model = new AppEvent();
      this.snackBar.open(`Your new event saved successfully {${id}}, please wait for confirmation by moderator.`, 'close');
      this.router.navigateByUrl('/');
    }, error => {
      console.error(error);
      this.snackBar.open('Some errors happend!', 'close');
    });
  }
}
