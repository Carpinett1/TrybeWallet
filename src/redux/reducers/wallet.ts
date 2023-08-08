import { AnyAction } from 'redux';
import { EXCHANGE_RATES, FETCH_CURRENCIES, REMOVE_EXPENSE } from '../actions/actionTypes';

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
    case EXCHANGE_RATES:
      return { ...store,
        expenses: [...store.expenses, action.payload]
          .map((expense, index) => ({ ...expense, id: index })) };
    case REMOVE_EXPENSE:
      return { ...store, expenses: action.payload };
    default: return store;
  }
};

export default walletReducer;
