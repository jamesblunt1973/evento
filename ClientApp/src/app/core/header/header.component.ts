import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromReducer from '../state/ui.reducer';
import * as fromActions from '../state/ui.actions';
import { getAuthUser, AuthState } from '../../shared/state/auth.reducer';
import { IUser } from '../../shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  sidebarStatus: string;
  rightbarStatus: string;
  user$: Observable<IUser>;

  constructor(private uiStore: Store<fromReducer.UiState>, private authStore: Store<AuthState>) { }

  ngOnInit() {
    this.uiStore.pipe(select(fromReducer.getSidebarStatus)).subscribe(status => {
      this.sidebarStatus = status;
    });
    this.uiStore.pipe(select(fromReducer.getRightbarStatus)).subscribe(status => {
      this.rightbarStatus = status;
    });
    this.user$ = this.authStore.pipe(select(getAuthUser));
  }

  menuClick() {
    if (this.sidebarStatus == 'open')
      this.uiStore.dispatch(new fromActions.CloseSidebar());
    else
      this.uiStore.dispatch(new fromActions.OpenSidebar());
  }

  userBtnClick() {
    if (this.rightbarStatus == 'open')
      this.uiStore.dispatch(new fromActions.CloseRightbar());
    else
      this.uiStore.dispatch(new fromActions.OpenRightbar());
  }

}
