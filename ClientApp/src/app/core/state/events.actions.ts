import { Action } from '@ngrx/store';
import { IGetEventsResult } from '../../shared/models/getEventsResult';
import { IGetEventsParameter } from '../../shared/models/getEventsParameter';

export enum EventsActionTypes {
  GetEvents = '[Core] GetEvents',
  GetEventsSuccess = '[Core] GetEvents Success',
  GetEventsFailure = '[Core] GetEvents Failure'
}

export class GetEvents implements Action {
  readonly type = EventsActionTypes.GetEvents;
  constructor(public payload: IGetEventsParameter) { }
}

export class GetEventsSuccess implements Action {
    readonly type = EventsActionTypes.GetEventsSuccess;
    constructor(public payload: IGetEventsResult) { }
}

export class GetEventsFailure implements Action {
    readonly type = EventsActionTypes.GetEventsFailure;
    constructor(public payload: string) { }
}

export type EventsActions = GetEvents
    | GetEventsSuccess
    | GetEventsFailure;