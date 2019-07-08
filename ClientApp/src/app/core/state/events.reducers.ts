import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EventsActions, EventsActionTypes } from './events.actions';
import { IGetEventsResult } from '../../shared/models/getEventsResult';

export interface EventsState {
    eventsResult: IGetEventsResult,
    errorMessage: string
}

const getEventsFeatureState = createFeatureSelector<EventsState>('eventsState');

export const getEventsStatus = createSelector(
    getEventsFeatureState,
    state => state.eventsResult
);

export const getEventsErrorMessage = createSelector(
    getEventsFeatureState,
    state => state.errorMessage
);

const initialState: EventsState = {
    eventsResult: {
        events: [], 
        totalCount: 0
    }, 
    errorMessage: ''
}

export function eventsReducer(state: EventsState = initialState, action: EventsActions): EventsState {
    switch (action.type) {
        case EventsActionTypes.GetEventsSuccess:
            return {
                eventsResult: action.payload,
                errorMessage: ''
            }
        case EventsActionTypes.GetEventsFailure:
            return {
                ...initialState,                
                errorMessage: action.payload
            }
        default:
            return state;
    }
}