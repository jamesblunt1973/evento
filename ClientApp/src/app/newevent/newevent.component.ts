import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, Map, marker, icon, polyline, point, Layer, circle, polygon, LatLng } from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.scss']
})
export class NeweventComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(res => {
      console.log(res);
      this.center = latLng(res.coords.latitude, res.coords.longitude);
      this.addMarker(latLng(res.coords.latitude, res.coords.longitude));
      // var m : Map;
      // m.distance()
    },
    error => {
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

  // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true
  });

  center: LatLng = latLng([36.3747182354039, 59.4628143310547]);

  options = {
    layers: [this.streetMaps],
    zoom: 15,
    center: this.center
  };

  markers: Layer[] = [];
  position: LatLng;
  mapClick(map: any) {
    this.position = map.latlng;
    this.addMarker(map.latlng);
  }

  addMarker(position: LatLng){
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

  id: number;
  newEvent() {
    var data = {
      userId: '600a8700-ae46-4225-946e-b7b712be5126',
      title: 'test',
      holdingDate: new Date(),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
      latitude: this.position.lat,
      longitude: this.position.lng,
      link: 'http://www.poolticket.com'
    };
    this.http.post('https://localhost:44349/api/event/NewEvent', data).subscribe((res: any) => {
      this.id = res.id;
    });
  }

}
