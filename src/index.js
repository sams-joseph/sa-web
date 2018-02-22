import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import decode from 'jwt-decode';
import 'react-select/dist/react-select.css';
import { userLoggedIn } from './actions/auth';
import ScrollToTop from './components/routes/ScrollToTop';

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
    <ScrollToTop>
      <Provider store={store}>
        <Route component={App} />
      </Provider>
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
