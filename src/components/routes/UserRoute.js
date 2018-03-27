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

const UserRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (checkAuth() ? <Component {...props} /> : <Redirect to="/login" />)} />
);

const { func, bool } = PropTypes;
UserRoute.propTypes = {
  component: func.isRequired,
  isAuthenticated: bool.isRequired,
};

UserRoute.defaultProps = {
  token: '',
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    token: state.user.token,
  };
}

export default connect(mapStateToProps)(UserRoute);
