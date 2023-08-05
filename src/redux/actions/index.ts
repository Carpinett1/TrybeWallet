import { USER_LOGIN } from './actionTypes';

export const loginAction = (email: string) => ({
  type: USER_LOGIN,
  payload: { email },
});
