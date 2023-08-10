import { AnyAction } from 'redux';
import
{ EDITED_EXPENSE,
  EDIT_EXPENSE, EXCHANGE_RATES, FETCH_CURRENCIES, REMOVE_EXPENSE }
  from '../actions/actionTypes';

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
        editor: false,
        expenses: [...store.expenses, action.payload]
          .map((expense, index) => ({ ...expense, id: index })) };
    case REMOVE_EXPENSE:
      return { ...store, expenses: action.payload };
    case EDIT_EXPENSE:
      return { ...store, editor: true, idToEdit: action.payload };
    case EDITED_EXPENSE:
      return { ...store, editor: false, expenses: action.payload };
    default: return store;
  }
};

export default walletReducer;
