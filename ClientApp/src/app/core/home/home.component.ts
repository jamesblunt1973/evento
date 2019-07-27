import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatButtonToggleChange } from '@angular/material';
//import { Store, select } from '@ngrx/store';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { latLng, LatLng, Layer, tileLayer, marker, icon } from 'leaflet';
import { MainService } from '../../shared/main.service';
import { IEventSummury } from '../../shared/models/eventSummury';
import { IGetEventsParameter } from '../../shared/models/getEventsParameter';
import { ITag } from '../../shared/models/tag.model';
//import { GetEvents } from '../state/events.actions';
//import * as fromReducer from '../state/events.reducers';
import { GetEventsSort } from '../../shared/models/getEventsSort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  drawerContent: any;
  events: IEventSummury[];
  tags: ITag[];
  totalCount: number;
  private subscriptions: Array<Subscription> = [];
  mapChanges = new Subject<LatLng>();

  filter: IGetEventsParameter = {};
  center: LatLng = latLng([0, 0]);
  markers: Layer[] = [];
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true
  });
  options = {
    layers: [this.streetMaps],
    zoom: 12,
    center: this.center
  };


  constructor(private mainService: MainService,
    //private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone) { }

  ngOnInit() {
    this.drawerContent = document.getElementsByTagName('mat-drawer-container').item(0);
    this.drawerContent.style.backgroundImage = 'url(\'/assets/images/main-bg.jpg\')';

    let sub = this.mainService.getTags().subscribe(tags => {
      this.tags = tags;
    });
    this.subscriptions.push(sub);


    /*
     * 1- get query parameters from address and assign it to filter
     * 2- check for locaition in filter
     * 3- if there is no location in filter, get current user location and assign it to filter location
     * 4- assign center of map to filter location
     * 5- get dta from server
    */

    this.route.queryParamMap.subscribe((p: ParamMap) => {
      let count = +p.get('count');
      let from = p.get('from');
      let latitude = +p.get('latitude');
      let longitude = +p.get('longitude');
      let page = +p.get('page');
      let sort = +p.get('sort');
      let str = p.get('str');
      let tags = p.getAll('tags');
      let to = p.get('to');
      let userId = p.get('userId');
      this.filter = {
        latitude: latitude,
        longitude: longitude,
        from: from == null ? null : new Date(from),
        to: to == null ? null : new Date(to),
        str: str,
        userId: userId,
        tags: tags.map(Number),
        page: page,
        count: count || 20,
        sort: sort
      };
      if (this.filter.latitude && this.filter.longitude) {
        this.getEvents();
      }
      else {
        navigator.geolocation.getCurrentPosition(res => {
          this.filter.latitude = res.coords.latitude;
          this.filter.longitude = res.coords.longitude;
          this.getEvents();
        }, error => {
          this.mainService.navigatorGeolocationError(error);
          this.filter.latitude = 36.294655999999996; // default
          this.filter.longitude = 59.57632;
          this.getEvents();
        });
      }
    });


    sub = this.mapChanges.pipe(
      debounceTime(1000),
    ).subscribe(center => {
      this.filter.latitude = center.lat;
      this.filter.longitude = center.lng
      this.router.navigate(['/'], { queryParams: this.filter });
    });
  }

  ngOnDestroy(): void {
    //this.drawerContent.style.background = '';
    for (const i in this.subscriptions) {
      this.subscriptions[i].unsubscribe();
    }
  }

  getEvents() {
    this.center = latLng(this.filter.latitude, this.filter.longitude);
    this.options.center = this.center;

    let sub = this.mainService.getEvents(this.filter).subscribe(res => {
      this.totalCount = res.totalCount;
      this.events = res.events;

      this.markers = [];
      this.events.forEach(event => {
        let pos = latLng(event.latitude, event.longitude);
        this.markers.push(this.createMarker(pos, event.id));
      });
    });
    this.subscriptions.push(sub);
  }

  createMarker(position: LatLng, id: number) {
    const newMarker = marker(
      position,
      {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'leaflet/marker-icon.png',
          shadowUrl: 'leaflet/marker-shadow.png'
        }), clickable: true
      }
    ).on('click', a => {
      this.zone.run(() => {
        this.router.navigate(['/events/' + id]);
      });
    });
    return newMarker;
  }

  changeMap() {
    this.mapChanges.next(this.center);
  }
}
