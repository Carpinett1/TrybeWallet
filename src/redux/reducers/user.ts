import { AnyAction } from 'redux';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (store = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case 'login':
      return { ...store, user: action.payload };
    default: return store;
  }
};

export default userReducer;
