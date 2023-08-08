import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, ReduxState, WalletFormType } from '../types';
import { expensesAction, fetchCurrencies } from '../redux/actions';
import { fetchExchangeRates } from '../services';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

function WalletForm() {
  const [state, setState] = useState<WalletFormType>(INITIAL_STATE);
  const { value, description, currency, method, tag } = state;
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const { currencies } = useSelector((store: ReduxState) => store.wallet);
  const { expenses } = useSelector((store: ReduxState) => store.wallet);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setState({
      ...state, [e.target.name]: e.target.value,
    });
  };

  const handleExpense = async () => ({
    id: expenses.length,
    value,
    description,
    currency,
    method,
    tag,
    exchangeRates: await fetchExchangeRates(),
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const response = await handleExpense();
    dispatch(expensesAction(response));
    setState(INITIAL_STATE);
  };

  return (
    <section>
      <form>
        <label htmlFor="value">
          Valor
          <input
            type="number"
            id="value"
            name="value"
            value={ value }
            min="0"
            onChange={ handleChange }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição da despesa
          <input
            type="text"
            id="description"
            name="description"
            value={ description }
            onChange={ handleChange }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            id="currency"
            name="currency"
            value={ currency }
            onChange={ handleChange }
            data-testid="currency-input"
          >
            {currencies.map((curr) => {
              return <option key={ curr }>{ curr }</option>;
            })}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            id="method"
            name="method"
            value={ method }
            onChange={ handleChange }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria da despesa
          <select
            id="tag"
            name="tag"
            value={ tag }
            onChange={ handleChange }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="submit"
          onClick={ handleSubmit }
        >
          Adicionar despesa
        </button>
      </form>
    </section>
  );
}

export default WalletForm;
