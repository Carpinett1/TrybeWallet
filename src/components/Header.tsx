import { useSelector } from 'react-redux';
import { ReduxState } from '../types';

function Header() {
  const { email } = useSelector((state: ReduxState) => state.user);
  const { expenses } = useSelector((state: ReduxState) => state.wallet);

  const handleTotal = () => {
    let total = 0;
    expenses.forEach((expense) => {
      const { value, currency } = expense;

      const currencyValue = expense.exchangeRates[currency].ask;

      total += (Number(value) * Number(currencyValue));
    });
    return total.toFixed(2);
  };

  return (
    <header>
      <h1>Trybe Wallet</h1>
      <h2>Total de despesas: </h2>
      <h2 data-testid="total-field">{handleTotal()}</h2>
      <h2 data-testid="header-currency-field">BRL</h2>
      <h2 data-testid="email-field">{ email }</h2>
    </header>
  );
}

export default Header;
