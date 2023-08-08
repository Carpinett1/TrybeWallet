import
{ EXCHANGE_RATES, FETCH_CURRENCIES, REMOVE_EXPENSE, USER_LOGIN } from './actionTypes';
import { Dispatch, Expense } from '../../types';

export const loginAction = (email: string) => ({
  type: USER_LOGIN,
  payload: { email },
});

const currenciesResponse = (currencies: string[]) => ({
  type: FETCH_CURRENCIES,
  payload: currencies,
});

export function fetchCurrencies() {
  return async (dispatch: Dispatch) => {
    try {
      const reponse = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await reponse.json();
      const filteredData = Object.keys(data).filter((curr) => curr !== 'USDT');
      dispatch(currenciesResponse(filteredData));
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}

export const expensesAction = (expense: Expense) => ({
  type: EXCHANGE_RATES,
  payload: expense,
});

export const RemoveExpenseAction = (expenses: Expense[]) => ({
  type: REMOVE_EXPENSE,
  payload: expenses,
});
