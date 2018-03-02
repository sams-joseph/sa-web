import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import decode from 'jwt-decode';
import 'react-select/dist/react-select.css';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { userLoggedIn } from './actions/auth';
import ScrollToTop from './components/routes/ScrollToTop';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';

import constants from './components/constants';

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

const theme = createMuiTheme({
  palette: {
    type: 'dark',
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
      underline: {
        '&:hover:not($disabled):before': {
          backgroundColor: constants.defaultPrimaryColor,
        },
      },
    },
    MuiDrawer: {
      paperAnchorDockedLeft: {
        position: 'relative',
        width: '300px',
        zIndex: '1',
        background: 'rgb(55, 55, 55)',
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
