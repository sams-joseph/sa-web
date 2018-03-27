import React from 'react';
import PropTypes from 'prop-types';
import decode from 'jwt-decode';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const checkAuth = () => {
  const token = localStorage.sepsisJWT;
  if (!token) {
    return false;
  }
  try {
    const { exp } = decode(token);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route {...rest} render={props => (!checkAuth() ? <Component {...props} /> : <Redirect to="/dashboard" />)} />
);

const { func, bool } = PropTypes;
GuestRoute.propTypes = {
  component: func.isRequired,
  isAuthenticated: bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
  };
}

export default connect(mapStateToProps)(GuestRoute);
