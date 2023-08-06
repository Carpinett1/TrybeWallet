import { useSelector } from 'react-redux';
import { ReduxState } from '../types';

function Header() {
  const { email } = useSelector((state: ReduxState) => state.user);

  return (
    <header>
      <h1>Trybe Wallet</h1>
      <h2 data-testid="total-field">Total de despesas: 0</h2>
      <h2 data-testid="header-currency-field">BRL</h2>
      <h2 data-testid="email-field">{ email }</h2>
    </header>
  );
}

export default Header;
