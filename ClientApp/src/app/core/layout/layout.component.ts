import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { CloseSidebar, CloseRightbar } from '../state/ui.actions';
import { getSidebarStatus, getRightbarStatus } from '../state/ui.reducer';
import { AppState } from '../../app.state';
import { User } from '../../shared/models/user.model';
import { getAuthUser } from '../../shared/state/auth.reducer';
import { Logout } from '../../shared/state/auth.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  subscriptions: Array<Subscription> = [];
  sidebarStatus: boolean;
  rightbarStatus: boolean;
  user$: Observable<User>;

  routes = [
    { path: '/', name: 'Home', icon: 'home' },
    { path: 'one', name: 'Notifications', icon: 'alarm' },
    { path: 'two', name: 'Assignments', icon: 'assignment' },
    { path: 'three', name: 'Search', icon: 'search' }
  ];

  constructor(private store: Store<AppState>) { }

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
}
