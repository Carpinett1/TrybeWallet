import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type ReduxState = {
  user: {
    email: string,
  },
  wallet: {
    currencies: string[],
    expenses: [{
      id: number,
      value: number,
      currency: string,
      method: string,
      tag: string,
      description: string,
      exchangeRates: string,
    }],
    editor: boolean,
    idToEdit: number,
  }
};

export type WalletFormType = {
  value: string | number,
  description: string,
  currency: string,
  paymentMethod: string,
  tag: string,
};

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;
