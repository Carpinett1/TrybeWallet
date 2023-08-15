import { useSelector } from 'react-redux';
import { ReduxState } from '../types';
import styles from '../styles/header.module.css';
import logo from '../imgs/logo.png';
import despesa from '../imgs/despesas.svg';
import user from '../imgs/profile.svg';

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
    <header className={ styles.headerContainer }>
      <h1><img src={ logo } alt="logo" /></h1>
      <div className={ styles.container }>
        <img src={ despesa } alt="despesa" />
        <h2 className={ styles.colorPurple }>Total de despesas: </h2>
        <h2
          data-testid="total-field"
          className={ `${styles.colorPurple} ${styles.skinnyText}` }
        >
          {handleTotal()}
        </h2>
        <h2
          data-testid="header-currency-field"
          className={ `${styles.colorPurple} ${styles.skinnyText}` }
        >
          BRL
        </h2>
      </div>
      <div className={ styles.container }>
        <img src={ user } alt="user" />
        <h2
          data-testid="email-field"
          className={ `${styles.colorPurple}` }
        >
          { email || 'Entrar' }
        </h2>
      </div>
    </header>
  );
}

export default Header;
