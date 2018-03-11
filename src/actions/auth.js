import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_RESET_PASSWORD } from '../types';
import setAuthorizationHeader from '../utils/setAuthorizationHeader';
import api from '../api';

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user,
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});

export const userResetPassword = user => ({
  type: USER_RESET_PASSWORD,
  user,
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.sepsisJWT = user.token;
    setAuthorizationHeader(user.token);
    dispatch(userLoggedIn(user));
  });

export const logout = () => dispatch => {
  localStorage.removeItem('sepsisJWT');
  dispatch(userLoggedOut());
};

export const resetPassword = credentials => dispatch =>
  api.user.resetPassword(credentials).then(user => dispatch(userResetPassword(user)));

export const confirm = token => dispatch =>
  api.user.confirm(token).then(user => {
    localStorage.sepsisJWT = user.token;
    dispatch(userLoggedIn(user));
  });
