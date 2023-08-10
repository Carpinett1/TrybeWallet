import { useDispatch, useSelector } from 'react-redux';
import { Expense, ReduxState } from '../types';
import { EditExpenseAction, RemoveExpenseAction } from '../redux/actions';

function Table() {
  const { expenses } = useSelector((state: ReduxState) => state.wallet);
  const dispatch = useDispatch();

  const handleRemove = (deletedExpense: Expense) => {
    const filteredExpenses = expenses
      .filter((expense) => expense.id !== deletedExpense.id);

    dispatch(RemoveExpenseAction(filteredExpenses));
  };

  const handleEdit = (id: number) => {
    dispatch(EditExpenseAction(id));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{Number(expense.value).toFixed(2)}</td>
            <td>{expense.exchangeRates[expense.currency].name}</td>
            <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
            <td>
              {(Number(expense.value)
              * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
            </td>
            <td>Real</td>
            <td>
              <button
                data-testid="edit-btn"
                onClick={ () => handleEdit(expense.id) }
              >
                Edit
              </button>
              <button
                data-testid="delete-btn"
                onClick={ () => handleRemove(expense) }
              >
                X
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
