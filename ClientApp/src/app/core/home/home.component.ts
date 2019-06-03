import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { MainService } from '../../shared/main.service';
import { IEventSummury } from '../../shared/models/eventSummury';
import { IGetEventsParameter } from '../../shared/models/getEventsParameter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public elements = ["content1", "content2", "content3", "content4"];
  drawerContent: any;
  events: IEventSummury[];
  totalCount: number;

  constructor(private mainService: MainService) { }

  filter: IGetEventsParameter;
  

  ngOnInit() {
    this.drawerContent = document.getElementsByTagName('mat-drawer-container').item(0);
    this.drawerContent.style.backgroundImage = 'url(\'../../../assets/images/main-bg.jpg\')';

    this.mainService.getEvents(this.filter).subscribe(res => {
      this.totalCount = res.totalCount;
      this.events = res.events;
    });
}

  ngOnDestroy(): void {
    //this.drawerContent.style.background = '';
  }

  addContent() {
    this.elements.push('new content');
  }

  removeContent() {
    this.elements.pop();
  }
}
