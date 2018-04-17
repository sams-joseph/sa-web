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
    const { exp, roleId } = decode(token);
    if (exp < new Date().getTime() / 1000 || roleId !== 1) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (checkAuth() ? <Component {...props} /> : <Redirect to="/login" />)} />
);

const { func, bool } = PropTypes;
AdminRoute.propTypes = {
  component: func.isRequired,
  isAuthenticated: bool.isRequired,
};

AdminRoute.defaultProps = {
  token: '',
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    token: state.user.token,
  };
}

export default connect(mapStateToProps)(AdminRoute);
