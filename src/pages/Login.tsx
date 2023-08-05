import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../redux/actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

function Login() {
  const [state, setState] = useState(INITIAL_STATE);
  const { email, password } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state, [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const emailValidator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(state.email);
    const passwordValidator = state.password.length >= 6;
    return emailValidator && passwordValidator;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginAction(email));
    navigate('/carteira');
  };

  return (
    <main>
      <form onSubmit={ handleSubmit }>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={ email }
          onChange={ handleChange }
          data-testid="email-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={ password }
          onChange={ handleChange }
          data-testid="password-input"
        />
        <button
          type="submit"
          disabled={ !validateForm() }
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

export default Login;
