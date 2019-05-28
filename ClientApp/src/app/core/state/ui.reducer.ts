import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiActionTypes, UiActions } from './ui.actions';

export interface UiState {
    sidebarStatus: 'open' | 'close';
    rightbarStatus: 'open' | 'close';
    spinnerStatus: 'show' | 'hide';
}

const getUiFeatureState = createFeatureSelector<UiState>('uiState');

export const getSidebarStatus = createSelector(
    getUiFeatureState,
    state => state.sidebarStatus
);

export const getRightbarStatus = createSelector(
    getUiFeatureState,
    state => state.rightbarStatus
);

const initialState: UiState = {
    sidebarStatus: 'close',
    rightbarStatus: 'close',
    spinnerStatus: 'hide'
}

export function uiReducer(state: UiState = initialState, action: UiActions): UiState {
    switch (action.type) {
        case UiActionTypes.OpenSidebar: {
            return {
                ...state,
                sidebarStatus: 'open'
            }
        }
        case UiActionTypes.CloseSidebar: {
            return {
                ...state,
                sidebarStatus: 'close'
            }
        }
        case UiActionTypes.OpenRightbar: {
            return {
                ...state,
                rightbarStatus: 'open'
            }
        }
        case UiActionTypes.CloseRightbar: {
            return {
                ...state,
                rightbarStatus: 'close'
            }
        }
        default:
            return state;
    }
}