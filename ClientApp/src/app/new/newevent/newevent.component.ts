import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { tileLayer, latLng, Map, marker, icon, polyline, point, Layer, circle, polygon, LatLng } from 'leaflet';
import { AppEvent } from '../models/event';

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
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true
  });
  options = {
    layers: [this.streetMaps],
    zoom: 15,
    center: this.center
  };
  time: string = '';

  constructor(private snackBar: MatSnackBar) {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.yesterday = yesterday;
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(res => {
      this.center = latLng(res.coords.latitude, res.coords.longitude);
      this.setModelPosition(this.center);
      this.addMarker(latLng(res.coords.latitude, res.coords.longitude));
    }, error => {
      switch (error.code) {
        case 1:
          console.log('Permission Denied');
          break;
        case 2:
          console.log('Position Unavailable');
          break;
        case 3:
          console.log('Timeout');
          break;
      }
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
    /* in order to add selected time, to holding date
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
    console.log(this.model);
  }
}
