import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import * as actions from '../../actions/auth';

const UserRoute = ({ isAuthenticated, validateToken, token, component: Component, ...rest }) => {
  const isAuth = isAuthenticated ? () => validateToken(token) : false;

  return <Route {...rest} render={props => (isAuth ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

const { func, bool, string } = PropTypes;
UserRoute.propTypes = {
  component: func.isRequired,
  isAuthenticated: bool.isRequired,
  validateToken: func.isRequired,
  token: string,
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

export default connect(mapStateToProps, { validateToken: actions.validateToken })(UserRoute);
