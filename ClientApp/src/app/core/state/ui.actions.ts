import { Action } from '@ngrx/store';

export enum UiActionTypes {
  OpenSidebar = '[Core] OpenSidebar',
  CloseSidebar = '[Core] CloseSidebar',
  OpenRightbar = '[Core] OpenRightbar',
  CloseRightbar = '[Core] CloseRightbar',
  ToggleSpinner = '[Core] ToggleSpinner'
}

export class OpenSidebar implements Action {
  readonly type = UiActionTypes.OpenSidebar;
}

export class CloseSidebar implements Action {
  readonly type = UiActionTypes.CloseSidebar;
}

export class OpenRightbar implements Action {
  readonly type = UiActionTypes.OpenRightbar;
}

export class CloseRightbar implements Action {
  readonly type = UiActionTypes.CloseRightbar;
}

export class ToggleSpinner implements Action {
  readonly type = UiActionTypes.ToggleSpinner;
  constructor(public payload: string) { }
}

export type UiActions = OpenSidebar
  | CloseSidebar
  | OpenRightbar
  | CloseRightbar
  | ToggleSpinner;