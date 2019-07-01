import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthState, getAuthUser } from '../../shared/state/auth.reducer';
import { EventsService } from '../events.service';
import { AppEvent } from '../models/event.model';
import { MainService } from '../../shared/main.service';
import { IPhoto } from '../models/photo.model';
import { IUser } from '../../shared/models/user.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {

  user: IUser;
  eventId: number;
  event = new AppEvent();
  headerImg = '/assets/images/login-icon.svg';
  currentPhoto: IPhoto;
  private subscriptions: Array<Subscription> = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private eventService: EventsService,
    private mainService: MainService,
    private store: Store<AuthState>) { }

  ngOnInit() {
    let sub = this.store.pipe(select(getAuthUser)).subscribe(user => {
      this.user = user;
    });
    this.subscriptions.push(sub);

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.eventId = +params.get('id'); // convert to number
      this.eventService.getEvent(this.eventId).subscribe(res => {
        this.event = res;

        let userImageSrc = `/assets/files/users/${this.event.owner.id}.jpg`;
        this.mainService.checkImageExist(userImageSrc).subscribe(res => {
          this.headerImg = userImageSrc;
        });

        if (this.event.photos.length > 0)
          this.currentPhoto = this.event.photos[0];

      });
    });
  }

  ngOnDestroy(): void {
    for (const i in this.subscriptions) {
      this.subscriptions[i].unsubscribe();
    }
  }

}
