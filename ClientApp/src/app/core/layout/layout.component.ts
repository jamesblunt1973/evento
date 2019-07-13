import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { GetEventsParameter } from '../../shared/models/getEventsParameter';
import { GetEvents } from '../state/events.actions';

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
    this.store.dispatch(new GetEvents(this.model));
    this.store.dispatch(new CloseSidebar());
  }
}
