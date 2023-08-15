import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import styles from '../styles/wallet.module.css';

function Wallet() {
  return (
    <>
      <Header />
      <main className={ styles.container }>
        <Table />
        <WalletForm />
      </main>
    </>
  );
}

export default Wallet;
