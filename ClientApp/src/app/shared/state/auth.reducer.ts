import * as fromRoot from '../../app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../models/user.model';
import { AuthActionTypes, AuthActions } from './auth.actions';

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    errorMessage: string;
}

export interface AppState extends fromRoot.AppState {
    authState: AuthState
}

const getAuthFeatureState = createFeatureSelector<AuthState>('authState');

export const getAuthErrorMessage = createSelector(
    getAuthFeatureState,
    state => state.errorMessage
);

export const getAuthenticatedStatus = createSelector(
    getAuthFeatureState,
    state => state.isAuthenticated
);

export const getAuthUser = createSelector(
    getAuthFeatureState,
    state => state.user
);

export const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    errorMessage: ''
};

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.LoginSuccess:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                errorMessage: ''
            }
        case AuthActionTypes.LoginFailure:
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}