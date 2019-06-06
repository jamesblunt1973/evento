import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tileLayer, latLng, Map, marker, icon, polyline, point, Layer, circle, polygon, LatLng } from 'leaflet';
import { AppEvent } from '../models/event.model';
import { AuthState, getAuthUser } from '../../shared/state/auth.reducer';
import { MainService } from '../../shared/main.service';
import { ITag } from '../../shared/models/tag.model';
import { NewEventService } from '../newevent.service';
import { IUser } from '../../shared/models/user.model';

@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.scss']
})
export class NeweventComponent implements OnInit {

  private yesterday: Date;
  model = new AppEvent();
  center: LatLng = latLng([0, 0]);
  markers: Layer[] = [];
  position: LatLng;
  tags$: Observable<ITag[]>;
  time: string = '';
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
      private snackBar: MatSnackBar, 
      private mainService: MainService, 
      private eventService: NewEventService,
      private store: Store<AuthState>,
      private router: Router) {
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
  }

  mapClick(map: any) {
    this.position = map.latlng;
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
    /* in order to add selected time to holding date,
       we split the time string and convert it to 
       corresponding millisecond, then by using setTime
       method, we can obtain the correct date and time.
       the given time is something like "08:47 am" */
    if (this.time != '') {
      var time = this.model.holdingDate.getTime();
      var items = this.time.split(':');
      var hour = parseInt(items[0]);
      items = items[1].split(' ');
      var min = parseInt(items[0]);

      time += (hour * 3600 + min * 60) * 1000;
      this.model.holdingDate.setTime(time);
    }
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
