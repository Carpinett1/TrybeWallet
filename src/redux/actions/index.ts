import { FETCH_CURRENCIES, USER_LOGIN } from './actionTypes';
import { Dispatch } from '../../types';

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
