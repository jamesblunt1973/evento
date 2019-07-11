import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { latLng, LatLng, Layer, tileLayer, marker, icon } from 'leaflet';
import { MainService } from '../../shared/main.service';
import { IEventSummury } from '../../shared/models/eventSummury';
import { GetEventsParameter } from '../../shared/models/getEventsParameter';
import { ITag } from '../../shared/models/tag.model';
import { AppState } from '../../app.state';
import { GetEvents } from '../state/events.actions';
import * as fromReducer from '../state/events.reducers';
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
  loading = true;

  center: LatLng = latLng([0, 0]);
  markers: Layer[] = [];
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true
  });
  options = {
    layers: [this.streetMaps],
    zoom: 15,
    center: this.center
  };


  constructor(private mainService: MainService,
    private store: Store<AppState>) { }

  filter = new GetEventsParameter();

  ngOnInit() {
    this.drawerContent = document.getElementsByTagName('mat-drawer-container').item(0);
    this.drawerContent.style.backgroundImage = 'url(\'/assets/images/main-bg.jpg\')';

    let sub = this.mainService.getTags().subscribe(tags => {
      this.tags = tags;
    });
    this.subscriptions.push(sub);

    navigator.geolocation.getCurrentPosition(res => {
      this.center = latLng(res.coords.latitude, res.coords.longitude);
      this.filter.latitude = this.center.lat;
      this.filter.longitude = this.center.lng;
      this.getEvents();
    }, error => {
      this.mainService.navigatorGeolocationError(error);
      this.getEvents();
    });

    sub = this.store.pipe(select(fromReducer.getEventsStatus)).subscribe(res => {
      this.totalCount = res.totalCount;
      this.events = res.events;
      this.loading = false;
      
      this.markers = [];
      this.events.forEach(event => {
        let pos = latLng(event.latitude, event.longitude);
        this.markers.push(this.createMarker(pos));
      });

    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    //this.drawerContent.style.background = '';
    for (const i in this.subscriptions) {
      this.subscriptions[i].unsubscribe();
    }
  }

  getEvents() {
    // let sub = this.mainService.getEvents(this.filter).subscribe(res => {
    //   this.totalCount = res.totalCount;
    //   this.events = res.events;
    //   this.loading = false;
    // });
    // this.subscriptions.push(sub);
    this.filter.sort = GetEventsSort.latest;
    this.loading = true;
    this.store.dispatch(new GetEvents(this.filter));
  }

  changeView(e: MatButtonToggleChange) {
    if (e.value == 'apps')
      this.filter.sort = GetEventsSort.latest;
    else
      this.filter.sort = GetEventsSort.nearest;
    this.events = [];
    this.loading = true;
    this.store.dispatch(new GetEvents(this.filter));
  }

  createMarker(position: LatLng) {
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
    return newMarker;
  }

}
