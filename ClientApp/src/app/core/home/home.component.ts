import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { latLng } from 'leaflet';
import { MainService } from '../../shared/main.service';
import { IEventSummury } from '../../shared/models/eventSummury';
import { GetEventsParameter } from '../../shared/models/getEventsParameter';
import { ITag } from '../../shared/models/tag.model';

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
  subscriptions: Array<Subscription> = [];

  constructor(private mainService: MainService) { }

  filter = new GetEventsParameter();

  ngOnInit() {
    this.drawerContent = document.getElementsByTagName('mat-drawer-container').item(0);
    this.drawerContent.style.backgroundImage = 'url(\'../../../assets/images/main-bg.jpg\')';

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
}

  ngOnDestroy(): void {
    //this.drawerContent.style.background = '';
    for (const i in this.subscriptions) {
      this.subscriptions[i].unsubscribe();
    }
  }

  getEvents() {
    this.mainService.getEvents(this.filter).subscribe(res => {
      this.totalCount = res.totalCount;
      this.events = res.events;
    });
  }
}
