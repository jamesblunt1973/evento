import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromReducer from '../state/ui.reducer';
import * as fromActions from '../state/ui.actions';
import { getAuthUser } from '../../shared/state/auth.reducer';
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

  constructor(private store: Store<fromReducer.UiState>) { }

  ngOnInit() {
    this.store.pipe(select(fromReducer.getSidebarStatus)).subscribe(status => {
      this.sidebarStatus = status;
    });
    this.store.pipe(select(fromReducer.getRightbarStatus)).subscribe(status => {
      this.rightbarStatus = status;
    });
    this.user$ = this.store.pipe(select(getAuthUser));
  }

  menuClick() {
    if (this.sidebarStatus == 'open')
      this.store.dispatch(new fromActions.CloseSidebar());
    else
      this.store.dispatch(new fromActions.OpenSidebar());
  }

  userBtnClick() {
    if (this.rightbarStatus == 'open')
      this.store.dispatch(new fromActions.CloseRightbar());
    else
      this.store.dispatch(new fromActions.OpenRightbar());
  }

}
