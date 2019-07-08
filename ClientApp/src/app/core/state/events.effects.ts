import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { MainService } from '../../shared/main.service';
import * as fromActions from './events.actions';

@Injectable()
export class EventsEffects {

  constructor(
    private actions: Actions,
    private mainService: MainService
  ) { }

  @Effect()
  GetEvents: Observable<any> = this.actions.pipe(
    ofType(fromActions.EventsActionTypes.GetEvents),
    mergeMap((data: fromActions.GetEvents) => this.mainService.getEvents(data.payload)
      .pipe(
        map(res => (new fromActions.GetEventsSuccess(res))),
        catchError(error => of(new fromActions.GetEventsFailure(error.statusText)))
      )
    )
  );
}
