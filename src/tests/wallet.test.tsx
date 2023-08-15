import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

const EMAIL = 'teste@email.com';
const ADICIONAR_DESPESA = 'Adicionar despesa';

const stateWithEmail = {
  user: {
    email: EMAIL,
  },
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

describe('Wallet', () => {
  test('Todos os inputs aparecem na tela', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/', '/carteira'], initialState: stateWithEmail });

    const value = screen.getByLabelText(/valor/i);
    const description = screen.getByLabelText(/descrição da despesa/i);
    const currency = screen.getByLabelText(/moeda/i);
    const method = screen.getByLabelText(/método de pagamento/i);
    const tag = screen.getByLabelText(/categoria da despesa/i);
    const button = screen.getByRole('button', { name: ADICIONAR_DESPESA });

    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Ao adicionar uma nova despesa ela é exibida corretamente e adicionada ao estado global', async () => {
    const fetchResolvedValue = {
      json: async () => mockData,
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch')
      .mockResolvedValue(fetchResolvedValue);

    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/', '/carteira'], initialState: stateWithEmail });

    const value = screen.getByLabelText(/valor/i);
    const description = screen.getByLabelText(/descrição da despesa/i);
    const currency = await screen.findByLabelText(/moeda/i);
    const method = screen.getByLabelText(/método de pagamento/i);
    const tag = screen.getByLabelText(/categoria da despesa/i);
    const button = screen.getByRole('button', { name: ADICIONAR_DESPESA });

    await userEvent.type(value, '100');
    await userEvent.type(description, 'Restaurante');
    await userEvent.selectOptions(currency, 'EUR');
    await userEvent.selectOptions(method, 'Cartão de débito');
    await userEvent.selectOptions(tag, 'Alimentação');
    await userEvent.click(button);

    const expense = await screen.findByText('Restaurante');
    const total = await screen.findByRole('heading', { level: 2, name: '512.68' });

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(expense).toBeInTheDocument();
    expect(total).toBeInTheDocument();
    expect(store.getState().wallet.expenses).toHaveLength(1);
  });

  test('é possivel editar e excluir uma despesa da lista', async () => {
    const fetchResolvedValue = {
      json: async () => mockData,
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch')
      .mockResolvedValue(fetchResolvedValue);

    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/', '/carteira'], initialState: stateWithEmail });

    const value = screen.getByLabelText(/valor/i);
    const description = screen.getByLabelText(/descrição da despesa/i);
    const currency = await screen.findByLabelText(/moeda/i);
    const method = screen.getByLabelText(/método de pagamento/i);
    const tag = screen.getByLabelText(/categoria da despesa/i);
    const buttonAdd = screen.getByRole('button', { name: ADICIONAR_DESPESA });

    await userEvent.type(value, '100');
    await userEvent.type(description, 'Restaurante');
    await userEvent.selectOptions(currency, 'EUR');
    await userEvent.selectOptions(method, 'Cartão de débito');
    await userEvent.selectOptions(tag, 'Alimentação');
    await userEvent.click(buttonAdd);

    const buttonToEdit = await screen.findByRole('button', { name: 'Edit' });

    await userEvent.click(buttonToEdit);

    const buttonAddEdit = await screen.findByRole('button', { name: 'Editar despesa' });

    await userEvent.clear(value);
    await userEvent.type(value, '120');
    await userEvent.selectOptions(currency, 'USD');
    await userEvent.click(buttonAddEdit);

    const expense = await screen.findByText('Restaurante');
    const total = await screen.findByRole('heading', { level: 2, name: '570.37' });

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(expense).toBeInTheDocument();
    expect(total).toBeInTheDocument();
    expect(store.getState().wallet.expenses).toHaveLength(1);

    const buttonToDelete = await screen.findByRole('button', { name: 'X' });

    await userEvent.click(buttonToDelete);

    expect(expense).not.toBeInTheDocument();
    expect(store.getState().wallet.expenses).toHaveLength(0);
  });
});
