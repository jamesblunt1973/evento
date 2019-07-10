import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { latLng } from 'leaflet';
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
      let pos = latLng(res.coords.latitude, res.coords.longitude);
      this.filter.latitude = pos.lat;
      this.filter.longitude = pos.lng;
      this.getEvents();
    }, error => {
      this.mainService.navigatorGeolocationError(error);
      this.getEvents();
    });

    sub = this.store.pipe(select(fromReducer.getEventsStatus)).subscribe(res => {
      this.totalCount = res.totalCount;
      this.events = res.events;
      this.loading = false;
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
}
