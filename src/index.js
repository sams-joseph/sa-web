import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import decode from 'jwt-decode';
import 'semantic-ui-css/semantic.min.css';
import { userLoggedIn } from './actions/auth';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

if (localStorage.sepsisJWT) {
  const payload = decode(localStorage.sepsisJWT);
  const user = {
    token: localStorage.sepsisJWT,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    confirmed: payload.confirmed,
  };
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
