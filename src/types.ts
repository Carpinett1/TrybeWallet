import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type Expense = {
  id: number,
  value: string | number,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates: any,
};

export type ReduxState = {
  user: {
    email: string,
  },
  wallet: {
    currencies: string[],
    expenses: Expense[],
    editor: boolean,
    idToEdit: number,
  }
};

export type WalletFormType = {
  value: string | number,
  description: string,
  currency: string,
  method: string,
  tag: string,
};

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;
