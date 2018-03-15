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

injectGlobal([
  `
  body {
    background-color: initial;
    margin: 0;
    font-family: ${constants.fontFamily};
  }

  #root {
    height: 100%;
    overflow-x: hidden;
    min-height: 100vh;
    background-color: ${constants.almostWhite};
    // background-color: #192023;
    // background-image: -webkit-linear-gradient(315deg, #2e2d45, #1c2127);
    // background-image: linear-gradient(135deg, #2e2d45, #1c2127);
    color: ${constants.primaryTextColor};
  }
  `,
]);

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#757ce8',
      main: constants.defaultPrimaryColor,
      dark: constants.defaultPrimaryColor,
      contrastText: '#fff',
    },
    secondary: {
      light: '#64B5F6',
      main: '#03A9F4',
      dark: '#2196F3',
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
