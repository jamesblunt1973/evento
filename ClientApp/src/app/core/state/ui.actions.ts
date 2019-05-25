import { Action } from '@ngrx/store';

export enum UiActionTypes {
  ToggleSidebar = '[Core] ToggleSidebar',
  ToggleSpinner = '[Core] ToggleSpinner'
}

export class ToggleSidebar implements Action {
  readonly type = UiActionTypes.ToggleSidebar;
}

export class ToggleSpinner implements Action {
  readonly type = UiActionTypes.ToggleSpinner;
  constructor(public payload: string) { }
}

export type UiActions = ToggleSidebar
  | ToggleSpinner;