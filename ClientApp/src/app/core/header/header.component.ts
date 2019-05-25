import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UiState, getSidebarStatus } from '../state/ui.reducer';
import { ToggleSidebar } from '../state/ui.actions';
import { getAuthUser } from '../../shared/state/auth.reducer';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  sidebarStatus$: Observable<string>;
  user$: Observable<User>;
  
  constructor(private store: Store<UiState>) { }

  ngOnInit() {
    this.sidebarStatus$ = this.store.pipe(select(getSidebarStatus));
    this.user$ = this.store.pipe(select(getAuthUser));
  }

  menuClick() {
    this.store.dispatch(new ToggleSidebar());
  }

}
