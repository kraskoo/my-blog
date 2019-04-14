import { User } from '../../models/user.model';
import * as UserActions from '../actions/user.action';

const initialState: User = null;

export function userReducer(
  state: User = initialState,
  action: UserActions.UserActions) {
  switch (action.type) {
    case UserActions.LOGOUT_USER:
      return null;
    case UserActions.LOGIN_USER:
    default:
      return state;
  }
}
