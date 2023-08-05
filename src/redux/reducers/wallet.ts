import { AnyAction } from 'redux';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (store = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case 'wallet':
      return { ...store, wallet: action.payload };
    default: return store;
  }
};

export default walletReducer;
