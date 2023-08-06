import { AnyAction } from 'redux';
import { FETCH_CURRENCIES } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (store = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case FETCH_CURRENCIES:
      return { ...store, currencies: action.payload };
    default: return store;
  }
};

export default walletReducer;
