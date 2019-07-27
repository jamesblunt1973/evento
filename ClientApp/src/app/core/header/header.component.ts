import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromReducer from '../state/ui.reducer';
import * as fromActions from '../state/ui.actions';
import { getAuthUser, AuthState } from '../../shared/state/auth.reducer';
import { IUser } from '../../shared/models/user.model';
import { MainService } from '../../shared/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  sidebarStatus: string;
  rightbarStatus: string;
  user: IUser;
  headerImg = '/assets/images/login-icon.svg';
  private subscriptions: Array<Subscription> = [];

  constructor(private uiStore: Store<fromReducer.UiState>,
    private mainService: MainService,
    private authStore: Store<AuthState>) { }

  ngOnInit() {
    this.uiStore.pipe(select(fromReducer.getSidebarStatus)).subscribe(status => {
      this.sidebarStatus = status;
    });
    this.uiStore.pipe(select(fromReducer.getRightbarStatus)).subscribe(status => {
      this.rightbarStatus = status;
    });
    let sub = this.authStore.pipe(select(getAuthUser)).subscribe(user => {
      this.user = user;
      let userImageSrc = `/assets/files/users/${this.user.id}.jpg`;
      this.mainService.checkImageExist(userImageSrc).subscribe(res => {
        this.headerImg = userImageSrc;
      });
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    for (const i in this.subscriptions) {
      this.subscriptions[i].unsubscribe();
    }
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
