import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { injectGlobal } from 'styled-components';
import decode from 'jwt-decode';
import 'react-select/dist/react-select.css';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { userLoggedIn } from './actions/auth';
import { loadCart } from './actions/cart';
import ScrollToTop from './components/routes/ScrollToTop';
import setAuthorizationHeader from './utils/setAuthorizationHeader';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';

import constants from './components/constants';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

if (localStorage.sepsisJWT) {
  const payload = decode(localStorage.sepsisJWT);
  setAuthorizationHeader(localStorage.sepsisJWT);
  const user = {
    token: localStorage.sepsisJWT,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    confirmed: payload.confirmed,
  };
  store.dispatch(userLoggedIn(user));
}

// if (localStorage.cartItems) {
//   const cart = JSON.parse(localStorage.getItem('cartItems'));
//   store.dispatch(loadCart(cart));
// }

injectGlobal([
  `
  body {
    background-color: initial;
    margin: 0;
    font-family: ${constants.fontFamily};
    min-height: 100vh;
  }

  #root {
    height: 100%;
    overflow-x: hidden;
    min-height: 100vh;
    background-color: white;
    color: ${constants.primaryTextColor};
  }

  a {
    color: ${constants.defaultPrimaryColor};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .fade-enter {
    transform: translateX(-30px);
    opacity: 0.01;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms ease-in, transform 300ms ease-in;
  }

  .fade-exit {
    transform: translateX(0);
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transform: translateX(-30px);
    transition: opacity 300ms ease-out, transform 300ms ease-out;
  }
  `,
]);

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#757ce8',
      main: constants.defaultPrimaryColor,
      dark: '#1150fc',
      contrastText: '#fff',
    },
    secondary: {
      light: '#20873d',
      main: '#33b257',
      dark: '#279947',
      contrastText: '#fff',
    },
  },
  overrides: {
    MuiInput: {
      input: {
        padding: '8px 5px 8px 5px',
      },
    },
    MuiDrawer: {
      paperAnchorDockedLeft: {
        position: 'relative',
        width: '300px',
        flex: '1',
        zIndex: '1',
        background: '#2b2b42',
      },
    },
    MuiAppBar: {
      root: {},
      positionStatic: {},
    },
    MuiMenu: {
      paper: {
        zIndex: '5001',
      },
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <ScrollToTop>
        <Provider store={store}>
          <Route component={App} />
        </Provider>
      </ScrollToTop>
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
