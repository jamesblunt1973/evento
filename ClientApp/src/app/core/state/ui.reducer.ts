import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiActionTypes, UiActions } from './ui.actions';

export interface UiState {
    sidebarStatus: 'open' | 'close';
    spinnerStatus: 'show' | 'hide';
}

const getUiFeatureState = createFeatureSelector<UiState>('uiState');

export const getSidebarStatus = createSelector(
    getUiFeatureState,
    state => state.sidebarStatus
);

const initialState: UiState = {
    sidebarStatus: 'close',
    spinnerStatus: 'hide'
}

export function uiReducer(state: UiState = initialState, action: UiActions): UiState {
    switch (action.type) {
        case UiActionTypes.ToggleSidebar: {
            return {
                ...state,
                sidebarStatus: state.sidebarStatus == 'open' ? 'close' : 'open'
            }
        }
        default:
            return state;
    }
}