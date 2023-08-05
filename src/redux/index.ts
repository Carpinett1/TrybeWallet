import { legacy_createStore as CreateStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = CreateStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

if (window.Cypress) {
  window.store = store;
}

export default store;
