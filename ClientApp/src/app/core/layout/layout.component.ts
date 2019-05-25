import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ToggleSidebar } from '../state/ui.actions';
import { getSidebarStatus } from '../state/ui.reducer';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  subscriptions: Array<Subscription> = [];
  sidebarStatus: boolean;

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
  }

  ngOnDestroy() {
    for (const i in this.subscriptions) {
      this.subscriptions[i].unsubscribe();
    }
  }

  onSidebarClosing() {
    this.store.dispatch(new ToggleSidebar());
  }
}
