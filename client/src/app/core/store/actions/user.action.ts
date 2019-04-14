import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export const LOGIN_USER = '[User] Login';
export const LOGOUT_USER = '[User] Logout';

export class LoginUser implements Action {
  type: string = LOGIN_USER;

  constructor(public payload: User) {}
}

export class LogoutUser implements Action {
  type: string = LOGOUT_USER;

  constructor(public payload: User) {}
}

export type UserActions = LoginUser | LogoutUser;
