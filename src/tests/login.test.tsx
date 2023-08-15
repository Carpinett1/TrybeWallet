import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

const EMAIL = 'teste@email.com';
const SENHA = '123456';

describe('Login', () => {
  test('O input de email aparece ná tela', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByPlaceholderText(/e-mail/i);

    expect(email).toBeInTheDocument();
  });

  test('O input de senha aparece ná tela', () => {
    renderWithRouterAndRedux(<App />);

    const senha = screen.getByPlaceholderText(/senha/i);

    expect(senha).toBeInTheDocument();
  });

  test('Ao logar é redirecionado de página e o email salvo no estado global', async () => {
    const fetchResolvedValue = {
      json: async () => mockData,
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch')
      .mockResolvedValue(fetchResolvedValue);

    const { store } = renderWithRouterAndRedux(<App />);

    const email = screen.getByPlaceholderText(/e-mail/i);
    const senha = screen.getByPlaceholderText(/senha/i);
    const entrar = screen.getByRole('button', { name: /entrar/i });

    await userEvent.type(email, EMAIL);
    await userEvent.type(senha, SENHA);
    await userEvent.click(entrar);

    const emailDisplay = screen.getByRole('heading', { level: 2, name: EMAIL });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(emailDisplay).toBeInTheDocument();
    expect(store.getState().user.email).toBe(EMAIL);
  });
});
