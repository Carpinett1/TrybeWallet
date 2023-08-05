import { AnyAction } from 'redux';
import { USER_LOGIN } from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (store = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case USER_LOGIN:
      return action.payload;
    default: return store;
  }
};

export default userReducer;
