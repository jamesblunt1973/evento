import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { CloseSidebar, CloseRightbar } from '../state/ui.actions';
import { getSidebarStatus, getRightbarStatus } from '../state/ui.reducer';
import { AppState } from '../../app.state';
import { IUser } from '../../shared/models/user.model';
import { getAuthUser } from '../../shared/state/auth.reducer';
import { Logout } from '../../shared/state/auth.actions';
import { MainService } from '../../shared/main.service';
import { ITag } from '../../shared/models/tag.model';
import { GetEventsParameter, IGetEventsParameter } from '../../shared/models/getEventsParameter';
//import { GetEvents } from '../state/events.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  private yesterday: Date;
  subscriptions: Array<Subscription> = [];
  sidebarStatus: boolean;
  rightbarStatus: boolean;
  user$: Observable<IUser>;
  model = new GetEventsParameter();
  tags: Array<ITag> = [];

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private mainService: MainService
  ) {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.yesterday = yesterday;
  }

  ngOnInit() {
    let sub = this.store.pipe(select(getSidebarStatus)).subscribe(status => {
      this.sidebarStatus = status == 'open';
    });
    this.subscriptions.push(sub);

    sub = this.store.pipe(select(getRightbarStatus)).subscribe(status => {
      this.rightbarStatus = status == 'open';
    });
    this.subscriptions.push(sub);

    this.user$ = this.store.pipe(select(getAuthUser));

    sub = this.mainService.getTags().subscribe(tags => {
      this.tags = tags
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    for (const i in this.subscriptions) {
      this.subscriptions[i].unsubscribe();
    }
  }

  onSidebarClosing() {
    this.store.dispatch(new CloseSidebar());
    this.store.dispatch(new CloseRightbar());
  }

  closeSidebar() {
    this.store.dispatch(new CloseSidebar());
  }

  closeRightbar() {
    this.store.dispatch(new CloseRightbar());
  }

  logout() {
    this.store.dispatch(new Logout());
    this.store.dispatch(new CloseRightbar());
  }

  dateFromFilter = (d: Date): boolean => {
    return d >= this.yesterday;
  }

  dateToFilter = (d: Date): boolean => {
    if (this.model.from)
      return d >= this.model.from;
    return d >= this.yesterday;
  }

  applyFilter() {
    //this.store.dispatch(new GetEvents(this.model));
    this.store.dispatch(new CloseSidebar());


    var qs: IGetEventsParameter = {};
    if (this.model.count != 20)
      qs.count = this.model.count;
    if (this.model.from != null)
      qs.from = this.model.from;
    if (this.model.latitude != 0)
      qs.latitude = this.model.latitude;
    if (this.model.longitude != 0)
      qs.longitude = this.model.longitude;
    if (this.model.page != 0)
      qs.page = this.model.page;
    if (this.model.sort != 0)
      qs.sort = this.model.sort;
    if (this.model.str != '')
      qs.str = this.model.str;
    if (this.model.tags.length > 0)
      qs.tags = this.model.tags;
    if (this.model.to != null)
      qs.to = this.model.to;
    if (this.model.userId != '')
      qs.userId = this.model.userId;
    this.router.navigate(['/'], { queryParams: qs });
  }
}
